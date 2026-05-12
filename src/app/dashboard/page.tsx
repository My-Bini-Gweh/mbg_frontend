import { BalanceCard } from "@/components/cards/BalanceCard";
import { QuickActionCard } from "@/components/cards/QuickActionCard";
import { StatCard } from "@/components/cards/StatCard";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { studentProfile, transactions } from "@/data/mock";

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
    title: "Transfer",
    description: "Kirim saldo ke akun mahasiswa lain.",
    href: "/dashboard/transfer",
    marker: "TF",
  },
  {
    title: "Riwayat Transaksi",
    description: "Cek detail dan status transaksi CampusPay.",
    href: "/dashboard/transactions",
    marker: "RT",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
        <BalanceCard
          balance={studentProfile.balance}
          campusPayId={studentProfile.campusPayId}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Nama Mahasiswa"
            value={studentProfile.name}
            description={studentProfile.nim}
          />
          <StatCard
            title="Transaksi Bulan Ini"
            value={`${studentProfile.monthlyTransactionCount}`}
            description="Mock agregasi transaksi mahasiswa."
          />
          <StatCard
            title="Status Akun"
            value={studentProfile.status}
            description="Siap digunakan untuk demo transaksi."
          />
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Akses cepat ke alur utama CampusPay.
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
          <p className="mt-1 text-sm text-slate-500">
            Data terbaru dari mock transaksi mahasiswa.
          </p>
        </div>
        <TransactionTable
          transactions={transactions}
          detailBasePath="/dashboard/transactions"
          enableSearch={false}
          showFilters={false}
          limit={5}
        />
      </section>
    </div>
  );
}
