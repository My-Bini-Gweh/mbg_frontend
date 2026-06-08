"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/cards/StatCard";
import { ReportTable } from "@/components/tables/ReportTable";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  getAdminSummary,
  getAuditLogs,
  getDailyReports,
  getSession,
} from "@/lib/api";
import type { AdminSummary, AuditLog, DailyReport } from "@/types";

const initialSummary: AdminSummary = {
  totalUsers: 0,
  totalMerchants: 0,
  totalTransactions: 0,
  totalSuccessfulAmount: 0,
};

export function AdminDashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState<AdminSummary>(initialSummary);
  const [logRows, setLogRows] = useState<AuditLog[]>([]);
  const [reportRows, setReportRows] = useState<DailyReport[]>([]);
  const [status, setStatus] = useState("Memuat data admin...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAdminData() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const [apiSummary, apiLogs, apiReports] =
          await Promise.all([
            getAdminSummary(session.token),
            getAuditLogs(session.token),
            getDailyReports(session.token),
          ]);

        if (!active) {
          return;
        }

        setSummary(apiSummary);
        setLogRows(apiLogs);
        setReportRows(apiReports);
        setStatus("Data operasional tersinkron dari server.");
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat data admin",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadAdminData();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-slide-up stagger-children">
        <StatCard
          title="Total Users"
          value={summary.totalUsers.toLocaleString("id-ID")}
          description="Jumlah akun mahasiswa."
          accent="bg-blue-500"
        />
        <StatCard
          title="Total Merchants"
          value={summary.totalMerchants.toLocaleString("id-ID")}
          description="Merchant aktif di lingkungan kampus."
          accent="bg-violet-500"
        />
        <StatCard
          title="Total Transactions"
          value={summary.totalTransactions.toLocaleString("id-ID")}
          description="Akumulasi transaksi sistem."
          accent="bg-amber-500"
        />
        <StatCard
          title="Successful Amount"
          value={formatCurrency(summary.totalSuccessfulAmount)}
          description="Total nominal transaksi sukses."
          accent="bg-emerald-500"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Recent Activity */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-lg font-bold text-slate-950">
            Recent Activity
          </h2>
          <div className="mt-1.5">
            {isLoading ? (
              <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                <span className="spinner-dark" style={{ width: 14, height: 14 }} />
                {status}
              </span>
            ) : (
              <p className="text-sm text-slate-500">{status}</p>
            )}
          </div>
          <div className="mt-5 space-y-3">
            {logRows.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:ring-indigo-200 hover:bg-indigo-50/20"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-bold text-indigo-600">{log.action}</p>
                  <p className="text-xs font-semibold text-slate-400">
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
            {logRows.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <span className="text-3xl">📝</span>
                <p className="text-sm text-slate-400">Belum ada aktivitas</p>
              </div>
            ) : null}
          </div>
        </section>

        {/* Reports */}
        <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-950">
              Daily Report Summary
            </h2>
            <div className="mt-1.5">
              {isLoading ? (
                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <span className="spinner-dark" style={{ width: 14, height: 14 }} />
                  {status}
                </span>
              ) : (
                <p className="text-sm text-slate-500">{status}</p>
              )}
            </div>
          </div>
          <ReportTable reports={reportRows.slice(0, 3)} />
        </section>
      </div>
    </div>
  );
}
