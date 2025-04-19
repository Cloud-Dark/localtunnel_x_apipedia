require('dotenv').config();
const localtunnel = require('localtunnel');
const { exec } = require('child_process');
const https = require('https');

// Ambil dari .env
const PORT = process.env.PORT || 3000;
const ID = process.env.ID || 'defaultid';
const GATEWAY = process.env.GATEWAY || 'https://s.apipedia.id';

function getTunnelPassword(callback) {
  https.get('https://loca.lt/mytunnelpassword', (res) => {
    let data = '';
    res.on('data', chunk => (data += chunk));
    res.on('end', () => {
      callback(data.trim());
    });
  }).on('error', (err) => {
    console.error('❌ Gagal mengambil tunnel password:', err.message);
    callback(null);
  });
}

(async () => {
  try {
    const tunnel = await localtunnel({ port: PORT });
    const publicUrl = tunnel.url;
    console.log(`✅ LocalTunnel URL: ${publicUrl}`);

    // Ambil password-nya
    getTunnelPassword((password) => {
      if (password) {
        console.log(`🔑 Tunnel password (bagi ke pengguna): ${password}`);
        console.log(`📌 Kunjungi di browser akan diminta password ini: ${password}`);
      } else {
        console.log('⚠️ Tidak bisa mendapatkan tunnel password.');
      }
    });

    const gatewayUrl = `${GATEWAY}?id=${ID}&url=${encodeURIComponent(publicUrl)}`;
    console.log(`🌐 Registering to gateway: ${gatewayUrl}`);

    exec(`curl -L "${gatewayUrl}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing curl: ${error.message}`);
      }

      if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
      }

      if (stdout) {
        console.log(`🛰️ Gateway response: ${stdout.trim()}`);
      }

      // ✅ Selalu tampilkan URL pendeknya
      console.log(`🎯 Shortened URL: ${GATEWAY}?r=${ID}`);
    });

    tunnel.on('close', () => {
      console.log('🛑 Tunnel closed');
    });

  } catch (err) {
    console.error(`🚫 Failed to create tunnel: ${err.message}`);
    console.log(`🎯 Shortened URL (fallback): ${GATEWAY}?r=${ID}`);
  }
})();
