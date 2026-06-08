import { formatCurrency, formatReportDate } from "@/lib/format";
import type { DailyReport } from "@/types";

type ReportTableProps = {
  reports: DailyReport[];
};

export function ReportTable({ reports }: ReportTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-gradient-to-r from-slate-100/80 via-slate-50/90 to-indigo-50/40 text-xs uppercase text-indigo-950/80">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Date</th>
              <th className="px-5 py-3.5 font-semibold">Total Transactions</th>
              <th className="px-5 py-3.5 font-semibold">Total Amount</th>
              <th className="px-5 py-3.5 font-semibold">Total Topup</th>
              <th className="px-5 py-3.5 font-semibold">Total Payment</th>
              <th className="px-5 py-3.5 font-semibold">Successful Tx</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.date} className="group transition hover:bg-indigo-50/30">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-950">
                  {formatReportDate(report.date)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {report.totalTransactions}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                  {formatCurrency(report.totalAmount)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {formatCurrency(report.totalTopup)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {formatCurrency(report.totalPayment)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {report.totalSuccessfulTransactions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <svg className="size-12 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
          <p className="text-sm font-semibold text-slate-600">
            Belum ada laporan
          </p>
          <p className="text-sm text-slate-400">
            Laporan harian akan muncul setelah ada transaksi.
          </p>
        </div>
      ) : null}
    </div>
  );
}
