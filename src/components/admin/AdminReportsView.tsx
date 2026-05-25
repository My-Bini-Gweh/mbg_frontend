"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReportTable } from "@/components/tables/ReportTable";
import { dailyReports as mockDailyReports } from "@/data/mock";
import { getDailyReports, getSession } from "@/lib/api";
import type { DailyReport } from "@/types";

export function AdminReportsView() {
  const router = useRouter();
  const [reports, setReports] = useState<DailyReport[]>(mockDailyReports);
  const [status, setStatus] = useState("Memuat laporan harian...");

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
          setStatus("Laporan harian dari backend.");
        }
      } catch (err) {
        if (active) {
          setStatus(
            err instanceof Error ? err.message : "Gagal memuat laporan harian",
          );
        }
      }
    }

    loadReports();

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Daily Transaction Report
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{status}</p>
      </div>
      <ReportTable reports={reports} />
    </div>
  );
}
