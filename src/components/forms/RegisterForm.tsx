"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password belum sama.");
      return;
    }

    const payload = { name, nim, email, password, confirmPassword };

    console.log("register payload", payload);
    alert("Register dummy berhasil. Redirect ke dashboard.");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Nama</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          placeholder="Alya Putri"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">NIM</span>
        <input
          value={nim}
          onChange={(event) => setNim(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          placeholder="235150700111001"
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          placeholder="alya@student.ac.id"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="Password"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Konfirmasi
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="Ulangi password"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
      >
        Register
      </button>
    </form>
  );
}
