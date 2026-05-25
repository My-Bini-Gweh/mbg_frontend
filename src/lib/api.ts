import type {
  AccountStatus,
  AuditLog,
  DailyReport,
  Merchant,
  StudentProfile,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
const SESSION_KEY = "itspay_session";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  token?: string;
};

export type BackendMahasiswa = {
  id_mahasiswa: number;
  nrp: string;
  nama_mahasiswa: string;
  email: string;
  role?: "mahasiswa" | "admin";
  status?: AccountStatus;
  created_at?: string;
};

type BackendWallet = {
  id_wallet: string;
  mahasiswa_id: number;
  jenis_wallet: string;
  saldo: string;
};

type BackendBank = {
  id_bank: number;
  nama_bank: string;
  kode_bank: string;
  biaya_admin: string;
  is_active: boolean;
};

type BackendMerchant = {
  id_merchant: string;
  nama_merchant: string;
  kategori: string;
  saldo_merchant?: string;
  status: string;
};

type BackendTransaction = {
  id_transaksi: number;
  kode_transaksi: string;
  jenis_transaksi: "TOPUP" | "PAYMENT";
  nominal: string;
  status: TransactionStatus;
  waktu: string;
  bank_id_bank?: number | null;
  merchant_id?: string;
  wallet_id_wallet: string;
  keterangan?: string;
  bank_name?: string;
  merchant_name?: string;
};

type BackendAuditLog = {
  id_audit: number;
  transaksi_id?: number | null;
  action: string;
  description: string;
  created_at: string;
};

type BackendDailyReport = {
  tanggal: string;
  total_transaksi: number;
  total_nominal: string;
  total_topup: string;
  total_payment: string;
  total_transaksi_success: number;
};

export type AuthSession = {
  token: string;
  mahasiswa: BackendMahasiswa;
};

async function request<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const body = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | null;

  if (!response.ok || !body?.success) {
    throw new Error(body?.message ?? "Request ke backend gagal");
  }

  return body.data;
}

export function getSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export async function login(email: string, password: string) {
  return request<AuthSession>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(input: {
  nrp: string;
  nama_mahasiswa: string;
  email: string;
  password: string;
}) {
  return request<AuthSession>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getProfile(token: string) {
  return request<BackendMahasiswa>("/api/mahasiswa/profile", { token });
}

export async function getWallet(token: string) {
  return request<BackendWallet>("/api/mahasiswa/wallet", { token });
}

export async function getTransactions(token: string) {
  const rows = await request<BackendTransaction[]>(
    "/api/mahasiswa/transactions",
    { token },
  );
  return rows.map(mapTransaction);
}

export async function getAdminTransactions(token: string) {
  const rows = await request<BackendTransaction[]>("/api/admin/transactions", {
    token,
  });
  return rows.map(mapTransaction);
}

export async function getAuditLogs(token: string) {
  const rows = await request<BackendAuditLog[]>("/api/admin/audit-logs", {
    token,
  });
  return rows.map(mapAuditLog);
}

export async function getDailyReports(token: string) {
  const rows = await request<BackendDailyReport[]>("/api/admin/reports/daily", {
    token,
  });
  return rows.map(mapDailyReport);
}

export async function getBanks() {
  const rows = await request<BackendBank[]>("/api/banks");
  return rows.map((bank) => ({
    id: String(bank.id_bank),
    name: bank.nama_bank,
  }));
}

export async function getMerchants() {
  const rows = await request<BackendMerchant[]>("/api/merchants");
  return rows.map((merchant) => ({
    id: merchant.id_merchant,
    name: merchant.nama_merchant,
    category: merchant.kategori,
  }));
}

export async function createTopup(
  token: string,
  input: { wallet_id: string; bank_id: number; nominal: number },
) {
  const result = await request<{ wallet: BackendWallet }>("/api/topups", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
  return result.wallet;
}

export async function createPayment(
  token: string,
  input: { wallet_id: string; merchant_id: string; nominal: number },
) {
  const result = await request<{ wallet: BackendWallet }>("/api/payments", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
  return result.wallet;
}

export function mapStudentProfile(
  mahasiswa: BackendMahasiswa,
  wallet?: BackendWallet | null,
  transactionCount = 0,
): StudentProfile {
  return {
    name: mahasiswa.nama_mahasiswa,
    nim: mahasiswa.nrp,
    campusPayId: wallet?.id_wallet ?? `MHS-${padId(mahasiswa.id_mahasiswa)}`,
    balance: Number(wallet?.saldo ?? 0),
    monthlyTransactionCount: transactionCount,
    status: mahasiswa.status ?? "ACTIVE",
  };
}

export function mapAdminSummary(
  transactions: Transaction[],
  merchants: Merchant[],
) {
  return {
    totalUsers: 0,
    totalMerchants: merchants.length,
    totalTransactions: transactions.length,
    totalSuccessfulAmount: transactions
      .filter((transaction) => transaction.status === "SUCCESS")
      .reduce((total, transaction) => total + transaction.amount, 0),
  };
}

function mapTransaction(row: BackendTransaction): Transaction {
  const type = row.jenis_transaksi as TransactionType;
  const isTopup = type === "TOPUP";

  return {
    id: String(row.id_transaksi),
    code: row.kode_transaksi,
    type,
    amount: Number(row.nominal),
    status: row.status,
    date: row.waktu,
    sender: isTopup
      ? row.bank_name || formatBankLabel(row.bank_id_bank)
      : row.wallet_id_wallet,
    receiver: isTopup
      ? row.wallet_id_wallet
      : row.merchant_name || row.merchant_id || "Merchant",
    note: row.keterangan,
  };
}

function mapAuditLog(row: BackendAuditLog): AuditLog {
  return {
    id: String(row.id_audit),
    action: row.action,
    user: row.transaksi_id ? `Transaksi #${row.transaksi_id}` : "System",
    description: row.description,
    createdAt: row.created_at,
  };
}

function mapDailyReport(row: BackendDailyReport): DailyReport {
  return {
    date: row.tanggal,
    totalTransactions: row.total_transaksi,
    totalAmount: Number(row.total_nominal),
    totalTopup: Number(row.total_topup),
    totalPayment: Number(row.total_payment),
    totalTransfer: 0,
  };
}

function formatBankLabel(id?: number | null) {
  return id ? `Bank #${id}` : "Bank";
}

function padId(id: number) {
  return String(id).padStart(4, "0");
}
