import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const landingFeatures = [
  {
    title: "Wallet Mahasiswa",
    description:
      "Kelola saldo, status akun, dan riwayat transaksi setiap mahasiswa dalam satu dashboard.",
  },
  {
    title: "Top Up Terverifikasi",
    description:
      "Top up saldo diproses melalui stored procedure dengan validasi bank aktif dan audit log.",
  },
  {
    title: "Pembayaran Merchant",
    description:
      "Pembayaran ke merchant kampus memakai transaksi database dan penguncian saldo yang konsisten.",
  },
  {
    title: "Audit Operasional",
    description:
      "Setiap perubahan finansial tercatat otomatis untuk kebutuhan rekonsiliasi dan pengawasan.",
  },
  {
    title: "Laporan Harian",
    description:
      "Admin memantau agregasi transaksi harian langsung dari view database.",
  },
  {
    title: "Kontrol Akses",
    description:
      "Hak akses mahasiswa dan admin dipisahkan dengan JWT dan role-based middleware.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-700 text-sm font-bold text-white">
              CP
            </div>
            <span className="text-lg font-bold">{APP_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
            Digital Campus Wallet
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {APP_NAME} menyatukan pembayaran digital kampus dalam satu sistem.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Mahasiswa dapat mengelola saldo dan pembayaran merchant, sementara
            admin memantau transaksi, audit log, dan laporan harian dari data
            operasional yang sama.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-2xl bg-indigo-700 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
            >
              Masuk ke Dashboard
            </Link>
            <Link
              href="/register"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
            >
              Buat Akun
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">Operational Status</p>
                <p className="mt-2 text-3xl font-bold">
                  Online
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
                ACTIVE
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Wallet", "Merchant", "Report"].map((action) => (
                <div
                  key={action}
                  className="rounded-2xl bg-white/10 px-3 py-3 text-center text-sm font-semibold ring-1 ring-white/10"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              ["Stored Procedure", "Top up dan pembayaran diproses di database"],
              ["Trigger", "Wallet dan audit log dibuat otomatis"],
              ["Index", "Query riwayat dan laporan dioptimalkan"],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-sm font-bold text-slate-950">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
              Fitur Utama
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Fitur inti untuk transaksi kampus yang terkontrol.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="font-bold text-slate-950">{feature.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">{APP_NAME}</p>
          <p>Sistem pembayaran digital kampus terintegrasi.</p>
        </div>
      </footer>
    </main>
  );
}
