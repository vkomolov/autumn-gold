import {
	toPathUrl,
	generateMediaMap
} from "./utils";
import type { IMediaMapGeneratorParams } from "../src/types";

/* =========================================================
 *  Universal image-map generator for Next.js
 * ----------------------------------------------------------
 *  1. Fetches image lists from CMS or local mocks
 *  2. Downloads remote files into src/assets/imagesStatic
 *  3. Deduplicates by basename
 *  4. Writes static imports for next/image optimisation
 * ----------------------------------------------------------
 * *! include to scripts:
 * "generate:images": "tsx scripts/processImages.ts",
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
* moduleName - Name of the generated module ("imageMap" or "videoMap")
* npmRunScript - NPM script that triggers this generation ("generate:images", "generate:videos")
* assetsRelativeDir - Relative path to the local media files
* absOutFilePath - Absolute output path of the generated module
* sources - Array of URLs or local modules exporting media items
* ========================================================= */

const params: IMediaMapGeneratorParams = {
	moduleName: "imagesMap",
	npmRunScript: "generate:images",
	assetsRelativeDir: "src/assets/imagesStatic",
	absOutFilePath: toPathUrl("src/lib/generated/imagesMap.ts"),
	sources: [
		// "https://cms.example.com/api/images",
		"scripts/lib/mockImages.ts"
	]
};

generateMediaMap(params).catch(err => {
	console.error(`❌  Error generating ${ params.moduleName }:`, err);
	process.exitCode = 1;
});