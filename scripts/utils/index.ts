import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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