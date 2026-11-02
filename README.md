# REST API Perpustakaan Komik (011_Env-ORM)

Proyek REST API untuk manajemen data komik menggunakan Node.js, Express.js, PostgreSQL, dan Sequelize ORM.

## Fitur Utama

- Manajemen operasi CRUD (Create, Read, Update, Delete) data komik.
- Koneksi database terstruktur menggunakan Sequelize ORM.
- Konfigurasi variabel lingkungan berbasis `.env` menggunakan dotenv.
- Dukungan migrasi database dan seeder data awal menggunakan Sequelize CLI.
- Validasi input request body dan standarisasi respons JSON dengan HTTP status code yang tepat.

---

## Prasyarat

- [Node.js](https://nodejs.org/) (versi 16 atau lebih tinggi)
- [PostgreSQL](https://www.postgresql.org/)
- npm atau yarn

---

## Langkah Instalasi

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/KhoirulArifPratama/011_Env-ORM.git
   cd 011_Env-ORM
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Salin berkas `.env.example` menjadi `.env` lalu sesuaikan konfigurasi database Anda:
   ```bash
   cp .env.example .env
   ```
   Isi konfigurasi dalam `.env`:
   ```env
   DB_USER=postgres
   DB_PASS=password_anda
   DB_DATABASE=perpustakaan
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DIALECT=postgres
   PORT=3000
   ```

4. **Migrasi Database & Seeding (Opsional):**
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Menjalankan Server:**
   ```bash
   npm start
   ```
   Server akan berjalan secara default di `http://localhost:3000`.

---

## Dokumentasi Endpoint API

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Informasi API dan daftar rute | 200 OK |
| `GET` | `/komik` | Mengambil seluruh daftar komik | 200 OK |
| `GET` | `/komik/:id` | Mengambil detail komik berdasarkan ID | 200 OK / 404 Not Found |
| `POST` | `/komik` | Menambahkan komik baru | 201 Created / 400 Bad Request |
| `PUT` | `/komik/:id` | Memperbarui data komik berdasarkan ID | 200 OK / 404 Not Found |
| `DELETE` | `/komik/:id` | Menghapus komik berdasarkan ID | 200 OK / 404 Not Found |

---

## Format Payload Data Komik

### Contoh Request Body (POST / PUT):
```json
{
  "title": "Naruto Shippuden",
  "description": "Petualangan ninja Naruto Uzumaki",
  "author": "Masashi Kishimoto"
}
```
