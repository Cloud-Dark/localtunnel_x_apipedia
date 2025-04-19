require('dotenv').config(); // Import dotenv

const localtunnel = require('localtunnel');
const { exec } = require('child_process');

// Ambil variabel dari .env
const PORT = process.env.PORT || 3000;
const ID = process.env.ID || 'defaultid';

(async () => {
  const tunnel = await localtunnel({ port: PORT });

  const publicUrl = tunnel.url;
  console.log(`✅ LocalTunnel URL: ${publicUrl}`);

  const gatewayUrl = `http://s.apipedia.id?id=${ID}&url=${encodeURIComponent(publicUrl)}`;
  console.log(`🌐 Registering to gateway: ${gatewayUrl}`);

  // Jalankan CURL
  exec(`curl -L "${gatewayUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing curl: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr: ${stderr}`);
      return;
    }
    console.log(`🛰️ Gateway response: ${stdout}`);
  });

  tunnel.on('close', () => {
    console.log('🛑 Tunnel closed');
  });
})();
