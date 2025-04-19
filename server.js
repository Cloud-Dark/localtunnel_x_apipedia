require('dotenv').config();
const { spawn } = require('child_process');
const https = require('https');

const TUNNEL_TYPE = process.env.TUNNEL_TYPE || 'localtunnel';
const PORT = process.env.PORT || 3000;
const ID = process.env.ID || 'defaultid';
const GATEWAY = process.env.GATEWAY || 'https://s.apipedia.id';

async function getTunnelPassword() {
  return new Promise((resolve, reject) => {
    https.get('https://loca.lt/mytunnelpassword', (res) => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

function registerToGateway(url) {
  const gatewayUrl = `${GATEWAY}?id=${ID}&url=${encodeURIComponent(url)}`;
  console.log(`🌐 Registering to gateway: ${gatewayUrl}`);
  
  const curl = spawn('curl', ['-L', gatewayUrl]);
  
  curl.stdout.on('data', (data) => {
    console.log(`🛰️ Gateway response: ${data.toString().trim()}`);
  });
  
  curl.stderr.on('data', (data) => {
    console.error(`⚠️ stderr: ${data.toString()}`);
  });
  
  curl.on('close', (code) => {
    console.log(`🎯 Shortened URL: ${GATEWAY}?r=${ID}`);
  });
}

async function setupTunnel() {
  try {
    switch(TUNNEL_TYPE) {
      case 'localtunnel': {
        const localtunnel = require('localtunnel');
        const tunnel = await localtunnel({ port: PORT });
        
        console.log(`✅ LocalTunnel URL: ${tunnel.url}`);
        registerToGateway(tunnel.url);
        
        try {
          const pass = await getTunnelPassword();
          if(pass) console.log(`🔑 Password: ${pass}`);
        } catch(err) {
          console.error('❌ Gagal mengambil tunnel password:', err.message);
        }
        
        tunnel.on('close', () => console.log('🛑 Tunnel closed'));
        return tunnel;
      }

      case 'serveo': {
        return new Promise((resolve, reject) => {
          const args = [
            '-o', 'StrictHostKeyChecking=no',
            '-o', 'ServerAliveInterval=60',
            '-R', `80:localhost:${PORT}`,
            'serveo.net'
          ];
          
          const ssh = spawn('ssh', args);
          console.log(`⏳ Starting Serveo tunnel...`);
          
          ssh.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('[Serveo]', output.trim());
            
            const match = output.match(/Forwarding HTTP.*?(https?:\/\/[^\s]+)/);
            if(match) {
              const publicUrl = match[1];
              console.log(`✅ Serveo URL: ${publicUrl}`);
              registerToGateway(publicUrl);
              resolve(publicUrl);
            }
          });
          
          ssh.stderr.on('data', (data) => {
            console.error('[Serveo ERROR]', data.toString());
          });
          
          ssh.on('close', (code) => {
            console.log(`🛑 Serveo tunnel closed with code ${code}`);
          });
        });
      }

      case 'localhostrun': {
        return new Promise((resolve, reject) => {
          const args = [
            '-o', 'StrictHostKeyChecking=no',
            '-o', 'ServerAliveInterval=60',
            '-R', `80:localhost:${PORT}`,
            'ssh.localhost.run'
          ];
          
          const ssh = spawn('ssh', args);
          console.log(`⏳ Starting localhost.run tunnel...`);
          
          ssh.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('[localhost.run]', output.trim());
            
            const match = output.match(/(https?:\/\/[^\s]+\.localhost\.run)/);
            if(match) {
              const publicUrl = match[1];
              console.log(`✅ localhost.run URL: ${publicUrl}`);
              registerToGateway(publicUrl);
              resolve(publicUrl);
            }
          });
          
          ssh.stderr.on('data', (data) => {
            console.error('[localhost.run ERROR]', data.toString());
          });
          
          ssh.on('close', (code) => {
            console.log(`🛑 localhost.run tunnel closed with code ${code}`);
          });
        });
      }

      default:
        throw new Error(`Tipe tunnel tidak didukung: ${TUNNEL_TYPE}`);
    }
  } catch(err) {
    console.error(`🚫 Gagal membuat tunnel: ${err.message}`);
    console.log(`🎯 Fallback URL: ${GATEWAY}?r=${ID}`);
    throw err;
  }
}

(async () => {
  try {
    await setupTunnel();
  } catch(err) {
    process.exit(1);
  }
})();