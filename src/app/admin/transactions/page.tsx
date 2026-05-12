import { TransactionTable } from "@/components/tables/TransactionTable";
import { transactions } from "@/data/mock";

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Semua Transaksi</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Monitor seluruh transaksi mock dengan filter type dan status.
        </p>
      </div>
      <TransactionTable transactions={transactions} enableSearch={false} />
    </div>
  );
}
