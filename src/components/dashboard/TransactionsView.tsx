"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { getSession, getTransactions } from "@/lib/api";
import type { Transaction } from "@/types";

export function TransactionsView() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState("Memuat riwayat transaksi...");

  useEffect(() => {
    let active = true;

    async function loadTransactions() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const rows = await getTransactions(session.token);
        if (active) {
          setTransactions(rows);
          setStatus("Riwayat transaksi tersinkron dari server.");
        }
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error
              ? err.message
              : "Gagal memuat riwayat transaksi",
          );
        }
      }
    }

    loadTransactions();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Riwayat Transaksi
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{status}</p>
      </div>
      <TransactionTable
        transactions={transactions}
        detailBasePath="/dashboard/transactions"
      />
    </div>
  );
}
