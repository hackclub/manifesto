// Resize each hero image to 2× its display width (retina max)
// display width = tile.w * (viewport/1920), capped at 1920px viewport
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { stat } from 'fs/promises';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '../public/hero');

// [id, display_width_at_1920px_viewport]
const tiles = [
  ['01', 546], ['02', 228], ['03', 225], ['04', 274], ['05', 169],
  ['06', 169], ['07', 183], ['08', 274], ['09', 273], ['10', 183],
  ['11', 454], ['12', 225], ['13', 296], ['14',  90], ['15',  90],
  ['16', 180], ['17', 246], ['18', 119], ['19', 284], ['20', 353],
  ['21', 225], ['22', 176], ['23', 119], ['24',  90], ['25', 176],
  ['26', 210], ['27', 258], ['28', 288], ['29', 284], ['30', 230],
  ['31', 212], ['32', 124], ['33', 118], ['34', 121], ['35', 124],
];

async function resize(id, displayW) {
  const file = path.join(DIR, `${id}.webp`);
  const maxW = displayW * 2; // 2× for retina

  // Get current image width
  const { stdout } = await exec('magick', ['identify', '-format', '%w', file]);
  const currentW = parseInt(stdout.trim(), 10);

  if (currentW <= maxW) {
    const { size } = await stat(file);
    console.log(`  ${id}.webp already ${currentW}px  (${(size/1024).toFixed(0)} KB) — skip`);
    return;
  }

  const before = (await stat(file)).size;
  // Resize in-place: resize width to maxW, keep aspect ratio, re-encode at q82
  const tmp = `${file}.tmp.webp`;
  await exec('magick', [file, '-resize', `${maxW}x`, '-quality', '82', tmp]);
  await exec('mv', [tmp, file]);
  const after = (await stat(file)).size;
  console.log(`✓ ${id}.webp  ${currentW}px → ${maxW}px  ${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB`);
}

for (let i = 0; i < tiles.length; i += 6) {
  await Promise.all(tiles.slice(i, i + 6).map(([id, w]) => resize(id, w)));
}
console.log('\nDone!');
