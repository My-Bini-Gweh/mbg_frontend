"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
  createPayment,
  getMerchants,
  getProfile,
  getSession,
  getWallet,
  mapStudentProfile,
} from "@/lib/api";
import type { Merchant, StudentProfile } from "@/types";

type PaymentFormProps = {
  merchants: Merchant[];
  student: StudentProfile;
};

export function PaymentForm({ merchants, student }: PaymentFormProps) {
  const [merchantOptions, setMerchantOptions] = useState(merchants);
  const [studentData, setStudentData] = useState(student);
  const [walletId, setWalletId] = useState(student.campusPayId);
  const [merchantId, setMerchantId] = useState(merchants[0]?.id ?? "");
  const [amount, setAmount] = useState("25000");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadInitialData() {
      const session = getSession();
      if (!session) {
        setFeedback("Silakan login untuk memproses pembayaran.");
        return;
      }

      try {
        const [apiMerchants, profile, wallet] = await Promise.all([
          getMerchants(),
          getProfile(session.token),
          getWallet(session.token),
        ]);

        if (!active) {
          return;
        }

        const nextMerchants =
          apiMerchants.length > 0 ? apiMerchants : merchants;
        setMerchantOptions(nextMerchants);
        setMerchantId((current) =>
          nextMerchants.some((merchant) => merchant.id === current)
            ? current
            : (nextMerchants[0]?.id ?? ""),
        );
        setWalletId(wallet.id_wallet);
        setStudentData(mapStudentProfile(profile, wallet));
      } catch (err) {
        if (active) {
          setFeedback(
            err instanceof Error
              ? err.message
              : "Gagal memuat data pembayaran",
          );
        }
      }
    }

    loadInitialData();

    return () => {
      active = false;
    };
  }, [merchants]);

  const selectedMerchant = useMemo(
    () => merchantOptions.find((merchant) => merchant.id === merchantId),
    [merchantId, merchantOptions],
  );
  const numericAmount = Number(amount || 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    const session = getSession();

    if (!session) {
      setFeedback("Silakan login untuk memproses pembayaran.");
      return;
    }

    setIsSubmitting(true);
    try {
      const wallet = await createPayment(session.token, {
        wallet_id: walletId,
        merchant_id: merchantId,
        nominal: numericAmount,
      });

      setWalletId(wallet.id_wallet);
      setStudentData((current) => ({
        ...current,
        balance: Number(wallet.saldo),
        campusPayId: wallet.id_wallet,
      }));
      setFeedback("Pembayaran berhasil diproses.");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Pembayaran gagal");
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
            Pilih Merchant
          </span>
          <select
            value={merchantId}
            onChange={(event) => setMerchantId(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            {merchantOptions.map((merchant) => (
              <option key={merchant.id} value={merchant.id}>
                {merchant.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Kategori Merchant
          </span>
          <input
            value={selectedMerchant?.category ?? ""}
            readOnly
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Nominal Pembayaran
          </span>
          <input
            type="number"
            min="1000"
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
            placeholder="Contoh: pembayaran makan siang"
          />
        </label>
      </div>

      <aside className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <p className="text-sm font-bold text-slate-950">Payment Summary</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Dari</dt>
            <dd className="font-semibold text-slate-800">
              {studentData.campusPayId}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Merchant</dt>
            <dd className="font-semibold text-slate-800">
              {selectedMerchant?.name ?? "-"}
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
          {isSubmitting ? "Memproses..." : "Bayar"}
        </button>
      </aside>
    </form>
  );
}
