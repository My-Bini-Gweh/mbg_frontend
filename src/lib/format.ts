import type { TransactionStatus, TransactionType } from "@/types";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function formatReportDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getStatusBadgeStyle(status: TransactionStatus) {
  const styles: Record<TransactionStatus, string> = {
    SUCCESS: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
    FAILED: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return styles[status];
}

export function getTransactionTypeLabel(type: TransactionType) {
  const labels: Record<TransactionType, string> = {
    TOPUP: "Top Up",
    PAYMENT: "Pembayaran",
    TRANSFER: "Transfer",
  };

  return labels[type];
}

export function getTransactionTypeBadgeStyle(type: TransactionType) {
  const styles: Record<TransactionType, string> = {
    TOPUP: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    PAYMENT: "bg-sky-50 text-sky-700 ring-sky-200",
    TRANSFER: "bg-violet-50 text-violet-700 ring-violet-200",
  };

  return styles[type];
}
