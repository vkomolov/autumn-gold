// Version check script using semver
// See: https://www.npmjs.com/package/semver


import fs from "fs";
import path from "path";
import process from "process";
import semver from "semver";

const NVMRC_FILE = ".nvmrc";
const NVMRC_PATH = path.resolve(process.cwd(), NVMRC_FILE);

function errorExit(message) {
	console.error(`❌ ${message}`);
	process.exit(1);
}

// Check if .nvmrc exists
if (!fs.existsSync(NVMRC_PATH)) {
	errorExit(`the file ${NVMRC_FILE} is not found. Please create the file and specify the required Node.js version.`);
}

// Read required Node version (can include ranges like ">=20", "^18.17.0", etc.)
let requiredVersion = fs.readFileSync(NVMRC_PATH, 'utf8').trim();

if (!requiredVersion) {
	errorExit(`the file ${NVMRC_FILE} is empty. Please specify a valid Node.js version.`);
}

// Clean current Node version string (e.g., "v24.7.0" → "24.7.0")
const currentVersion = semver.clean(process.version);

console.log(`📦 Required Node.js version: ${requiredVersion}`);
console.log(`🖥️ Current Node.js version:  ${currentVersion}`);

if (!semver.satisfies(currentVersion, requiredVersion)) {
	errorExit(`Node.js version mismatch. Required: "${requiredVersion}", but running: "${currentVersion}".`);
}

console.log(`✅ Node.js version ${currentVersion} satisfies requirement ${requiredVersion}. Proceeding...`);
