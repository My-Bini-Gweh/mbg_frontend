import { formatCurrency } from "@/lib/format";

type BalanceCardProps = {
  balance: number;
  campusPayId: string;
};

export function BalanceCard({ balance, campusPayId }: BalanceCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 p-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-100">Saldo CampusPay</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">
            {formatCurrency(balance)}
          </p>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
          ACTIVE
        </span>
      </div>
      <div className="mt-8 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
          CampusPay ID
        </p>
        <p className="mt-2 text-lg font-semibold">{campusPayId}</p>
      </div>
    </div>
  );
}
