import { TransactionTable } from "@/components/tables/TransactionTable";
import { transactions } from "@/data/mock";

export default function TransactionsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Riwayat Transaksi
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Cari berdasarkan kode transaksi dan filter berdasarkan tipe atau
          status.
        </p>
      </div>
      <TransactionTable
        transactions={transactions}
        detailBasePath="/dashboard/transactions"
      />
    </div>
  );
}
