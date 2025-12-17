Tentu, ini adalah contoh file README.md yang bagus dan profesional untuk project Todo List kamu. File ini menjelaskan apa itu projectmu, fitur-fiturnya, teknologi yang dipakai, dan cara menjalankannya.

Kamu hanya perlu copy-paste teks di bawah ini ke dalam file README.md di projectmu.

Todo List App with Expo & SQLite

Ini adalah aplikasi Todo List sederhana yang dibuat menggunakan React Native dan Expo. Aplikasi ini dirancang dengan tampilan Dark Mode modern dan menggunakan SQLite sebagai database lokal untuk menyimpan semua data tugas, sehingga data tidak akan hilang meskipun aplikasi ditutup.

📸 Screenshot

Ganti screenshot.png dengan gambar hasil screenshot aplikasi Anda. Ini sangat penting untuk memamerkan hasil kerja Anda!

![alt text](tampilan1.jpeg)

✨ Fitur Utama

Manajemen Tugas (CRUD): Tambah, Baca, Update (centang/edit teks), dan Hapus tugas.

Penyimpanan Lokal: Semua data disimpan di perangkat menggunakan Expo SQLite, sehingga bersifat persisten.

Tampilan Dark Mode Modern: Antarmuka yang elegan dan nyaman di mata dengan tema gelap.

Dashboard Statistik: Menampilkan jumlah total, tugas yang sedang dikerjakan, dan yang sudah selesai.

Filter Tugas: Memfilter tugas berdasarkan status (Semua, Belum Selesai, Selesai).

Fungsi Edit & Simpan: Mengubah teks tugas yang sudah ada tanpa perlu menghapusnya.

Timestamp Otomatis: Setiap tugas memiliki tanggal kapan dibuat dan kapan terakhir diupdate.



🚀 Teknologi yang Digunakan

Framework: React Native with Expo

Bahasa: TypeScript

Database: Expo SQLite (Async API)

Navigasi: Expo Router

Styling: StyleSheet API

Icons: Expo Vector Icons


⚙️ Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

Clone Repository

code
Bash
download
content_copy
expand_less
git clone https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git

Masuk ke Direktori Proyek

code
Bash
download
content_copy
expand_less
cd NAMA_REPO_ANDA

Install Dependencies
Gunakan npm atau yarn untuk menginstal semua paket yang dibutuhkan.

code
Bash
download
content_copy
expand_less
npm install

atau

code
Bash
download
content_copy
expand_less
yarn install

Jalankan Aplikasi
Perintah ini akan menjalankan Metro Bundler.

code
Bash
download
content_copy
expand_less
npx expo start

Buka di Perangkat Anda

Scan QR code yang muncul di terminal menggunakan aplikasi Expo Go di ponsel Android atau iOS Anda.

Atau tekan a untuk membuka di Android Emulator, atau i untuk iOS Simulator.


📂 Struktur Folder

Proyek ini menggunakan struktur standar Expo Router untuk navigasi berbasis file.

code
Code
download
content_copy
expand_less
RN-EXPO-SQLITE-MAIN/
├── app/
│   ├── components/
│   │   └── TodoList.tsx    # Komponen utama untuk UI & Tampilan
│   ├── services/
│   │   └── todoService.ts  # Logika database (CRUD SQLite)
│   └── index.tsx           # Halaman utama (entry point)
├── assets/                 # Untuk menyimpan gambar & font
├── node_modules/           # Folder dependencies (tidak di-upload ke GitHub)
├── .gitignore              # Mengabaikan file yang tidak perlu di-upload
├── app.json                # Konfigurasi aplikasi Expo
└── package.json            # Daftar dependencies & script```