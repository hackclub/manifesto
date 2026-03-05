import { execSync, spawn } from 'child_process';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/hero');

const images = [
  { id: '01', url: 'https://www.figma.com/api/mcp/asset/d809dfa2-d680-43f7-9b57-567d06abcbdb' },
  { id: '02', url: 'https://www.figma.com/api/mcp/asset/cc5047f2-5daf-464f-9fde-f662f055f102' },
  { id: '03', url: 'https://www.figma.com/api/mcp/asset/3760ee6e-a8a2-46dc-a255-395595ca7afb' },
  { id: '04', url: 'https://www.figma.com/api/mcp/asset/699289d0-7c7c-40a0-bb20-c1d794cf4798' },
  { id: '05', url: 'https://www.figma.com/api/mcp/asset/a5411a0a-9c06-41a6-8591-174169705932' },
  { id: '06', url: 'https://www.figma.com/api/mcp/asset/b0918bf3-e4d4-45ed-bb34-f289a2d8c499' },
  { id: '07', url: 'https://www.figma.com/api/mcp/asset/f045481b-4386-465a-b193-280f475f4777' },
  { id: '08', url: 'https://www.figma.com/api/mcp/asset/e46b0b77-fb32-4525-89c6-d025de6f143f' },
  { id: '09', url: 'https://www.figma.com/api/mcp/asset/5a39a1e4-190c-4654-99c5-9f4aed773c16' },
  { id: '10', url: 'https://www.figma.com/api/mcp/asset/30ca7634-1ee0-4ad7-ab76-c796ab658eff' },
  { id: '11', url: 'https://www.figma.com/api/mcp/asset/f102ceb3-4915-4d52-8cd0-25da4d1f0f6b' },
  { id: '12', url: 'https://www.figma.com/api/mcp/asset/daef13d0-ee18-4aa5-948c-e3b2efcb4c21' },
  { id: '13', url: 'https://www.figma.com/api/mcp/asset/d34bc121-05df-4261-b886-bfe34adfa740' },
  { id: '14', url: 'https://www.figma.com/api/mcp/asset/fe967f79-dfdd-4266-868b-fb02a3766b37' },
  { id: '15', url: 'https://www.figma.com/api/mcp/asset/194a4c5d-670d-4bbe-818e-c2ea84d20ce3' },
  { id: '16', url: 'https://www.figma.com/api/mcp/asset/3e618077-3e06-4095-917d-fc44144d6df3' },
  { id: '17', url: 'https://www.figma.com/api/mcp/asset/3bd5a143-cf92-4f6d-b01c-b3aef465f38d' },
  { id: '18', url: 'https://www.figma.com/api/mcp/asset/9dd9999b-1888-4fd2-b452-ccd0b3d0e8ce' },
  { id: '19', url: 'https://www.figma.com/api/mcp/asset/f22ef1c0-9802-49b6-be66-766c21281c05' },
  { id: '20', url: 'https://www.figma.com/api/mcp/asset/77ac9023-5c8e-4462-ad30-fc5002b985de' },
  { id: '21', url: 'https://www.figma.com/api/mcp/asset/4c165f58-fc1a-4d1a-8a69-adb9a49ff441' },
  { id: '22', url: 'https://www.figma.com/api/mcp/asset/5800780d-7f82-448d-80be-7fb956b5c35f' },
  { id: '23', url: 'https://www.figma.com/api/mcp/asset/17844ba9-9812-4927-bdfa-51e4773fca9b' },
  { id: '24', url: 'https://www.figma.com/api/mcp/asset/11eb1e27-469c-4ee8-be80-1f2b2bb3c070' },
  { id: '25', url: 'https://www.figma.com/api/mcp/asset/df618278-6b8d-4bde-bb9b-339ec50fd11d' },
  { id: '26', url: 'https://www.figma.com/api/mcp/asset/253168ef-c19c-4143-aac1-3c54aa3b6965' },
  { id: '27', url: 'https://www.figma.com/api/mcp/asset/ea9047a6-fbae-4024-ab7d-dd2425fcb7df' },
  { id: '28', url: 'https://www.figma.com/api/mcp/asset/70fc6d95-3f1e-44fb-989c-442651f3ba67' },
  { id: '29', url: 'https://www.figma.com/api/mcp/asset/87e782b5-39b3-4fdc-9310-8a3289430475' },
  { id: '30', url: 'https://www.figma.com/api/mcp/asset/4956c865-0ce8-4881-99c2-56c64d013188' },
  { id: '31', url: 'https://www.figma.com/api/mcp/asset/c00e99e8-4dbc-4485-9a31-e328caea6f32' },
  { id: '32', url: 'https://www.figma.com/api/mcp/asset/c5000d70-4c2b-4e6d-a062-72a396676fe0' },
  { id: '33', url: 'https://www.figma.com/api/mcp/asset/261ff169-7031-4033-b0d9-487df275c34a' },
  { id: '34', url: 'https://www.figma.com/api/mcp/asset/d6b855b2-722d-43d6-a5e8-7852d28b0070' },
  { id: '35', url: 'https://www.figma.com/api/mcp/asset/d7d5be93-05da-4e16-9646-b00298a0081d' },
  { id: 'flag', url: 'https://www.figma.com/api/mcp/asset/9fdda016-e5f9-4d85-b4b8-238d1203b042' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      pipeline(res, file).then(resolve).catch(reject);
    }).on('error', reject);
  });
}

function convertToWebP(src, dest) {
  return new Promise((resolve, reject) => {
    const proc = spawn('cwebp', ['-q', '82', '-m', '4', src, '-o', dest]);
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`cwebp exited ${code}`)));
  });
}

async function processOne({ id, url }) {
  const tmp = `/tmp/hero-${id}.img`;
  const out = path.join(OUT_DIR, `${id}.webp`);
  try {
    await download(url, tmp);
    await convertToWebP(tmp, out);
    const { size } = await import('fs').then(m => m.promises.stat(out));
    console.log(`✓ ${id}.webp  (${(size / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error(`✗ ${id} — ${err.message}`);
  }
}

// Run up to 8 in parallel
const CONCURRENCY = 8;
async function run() {
  for (let i = 0; i < images.length; i += CONCURRENCY) {
    await Promise.all(images.slice(i, i + CONCURRENCY).map(processOne));
  }
  console.log('\nAll done!');
}

run();
