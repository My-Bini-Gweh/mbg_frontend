import { ReportTable } from "@/components/tables/ReportTable";
import { dailyReports } from "@/data/mock";

export default function AdminReportsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Daily Transaction Report
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Mock view report dengan agregasi transaksi harian.
        </p>
      </div>
      <ReportTable reports={dailyReports} />
    </div>
  );
}
