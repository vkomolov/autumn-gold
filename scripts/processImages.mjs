"use strict"
	
//! Import the Promise-based version of the 'fs' module for using async/await with file system operations
import {promises as fs} from "fs";
import path from "path";
import fg from "fast-glob";

//Path to the directory with the imagesStatic to be imported for StaticImageData
//! read docs/image-strategy.md

const IMAGES_DIR = path.resolve("./src/assets/imagesStatic");

//! Path to the output file
const OUTPUT_FILE = path.resolve('./src/lib/generated/imageMap.ts');

//! Image extensions we support
const SUPPORTED_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'svg'];

//! Searching for the files in the IMAGES_DIR

const run = async () => {
	try {
		/**
		 *! fast-glob expects a POSIX-compatible path (with /), but path.resolve() on Windows generates a path with \,
		 * for example:
		 * D:\GIT\autumn-gold\src\assets\imagesStatic/**
		 * fast-glob does not recognize such a path as a valid pattern, and ends up returning an empty list.
		 * Just replacing \ with / in pattern before passing it to fg():
		 */
		const pattern = `${IMAGES_DIR}/**/*.{${SUPPORTED_EXTENSIONS.join(",")}}`
			.replace(/\\/g, "/");

		//! Getting a list of files (fast-glob returns paths in POSIX format)
		const files = await fg(pattern);

		if (files.length === 0) {
			console.warn("⚠️ No image files found. Skipping imageMap.ts generation.");
			return;
		}

		const imports = [];
		const mapEntries = [];

		for (const [index, filePath] of files.entries()) {
			/**
			 *! It converts absolute file path to a relative POSIX-style path from 'src'
			 * (e.g., 'src/assets/imagesStatic/foo.webp' → 'assets/imagesStatic/foo.webp')
			 *! Also it ensures compatibility on Windows by replacing backslashes with forward slashes
			 */
			const relativePath = path.relative("src", filePath).replace(/\\/g, "/");

			const importPath = `@/${relativePath}`;
			const fileName = path.basename(filePath);
			const key = `generated-${fileName}`;
			const varName = `img${index}`;

			imports.push(`import ${varName} from "${importPath}";`);
			mapEntries.push(`"${key}": ${varName},`);
		}

		/**
		 *! ⚠️ AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
		 *! Run with: node scripts/processImages.mjs
		 * it does line-by-line import of imagesStatic,
		 * then it creates the Object imageMap inline width key: value pairs...
		 */
		const output = `
// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
// "npm run generate:images"
// imports
${imports.join("\n")}

export const imageMap = {
${mapEntries.join("\n")}
} as const;
`;


		//! creating dir and file synchronously...
		/*	fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
			fs.writeFileSync(OUTPUT_FILE, output);
			console.log("✅ imageMap.ts written successfully.");
		*/

		// ensure directory exists
		await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

		// write the output file with adding a final line (\n) to the end of the file:
		await fs.writeFile(OUTPUT_FILE, output + "\n");
	}
	
	catch (err) {
		console.error("❌ Failed to write file imageMap.ts", err);
	}

	//without try / catch
/*	fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true }, (err) => {
		if (err) throw err;
		fs.writeFile(OUTPUT_FILE, output, (err) => {
			if (err) throw err;

			console.log("✅ imageMap.ts written successfully.");
		});
	});*/

}

run()
	.then(() => {
	console.log("✅ imageMap.ts written successfully.");
})
	.catch((err) => {
		console.error("❌ Unhandled error in run():", err);
		process.exit(1);
	});