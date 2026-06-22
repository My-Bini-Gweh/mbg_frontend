export type AdminEntityKey =
  | "mahasiswa"
  | "auth-records"
  | "wallets"
  | "banks"
  | "accounts"
  | "merchants"
  | "transactions"
  | "audit-logs"
  | "reports";

export type AdminColumn = {
  key: string;
  label: string;
  sort?: string;
  format?: "text" | "currency" | "datetime" | "date" | "boolean" | "badge" | "code";
  table?: boolean;
};

export type AdminField = {
  key: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox";
  required?: boolean;
  createOnly?: boolean;
  immutableOnEdit?: boolean;
  maxLength?: number;
  min?: number;
  step?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  relation?: {
    endpoint: string;
    valueKey: string;
    labelKeys: string[];
    valueType?: "number" | "string";
  };
};

export type AdminFilter = {
  key: string;
  label: string;
  options: Array<{ label: string; value: string }>;
};

export type AdminEntityDefinition = {
  endpoint: string;
  title: string;
  singular: string;
  description: string;
  idKey: string;
  searchPlaceholder: string;
  defaultSort: string;
  defaultOrder?: "asc" | "desc";
  columns: AdminColumn[];
  fields?: AdminField[];
  filters?: AdminFilter[];
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  readOnlyNote?: string;
};

const activeFilter = [
  { label: "Semua status", value: "" },
  { label: "Aktif", value: "true" },
  { label: "Nonaktif", value: "false" },
];

