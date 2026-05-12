"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  brand: string;
  navItems: Array<{
    label: string;
    href: string;
  }>;
};

export function Sidebar({ brand, navItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-700 text-sm font-bold text-white">
          CP
        </div>
        <div>
          <p className="text-lg font-bold text-slate-950">{brand}</p>
          <p className="text-xs text-slate-500">Digital Campus Wallet</p>
        </div>
      </Link>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
