import { baseUrl } from "@/lib/data";
import React from "react";

/**
 * Creates a shallow copy of an object with specific keys removed.
 *
 * Useful when you want to preserve most of an object’s properties,
 * but explicitly exclude a known set of keys — for example, to prevent
 * overriding critical props or styles.
 *
 * This function is especially handy when working with `style` objects in React,
 * where certain properties (like `position`, `width`, etc.) must be protected.
 *
 * @template T - The type of the source object.
 * @template K - The keys to exclude from the result.
 *
 * @param obj - The original object to copy.
 * @param keys - An array of keys to omit from the result.
 *
 * @returns A new object with the specified keys removed.
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
}

export const getAbsPath = (rel: string): string => {
  try {
    // If rel is already an absolute URL
    return new URL(rel).toString();
  } catch {
    // If rel is relative
    return new URL(rel, baseUrl).toString();
  }
};

export function isSafeObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeStyles(
  baseStyle: React.CSSProperties,
  overideStyle?: React.CSSProperties,
): React.CSSProperties {
  return {
    ...baseStyle,
    ...overideStyle,
  };
}

/**
 * Extracts the file name (basename) from a given URL string.
 *
 * @example
 * getFileNameFromUrl("https://example.com/images/photo.png");
 * // → "photo.png"
 *
 * @example
 * getFileNameFromUrl("https://example.com/path/to/file.mp4?token=abc");
 * // → "file.mp4"
 *
 * @param url - The full URL of the file.
 * @returns The file name extracted from the URL, or an empty string if extraction fails.
 */
export function getFileNameFromUrl(url: string): string {
  try {
    // Use the URL API to safely parse and extract the pathname
    const pathname = new URL(url).pathname;

    // Get the last segment after the last "/"
    const baseName = pathname.substring(pathname.lastIndexOf("/") + 1);

    // Warn if the filename could not be determined
    if (!baseName) {
      console.warn(`[getFileNameFromUrl]: Could not extract file name from URL: ${url}`);
    }

    return baseName;
  } catch {
    // Handle invalid URLs or unexpected input
    console.warn(`[getFileNameFromUrl]: Invalid URL provided: ${url}`);
    return "";
  }
}
