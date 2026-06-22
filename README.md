# ITSPay

ITSPay adalah sistem pembayaran digital kampus dengan frontend Next.js dan backend Go Gin + MySQL.

Repo ini berisi:

- `src/`: frontend Next.js.
- `../mbg_backend/`: backend Go Gin + MySQL.

## Backend

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

Buat konfigurasi lokal:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Jalankan dari folder frontend:

```bash
bun install
bun dev
```

Frontend berjalan di:

```text
http://localhost:3000
```

## Admin Panel

Login dengan akun admin lalu buka `/admin`. Menu pengelolaan tersedia di:

- `/admin/mahasiswa`
- `/admin/auth-records`
- `/admin/wallets`
- `/admin/banks`
- `/admin/accounts`
- `/admin/merchants`
- `/admin/transactions`
- `/admin/audit-logs`
- `/admin/reports`

Mahasiswa, bank, rekening, dan merchant mendukung create/edit/delete. Wallet hanya mengizinkan perubahan jenis wallet; saldo, credential, transaksi, audit log, dan laporan tidak dapat dimutasi langsung untuk menjaga konsistensi proses finansial database. Halaman credential menampilkan hash password dan PIN secara utuh khusus untuk admin aktif.
