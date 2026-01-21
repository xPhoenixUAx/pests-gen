import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'out');
const distDir = path.join(projectRoot, 'dist');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(outDir))) {
  throw new Error(
    'Не знайдено папку `out`. Переконайся, що в `next.config.ts` встановлено `output: \"export\"`, і запусти `npm run build` ще раз.',
  );
}

await fs.rm(distDir, {recursive: true, force: true});
await fs.cp(outDir, distDir, {recursive: true});

console.log('Готово: `dist/` створено з `out/`.');

