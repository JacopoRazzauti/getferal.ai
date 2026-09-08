import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
mkdirSync('assets', { recursive: true });
await build({ entryPoints: ['src/site.jsx'], bundle: true, minify: true, outfile: 'assets/site.js', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' });
execFileSync(process.execPath, ['node_modules/tailwindcss/lib/cli.js', '-i', 'src/tailwind.css', '-o', 'assets/site.css', '--minify'], { stdio: 'inherit' });
