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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {enableSearch || showFilters ? (
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          {enableSearch ? (
          <label className="w-full lg:max-w-sm">
            <span className="sr-only">Cari kode transaksi</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode transaksi"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
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
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
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
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-950">
                  {detailBasePath ? (
                    <Link
                      href={`${detailBasePath}/${transaction.id}`}
                      className="text-indigo-700 hover:text-indigo-900"
                    >
                      {transaction.code}
                    </Link>
                  ) : (
                    transaction.code
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <TransactionTypeBadge type={transaction.type} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <TransactionStatusBadge status={transaction.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                  {formatDate(transaction.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="p-6 text-center text-sm text-slate-500">
          Tidak ada transaksi yang cocok dengan filter.
        </div>
      ) : null}
    </div>
  );
}
