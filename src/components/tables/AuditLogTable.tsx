import { formatDate } from "@/lib/format";
import type { AuditLog } from "@/types";

type AuditLogTableProps = {
  logs: AuditLog[];
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Action</th>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-indigo-700">
                  {log.action}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-700">
                  {log.user}
                </td>
                <td className="min-w-72 px-4 py-4 text-slate-600">
                  {log.description}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                  {formatDate(log.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
