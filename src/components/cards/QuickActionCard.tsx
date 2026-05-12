import Link from "next/link";

type QuickActionCardProps = {
  title: string;
  description: string;
  href: string;
  marker: string;
};

export function QuickActionCard({
  title,
  description,
  href,
  marker,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-bold text-indigo-700 ring-1 ring-indigo-100">
          {marker}
        </div>
        <div>
          <p className="font-semibold text-slate-950 group-hover:text-indigo-700">
            {title}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
