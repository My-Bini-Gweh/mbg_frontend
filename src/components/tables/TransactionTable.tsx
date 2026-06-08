"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  TRANSACTION_STATUS_FILTERS,
  TRANSACTION_TYPE_FILTERS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Transaction, TransactionStatus, TransactionType } from "@/types";
import { TransactionStatusBadge } from "@/components/ui/TransactionStatusBadge";
import { TransactionTypeBadge } from "@/components/ui/TransactionTypeBadge";

type TransactionTableProps = {
  transactions: Transaction[];
  detailBasePath?: string;
  enableSearch?: boolean;
  showFilters?: boolean;
  limit?: number;
};

export function TransactionTable({
  transactions,
  detailBasePath,
  enableSearch = true,
  showFilters = true,
  limit,
}: TransactionTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "ALL">(
    "ALL",
  );

  const filteredTransactions = useMemo(() => {
    const rows = transactions.filter((transaction) => {
      const matchesSearch = transaction.code
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType =
        typeFilter === "ALL" || transaction.type === typeFilter;
      const matchesStatus =
        statusFilter === "ALL" || transaction.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    return typeof limit === "number" ? rows.slice(0, limit) : rows;
  }, [limit, search, statusFilter, transactions, typeFilter]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {enableSearch || showFilters ? (
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          {enableSearch ? (
          <label className="relative w-full lg:max-w-sm">
            <span className="sr-only">Cari kode transaksi</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode transaksi..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            />
          </label>
          ) : (
            <div />
          )}

          {showFilters ? (
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <label>
                <span className="sr-only">Filter tipe</span>
                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value as TransactionType | "ALL")
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 cursor-pointer"
                >
                  {TRANSACTION_TYPE_FILTERS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Filter status</span>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as TransactionStatus | "ALL",
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 cursor-pointer"
                >
                  {TRANSACTION_STATUS_FILTERS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-gradient-to-r from-slate-100/80 via-slate-50/90 to-indigo-50/40 text-xs uppercase text-indigo-950/80">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Code</th>
              <th className="px-5 py-3.5 font-semibold">Type</th>
              <th className="px-5 py-3.5 font-semibold">Amount</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="group transition hover:bg-indigo-50/30">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-950">
                  {detailBasePath ? (
                    <Link
                      href={`${detailBasePath}/${transaction.id}`}
                      className="text-indigo-600 transition hover:text-indigo-800 hover:underline underline-offset-2"
                    >
                      {transaction.code}
                    </Link>
                  ) : (
                    transaction.code
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <TransactionTypeBadge type={transaction.type} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {formatDate(transaction.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <svg className="size-12 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0L12 17l-8-4" />
          </svg>
          <p className="text-sm font-semibold text-slate-600">
            Tidak ada transaksi
          </p>
          <p className="text-sm text-slate-400">
            Tidak ada transaksi yang cocok dengan filter.
          </p>
        </div>
      ) : null}
    </div>
  );
}
