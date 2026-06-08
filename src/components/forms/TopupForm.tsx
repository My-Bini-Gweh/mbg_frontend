"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
  createTopup,
  getBanks,
  getProfile,
  getSession,
  getWallet,
  mapStudentProfile,
} from "@/lib/api";
import type { Bank, StudentProfile } from "@/types";

type TopupFormProps = {
  banks: Bank[];
  student: StudentProfile;
};

export function TopupForm({ banks, student }: TopupFormProps) {
  const [bankOptions, setBankOptions] = useState(banks);
  const [studentData, setStudentData] = useState(student);
  const [walletId, setWalletId] = useState(student.campusPayId);
  const [bankId, setBankId] = useState(banks[0]?.id ?? "");
  const [amount, setAmount] = useState("100000");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      const session = getSession();
      if (!session) {
        setFeedback("Silakan login untuk memproses top up.");
        setFeedbackType("error");
        return;
      }

      try {
        const [apiBanks, profile, wallet] = await Promise.all([
          getBanks(),
          getProfile(session.token),
          getWallet(session.token),
        ]);

        if (!active) {
          return;
        }

        const nextBanks = apiBanks.length > 0 ? apiBanks : banks;
        setBankOptions(nextBanks);
        setBankId((current) =>
          nextBanks.some((bank) => bank.id === current)
            ? current
            : (nextBanks[0]?.id ?? ""),
        );
        setWalletId(wallet.id_wallet);
        setStudentData(mapStudentProfile(profile, wallet));
      } catch (err) {
        if (active) {
          setFeedback(
            err instanceof Error ? err.message : "Gagal memuat data top up",
          );
          setFeedbackType("error");
        }
      }
    }

    loadInitialData();

    return () => {
      active = false;
    };
  }, [banks]);

  const selectedBank = useMemo(
    () => bankOptions.find((bank) => bank.id === bankId),
    [bankId, bankOptions],
  );
  const numericAmount = Number(amount || 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    const session = getSession();

    if (!session) {
      setFeedback("Silakan login untuk memproses top up.");
      setFeedbackType("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const wallet = await createTopup(session.token, {
        wallet_id: walletId,
        bank_id: Number(bankId),
        nominal: numericAmount,
      });

      setWalletId(wallet.id_wallet);
      setStudentData((current) => ({
        ...current,
        balance: Number(wallet.saldo),
        campusPayId: wallet.id_wallet,
      }));
      setFeedback("Top up berhasil diproses.");
      setFeedbackType("success");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Top up gagal");
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const feedbackStyles = {
    success: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20",
    error: "bg-red-500/10 text-red-300 ring-1 ring-red-500/20",
    info: "bg-slate-800 text-slate-200 ring-1 ring-slate-700",
  };

  const feedbackIcons = {
    success: (
      <svg className="size-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="size-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="size-5 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Pilih Bank
          </span>
          <select
            value={bankId}
            onChange={(event) => setBankId(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 cursor-pointer"
          >
            {bankOptions.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Nominal Top Up
          </span>
          <input
            type="number"
            min="10000"
            step="1000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Catatan Opsional
          </span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 resize-none"
            placeholder="Contoh: top up untuk kebutuhan praktikum"
          />
        </label>
      </div>

      <aside className="rounded-2xl bg-slate-950 text-white overflow-hidden shadow-lg border border-slate-900 flex flex-col justify-between">
        <div>
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 px-5 py-4 border-b border-slate-900">
            <p className="text-sm font-bold text-white tracking-wide">Preview Transaksi</p>
          </div>
          <div className="p-5">
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Bank</dt>
                <dd className="font-semibold text-slate-100">
                  {selectedBank?.name ?? "-"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Tujuan</dt>
                <dd className="font-semibold text-indigo-300 font-mono">
                  {studentData.campusPayId}
                </dd>
              </div>
              <div className="h-px bg-slate-900" />
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Nominal</dt>
                <dd className="text-xl font-bold text-white">
                  {formatCurrency(numericAmount)}
                </dd>
              </div>
            </dl>
            {feedback ? (
              <div className={`mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold animate-slide-down ${feedbackStyles[feedbackType]}`}>
                {feedbackIcons[feedbackType]}
                <span>{feedback}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="p-5 pt-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:brightness-100 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="spinner" />
                Memproses...
              </>
            ) : (
              "Submit Top Up"
            )}
          </button>
        </div>
      </aside>
    </form>
  );
}
