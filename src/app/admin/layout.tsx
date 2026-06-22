import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { AdminGuard } from "@/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AdminGuard>
      <DashboardLayout
        navItems={ADMIN_NAV_ITEMS}
        title="Admin ITSPay"
        subtitle="Operations Console"
        userLabel="Administrator"
      >
        {children}
      </DashboardLayout>
    </AdminGuard>
  );
}
