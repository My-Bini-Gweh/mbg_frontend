import { TransferForm } from "@/components/forms/TransferForm";
import { recipients, studentProfile } from "@/data/mock";

export default function TransferPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Transfer Saldo</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Kirim saldo ke mahasiswa lain untuk demo transaksi antar akun.
        </p>
      </div>
      <TransferForm recipients={recipients} student={studentProfile} />
    </div>
  );
}
