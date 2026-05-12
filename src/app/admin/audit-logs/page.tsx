import { AuditLogTable } from "@/components/tables/AuditLogTable";
import { auditLogs } from "@/data/mock";

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Audit Logs</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Jejak aksi penting untuk menunjukkan trigger, stored procedure, dan
          audit trail.
        </p>
      </div>
      <AuditLogTable logs={auditLogs} />
    </div>
  );
}
