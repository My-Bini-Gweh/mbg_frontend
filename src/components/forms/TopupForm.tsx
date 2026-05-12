"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import type { Bank, StudentProfile } from "@/types";

type TopupFormProps = {
  banks: Bank[];
  student: StudentProfile;
};

export function TopupForm({ banks, student }: TopupFormProps) {
  const [bankId, setBankId] = useState(banks[0]?.id ?? "");
  const [amount, setAmount] = useState("100000");
  const [note, setNote] = useState("");

  const selectedBank = useMemo(
    () => banks.find((bank) => bank.id === bankId),
    [bankId, banks],
  );
  const numericAmount = Number(amount || 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { bankId, amount: numericAmount, note };

    console.log("topup payload", payload);
    alert("Top up dummy berhasil dibuat.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Pilih Bank
          </span>
          <select
            value={bankId}
            onChange={(event) => setBankId(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Nominal Top Up
          </span>
          <input
            type="number"
            min="10000"
            step="1000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Catatan Opsional
          </span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="Contoh: top up untuk kebutuhan praktikum"
          />
        </label>
      </div>

      <aside className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <p className="text-sm font-bold text-slate-950">Preview Transaksi</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Bank</dt>
            <dd className="font-semibold text-slate-800">
              {selectedBank?.name ?? "-"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Tujuan</dt>
            <dd className="font-semibold text-slate-800">
              {student.campusPayId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Nominal</dt>
            <dd className="font-semibold text-slate-950">
              {formatCurrency(numericAmount)}
            </dd>
          </div>
        </dl>
        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
        >
          Submit Top Up
        </button>
      </aside>
    </form>
  );
}
