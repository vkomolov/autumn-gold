/* =========================================================
 * Auto-generates src/lib/generated/videosMap.ts
 * 1. Fetches video lists from CMS or local mocks
 * 2. Downloads remote files into videos/ (alias @v/*)
 * 3. Deduplicates by basename
 * 4. Writes static imports for next-video optimisation
 * ----------------------------------------------------------
 *! include to scripts:
 * "generate:videos": "tsx scripts/processVideos.ts",
 *
 *! include to dev:
 * "npm-run-all -s tidy generate:images generate:videos && concurrently \"next dev --turbopack\" \"npx next-video sync --watch\"",
 *
 *! include to build:
 * "npm-run-all -s tidy generate:images generate:videos npx next-video sync next build"
 *
 * TODO: read docs/video-strategy.md
 *
 * ========================================================= */

import { createWriteStream } from 'fs';
import { promises as fs } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { get as httpsGet } from 'https';
import cliProgress from 'cli-progress';
import { fetchData } from "../src/utils";

/* ---------- config ---------- */
const VIDEOS_DIR  = path.resolve('videos'); // alias @v
const OUT_FILE    = 'src/lib/generated/videosMap.ts';
const AUTO_PREFIX = 'cms_';
/* ---------------------------- */

await fs.mkdir(VIDEOS_DIR, { recursive: true });

/* ---------- types ---------- */
interface CMSItem { href: string; videoPath: string }

/* ---------- download helper ---------- */
async function download(url: string, file: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		httpsGet(url, async (res) => {
			if (res.statusCode !== 200) {
				return reject(new Error(`Download failed: ${res.statusCode}`));
			}
			await pipeline(res, createWriteStream(file));
			resolve();  //when pipeline is complete, we close the promise with empty resolve() and go next below...
		}).on('error', reject);
	});
}

/* ---------- main ---------- */
(async () => {
	const sources: string[] = [
		'https://cms.example.com/api/videos',
		'@/lib/data/mockVideos.ts',
	];

	console.log('📥  Fetching video lists…');
	const raw = await Promise.all(sources.map(source => fetchData<CMSItem[]>(source)));
	const items: CMSItem[] = raw.flat();

	/* dedupe by basename */
	const seen = new Set<string>();
	const unique = items.filter((it) => {
		const key = path.basename(it.videoPath);
		return !seen.has(key) && Boolean(seen.add(key));  //!seen.has(key), then adding key to Set and return true
	});

	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(unique.length, 0);

	let imports = '';
	let map = '';

	for (const [idx, it] of unique.entries()) {
		bar.update(idx + 1);

		const isRemote = it.videoPath.startsWith('http');
		const baseName = path.basename(it.videoPath);
		const fileName = isRemote ? `${AUTO_PREFIX}${baseName}` : baseName;
		const localPath = path.join(VIDEOS_DIR, fileName);

		if (isRemote && !(await fs.stat(localPath).catch(() => false))) {
			await download(it.videoPath, localPath);
		}

		const varName = `v_${baseName.replace(/\W/g, '_')}`;
		imports += `import ${varName} from '@v/${fileName}';\n`;
		map += `  '${it.href}': ${varName},\n`;
	}

	bar.stop();

	const code = `/* auto-generated – do not edit */
${imports}
export const videoMap = {
${map}} as const;
export type VideoMap = typeof videoMap;
`;

	await fs.writeFile(OUT_FILE, code);
	console.log('✅  videosMap.ts created / updated');
})();