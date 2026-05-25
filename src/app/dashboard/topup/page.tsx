import { TopupForm } from "@/components/forms/TopupForm";
import { banks, studentProfile } from "@/data/mock";

export default function TopupPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Top Up Saldo</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Pilih bank, isi nominal, lalu lihat preview transaksi sebelum submit.
        </p>
      </div>
      <TopupForm banks={banks} student={studentProfile} />
    </div>
  );
}
