require('dotenv').config(); // Load .env

const localtunnel = require('localtunnel');
const { exec } = require('child_process');

// Ambil dari .env
const PORT = process.env.PORT || 3000;
const ID = process.env.ID || 'defaultid';
const GATEWAY = process.env.GATEWAY || 'http://s.apipedia.id'; // optional kalau mau fleksibel

(async () => {
  try {
    const tunnel = await localtunnel({ port: PORT });

    const publicUrl = tunnel.url;
    console.log(`✅ LocalTunnel URL: ${publicUrl}`);

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
