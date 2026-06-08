import { formatDate } from "@/lib/format";
import type { AuditLog } from "@/types";

type AuditLogTableProps = {
  logs: AuditLog[];
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-gradient-to-r from-slate-100/80 via-slate-50/90 to-indigo-50/40 text-xs uppercase text-indigo-950/80">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Action</th>
              <th className="px-5 py-3.5 font-semibold">User</th>
              <th className="px-5 py-3.5 font-semibold">Description</th>
              <th className="px-5 py-3.5 font-semibold">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id} className="group transition hover:bg-indigo-50/30">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-indigo-600">
                  {log.action}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                  {log.user}
                </td>
                <td className="min-w-72 px-5 py-4 text-slate-600">
                  {log.description}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {formatDate(log.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <svg className="size-12 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm font-semibold text-slate-600">
            Belum ada audit log
          </p>
          <p className="text-sm text-slate-400">
            Audit log akan muncul setelah ada aktivitas transaksi.
          </p>
        </div>
      ) : null}
    </div>
  );
}
