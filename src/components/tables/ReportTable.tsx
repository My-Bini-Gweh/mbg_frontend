import { formatCurrency, formatReportDate } from "@/lib/format";
import type { DailyReport } from "@/types";

type ReportTableProps = {
  reports: DailyReport[];
};

export function ReportTable({ reports }: ReportTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Total Transactions</th>
              <th className="px-4 py-3 font-semibold">Total Amount</th>
              <th className="px-4 py-3 font-semibold">Total Topup</th>
              <th className="px-4 py-3 font-semibold">Total Payment</th>
              <th className="px-4 py-3 font-semibold">Total Transfer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.date} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-950">
                  {formatReportDate(report.date)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                  {report.totalTransactions}
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">
                  {formatCurrency(report.totalAmount)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                  {formatCurrency(report.totalTopup)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                  {formatCurrency(report.totalPayment)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                  {formatCurrency(report.totalTransfer)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
