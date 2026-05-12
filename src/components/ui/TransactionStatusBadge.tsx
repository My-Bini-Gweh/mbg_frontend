import type { TransactionStatus } from "@/types";
import { getStatusBadgeStyle } from "@/lib/format";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusBadgeStyle(status)}`}
    >
      {status}
    </span>
  );
}
