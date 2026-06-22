"use client";

import type { ReactNode } from "react";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/api";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const authState = useSyncExternalStore(
    subscribeToSession,
    readClientAuthState,
    readServerAuthState,
  );

  useEffect(() => {
    if (authState === "missing") {
      router.replace("/login");
    } else if (authState === "forbidden") {
      router.replace("/dashboard");
    }
  }, [authState, router]);

  if (authState !== "authorized") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-semibold text-slate-300">
        <span className="spinner mr-3" /> Memverifikasi akses admin...
      </div>
    );
  }

  return children;
}

function subscribeToSession() {
  return () => undefined;
}

function readClientAuthState() {
  const session = getSession();
  if (!session) return "missing" as const;
  return session.mahasiswa.role === "admin"
    ? ("authorized" as const)
    : ("forbidden" as const);
}

function readServerAuthState() {
  return "loading" as const;
}
