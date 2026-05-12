import type { TransactionType } from "@/types";
import {
  getTransactionTypeBadgeStyle,
  getTransactionTypeLabel,
} from "@/lib/format";

type TransactionTypeBadgeProps = {
  type: TransactionType;
};

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getTransactionTypeBadgeStyle(type)}`}
    >
      {getTransactionTypeLabel(type)}
    </span>
  );
}
