"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/cards/StatCard";
import { ReportTable } from "@/components/tables/ReportTable";
import { adminSummary, auditLogs, dailyReports, transactions } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getAdminTransactions,
  getAuditLogs,
  getDailyReports,
  getMerchants,
  getSession,
  mapAdminSummary,
} from "@/lib/api";
import type { AuditLog, DailyReport, Merchant, Transaction } from "@/types";

export function AdminDashboard() {
  const router = useRouter();
  const [transactionRows, setTransactionRows] =
    useState<Transaction[]>(transactions);
  const [logRows, setLogRows] = useState<AuditLog[]>(auditLogs);
  const [reportRows, setReportRows] = useState<DailyReport[]>(dailyReports);
  const [merchantRows, setMerchantRows] = useState<Merchant[]>([]);
  const [status, setStatus] = useState("Memuat data admin...");

  useEffect(() => {
    let active = true;

    async function loadAdminData() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const [apiTransactions, apiLogs, apiReports, apiMerchants] =
          await Promise.all([
            getAdminTransactions(session.token),
            getAuditLogs(session.token),
            getDailyReports(session.token),
            getMerchants(),
          ]);

        if (!active) {
          return;
        }

        setTransactionRows(apiTransactions);
        setLogRows(apiLogs);
        setReportRows(apiReports);
        setMerchantRows(apiMerchants);
        setStatus("Data admin dari backend.");
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat data admin",
          );
        }
      }
    }

    loadAdminData();

    return () => {
      active = false;
    };
  }, [router]);

  const summary = useMemo(() => {
    const mappedSummary = mapAdminSummary(transactionRows, merchantRows);
    return {
      ...mappedSummary,
      totalUsers: adminSummary.totalUsers,
      totalMerchants:
        mappedSummary.totalMerchants || adminSummary.totalMerchants,
    };
  }, [merchantRows, transactionRows]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={summary.totalUsers.toLocaleString("id-ID")}
          description="Jumlah akun mahasiswa."
        />
        <StatCard
          title="Total Merchants"
          value={summary.totalMerchants.toLocaleString("id-ID")}
          description="Merchant aktif di lingkungan kampus."
        />
        <StatCard
          title="Total Transactions"
          value={summary.totalTransactions.toLocaleString("id-ID")}
          description="Akumulasi transaksi sistem."
        />
        <StatCard
          title="Successful Amount"
          value={formatCurrency(summary.totalSuccessfulAmount)}
          description="Total nominal transaksi sukses."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">{status}</p>
          <div className="mt-5 space-y-4">
            {logRows.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-bold text-indigo-700">{log.action}</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {formatDate(log.createdAt)}
                  </p>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {log.user}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {log.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-950">
              Daily Report Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">{status}</p>
          </div>
          <ReportTable reports={reportRows.slice(0, 3)} />
        </section>
      </div>
    </div>
  );
}
