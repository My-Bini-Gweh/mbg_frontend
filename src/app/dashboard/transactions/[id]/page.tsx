import Link from "next/link";
import { notFound } from "next/navigation";
import { transactions } from "@/data/mock";
import { formatCurrency, formatDate, getTransactionTypeLabel } from "@/lib/format";
import { TransactionStatusBadge } from "@/components/ui/TransactionStatusBadge";
import { TransactionTypeBadge } from "@/components/ui/TransactionTypeBadge";

type TransactionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TransactionDetailPage({
  params,
}: TransactionDetailPageProps) {
  const { id } = await params;
  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) {
    notFound();
  }

  const timeline = [
    {
      title: "Transaksi dibuat",
      description: `Kode ${transaction.code} tercatat pada sistem.`,
    },
    {
      title: "Validasi saldo dan tujuan",
      description: "Mock proses stored procedure dan transaction database.",
    },
    {
      title: `Status ${transaction.status}`,
      description:
        transaction.status === "SUCCESS"
          ? "Saldo dan audit log berhasil diperbarui."
          : "Status akhir mengikuti data mock transaksi.",
    },
  ];

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/transactions"
        className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:text-indigo-700"
      >
        Kembali ke Riwayat
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-700">
              Detail Transaksi
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {transaction.code}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <TransactionTypeBadge type={transaction.type} />
            <TransactionStatusBadge status={transaction.status} />
          </div>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Tipe Transaksi</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {getTransactionTypeLabel(transaction.type)}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Nominal</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {formatCurrency(transaction.amount)}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Status</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {transaction.status}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Pengirim</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {transaction.sender}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Penerima / Merchant</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {transaction.receiver}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <dt className="text-sm text-slate-500">Waktu Transaksi</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {formatDate(transaction.date)}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:col-span-2 xl:col-span-3">
            <dt className="text-sm text-slate-500">Catatan</dt>
            <dd className="mt-2 font-bold text-slate-950">
              {transaction.note ?? "-"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-950">Timeline</h3>
        <div className="mt-5 space-y-4">
          {timeline.map((item, index) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-8 items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-white">
                  {index + 1}
                </div>
                {index < timeline.length - 1 ? (
                  <div className="mt-2 h-full w-px bg-slate-200" />
                ) : null}
              </div>
              <div className="pb-4">
                <p className="font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
