import Link from "next/link";

type TopbarProps = {
  title: string;
  subtitle: string;
  userLabel: string;
  navItems: Array<{
    label: string;
    href: string;
  }>;
};

export function Topbar({ title, subtitle, userLabel, navItems }: TopbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-700">{subtitle}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            {userLabel}
          </div>
        </div>
      </div>
    </header>
  );
}
