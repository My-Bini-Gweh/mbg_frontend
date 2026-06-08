type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  accent?: string;
};

export function StatCard({ title, value, description, accent }: StatCardProps) {
  const accentColor = accent ?? "bg-indigo-500";

  // Map the accent bg-class to a soft, complementary gradient background and border color
  let cardBg = "bg-white border-slate-200/80";
  if (accentColor.includes("blue")) {
    cardBg = "bg-gradient-to-br from-white to-blue-50/20 border-blue-100/60 shadow-blue-500/5";
  } else if (accentColor.includes("violet") || accentColor.includes("indigo")) {
    cardBg = "bg-gradient-to-br from-white to-violet-50/25 border-violet-100/60 shadow-violet-500/5";
  } else if (accentColor.includes("emerald") || accentColor.includes("green")) {
    cardBg = "bg-gradient-to-br from-white to-emerald-50/20 border-emerald-100/50 shadow-emerald-500/5";
  } else if (accentColor.includes("amber") || accentColor.includes("yellow") || accentColor.includes("orange")) {
    cardBg = "bg-gradient-to-br from-white to-amber-50/25 border-amber-100/60 shadow-amber-500/5";
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${cardBg}`}>
      {/* Top accent bar */}
      <div className={`absolute left-0 top-0 h-1 w-full ${accentColor} opacity-80`} />
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
