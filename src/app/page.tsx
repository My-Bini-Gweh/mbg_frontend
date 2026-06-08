import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const landingFeatures = [
  {
    icon: "wallet",
    title: "Wallet Mahasiswa",
    description:
      "Kelola saldo, status akun, dan riwayat transaksi setiap mahasiswa dalam satu dashboard.",
  },
  {
    icon: "check",
    title: "Top Up Terverifikasi",
    description:
      "Top up saldo diproses melalui stored procedure dengan validasi bank aktif dan audit log.",
  },
  {
    icon: "merchant",
    title: "Pembayaran Merchant",
    description:
      "Pembayaran ke merchant kampus memakai transaksi database dan penguncian saldo yang konsisten.",
  },
  {
    icon: "audit",
    title: "Audit Operasional",
    description:
      "Setiap perubahan finansial tercatat otomatis untuk kebutuhan rekonsiliasi dan pengawasan.",
  },
  {
    icon: "report",
    title: "Laporan Harian",
    description:
      "Admin memantau agregasi transaksi harian langsung dari view database.",
  },
  {
    icon: "lock",
    title: "Kontrol Akses",
    description:
      "Hak akses mahasiswa dan admin dipisahkan dengan JWT dan role-based middleware.",
  },
];

function renderFeatureIcon(icon: string) {
  switch (icon) {
    case "wallet":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "check":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "merchant":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "audit":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    case "report":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      );
    case "lock":
      return (
        <svg className="size-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-page-gradient text-slate-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md transition group-hover:shadow-lg group-hover:scale-105">
              <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold">{APP_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-110"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-60 blur-3xl" />
          <div className="absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-100 to-blue-100 opacity-50 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center animate-slide-up">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              <span className="inline-block h-px w-8 bg-indigo-600" />
              Digital Campus Wallet
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              {APP_NAME} menyatukan{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                pembayaran digital
              </span>{" "}
              kampus dalam satu sistem.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Mahasiswa dapat mengelola saldo dan pembayaran merchant, sementara
              admin memantau transaksi, audit log, dan laporan harian dari data
              operasional yang sama.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:shadow-lg hover:brightness-110"
              >
                Masuk ke Dashboard
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/register"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-center text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md"
              >
                Buat Akun
              </Link>
            </div>
          </div>

          <div className="animate-slide-up rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg" style={{ animationDelay: "150ms" }}>
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Operational Status</p>
                  <p className="mt-2 text-3xl font-bold">
                    Online
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/30">
                  <span className="pulse-dot bg-emerald-400" />
                  ACTIVE
                </span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Wallet", "Merchant", "Report"].map((action) => (
                  <div
                    key={action}
                    className="rounded-2xl bg-white/10 px-3 py-3 text-center text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/15"
                  >
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                [
                  <svg key="sp" className="size-5 text-indigo-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>,
                  "Stored Procedure",
                  "Top up dan pembayaran diproses di database"
                ],
                [
                  <svg key="trig" className="size-5 text-indigo-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                  </svg>,
                  "Trigger",
                  "Wallet dan audit log dibuat otomatis"
                ],
                [
                  <svg key="idx" className="size-5 text-indigo-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>,
                  "Index",
                  "Query riwayat dan laporan dioptimalkan"
                ],
              ].map(([icon, title, description]) => (
                <div
                  key={title as string}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
                >
                  {icon as React.ReactNode}
                  <div>
                    <p className="text-sm font-bold text-slate-950 group-hover:text-indigo-700">{title as string}</p>
                    <p className="mt-1 text-sm text-slate-500">{description as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              <span className="inline-block h-px w-8 bg-indigo-600" />
              Fitur Utama
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Fitur inti untuk transaksi kampus yang terkontrol.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {landingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group animate-slide-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100 transition group-hover:bg-indigo-100">
                  {renderFeatureIcon(feature.icon)}
                </div>
                <p className="mt-4 font-bold text-slate-950 group-hover:text-indigo-700 transition">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
              <svg className="size-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="font-semibold text-white">{APP_NAME}</p>
          </div>
          <p>Sistem pembayaran digital kampus terintegrasi.</p>
        </div>
      </footer>
    </main>
  );
}
