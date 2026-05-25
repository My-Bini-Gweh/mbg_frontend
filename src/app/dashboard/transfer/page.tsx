export default function TransferPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Transfer Saldo</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Modul transfer antar mahasiswa belum diaktifkan pada rilis ini.
        </p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-950">
          Fitur ini menunggu endpoint backend transfer dan rekonsiliasi penerima.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Alur transaksi yang aktif saat ini adalah top up saldo, pembayaran
          merchant, riwayat transaksi, audit log, dan laporan admin.
        </p>
      </section>
    </div>
  );
}
