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
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
        <BalanceCard
          balance={student.balance}
          campusPayId={student.campusPayId}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Nama Mahasiswa"
            value={student.name}
            description={student.nim}
          />
          <StatCard
            title="Transaksi Bulan Ini"
            value={`${student.monthlyTransactionCount}`}
            description="Transaksi aktif di akun ini."
          />
          <StatCard
            title="Status Akun"
            value={student.status}
            description="Siap digunakan untuk transaksi."
          />
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Akses cepat ke alur utama pembayaran kampus.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.href} {...action} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-950">
            Recent Transactions
          </h2>
          <p className="mt-1 text-sm text-slate-500">{status}</p>
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
