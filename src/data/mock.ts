import type {
  AdminSummary,
  AuditLog,
  Bank,
  DailyReport,
  LandingFeature,
  Merchant,
  Recipient,
  StudentProfile,
  Transaction,
} from "@/types";

export const studentProfile: StudentProfile = {
  name: "Alya Putri",
  nim: "235150700111001",
  campusPayId: "MHS-0001",
  balance: 1250000,
  monthlyTransactionCount: 18,
  status: "ACTIVE",
};

export const landingFeatures: LandingFeature[] = [
  {
    title: "Top Up",
    description: "Simulasi penambahan saldo dari bank dengan status transaksi.",
  },
  {
    title: "Bayar Merchant",
    description: "Demo pembayaran ke kantin, koperasi, parkir, dan event kampus.",
  },
  {
    title: "Transfer",
    description: "Kirim saldo antar mahasiswa dengan pencatatan mutasi.",
  },
  {
    title: "Riwayat Transaksi",
    description: "Cari dan filter transaksi berdasarkan kode, tipe, dan status.",
  },
  {
    title: "Audit Log",
    description: "Tampilkan jejak aksi penting untuk kebutuhan pengawasan database.",
  },
  {
    title: "Laporan Admin",
    description: "Ringkasan harian dari mock view report transaksi.",
  },
];

export const banks: Bank[] = [
  { id: "bni", name: "BNI" },
  { id: "bri", name: "BRI" },
  { id: "mandiri", name: "Mandiri" },
  { id: "bca", name: "BCA" },
  { id: "btn", name: "BTN" },
  { id: "bsi", name: "BSI" },
];

export const merchants: Merchant[] = [
  { id: "kantin-teknik", name: "Kantin Teknik", category: "Makanan & Minuman" },
  { id: "fotokopi-kampus", name: "Fotokopi Kampus", category: "Percetakan" },
  { id: "parkir-kampus", name: "Parkir Kampus", category: "Transportasi" },
  { id: "koperasi-mahasiswa", name: "Koperasi Mahasiswa", category: "Retail" },
  { id: "event-kampus", name: "Event Kampus", category: "Acara" },
];

export const recipients: Recipient[] = [
  { id: "mhs-0002", campusPayId: "MHS-0002", name: "Budi" },
  { id: "mhs-0003", campusPayId: "MHS-0003", name: "Sinta" },
  { id: "mhs-0004", campusPayId: "MHS-0004", name: "Andi" },
];

export const transactions: Transaction[] = [
  {
    id: "trx-001",
    code: "CP-20260512-001",
    type: "TOPUP",
    amount: 500000,
    status: "SUCCESS",
    date: "2026-05-12T08:15:00+07:00",
    sender: "BNI",
    receiver: "MHS-0001 - Alya Putri",
    note: "Top up saldo dari mobile banking.",
  },
  {
    id: "trx-002",
    code: "CP-20260512-002",
    type: "PAYMENT",
    amount: 25000,
    status: "SUCCESS",
    date: "2026-05-12T09:20:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "Kantin Teknik",
    note: "Makan siang.",
  },
  {
    id: "trx-003",
    code: "CP-20260511-014",
    type: "TRANSFER",
    amount: 75000,
    status: "SUCCESS",
    date: "2026-05-11T15:45:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "MHS-0002 - Budi",
    note: "Patungan tugas kelompok.",
  },
  {
    id: "trx-004",
    code: "CP-20260510-020",
    type: "PAYMENT",
    amount: 12000,
    status: "FAILED",
    date: "2026-05-10T11:05:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "Fotokopi Kampus",
    note: "Saldo tidak cukup saat transaksi dicoba.",
  },
  {
    id: "trx-005",
    code: "CP-20260509-012",
    type: "TOPUP",
    amount: 250000,
    status: "PENDING",
    date: "2026-05-09T19:30:00+07:00",
    sender: "Mandiri",
    receiver: "MHS-0001 - Alya Putri",
    note: "Menunggu konfirmasi bank.",
  },
  {
    id: "trx-006",
    code: "CP-20260508-018",
    type: "PAYMENT",
    amount: 5000,
    status: "SUCCESS",
    date: "2026-05-08T07:40:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "Parkir Kampus",
    note: "Parkir motor.",
  },
  {
    id: "trx-007",
    code: "CP-20260507-008",
    type: "TRANSFER",
    amount: 100000,
    status: "PENDING",
    date: "2026-05-07T17:10:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "MHS-0003 - Sinta",
    note: "Menunggu validasi transaksi.",
  },
  {
    id: "trx-008",
    code: "CP-20260506-006",
    type: "PAYMENT",
    amount: 45000,
    status: "SUCCESS",
    date: "2026-05-06T13:25:00+07:00",
    sender: "MHS-0001 - Alya Putri",
    receiver: "Event Kampus",
    note: "Tiket seminar.",
  },
];

export const adminSummary: AdminSummary = {
  totalUsers: 1280,
  totalMerchants: merchants.length,
  totalTransactions: 8420,
  totalSuccessfulAmount: 186750000,
};

export const auditLogs: AuditLog[] = [
  {
    id: "audit-001",
    action: "REGISTER_USER",
    user: "MHS-0005 - Raka",
    description: "User mahasiswa baru berhasil didaftarkan.",
    createdAt: "2026-05-12T08:05:00+07:00",
  },
  {
    id: "audit-002",
    action: "TOPUP_SUCCESS",
    user: "MHS-0001 - Alya Putri",
    description: "Stored procedure top up menambah saldo dan membuat transaksi.",
    createdAt: "2026-05-12T08:15:02+07:00",
  },
  {
    id: "audit-003",
    action: "PAYMENT_SUCCESS",
    user: "MHS-0001 - Alya Putri",
    description: "Trigger mengurangi saldo mahasiswa dan menambah pendapatan merchant.",
    createdAt: "2026-05-12T09:20:04+07:00",
  },
  {
    id: "audit-004",
    action: "PAYMENT_FAILED",
    user: "MHS-0001 - Alya Putri",
    description: "Transaksi pembayaran gagal karena saldo tidak mencukupi.",
    createdAt: "2026-05-10T11:05:01+07:00",
  },
  {
    id: "audit-005",
    action: "TRANSFER_SUCCESS",
    user: "MHS-0001 - Alya Putri",
    description: "Transaction database memindahkan saldo antar akun mahasiswa.",
    createdAt: "2026-05-11T15:45:03+07:00",
  },
];

export const dailyReports: DailyReport[] = [
  {
    date: "2026-05-12",
    totalTransactions: 112,
    totalAmount: 8750000,
    totalTopup: 5400000,
    totalPayment: 2550000,
    totalTransfer: 800000,
  },
  {
    date: "2026-05-11",
    totalTransactions: 98,
    totalAmount: 6925000,
    totalTopup: 4000000,
    totalPayment: 1925000,
    totalTransfer: 1000000,
  },
  {
    date: "2026-05-10",
    totalTransactions: 121,
    totalAmount: 9340000,
    totalTopup: 6100000,
    totalPayment: 2240000,
    totalTransfer: 1000000,
  },
  {
    date: "2026-05-09",
    totalTransactions: 76,
    totalAmount: 4810000,
    totalTopup: 2850000,
    totalPayment: 1460000,
    totalTransfer: 500000,
  },
];
