import type { TransactionStatus, TransactionType } from "@/types";

export const APP_NAME = "CampusPay";

export const TRANSACTION_TYPE_FILTERS: Array<TransactionType | "ALL"> = [
  "ALL",
  "TOPUP",
  "PAYMENT",
  "TRANSFER",
];

export const TRANSACTION_STATUS_FILTERS: Array<TransactionStatus | "ALL"> = [
  "ALL",
  "SUCCESS",
  "PENDING",
  "FAILED",
];

export const STUDENT_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Top Up", href: "/dashboard/topup" },
  { label: "Bayar Merchant", href: "/dashboard/pay" },
  { label: "Riwayat Transaksi", href: "/dashboard/transactions" },
];

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard Admin", href: "/admin" },
  { label: "Transaksi", href: "/admin/transactions" },
  { label: "Audit Logs", href: "/admin/audit-logs" },
  { label: "Laporan", href: "/admin/reports" },
];
