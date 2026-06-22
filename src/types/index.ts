export type TransactionType = "TOPUP" | "PAYMENT";

export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

export type AuditAction = string;

export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type StudentProfile = {
  name: string;
  nim: string;
  campusPayId: string;
  balance: number;
  monthlyTransactionCount: number;
  status: AccountStatus;
};

export type Bank = {
  id: string;
  name: string;
};

export type Merchant = {
  id: string;
  name: string;
  category: string;
};

export type Recipient = {
  id: string;
  campusPayId: string;
  name: string;
};

export type Transaction = {
  id: string;
  code: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  sender: string;
  receiver: string;
  note?: string;
};

export type AuditLog = {
  id: string;
  action: AuditAction;
  user: string;
  description: string;
  createdAt: string;
};

export type DailyReport = {
  date: string;
  totalTransactions: number;
  totalAmount: number;
  totalTopup: number;
  totalPayment: number;
  totalSuccessfulTransactions: number;
};

export type AdminSummary = {
  totalUsers: number;
  totalMerchants: number;
  totalTransactions: number;
  totalSuccessfulAmount: number;
};

export type AdminRecord = Record<string, unknown>;

export type AdminPagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type AdminPage<T = AdminRecord> = {
  items: T[];
  pagination: AdminPagination;
};

export type LandingFeature = {
  title: string;
  description: string;
};
