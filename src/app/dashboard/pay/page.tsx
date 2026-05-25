import { PaymentForm } from "@/components/forms/PaymentForm";
import type { StudentProfile } from "@/types";

const initialStudent: StudentProfile = {
  name: "-",
  nim: "-",
  campusPayId: "-",
  balance: 0,
  monthlyTransactionCount: 0,
  status: "ACTIVE",
};

export default function PayPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Bayar Merchant</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Pembayaran ke merchant kampus dengan ringkasan pembayaran.
        </p>
      </div>
      <PaymentForm merchants={[]} student={initialStudent} />
    </div>
  );
}
