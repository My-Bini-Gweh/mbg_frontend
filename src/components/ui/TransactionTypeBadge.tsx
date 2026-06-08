import type { TransactionType } from "@/types";
import {
  getTransactionTypeBadgeStyle,
  getTransactionTypeLabel,
} from "@/lib/format";

type TransactionTypeBadgeProps = {
  type: TransactionType;
};

const dotColor: Record<TransactionType, string> = {
  TOPUP: "bg-indigo-500",
  PAYMENT: "bg-sky-500",
};

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getTransactionTypeBadgeStyle(type)}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColor[type]}`} />
      {getTransactionTypeLabel(type)}
    </span>
  );
}
