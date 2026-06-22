"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  createAdminEntity,
  deleteAdminEntity,
  getSession,
  listAdminEntity,
  updateAdminEntity,
} from "@/lib/api";
import {
  ADMIN_ENTITIES,
  type AdminEntityKey,
  type AdminField,
} from "@/lib/admin-entities";
import type { AdminPagination, AdminRecord } from "@/types";

type DialogState =
  | { type: "create"; row?: undefined }
  | { type: "edit" | "view"; row: AdminRecord }
  | null;

type FormValue = string | boolean;

const emptyPagination: AdminPagination = {
  page: 1,
  per_page: 20,
  total: 0,
  total_pages: 0,
};

export function AdminEntityManager({ entity }: { entity: AdminEntityKey }) {
  const definition = ADMIN_ENTITIES[entity];
  const [rows, setRows] = useState<AdminRecord[]>([]);
  const [pagination, setPagination] = useState(emptyPagination);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(definition.defaultSort);
  const [order, setOrder] = useState<"asc" | "desc">(
    definition.defaultOrder ?? "desc",
  );
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [formValues, setFormValues] = useState<Record<string, FormValue>>({});
  const [relationOptions, setRelationOptions] = useState<
    Record<string, Array<{ label: string; value: string }>>
  >({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const session = getSession();
    if (!session || session.mahasiswa.role !== "admin") return;

    listAdminEntity(session.token, definition.endpoint, {
      page,
      perPage,
      search,
      sort,
      order,
      filters,
    })
      .then((result) => {
        if (!active) return;
        setRows(result.items);
        setPagination(result.pagination);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setError(caught instanceof Error ? caught.message : "Gagal memuat data");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [definition.endpoint, filters, order, page, perPage, refreshKey, search, sort]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function changeSort(nextSort?: string) {
    if (!nextSort) return;
    setPage(1);
    if (sort === nextSort) {
      setOrder((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSort(nextSort);
    setOrder("asc");
  }

  async function loadRelationOptions() {
    const fields = (definition.fields ?? []).filter((field) => field.relation);
    const session = getSession();
    if (!session || fields.length === 0) return;
    const entries = await Promise.all(
      fields.map(async (field) => {
        const relation = field.relation!;
        const result = await listAdminEntity(session.token, relation.endpoint, {
          page: 1,
          perPage: 100,
          order: "asc",
        });
        const options = result.items.map((row) => ({
          value: String(row[relation.valueKey] ?? ""),
          label: relation.labelKeys
            .map((key) => String(row[key] ?? ""))
            .filter(Boolean)
            .join(" — "),
        }));
        return [field.key, options] as const;
      }),
    );
    setRelationOptions(Object.fromEntries(entries));
  }

  function initialFormValues(row?: AdminRecord) {
    return Object.fromEntries(
      (definition.fields ?? []).map((field) => {
        const rowValue = row?.[field.key];
        if (field.type === "checkbox") {
          return [field.key, row ? Boolean(rowValue) : true];
        }
        if (rowValue !== undefined && rowValue !== null) {
          return [field.key, String(rowValue)];
        }
        return [field.key, field.options?.[0]?.value ?? ""];
      }),
    );
  }

  function openCreate() {
    setError("");
    setFormValues(initialFormValues());
    setDialog({ type: "create" });
    void loadRelationOptions();
  }

  function openEdit(row: AdminRecord) {
    setError("");
    setFormValues(initialFormValues(row));
    setDialog({ type: "edit", row });
    void loadRelationOptions();
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dialog || dialog.type === "view") return;
    const session = getSession();
    if (!session) return;

    const payload: AdminRecord = {};
    for (const field of definition.fields ?? []) {
      if (dialog.type === "edit" && (field.createOnly || field.immutableOnEdit)) {
        continue;
      }
      const value = formValues[field.key];
      if (field.relation?.valueType === "number") {
        payload[field.key] = Number(value);
      } else {
        payload[field.key] = value;
      }
    }

    setSaving(true);
    setError("");
    try {
      if (dialog.type === "create") {
        await createAdminEntity(session.token, definition.endpoint, payload);
      } else {
        const id = String(dialog.row[definition.idKey]);
        await updateAdminEntity(session.token, definition.endpoint, id, payload);
      }
      setDialog(null);
      setRefreshKey((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  }

  async function removeRow(row: AdminRecord) {
    const id = String(row[definition.idKey]);
    if (!window.confirm(`Hapus ${definition.singular.toLowerCase()} ${id}? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }
    const session = getSession();
    if (!session) return;
    setError("");
    try {
      await deleteAdminEntity(session.token, definition.endpoint, id);
      if (rows.length === 1 && page > 1) setPage((value) => value - 1);
      else setRefreshKey((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal menghapus data");
    }
  }

  const visibleColumns = definition.columns.filter((column) => column.table !== false);

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{definition.title}</h2>
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
            {definition.description}
          </p>
        </div>
        {definition.canCreate ? (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            <span className="text-lg leading-none">+</span> Tambah {definition.singular}
          </button>
        ) : null}
      </div>

      {definition.readOnlyNote ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          {definition.readOnlyNote}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 xl:flex-row xl:items-center xl:justify-between">
          <form onSubmit={submitSearch} className="flex w-full gap-2 xl:max-w-xl">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Pencarian</span>
              <svg className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-6.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
              </svg>
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={definition.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </label>
            <button type="submit" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700">
              Cari
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {(definition.filters ?? []).map((filter) => (
              <label key={filter.key}>
                <span className="sr-only">{filter.label}</span>
                <select
                  value={filters[filter.key] ?? ""}
                  onChange={(event) => {
                    setPage(1);
                    setFilters((current) => ({ ...current, [filter.key]: event.target.value }));
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            ))}
            <label>
              <span className="sr-only">Baris per halaman</span>
              <select
                value={perPage}
                onChange={(event) => {
                  setPage(1);
                  setPerPage(Number(event.target.value));
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400"
              >
                {[10, 20, 50, 100].map((value) => <option key={value} value={value}>{value} / halaman</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                {visibleColumns.map((column) => (
                  <th key={column.key} className="whitespace-nowrap px-4 py-3.5 font-bold">
                    <button
                      type="button"
                      disabled={!column.sort}
                      onClick={() => changeSort(column.sort)}
                      className="inline-flex items-center gap-1 disabled:cursor-default"
                    >
                      {column.label}
                      {column.sort && sort === column.sort ? <span>{order === "asc" ? "↑" : "↓"}</span> : null}
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3.5 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!loading && rows.map((row) => (
                <tr key={String(row[definition.idKey])} className="hover:bg-indigo-50/30">
                  {visibleColumns.map((column) => (
                    <td key={column.key} className="max-w-sm whitespace-nowrap px-4 py-3.5 text-slate-700">
                      {formatValue(row[column.key], column.format)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button type="button" onClick={() => setDialog({ type: "view", row })} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100">View</button>
                      {definition.canEdit ? <button type="button" onClick={() => openEdit(row)} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50">Edit</button> : null}
                      {definition.canDelete ? <button type="button" onClick={() => void removeRow(row)} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">Delete</button> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-sm font-semibold text-slate-500">
            <span className="spinner-dark size-5 border-2" /> Memuat data...
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">Tidak ada data yang cocok.</div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {pagination.total === 0 ? "0 data" : `${(pagination.page - 1) * pagination.per_page + 1}–${Math.min(pagination.page * pagination.per_page, pagination.total)} dari ${pagination.total} data`}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700 disabled:opacity-40">Sebelumnya</button>
            <span className="min-w-20 text-center text-sm font-semibold text-slate-600">{pagination.page} / {Math.max(1, pagination.total_pages)}</span>
            <button type="button" disabled={page >= pagination.total_pages || loading || pagination.total_pages === 0} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700 disabled:opacity-40">Berikutnya</button>
          </div>
        </div>
      </section>

      {dialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {dialog.type === "create" ? `Tambah ${definition.singular}` : dialog.type === "edit" ? `Edit ${definition.singular}` : `Detail ${definition.singular}`}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {dialog.type === "view" ? `ID: ${String(dialog.row[definition.idKey])}` : "Field bertanda * wajib diisi."}
                </p>
              </div>
              <button type="button" onClick={() => setDialog(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">✕</button>
            </div>

            {dialog.type === "view" ? (
              <div className="grid gap-x-6 gap-y-4 p-6 sm:grid-cols-2">
                {definition.columns.map((column) => (
                  <div key={column.key} className={column.key === "description" || column.key === "keterangan" ? "sm:col-span-2" : ""}>
                    <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{column.label}</dt>
                    <dd className="mt-1 break-words text-sm font-semibold text-slate-800">{formatValue(dialog.row[column.key], column.format)}</dd>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  {(definition.fields ?? []).filter((field) => !(dialog.type === "edit" && field.createOnly)).map((field) => (
                    <AdminFormField
                      key={field.key}
                      field={field}
                      editing={dialog.type === "edit"}
                      value={formValues[field.key] ?? ""}
                      options={field.relation ? relationOptions[field.key] ?? [] : field.options ?? []}
                      onChange={(value) => setFormValues((current) => ({ ...current, [field.key]: value }))}
                    />
                  ))}
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
                  <button type="button" onClick={() => setDialog(null)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700">Batal</button>
                  <button type="submit" disabled={saving} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdminFormField({
  field,
  value,
  options,
  editing,
  onChange,
}: {
  field: AdminField;
  value: FormValue;
  options: Array<{ label: string; value: string }>;
  editing: boolean;
  onChange: (value: FormValue) => void;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:col-span-2">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="size-4 accent-indigo-600" />
        <span className="text-sm font-bold text-slate-700">{field.label}</span>
      </label>
    );
  }

  const required = Boolean(field.required && !(editing && field.type === "password"));
  const className = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60";
  return (
    <label className={field.type === "textarea" ? "sm:col-span-2" : ""}>
      <span className="text-sm font-bold text-slate-700">{field.label}{required ? " *" : ""}</span>
      {field.type === "select" ? (
        <select value={String(value)} required={required} disabled={editing && field.immutableOnEdit} onChange={(event) => onChange(event.target.value)} className={className}>
          {field.relation ? <option value="">Pilih {field.label.toLowerCase()}</option> : null}
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : field.type === "textarea" ? (
        <textarea value={String(value)} required={required} maxLength={field.maxLength} placeholder={field.placeholder} onChange={(event) => onChange(event.target.value)} rows={4} className={className} />
      ) : (
        <input
          type={field.type}
          value={String(value)}
          required={required}
          disabled={editing && field.immutableOnEdit}
          maxLength={field.maxLength}
          minLength={field.type === "password" ? 6 : undefined}
          min={field.type === "number" ? field.min : undefined}
          step={field.step}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

function formatValue(value: unknown, format = "text") {
  if (value === null || value === undefined || value === "") return <span className="text-slate-400">—</span>;
  if (format === "currency") {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 2 }).format(Number(value));
  }
  if (format === "datetime") {
    const date = new Date(String(value));
    return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleString("id-ID");
  }
  if (format === "date") {
    const date = new Date(`${String(value)}T00:00:00Z`);
    return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleDateString("id-ID", { timeZone: "UTC" });
  }
  if (format === "boolean") {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${Boolean(value) ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{Boolean(value) ? "Aktif" : "Nonaktif"}</span>;
  }
  if (format === "badge") {
    const label = String(value);
    const positive = ["ACTIVE", "SUCCESS", "admin", "ADMIN"].includes(label);
    const negative = ["FAILED", "SUSPENDED", "INACTIVE"].includes(label);
    return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${positive ? "bg-emerald-50 text-emerald-700" : negative ? "bg-red-50 text-red-700" : "bg-indigo-50 text-indigo-700"}`}>{label}</span>;
  }
  if (format === "code") {
    return <code className="break-all font-mono text-xs text-slate-800">{String(value)}</code>;
  }
  return String(value);
}
