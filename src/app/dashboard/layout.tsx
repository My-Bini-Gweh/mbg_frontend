import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { STUDENT_NAV_ITEMS } from "@/lib/constants";

export default function StudentDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <DashboardLayout
      navItems={STUDENT_NAV_ITEMS}
      title="Dashboard Mahasiswa"
      subtitle="CampusPay Student"
      userLabel="Mahasiswa"
    >
      {children}
    </DashboardLayout>
  );
}
