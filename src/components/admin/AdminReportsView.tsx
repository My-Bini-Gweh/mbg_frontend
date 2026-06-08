"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReportTable } from "@/components/tables/ReportTable";
import { getDailyReports, getSession } from "@/lib/api";
import type { DailyReport } from "@/types";

export function AdminReportsView() {
  const router = useRouter();
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [status, setStatus] = useState("Memuat laporan harian...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadReports() {
      const session = getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      try {
        const rows = await getDailyReports(session.token);
        if (active) {
          setReports(rows);
          setStatus("Laporan harian tersinkron dari server.");
        }
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat laporan harian",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Daily Transaction Report
        </h2>
        <div className="mt-1.5">
          {isLoading ? (
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <span className="spinner-dark" style={{ width: 14, height: 14 }} />
              {status}
            </span>
          ) : (
            <p className="text-sm leading-6 text-slate-500">{status}</p>
          )}
        </div>
      </div>
      <ReportTable reports={reports} />
    </div>
  );
}
