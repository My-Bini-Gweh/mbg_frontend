import type { TransactionStatus, TransactionType } from "@/types";

export const APP_NAME = "CampusPay";

export const TRANSACTION_TYPE_FILTERS: Array<TransactionType | "ALL"> = [
  "ALL",
  "TOPUP",
  "PAYMENT",
];

export const TRANSACTION_STATUS_FILTERS: Array<TransactionStatus | "ALL"> = [
  "ALL",
  "SUCCESS",
  "PENDING",
  "FAILED",
];

export const STUDENT_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Top Up", href: "/dashboard/topup", icon: "topup" },
  { label: "Bayar Merchant", href: "/dashboard/pay", icon: "pay" },
  { label: "Riwayat Transaksi", href: "/dashboard/transactions", icon: "transactions" },
];

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard Admin", href: "/admin", icon: "admin" },
  { label: "Transaksi", href: "/admin/transactions", icon: "transactions" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: "audit-logs" },
  { label: "Laporan", href: "/admin/reports", icon: "reports" },
];
