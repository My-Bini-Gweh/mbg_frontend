"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSession } from "@/lib/api";

type TopbarProps = {
  title: string;
  subtitle: string;
  userLabel: string;
  navItems: Array<{
    label: string;
    href: string;
  }>;
};

export function Topbar({ title, subtitle, userLabel, navItems }: TopbarProps) {
  const router = useRouter();
  const [activeUser] = useState(() => {
    const session = getSession();
    if (!session) {
      return userLabel;
    }

    return `${session.mahasiswa.nama_mahasiswa} / ${
      session.mahasiswa.role ?? "mahasiswa"
    }`;
  });

  function handleLogout() {
    clearSession();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-700">{subtitle}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            {activeUser}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
