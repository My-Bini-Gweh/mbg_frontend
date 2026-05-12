import { PaymentForm } from "@/components/forms/PaymentForm";
import { merchants, studentProfile } from "@/data/mock";

export default function PayPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Bayar Merchant</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Simulasi pembayaran ke merchant kampus dengan ringkasan pembayaran.
        </p>
      </div>
      <PaymentForm merchants={merchants} student={studentProfile} />
    </div>
  );
}
