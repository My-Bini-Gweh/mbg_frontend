import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { APP_NAME } from "@/lib/constants";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-700 text-sm font-bold text-white">
            CP
          </div>
          <span className="text-lg font-bold text-slate-950">{APP_NAME}</span>
        </Link>
        <div className="mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Register
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Buat akun demo mahasiswa untuk masuk ke dashboard.
          </p>
        </div>
        <div className="mt-6">
          <RegisterForm />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-indigo-700">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
