import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-700 text-sm font-bold text-white">
            CP
          </div>
          <span className="text-lg font-bold text-slate-950">{APP_NAME}</span>
        </Link>
        <div className="mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Login
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Masuk ke dashboard demo mahasiswa CampusPay.
          </p>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-indigo-700">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
