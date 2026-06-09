import { formatCurrency } from "@/lib/format";

type BalanceCardProps = {
  balance: number;
  campusPayId: string;
};

export function BalanceCard({ balance, campusPayId }: BalanceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-violet-700 to-indigo-800 p-6 text-white shadow-lg">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-indigo-200">Saldo ITSPay</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">
            {formatCurrency(balance)}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
          <span className="pulse-dot bg-emerald-400" />
          ACTIVE
        </span>
      </div>
      <div className="relative mt-8 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">
          ITSPay ID
        </p>
        <p className="mt-2 text-lg font-semibold tracking-wide">{campusPayId}</p>
      </div>
    </div>
  );
}