export const ADMIN_ENTITIES: Record<AdminEntityKey, AdminEntityDefinition> = {
  mahasiswa: {
    endpoint: "mahasiswa",
    title: "Mahasiswa",
    singular: "Mahasiswa",
    description: "Kelola akun, role, status, dan reset password pengguna.",
    idKey: "id_mahasiswa",
    searchPlaceholder: "Cari NRP, nama, atau email...",
    defaultSort: "created_at",
    columns: [
      { key: "id_mahasiswa", label: "ID", sort: "id" },
      { key: "nrp", label: "NRP", sort: "nrp" },
      { key: "nama_mahasiswa", label: "Nama", sort: "name" },
      { key: "email", label: "Email", sort: "email" },
      { key: "role", label: "Role", sort: "role", format: "badge" },
      { key: "status", label: "Status", sort: "status", format: "badge" },
      { key: "wallet_id", label: "Wallet" },
      { key: "wallet_balance", label: "Saldo", format: "currency", table: false },
      { key: "last_login_at", label: "Login terakhir", format: "datetime", table: false },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
      { key: "updated_at", label: "Diperbarui", format: "datetime", table: false },
    ],
    fields: [
      { key: "nrp", label: "NRP", type: "text", required: true, maxLength: 32 },
      { key: "nama_mahasiswa", label: "Nama mahasiswa", type: "text", required: true, maxLength: 120 },
      { key: "email", label: "Email", type: "email", required: true, maxLength: 120 },
      {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
          { label: "Mahasiswa", value: "mahasiswa" },
          { label: "Admin", value: "admin" },
        ],
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
          { label: "Suspended", value: "SUSPENDED" },
        ],
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        min: 6,
        placeholder: "Kosongkan saat edit jika tidak direset",
      },
    ],
    filters: [
      {
        key: "role",
        label: "Role",
        options: [
          { label: "Semua role", value: "" },
          { label: "Mahasiswa", value: "mahasiswa" },
          { label: "Admin", value: "admin" },
        ],
      },
      {
        key: "status",
        label: "Status",
        options: [
          { label: "Semua status", value: "" },
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
          { label: "Suspended", value: "SUSPENDED" },
        ],
      },
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },
  "auth-records": {
    endpoint: "auth-records",
    title: "Autentikasi Mahasiswa",
    singular: "Credential",
    description: "Isi tabel mahasiswa_auth beserta relasi pemilik credential.",
    idKey: "id_auth",
    searchPlaceholder: "Cari NRP, nama, email, atau nilai hash...",
    defaultSort: "created_at",
    columns: [
      { key: "id_auth", label: "ID Auth", sort: "id" },
      { key: "mahasiswa_id", label: "ID Mahasiswa" },
      { key: "mahasiswa_name", label: "Mahasiswa", sort: "student" },
      { key: "nrp", label: "NRP", sort: "nrp" },
      { key: "email", label: "Email", sort: "email" },
      { key: "password_hash", label: "Password Hash", format: "code" },
      { key: "pin_hash", label: "PIN Hash", format: "code" },
      { key: "last_login_at", label: "Login terakhir", sort: "last_login_at", format: "datetime" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
    ],
    readOnlyNote: "Password hash dan PIN hash ditampilkan utuh untuk kebutuhan demonstrasi. Halaman ini hanya tersedia untuk admin aktif dan bersifat read-only.",
  },
  wallets: {
    endpoint: "wallets",
    title: "Wallet",
    singular: "Wallet",
    description: "Pantau wallet dan saldo yang dimiliki setiap pengguna.",
    idKey: "id_wallet",
    searchPlaceholder: "Cari ID wallet, NRP, atau mahasiswa...",
    defaultSort: "created_at",
    columns: [
      { key: "id_wallet", label: "ID", sort: "id" },
      { key: "mahasiswa_name", label: "Mahasiswa", sort: "student" },
      { key: "nrp", label: "NRP" },
      { key: "jenis_wallet", label: "Jenis", sort: "type", format: "badge" },
      { key: "saldo", label: "Saldo", sort: "balance", format: "currency" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
      { key: "updated_at", label: "Diperbarui", format: "datetime", table: false },
    ],
    fields: [
      {
        key: "jenis_wallet",
        label: "Jenis wallet",
        type: "select",
        required: true,
        options: [
          { label: "Regular", value: "REGULAR" },
          { label: "Admin", value: "ADMIN" },
        ],
      },
    ],
    filters: [
      {
        key: "jenis_wallet",
        label: "Jenis wallet",
        options: [
          { label: "Semua jenis", value: "" },
          { label: "Regular", value: "REGULAR" },
          { label: "Admin", value: "ADMIN" },
        ],
      },
    ],
    canEdit: true,
    readOnlyNote: "Saldo bersifat read-only. Perubahan saldo harus melalui prosedur top-up atau pembayaran.",
  },
  banks: {
    endpoint: "banks",
    title: "Bank",
    singular: "Bank",
    description: "Kelola bank mitra dan biaya administrasinya.",
    idKey: "id_bank",
    searchPlaceholder: "Cari nama atau kode bank...",
    defaultSort: "created_at",
    columns: [
      { key: "id_bank", label: "ID", sort: "id" },
      { key: "nama_bank", label: "Nama", sort: "name" },
      { key: "kode_bank", label: "Kode", sort: "code" },
      { key: "biaya_admin", label: "Biaya admin", sort: "fee", format: "currency" },
      { key: "is_active", label: "Status", sort: "active", format: "boolean" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
    ],
    fields: [
      { key: "nama_bank", label: "Nama bank", type: "text", required: true, maxLength: 80 },
      { key: "kode_bank", label: "Kode bank", type: "text", required: true, maxLength: 20 },
      { key: "biaya_admin", label: "Biaya admin", type: "number", required: true, min: 0, step: "0.01" },
      { key: "is_active", label: "Bank aktif", type: "checkbox" },
    ],
    filters: [{ key: "is_active", label: "Status", options: activeFilter }],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },
  accounts: {
    endpoint: "accounts",
    title: "Rekening Mahasiswa",
    singular: "Rekening",
    description: "Kelola rekening bank yang ditautkan ke mahasiswa.",
    idKey: "id_rekening",
    searchPlaceholder: "Cari rekening, pemilik, bank, atau mahasiswa...",
    defaultSort: "created_at",
    columns: [
      { key: "id_rekening", label: "ID", sort: "id" },
      { key: "mahasiswa_name", label: "Mahasiswa", sort: "student" },
      { key: "nrp", label: "NRP" },
      { key: "bank_name", label: "Bank", sort: "bank" },
      { key: "no_rekening", label: "No. rekening", sort: "account_number" },
      { key: "nama_pemilik", label: "Pemilik", sort: "owner" },
      { key: "is_active", label: "Status", sort: "active", format: "boolean" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime", table: false },
    ],
    fields: [
      {
        key: "mahasiswa_id",
        label: "Mahasiswa",
        type: "select",
        required: true,
        relation: { endpoint: "mahasiswa", valueKey: "id_mahasiswa", labelKeys: ["nrp", "nama_mahasiswa"], valueType: "number" },
      },
      {
        key: "bank_id_bank",
        label: "Bank",
        type: "select",
        required: true,
        relation: { endpoint: "banks", valueKey: "id_bank", labelKeys: ["kode_bank", "nama_bank"], valueType: "number" },
      },
      { key: "no_rekening", label: "Nomor rekening", type: "text", required: true, maxLength: 40 },
      { key: "nama_pemilik", label: "Nama pemilik", type: "text", required: true, maxLength: 120 },
      { key: "is_active", label: "Rekening aktif", type: "checkbox" },
    ],
    filters: [{ key: "is_active", label: "Status", options: activeFilter }],
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },
  merchants: {
    endpoint: "merchants",
    title: "Merchant",
    singular: "Merchant",
    description: "Kelola merchant kampus dan status operasionalnya.",
    idKey: "id_merchant",
    searchPlaceholder: "Cari ID, nama, atau kategori merchant...",
    defaultSort: "created_at",
    columns: [
      { key: "id_merchant", label: "ID", sort: "id" },
      { key: "nama_merchant", label: "Nama", sort: "name" },
      { key: "kategori", label: "Kategori", sort: "category" },
      { key: "saldo_merchant", label: "Saldo", sort: "balance", format: "currency" },
      { key: "status", label: "Status", sort: "status", format: "badge" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
      { key: "updated_at", label: "Diperbarui", format: "datetime", table: false },
    ],
    fields: [
      { key: "id_merchant", label: "ID merchant", type: "text", required: true, maxLength: 20, immutableOnEdit: true },
      { key: "nama_merchant", label: "Nama merchant", type: "text", required: true, maxLength: 120 },
      { key: "kategori", label: "Kategori", type: "text", required: true, maxLength: 80 },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
        ],
      },
    ],
    filters: [
      {
        key: "status",
        label: "Status",
        options: [
          { label: "Semua status", value: "" },
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
        ],
      },
    ],
    canCreate: true,
    canEdit: true,
    canDelete: true,
    readOnlyNote: "Saldo merchant hanya berubah melalui pembayaran yang sukses.",
  },
  transactions: {
    endpoint: "transactions",
    title: "Transaksi",
    singular: "Transaksi",
    description: "Pantau seluruh top-up dan pembayaran beserta relasinya.",
    idKey: "id_transaksi",
    searchPlaceholder: "Cari kode, wallet, bank, merchant, atau mahasiswa...",
    defaultSort: "date",
    columns: [
      { key: "kode_transaksi", label: "Kode", sort: "code" },
      { key: "jenis_transaksi", label: "Jenis", sort: "type", format: "badge" },
      { key: "mahasiswa_name", label: "Mahasiswa", sort: "student" },
      { key: "nominal", label: "Nominal", sort: "amount", format: "currency" },
      { key: "status", label: "Status", sort: "status", format: "badge" },
      { key: "waktu", label: "Waktu", sort: "date", format: "datetime" },
      { key: "wallet_id_wallet", label: "Wallet", table: false },
      { key: "nrp", label: "NRP", table: false },
      { key: "bank_name", label: "Bank", table: false },
      { key: "merchant_name", label: "Merchant", table: false },
      { key: "keterangan", label: "Keterangan", table: false },
    ],
    filters: [
      {
        key: "type",
        label: "Jenis",
        options: [
          { label: "Semua jenis", value: "" },
          { label: "Top-up", value: "TOPUP" },
          { label: "Payment", value: "PAYMENT" },
        ],
      },
      {
        key: "status",
        label: "Status",
        options: [
          { label: "Semua status", value: "" },
          { label: "Success", value: "SUCCESS" },
          { label: "Pending", value: "PENDING" },
          { label: "Failed", value: "FAILED" },
        ],
      },
    ],
    readOnlyNote: "Transaksi bersifat immutable agar saldo dan audit trail tetap konsisten.",
  },
  "audit-logs": {
    endpoint: "audit-logs",
    title: "Audit Logs",
    singular: "Audit log",
    description: "Jejak perubahan transaksi yang dibuat otomatis oleh database.",
    idKey: "id_audit",
    searchPlaceholder: "Cari action, deskripsi, atau kode transaksi...",
    defaultSort: "created_at",
    columns: [
      { key: "id_audit", label: "ID", sort: "id" },
      { key: "action", label: "Action", sort: "action", format: "badge" },
      { key: "transaction_code", label: "Transaksi", sort: "transaction" },
      { key: "description", label: "Deskripsi" },
      { key: "created_at", label: "Dibuat", sort: "created_at", format: "datetime" },
    ],
    readOnlyNote: "Audit log dibuat oleh trigger dan tidak dapat diedit atau dihapus dari admin panel.",
  },
  reports: {
    endpoint: "reports/daily",
    title: "Laporan Harian",
    singular: "Laporan",
    description: "Agregasi transaksi harian dari database view.",
    idKey: "tanggal",
    searchPlaceholder: "Cari tanggal (YYYY-MM-DD)...",
    defaultSort: "date",
    columns: [
      { key: "tanggal", label: "Tanggal", sort: "date", format: "date" },
      { key: "total_transaksi", label: "Transaksi", sort: "transactions" },
      { key: "total_transaksi_success", label: "Sukses" },
      { key: "total_nominal", label: "Total nominal", sort: "amount", format: "currency" },
      { key: "total_topup", label: "Top-up", sort: "topup", format: "currency" },
      { key: "total_payment", label: "Payment", sort: "payment", format: "currency" },
    ],
    readOnlyNote: "Laporan dihitung dari database view dan bersifat read-only.",
  },
};
