"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { transactions as mockTransactions } from "@/data/mock";
import { getAdminTransactions, getSession } from "@/lib/api";
import type { Transaction } from "@/types";

export function AdminTransactionsView() {
  const router = useRouter();
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [status, setStatus] = useState("Memuat transaksi admin...");

  useEffect(() => {
    let active = true;

    async function loadTransactions() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const rows = await getAdminTransactions(session.token);
        if (active) {
          setTransactions(rows);
          setStatus("Transaksi dari backend.");
        }
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error
              ? err.message
              : "Gagal memuat transaksi admin",
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
        <h2 className="text-xl font-bold text-slate-950">Semua Transaksi</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{status}</p>
      </div>
      <TransactionTable transactions={transactions} enableSearch={false} />
    </div>
  );
}
