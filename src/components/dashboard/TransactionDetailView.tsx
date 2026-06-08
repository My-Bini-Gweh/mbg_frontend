"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, getTransactions } from "@/lib/api";
import {
  formatCurrency,
  formatDate,
  getTransactionTypeLabel,
} from "@/lib/format";
import { TransactionStatusBadge } from "@/components/ui/TransactionStatusBadge";
import { TransactionTypeBadge } from "@/components/ui/TransactionTypeBadge";
import type { Transaction } from "@/types";

type TransactionDetailViewProps = {
  id: string;
};

export function TransactionDetailView({ id }: TransactionDetailViewProps) {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [status, setStatus] = useState("Memuat detail transaksi...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const rows = await getTransactions(session.token);
        const selected = rows.find((item) => item.id === id);

        if (!active) {
          return;
        }

        setTransaction(selected ?? null);
        setStatus(
          selected
            ? "Detail transaksi tersinkron dari server."
            : "Transaksi tidak ditemukan.",
        );
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat transaksi",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [id, router]);

  const timeline = transaction
    ? [
        {
          title: "Transaksi dibuat",
          description: `Kode ${transaction.code} tercatat pada sistem.`,
          status: "done" as const,
        },
        {
          title: "Validasi saldo dan tujuan",
          description:
            "Stored procedure memvalidasi wallet, tujuan, dan nominal transaksi.",
          status: "done" as const,
        },
        {
          title: `Status ${transaction.status}`,
          description:
            transaction.status === "SUCCESS"
              ? "Saldo dan audit log berhasil diperbarui."
              : "Status akhir mengikuti hasil validasi database.",
          status: transaction.status === "SUCCESS" ? ("done" as const) : ("pending" as const),
        },
      ]
    : [];

  const timelineColor = transaction?.status === "SUCCESS"
    ? "bg-emerald-600"
    : transaction?.status === "FAILED"
    ? "bg-red-500"
    : "bg-amber-500";

  return (
    <div className="space-y-5 animate-slide-up">
      <Link
        href="/dashboard/transactions"
        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md"
      >
        <svg className="size-4 transition group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Riwayat
      </Link>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="spinner-dark" style={{ width: 14, height: 14 }} />
          {status}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{status}</p>
      )}

      {transaction ? (
        <>
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  <span className="inline-block h-px w-4 bg-indigo-400" />
                  Detail Transaksi
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  {transaction.code}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <TransactionTypeBadge type={transaction.type} />
                <TransactionStatusBadge status={transaction.status} />
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "Tipe Transaksi", value: getTransactionTypeLabel(transaction.type) },
                { label: "Nominal", value: formatCurrency(transaction.amount) },
                { label: "Status", value: transaction.status },
                { label: "Pengirim", value: transaction.sender },
                { label: "Penerima / Merchant", value: transaction.receiver },
                { label: "Waktu Transaksi", value: formatDate(transaction.date) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:ring-indigo-200"
                >
                  <dt className="text-sm text-slate-500">{item.label}</dt>
                  <dd className="mt-2 font-bold text-slate-950">{item.value}</dd>
                </div>
              ))}
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:col-span-2 xl:col-span-3 transition hover:ring-indigo-200">
                <dt className="text-sm text-slate-500">Catatan</dt>
                <dd className="mt-2 font-bold text-slate-950">
                  {transaction.note ?? "-"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-bold text-slate-950">Timeline</h3>
            <div className="mt-6 space-y-0">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex size-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${
                        index === timeline.length - 1 ? timelineColor : "bg-indigo-600"
                      }`}
                    >
                      {index === timeline.length - 1 ? (
                        transaction.status === "SUCCESS" ? (
                          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : transaction.status === "FAILED" ? (
                          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className="size-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < timeline.length - 1 ? (
                      <div className="mt-1 h-full w-0.5 bg-gradient-to-b from-indigo-300 to-slate-200" />
                    ) : null}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
