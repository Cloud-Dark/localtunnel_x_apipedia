# 🔗 localtunnel_x_apipedia

Bridge sederhana antara [LocalTunnel](https://theboroer.github.io/localtunnel-www/) dan [Apipedia Gateway](https://s.apipedia.id) untuk mempersingkat URL dan membagikannya secara aman.

## 🚀 Fitur

- Membuat public URL dari server lokal menggunakan LocalTunnel.
- Mendaftarkan URL tersebut ke gateway `s.apipedia.id` dengan ID custom.
- Menampilkan tunnel password untuk akses melalui browser.
- Selalu menampilkan URL pendek hasil dari gateway.
- Dapat diatur via `.env`.

---

## 📦 Instalasi

1. Clone repo ini:

```bash
git clone https://github.com/Cloud-Dark/localtunnel_x_apipedia.git
cd localtunnel_x_apipedia
```

2. Install dependencies:

```bash
npm install
```

3. Duplikat file konfigurasi `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

4. Ubah isi `.env` sesuai kebutuhan:

```env
PORT=3000
ID=your_custom_id
GATEWAY=https://s.apipedia.id
```

---

## ▶️ Menjalankan

```bash
node server.js
```

Output yang akan muncul:

```
✅ LocalTunnel URL: https://xxxxxx.loca.lt
🔑 Tunnel password (bagi ke pengguna): 182.xxx.xxx.xxx
📌 Kunjungi di browser akan diminta password ini: 182.xxx.xxx.xxx
🌐 Registering to gateway: https://s.apipedia.id?id=your_custom_id&url=https://xxxxxx.loca.lt
🛰️ Gateway response: s.apipedia.id?r=your_custom_id
🎯 Shortened URL: https://s.apipedia.id?r=your_custom_id
```

---

## 🌐 Cara Akses dari Browser

Saat kamu mengunjungi URL dari LocalTunnel, halaman konfirmasi akan muncul:

> "You are about to visit this tunnel..."

Gunakan **tunnel password** yang ditampilkan di terminal (biasanya berupa IP publik server kamu).

---

## 💡 Contoh Penggunaan

Untuk webhook, API, testing public endpoint, dan integrasi ke tools seperti WhatsApp Gateway, Notif Hook, dan lainnya.

---

## 🛠 Update Terbaru

Untuk mendapatkan pembaruan terbaru dari repo ini:

```bash
git pull origin main
```

---

## 📄 Lisensi

MIT © 2025 [Cloud-Dark](https://github.com/Cloud-Dark)

```
