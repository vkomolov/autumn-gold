import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { get as httpsGet } from "https";
import {createWriteStream, promises as fs} from "fs";
import { pipeline } from "stream/promises";
import type { ICmsMediaItem, IMediaMapGeneratorParams } from "../../src/types";
import * as cliProgress from "cli-progress";
import path from "path";
import {customAlphabet} from "nanoid";

///////// END OF IMPORTS /////////////

type TCmsMediaItemKey = ICmsMediaItem["fileName"];
type TDescriptor = {
	varName: string;
	baseName: string;
	importPath: string;
}

const nanoidLetters = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 7);
const __dirname = dirname(fileURLToPath(import.meta.url));  //D:\GIT\autumn-gold\scripts\utils

export const PROJECT_ROOT = join(__dirname, '../..'); // → <repoRoot>


/**
 * Converts any "local" path to a file:// URL, understandable by ES modules.
 * If the path already starts with file://, return it as is.
 * If it starts with ./ or ../, resolve it from process.cwd().
 * Otherwise, resolve it as is (can be extended with aliases).
 */
export function toFileUrl(specifier: string): string {
	if (specifier.startsWith('file://')) return specifier;
	return pathToFileURL(join(PROJECT_ROOT, specifier)).href;
}

/**
 * Converts any "local" specifier to an absolute path.
 * – if it's already file:// – returns the raw path.
 * – if it starts with ./ or ../ – resolves from process.cwd().
 * – otherwise, consider the path relative to the project root (process.cwd()).
 */
export function toPathUrl(specifier: string): string {
	if (specifier.startsWith('file://')) return new URL(specifier).pathname;
	return join(PROJECT_ROOT, specifier);
}

/**
 * Universal data fetcher from HTTP or a local module
 * @param source - URL or path to the module (@/lib/...)
 * @param options - RequestInit (Next.js caching options are ignored in Node.js)
 */
export async function fetchData<T>(
	source: string,
	options?: RequestInit
): Promise<T> {
	if (source.startsWith('http')) {
		const res = await fetch(source, options);
		if (!res.ok) throw new Error(`HTTP ${res.status} – ${source}`);
		return res.json();
	}

	// Local module
	const fileUrl = toFileUrl(source);
	const mod = await import(fileUrl);
	return mod.default as T; // ожидаем export default
}

/* ------------------------------------------------------------------ */
/*  Download helper                                                   */
/* ------------------------------------------------------------------ */
export async function download(url: string, file: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		httpsGet(url, async (res) => {
			if (res.statusCode !== 200) {
				return reject(new Error(`Download failed: ${res.statusCode}`));
			}
			await pipeline(res, createWriteStream(file));
			resolve();
		}).on('error', reject);
	});
}

export const getMediaEntries = async (sources: string[], options?: RequestInit): Promise<ICmsMediaItem[]> => {
	const raw = await Promise.all(
		sources.map(source => fetchData<ICmsMediaItem[]>(source, options))
	);
	return raw.flat();
}



/**
 * Filters a list of CMS media items to only include unique entries by file name.
 *
 * This function iterates through an array of media items and:
 * 1. Checks if the `fileName` already exists in the unique map.
 * 2. If the file name is a duplicate, logs a warning and skips that item.
 * 3. If the file name is unique, adds it to the map with its source.
 *
 * @param items - An array of CMS media items to process.
 * @returns A Map where:
 *          - key: the unique file name (TCmsMediaItemKey)
 *          - value: the corresponding media source (URL or local path)
 */
export const getUniqueMediaEntries = (
	items: ICmsMediaItem[]
): Map<TCmsMediaItemKey, ICmsMediaItem["src"]> => {

	const unique = new Map<TCmsMediaItemKey, ICmsMediaItem["src"]>();

	for (const it of items) {
		if (unique.has(it.fileName)) {
			// Log a warning when encountering a duplicate file name
			console.warn(
				`[at processImages.ts]: the fileName: ${it.fileName} is not unique...\n 
				The source: ${it.src} is skipped...`
			);
		} else {
			// Add unique fileName -> src mapping
			unique.set(it.fileName, it.src);
		}
	}

	return unique;
}


