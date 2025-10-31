"use strict"

//! Import the Promise-based version of the 'fs' module for using async/await with file system operations
import {promises as fs} from "fs";
import path from "path";
import fg from "fast-glob";

//TODO:
//! read docs/video-strategy.md

//! Path to the directory of Mock CMS Data with the videos to be imported...
const VIDEOS_DIR = path.resolve("./videos");

//! Path to the output file
const OUTPUT_FILE = path.resolve("./src/lib/generated/videosMap.ts");

//! Video extensions we support
const SUPPORTED_EXTENSIONS = ["mp4"]; //TODO: to add video formats

//! Searching for the files in the VIDEOS_DIR

const run = async () => {
	try {

	}

	catch (err) {
		console.error("❌ Failed to write file videosMap.ts", err);
	}
}