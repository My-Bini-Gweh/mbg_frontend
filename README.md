# ITSPay

ITSPay adalah demo sistem pembayaran digital kampus untuk Final Project Manajemen Basis Data.

Repo ini berisi:

- `src/`: frontend Next.js.
- `../mbg_backend/`: backend Go Gin + MySQL untuk demo database.

## Backend Demo

Masuk ke folder backend:

```bash
cd ../mbg_backend
```

Ikuti panduan lengkap di:

```text
../mbg_backend/README.md
```

Backend menonjolkan:

- stored procedure `sp_topup_wallet`
- stored procedure `sp_bayar_merchant`
- function `fn_hitung_total_topup`
- trigger auto-create wallet
- trigger validasi saldo tidak negatif
- trigger audit log transaksi
- view laporan harian dan riwayat mahasiswa
- JWT auth dan role mahasiswa/admin

## Frontend

Jalankan dari root repo:

```bash
bun install
bun dev
```

Frontend berjalan di:

```text
http://localhost:3000
```
