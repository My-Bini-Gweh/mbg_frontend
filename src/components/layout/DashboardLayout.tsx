import type { ReactNode } from "react";
import { APP_NAME } from "@/lib/constants";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
  navItems: Array<{
    label: string;
    href: string;
  }>;
  title: string;
  subtitle: string;
  userLabel: string;
};

export function DashboardLayout({
  children,
  navItems,
  title,
  subtitle,
  userLabel,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar brand={APP_NAME} navItems={navItems} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            title={title}
            subtitle={subtitle}
            userLabel={userLabel}
            navItems={navItems}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