//const SUPPORTED_EXT = ['webp','jpg','jpeg','png','svg'];  //option for a pattern list: string[]
//const extGlob = SUPPORTED_EXT.join(',');  //option for a joined pattern list: string

/**
 * Generates descriptors for a set of unique media items.
 *
 * For each media item, this function:
 * 1. Determines if the item is remote (starts with 'http') or local.
 * 2. Builds the target file name (with optional CMS prefix for remote files).
 * 3. Checks if the file exists locally; if not:
 *    - Downloads the file from remote source if applicable.
 *    - Exits the process if a local file is missing.
 * 4. Generates a unique variable name for the descriptor.
 * 5. Constructs an import path using the provided alias directory.
 * 6. Collects all descriptors into an array and returns them.
 *
 * A CLI progress bar is shown during processing.
 *
 * @param unique - A map of base file names to their source URLs/paths.
 * @param absSourceDir - Absolute path to the local directory where files should reside.
 * @param assetsRelativeAliasDir - Alias path used for importing assets in the project.
 * @returns Promise resolving to an array of descriptors, each containing:
 *          - varName: a unique variable name for use in code
 *          - baseName: original base name of the media file
 *          - importPath: path (with alias) for importing the file
 */
export const getDescriptors = async (
	unique: Map<TCmsMediaItemKey, ICmsMediaItem["src"]>,
	absSourceDir: string,
	assetsRelativeAliasDir: string,
): Promise<TDescriptor[]> => {
	// Prefix for files automatically downloaded from CMS
	const AUTO_PREFIX = "cms_";

	// Initialize CLI progress bar
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	let barCount = 0;
	bar.start(unique.size, barCount);

	const descriptors: TDescriptor[] = [];

	for (const [baseName, src] of unique.entries()) {
		barCount++;
		bar.update(barCount);

		const isRemote = src.startsWith('http');
		const fileName = isRemote ? `${AUTO_PREFIX}${baseName}` : baseName;
		const localPath = path.join(absSourceDir, fileName);

		const exists = await fs.stat(localPath).catch(() => false);

		if (!exists) {
			// Download remote file if not found locally
			if (isRemote) {
				await download(src, localPath);
			} else {
				console.error(`\n❌ [getDescriptors]: local file ${baseName} is not found at ${localPath}`);
				process.exit(1);
			}
		}

		// Build descriptor with unique variable name
		const varName = nanoidLetters();
		const importPath = `${assetsRelativeAliasDir}/${fileName}`;

		descriptors.push({ varName, baseName, importPath });
	}

	bar.stop();
	console.log(`\n⬇️  Media downloaded successfully...`);

	return descriptors;
}

//Parameters for generating a TS module
type TGenerateModuleScriptArgs = {
	moduleName: string,
	imports: string[],
	mapEntries: string[],
	npmRunScript?: string
}


/**
 * Factory function to create a TypeScript module generator.
 *
 * This function takes a `moduleName` and `npmRunScript` and returns a function
 * that accepts `imports` and `mapEntries` arrays. The returned function then
 * generates the full TypeScript module as a string, including:
 *   - Import statements for each descriptor
 *   - A constant object mapping base names to imported variables
 *   - A corresponding type for the keys of the module
 *   - Auto-generated file header with npm script reference
 *
 * @param moduleName - The name of the exported module (e.g., "imageMap" or "videoMap").
 * @param npmRunScript - The npm script name that generated this module (used in header comment).
 * @returns A function that accepts `imports` and `mapEntries` and returns the complete TypeScript module as a string.
 */
