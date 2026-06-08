"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { QuickActionCard } from "@/components/cards/QuickActionCard";
import { StatCard } from "@/components/cards/StatCard";
import { TransactionTable } from "@/components/tables/TransactionTable";
import {
  getProfile,
  getSession,
  getTransactions,
  getWallet,
  mapStudentProfile,
} from "@/lib/api";
import type { StudentProfile, Transaction } from "@/types";

const initialStudent: StudentProfile = {
  name: "-",
  nim: "-",
  campusPayId: "-",
  balance: 0,
  monthlyTransactionCount: 0,
  status: "ACTIVE",
};

const quickActions = [
  {
    title: "Top Up",
    description: "Tambah saldo dari bank partner.",
    href: "/dashboard/topup",
    marker: "TU",
  },
  {
    title: "Bayar Merchant",
    description: "Bayar kantin, parkir, koperasi, dan event kampus.",
    href: "/dashboard/pay",
    marker: "PM",
  },
  {
    title: "Riwayat Transaksi",
    description: "Cek detail dan status transaksi CampusPay.",
    href: "/dashboard/transactions",
    marker: "RT",
  },
];

export function DashboardHome() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState("Memuat data transaksi...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const [profile, wallet, apiTransactions] = await Promise.all([
          getProfile(session.token),
          getWallet(session.token),
          getTransactions(session.token),
        ]);

        if (!active) {
          return;
        }

        setTransactions(apiTransactions);
        setStudent(mapStudentProfile(profile, wallet, apiTransactions.length));
        setStatus("Data transaksi tersinkron dari server.");
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error
              ? err.message
              : "Gagal memuat data transaksi",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-8">
      {/* Balance + Stats */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr] animate-slide-up stagger-children">
        <BalanceCard
          balance={student.balance}
          campusPayId={student.campusPayId}
        />
        <div className="grid gap-4 sm:grid-cols-3 stagger-children">
          <StatCard
            title="Nama Mahasiswa"
            value={student.name}
            description={student.nim}
            accent="bg-blue-500"
          />
          <StatCard
            title="Transaksi Bulan Ini"
            value={`${student.monthlyTransactionCount}`}
            description="Transaksi aktif di akun ini."
            accent="bg-violet-500"
          />
          <StatCard
            title="Status Akun"
            value={student.status}
            description="Siap digunakan untuk transaksi."
            accent="bg-emerald-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Akses cepat ke alur utama pembayaran kampus.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 stagger-children">
          {quickActions.map((action) => (
            <QuickActionCard key={action.href} {...action} />
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-950">
            Recent Transactions
          </h2>
          <div className="mt-1.5 flex items-center gap-2">
            {isLoading ? (
              <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                <span className="spinner-dark" style={{ width: 14, height: 14 }} />
                {status}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="pulse-dot bg-emerald-500" style={{ width: 6, height: 6 }} />
                {status}
              </span>
            )}
          </div>
        </div>
        <TransactionTable
          transactions={transactions}
          enableSearch={false}
          showFilters={false}
          limit={5}
        />
      </section>
    </div>
  );
}
