# Captivad App

Captivad adalah aplikasi web dengan fitur manajemen konten yang memungkinkan pengguna untuk membuat dan mengelola konten secara efisien. Aplikasi ini dibangun dengan teknologi modern seperti Next.js, Prisma, dan PostgreSQL.

## Panduan Instalasi

### Prasyarat

- Node.js versi 18 atau lebih tinggi.
- PostgreSQL (lokal atau remote).
- Akun Brevo (untuk SMTP).
- Akun Cloudinary (untuk manajemen media).

### Langkah-langkah Instalasi

1. **Clone Repository**

```bash
git clone https://github.com/captivad/captivad_app.git
```

atau

```bash
git clone git@github.com:captivad/captivad_app.git
```

2. **Masuk ke Direktori Project**

```bash
cd captivad_app
```

3. **Instal Dependencies**

```bash
npm install
```

4. **Siapkan Database**

   - Pastikan PostgreSQL sudah terinstal dan berjalan.
   - Buat database baru dengan nama `captivad_dev`.

5. **Konfigurasi Environment**
   - Buat file `.env` di root project.
   - Isi file `.env` dengan konfigurasi berikut:

| Variabel                            | Nilai Contoh                                                                                 | Tipe Data |
| ----------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| `NODE_ENV`                          | "development"                                                                                | String    |
| `NEXTAUTH_URL`                      | "http://localhost:3000"                                                                      | String    |
| `BREVO_HOST`                        | "smtp-relay.brevo.com"                                                                       | String    |
| `BREVO_PORT`                        | "587"                                                                                        | String    |
| `BREVO_EMAIL_AUTH`                  | "captivad.sp@gmail.com"                                                                      | String    |
| `BREVO_SMTP_USERNAME`               | "8464a6001@smtp-brevo.com"                                                                   | String    |
| `BREVO_SMTP_PASSWORD`               | "xsmtpsib-85c6ea0666d1ec5e1917b0b3506200f9bc1fd7801df0430065885fb5a4bdfc92-anbpq4PwMSTjUxID" | String    |
| `BREVO_API_KEY`                     | "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"  | String    |
| `BREVO_BASE_API`                    | "https://api.brevo.com/v3"                                                                   | String    |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | "dlvyzfhj2"                                                                                  | String    |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY`    | "941695811968274"                                                                            | String    |
| `CLOUDINARY_API_SECRET`             | "x5Z6auyWWBZscf5nv8Z0ZmsBPNM"                                                                | String    |
| `CLOUDINARY_UPLOAD_PRESET`          | "captivad-file"                                                                              | String    |
| `NEXT_PUBLIC_BASE_URL`              | "http://localhost:3000"                                                                      | String    |
| `DATABASE_URL`                      | "postgres://postgres:root@localhost:5420/captivad_dev"                                       | String    |
| `SECRET_KEY`                        | "3ec7664b-0c72-4a14-a086-1818960e1c5c"                                                       | String    |

6. **Generate Prisma Client**

```bash
npx prisma generate --schema prisma/schema.prisma
```

7. **Migrasi Database**

```bash
npx prisma migrate dev --schema prisma/schema.prisma --name initial
```

8. **Jalankan Aplikasi**

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## Deployment ke Server

### Prasyarat

- Akses SSH ke server.
- PM2 terinstal di server.

### Langkah-langkah Deployment

1. **Login ke Server**

```bash
ssh root@89.155.111.236
```

2. **Masuk ke Direktori Aplikasi**

```bash
cd /mnt/app/captivad_app
```

3. **Update Kode Terbaru**

```bash
git pull origin main
```

4. **Instal Dependencies (Jika Ada Perubahan)**

```bash
npm install
```

5. **Build Aplikasi**

```bash
npm run build
```

6. **Jalankan Aplikasi dengan PM2**
   - Jika pertama kali, buat file `run-app.sh`:

```bash
nano run-app.sh
```

Isi file dengan:

```bash
#!/bin/bash
npm run start
```

- Berikan izin eksekusi:

```bash
chmod +x run-app.sh
```

- Jalankan aplikasi:

```bash
pm2 start run-app.sh
```

7. **Periksa Status Aplikasi**

```bash
pm2 list
```

Pastikan aplikasi berjalan dengan baik.

8. **Restart Aplikasi (Jika Ada Perubahan)**

```bash
pm2 restart <id_pm2>
```

## Troubleshooting

- **Database Connection Error**: Pastikan database PostgreSQL berjalan dan konfigurasi `DATABASE_URL` di `.env` benar.
- **SMTP Error**: Periksa kredensial Brevo dan pastikan akun Brevo aktif.
- **Cloudinary Error**: Pastikan kredensial Cloudinary valid dan upload preset sudah dibuat.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buka **Pull Request** atau laporkan masalah di Issues.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

## Account Access

Email: captivad5@gmail.com
Password: @Captivad12345!

email diatas adalah email yang digunakan untuk mengakses **cloudinary**

**Captivad Team**
Email: captivad5@gmail.com
Password: @Captivad12345!
