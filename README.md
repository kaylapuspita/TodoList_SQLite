# Todo List App with Expo & SQLite

Ini adalah aplikasi Todo List sederhana yang dibuat menggunakan React Native dan Expo. Aplikasi ini dirancang dengan tampilan Dark Mode modern dan menggunakan SQLite sebagai database lokal untuk menyimpan semua data tugas, sehingga data tidak akan hilang meskipun aplikasi ditutup.

## 📸 Screenshot

![tampilan1](https://github.com/user-attachments/assets/dfc6acfa-5b89-445f-9bec-8200008e857d)


## ✨ Fitur Utama

- **Manajemen Tugas (CRUD)**: Tambah, Baca, Update (centang/edit teks), dan Hapus tugas.
- **Penyimpanan Lokal**: Semua data disimpan di perangkat menggunakan **Expo SQLite**, sehingga bersifat persisten.
- **Tampilan Dark Mode Modern**: Antarmuka yang elegan dan nyaman di mata dengan tema gelap.
- **Dashboard Statistik**: Menampilkan jumlah total, tugas yang sedang dikerjakan, dan yang sudah selesai.
- **Filter Tugas**: Memfilter tugas berdasarkan status (Semua, Belum Selesai, Selesai).
- **Fungsi Edit & Simpan**: Mengubah teks tugas yang sudah ada tanpa perlu menghapusnya.
- **Timestamp Otomatis**: Setiap tugas memiliki tanggal kapan dibuat dan kapan terakhir diupdate.

## 🚀 Teknologi yang Digunakan

- **Framework**: React Native with Expo
- **Bahasa**: TypeScript
- **Database**: Expo SQLite (Async API)
- **Navigasi**: Expo Router
- **Styling**: StyleSheet API
- **Icons**: Expo Vector Icons

## ⚙️ Cara Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1. **Clone Repository**
   ```bash
   git clone https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
   ```

2. **Masuk ke Direktori Proyek**
   ```bash
   cd NAMA_REPO_ANDA
   ```

3. **Install Dependencies**
   Gunakan npm atau yarn untuk menginstal semua paket yang dibutuhkan.
   ```bash
   npm install
   ```

4. **Jalankan Aplikasi**
   Perintah ini akan menjalankan Metro Bundler.
   ```bash
   npx expo start
   ```

5. **Buka di Perangkat Anda**
   - Scan QR code yang muncul di terminal menggunakan aplikasi **Expo Go** di ponsel Android atau iOS Anda.
   - Atau tekan `a` untuk membuka di Android Emulator, atau `i` untuk iOS Simulator.

## 📂 Struktur Folder

Proyek ini menggunakan struktur standar Expo Router untuk navigasi berbasis file.

```
RN-EXPO-SQLITE-MAIN/
├── app/
│   ├── components/
│   │   └── TodoList.tsx    # Komponen utama untuk UI & Tampilan
│   ├── services/
│   │   └── todoService.ts  # Logika database (CRUD SQLite)
│   └── index.tsx           # Halaman utama (entry point)
├── assets/                 # Untuk menyimpan gambar & font
├── node_modules/           # Folder dependencies
├── .gitignore              # Mengabaikan file yang tidak perlu di-upload
├── app.json                # Konfigurasi aplikasi Expo
└── package.json            # Daftar dependencies & script
```
```

---
