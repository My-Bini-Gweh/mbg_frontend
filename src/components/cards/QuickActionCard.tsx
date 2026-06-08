import Link from "next/link";

type QuickActionCardProps = {
  title: string;
  description: string;
  href: string;
  marker: string;
};

function renderMarkerIcon(marker: string) {
  switch (marker) {
    case "TU":
      return (
        <svg className="size-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "PM":
      return (
        <svg className="size-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "RT":
      return (
        <svg className="size-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return <span className="text-xs font-bold">{marker}</span>;
  }
}

export function QuickActionCard({
  title,
  description,
  href,
  marker,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 ring-1 ring-indigo-100 transition group-hover:from-indigo-100 group-hover:to-violet-100 group-hover:shadow-sm">
          {renderMarkerIcon(marker)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-950 group-hover:text-indigo-700 transition">
            {title}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
        <span className="mt-0.5 text-slate-300 transition group-hover:text-indigo-500 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
