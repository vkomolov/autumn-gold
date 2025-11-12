import { promises as fs } from "fs";
import * as path from "path";
import {
	toPathUrl,
	getMediaEntries,
	getUniqueMediaEntries,
	generateTSModule,
	getDescriptors,
	generateModuleScript
} from "./utils";

/* =========================================================
 *  Universal image-map generator for Next.js
 * ----------------------------------------------------------
 *  1. Fetches image lists from CMS or local mocks
 *  2. Downloads remote files into src/assets/imagesStatic
 *  3. Deduplicates by basename
 *  4. Writes static imports for next/image optimisation
 * ----------------------------------------------------------
 * *! include to scripts (!RENAME this file to processImagesOldVer.ts:):
 * "generate:images": "tsx scripts/processImagesOldVer.ts",
 *
 *! include to scripts dev:
 * "dev": "npm-run-all -s tidy generate:images && concurrently \"next dev --turbopack\" \"npx next-video sync --watch\"",
 *
 *! include to scripts build:
 * "build": "npm-run-all -s tidy generate:images npx next-video sync next build"
 * ========================================================= */

/* =========================================================
*  Configuration
* ! read docs/image-strategy.md
*
* MODULE_NAME - the name of the module to generate ("imageMap", "videoMap")
* NPM_RUN_SCRIPT - the script to be run with "npm run" to init generating imageMap.ts with the imported images
* ASSETS_RELATIVE_DIR - relative dirname to the local image files
* ASSETS_RELATIVE_ALIAS_DIR - relative dirname to the local image files with "@" alias replacing "src"
* ABS_SOURCE_DIR - absolute dirname to the local image files or to be loaded to
* MEDIA_MAP_FILE - the generated image Map file with the loaded images (StaticImageData)
* ABS_OUT_FILE_PATH - the absolute Node path to the generated image Map file
* ========================================================= */

const MODULE_NAME = "imageMap";
const NPM_RUN_SCRIPT = "generate:images";

const ASSETS_RELATIVE_DIR = "src/assets/imagesStatic";
const ASSETS_RELATIVE_ALIAS_DIR = ASSETS_RELATIVE_DIR.replace(/^src/, "@");
const ABS_SOURCE_DIR = toPathUrl(ASSETS_RELATIVE_DIR);
const MEDIA_MAP_FILE = "imageMap.ts";
const ABS_OUT_FILE_PATH   = toPathUrl(`src/lib/generated/${MEDIA_MAP_FILE}`);

const SOURCES: string[] = [
	//"https://cms.example.com/api/images",
	"scripts/lib/mockImages.ts",  // export default mock images: ICmsMediaItem[] from scripts
];


/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */
(async () => {

	console.log("📥  Fetching media list…");

	/* ensure folder exists */
	await fs.mkdir(ABS_SOURCE_DIR, { recursive: true });

	const items = await getMediaEntries(SOURCES);

	/* ---------- dedupe by basename ---------- */
	const unique = getUniqueMediaEntries(items);

	/* ---------- progress bar ---------- */
	const descriptors = await getDescriptors(unique, ABS_SOURCE_DIR, ASSETS_RELATIVE_ALIAS_DIR);

	/* ---------- generate TS module ---------- */
	await fs.mkdir(path.dirname(ABS_OUT_FILE_PATH), { recursive: true });
	await fs.writeFile(
		ABS_OUT_FILE_PATH,
		generateTSModule(descriptors, generateModuleScript(MODULE_NAME, NPM_RUN_SCRIPT)),
		"utf8"
	);

	console.log(`✅  ${MEDIA_MAP_FILE} created / updated successfully`);
})().catch(err => {
	console.error("❌  Error:", err);
	process.exitCode = 1;
});
