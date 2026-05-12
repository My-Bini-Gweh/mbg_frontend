import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <DashboardLayout
      navItems={ADMIN_NAV_ITEMS}
      title="Admin CampusPay"
      subtitle="Database Monitoring"
      userLabel="Admin Demo"
    >
      {children}
    </DashboardLayout>
  );
}
