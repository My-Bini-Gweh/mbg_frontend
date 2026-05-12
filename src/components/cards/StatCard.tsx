type StatCardProps = {
  title: string;
  value: string;
  description?: string;
};

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
