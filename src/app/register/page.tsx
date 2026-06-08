import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-page-gradient" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200/40 to-violet-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-sky-200/30 to-blue-200/30 blur-3xl" />

      <section className="relative w-full max-w-2xl animate-slide-up rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm transition group-hover:shadow-md group-hover:scale-105">
            <svg className="size-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-950">{APP_NAME}</span>
        </Link>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Register
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Daftarkan akun mahasiswa untuk mulai menggunakan CampusPay.
          </p>
        </div>

        <div className="mt-6">
          <RegisterForm />
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-indigo-600 transition hover:text-indigo-800">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
