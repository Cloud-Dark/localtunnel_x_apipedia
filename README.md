# 🔗 Tunnel Gateway Bridge

Bridge cerdas untuk membuat tunnel server lokal ke public URL dengan multi-provider dan integrasi [Apipedia Gateway](https://s.apipedia.id).

## 🌟 Fitur Utama

| Fitur | LocalTunnel | Serveo | localhost.run |
|-------|------------|--------|--------------|
| URL Public | ✅ | ✅ | ✅ |
| HTTPS | ✅ | ✅ | ✅ |
| Password Protection | ✅ | ❌ | ❌ |
| Custom Subdomain | ❌ | ✅ (Premium) | ✅ (Premium) |
| WebSocket | ❌ | ✅ | ✅ |
| Auto-Reconnect | ✅ | ❌ | ✅ |

## 🛠️ Instalasi Cepat

```bash
git clone https://github.com/Cloud-Dark/localtunnel_x_apipedia.git
cd localtunnel_x_apipedia
npm install
cp .env.example .env
```

## ⚙️ Konfigurasi

Edit `.env`:
```ini
# PORT aplikasi lokal (wajib)
PORT=3000

# ID unik untuk URL pendek (wajib)
ID=myapp123

# Pilihan provider (default: localtunnel)
TUNNEL_TYPE=serveo # [localtunnel|serveo|localhostrun]

# Endpoint gateway
GATEWAY=https://s.apipedia.id
```

## 🚀 Menjalankan

```bash
node server.js
```

**Output Contoh**:
```
🔄 Memulai tunnel (serveo)...
[Serveo] Forwarding HTTP traffic from https://yourid.serveo.net
✅ URL Public: https://yourid.serveo.net
🔗 Registrasi ke gateway: https://s.apipedia.id?id=yourid
🎯 URL Pendek: https://s.apipedia.id?r=yourid
```

## 📊 Perbandingan Provider

### 1. LocalTunnel
```diff
+ Kelebihan:
- Setup termudah
- Auto-reconnect
- Password protection

- Kekurangan:
! Subdomain acak
! Terkadang lambat
```

### 2. Serveo
```diff
+ Kelebihan:
- Tidak perlu client tambahan
- Support WebSocket
- Buka port 443 alternatif

- Kekurangan:
! Sering disconnect
! Tidak ada uptime guarantee
```

### 3. localhost.run
```diff
+ Kelebihan:
- Performa stabil
- TLS otomatis
- Ping global baik

- Kekurangan:
! Subdomain berubah
! Limitasi session
```

## 💡 Contoh Penggunaan

| Scenario | Provider Recommended | Alasan |
|----------|----------------------|--------|
| Development Cepat | LocalTunnel | Setup instan |
| Demo Client | localhost.run | Stabilitas tinggi |
| Testing Webhook | Serveo | Support header lengkap |

## 🚨 Troubleshooting

**Masalah Umum**:
1. **Connection Timeout**:
   - Coba provider berbeda
   - Periksa firewall: `sudo ufw allow 3000`

2. **SSH Error**:
   ```bash
   ssh -v -R 80:localhost:3000 serveo.net
   ```

3. **Password Tidak Muncul**:
   - Akses manual: https://loca.lt/mytunnelpassword
   - Gunakan VPN jika diblokir

## 📌 Tips Pro

```bash
# Untuk koneksi persisten (Serveo):
autossh -M 0 -R 80:localhost:3000 serveo.net

# Untuk WebSocket (localhost.run):
ssh -R 80:localhost:8080 -R 443:localhost:8443 ssh.localhost.run
```

## 📜 Lisensi

MIT License © 2024 [Cloud-Dark](https://github.com/Cloud-Dark) | [![GitHub stars](https://img.shields.io/github/stars/Cloud-Dark/localtunnel_x_apipedia?style=social)](https://github.com/Cloud-Dark/localtunnel_x_apipedia)
