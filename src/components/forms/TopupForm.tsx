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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      const session = getSession();
      if (!session) {
        setFeedback("Silakan login untuk memproses top up.");
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
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Top up gagal");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Pilih Bank
          </span>
          <select
            value={bankId}
            onChange={(event) => setBankId(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="Contoh: top up untuk kebutuhan praktikum"
          />
        </label>
      </div>

      <aside className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <p className="text-sm font-bold text-slate-950">Preview Transaksi</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Bank</dt>
            <dd className="font-semibold text-slate-800">
              {selectedBank?.name ?? "-"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Tujuan</dt>
            <dd className="font-semibold text-slate-800">
              {studentData.campusPayId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Nominal</dt>
            <dd className="font-semibold text-slate-950">
              {formatCurrency(numericAmount)}
            </dd>
          </div>
        </dl>
        {feedback ? (
          <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            {feedback}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-800"
        >
          {isSubmitting ? "Memproses..." : "Submit Top Up"}
        </button>
      </aside>
    </form>
  );
}