export const generateModuleScript = (
	moduleName: string,
	npmRunScript: string
) => (params: Omit<TGenerateModuleScriptArgs, "moduleName" | "npmRunScript">) => {
	const { imports, mapEntries } = params;

	return [
		`/**`,
		` * ⚠️ AUTO-GENERATED FILE – DO NOT EDIT MANUALLY`,
		` * Generated by: npm run ${npmRunScript || "not indicated..."}`,
		` */`,
		"",
		...imports,
		"",
		`export const ${moduleName} = {`,
		...mapEntries,
		"} as const;",
		"",
		`export type ${moduleName[0].toUpperCase() + moduleName.slice(1)}Key = keyof typeof ${moduleName};`,
		""
	].join("\n");
};



/**
 * Generates a TypeScript module string based on provided descriptors.
 *
 * Each descriptor should contain a variable name, base file name, and import path.
 * The function builds import statements and map entries, then delegates the final
 * module formatting to the provided `moduleScriptFn`.
 *
 * @param descriptors - An array of descriptors representing files to include in the module.
 * @param moduleScriptFn - A function that receives `imports` and `mapEntries` arrays
 *   and returns the full TypeScript module as a string. This allows customization
 *   of module structure, module name, and npm run script metadata.
 * @returns A string containing the generated TypeScript module.
 */
export const generateTSModule = (
	descriptors: TDescriptor[],
	moduleScriptFn: (params: Omit<TGenerateModuleScriptArgs, "moduleName" | "npmRunScript">) => string
): string => {
	const imports = descriptors.map(d => `import ${d.varName} from "${d.importPath}";`);
	const mapEntries = descriptors.map(d => `  "${d.baseName}": ${d.varName},`);

	return moduleScriptFn({ imports, mapEntries });
};


/*** MEDIA GENERATOR  ***/

/**
 * ✅ Universal media-map generator for Next.js (Node environment)
 *
 * This function automates the creation of a TypeScript media map module,
 * used for static imports of images, videos, or other media in Next.js.
 *
 * It performs the following steps:
 * 1. Fetches media lists from CMS or local mocks
 * 2. Downloads remote files into a specified local directory
 * 3. Deduplicates entries by their base file name
 * 4. Generates a strongly typed TypeScript module for static imports
 *
 * @param params - Configuration object
 * @param params.moduleName - Name of the generated module ("imageMap" or "videoMap")
 * @param params.npmRunScript - NPM script that triggers this generation ("generate:images", "generate:videos")
 * @param params.assetsRelativeDir - Relative path to the local media files
 * @param params.absOutFilePath - Absolute output path of the generated module
 * @param params.sources - Array of URLs or local modules exporting media items
 */
export const generateMediaMap = async (params: IMediaMapGeneratorParams) => {
	const {
		moduleName,
		npmRunScript,
		assetsRelativeDir,
		absOutFilePath,
		sources
	} = params;

	const assetsRelativeAliasDir = assetsRelativeDir === "videos" ? "@v" :assetsRelativeDir.replace(/^src/, "@");
	//const importPath = `${assetsRelativeAliasDir}/${fileName}`;
	//const importPath = `@v/${fileName}`; //for video

	const absSourceDir = toPathUrl(assetsRelativeDir);
	const mediaMapFile = path.basename(absOutFilePath);

	console.log(`📥  Fetching media list for ${moduleName}…`);

	/* Ensure local folder exists */
	await fs.mkdir(absSourceDir, { recursive: true });

	/* Fetch media entries from provided sources */
	const items = await getMediaEntries(sources);

	/* Deduplicate by basename */
	const unique = getUniqueMediaEntries(items);

	/* Generate descriptor list and progress bar */
	const descriptors = await getDescriptors(unique, absSourceDir, assetsRelativeAliasDir);

	/* Create or update the output TypeScript module */
	await fs.mkdir(path.dirname(absOutFilePath), { recursive: true });
	await fs.writeFile(
		absOutFilePath,
		generateTSModule(descriptors, generateModuleScript(moduleName, npmRunScript)),
		"utf8"
	);

	console.log(`✅  ${mediaMapFile} created / updated successfully`);
};
