import type { TransactionStatus } from "@/types";
import { getStatusBadgeStyle } from "@/lib/format";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

const dotColor: Record<TransactionStatus, string> = {
  SUCCESS: "bg-emerald-500",
  PENDING: "bg-amber-500",
  FAILED: "bg-rose-500",
};

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusBadgeStyle(status)}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColor[status]}`} />
      {status}
    </span>
  );
}
