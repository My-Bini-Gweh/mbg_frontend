"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login, saveSession } from "@/lib/api";

export function LoginForm() {
  const router = useRouter();
  const [emailOrNim, setEmailOrNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await login(emailOrNim, password);
      saveSession(session);
      router.push(session.mahasiswa.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <div className="relative mt-2">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <input
            value={emailOrNim}
            onChange={(event) => setEmailOrNim(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            placeholder="5025241036@student.its.ac.id"
          />
        </div>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <div className="relative mt-2">
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            placeholder="Masukkan password"
          />
        </div>
      </label>
      {error ? (
        <div className="animate-slide-down flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 ring-1 ring-red-200">
          <svg className="size-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-semibold text-red-700">{error}</p>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:brightness-100"
      >
        {isSubmitting ? (
          <>
            <span className="spinner" />
            Memproses...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
