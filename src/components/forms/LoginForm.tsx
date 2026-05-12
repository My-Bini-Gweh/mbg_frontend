"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [emailOrNim, setEmailOrNim] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { emailOrNim, password };

    console.log("login payload", payload);
    alert("Login dummy berhasil. Redirect ke dashboard.");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">
          Email atau NIM
        </span>
        <input
          value={emailOrNim}
          onChange={(event) => setEmailOrNim(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          placeholder="alya@student.ac.id"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          placeholder="Masukkan password"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
      >
        Login
      </button>
    </form>
  );
}
