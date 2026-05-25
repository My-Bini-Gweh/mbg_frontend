"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditLogTable } from "@/components/tables/AuditLogTable";
import { getAuditLogs, getSession } from "@/lib/api";
import type { AuditLog } from "@/types";

export function AdminAuditLogsView() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [status, setStatus] = useState("Memuat audit logs...");

  useEffect(() => {
    let active = true;

    async function loadLogs() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const rows = await getAuditLogs(session.token);
        if (active) {
          setLogs(rows);
          setStatus("Audit logs tersinkron dari server.");
        }
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat audit logs",
          );
        }
      }
    }

    loadLogs();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Audit Logs</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{status}</p>
      </div>
      <AuditLogTable logs={logs} />
    </div>
  );
}
