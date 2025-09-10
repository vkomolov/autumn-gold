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

//is used for getting href with label from the pagesHrefMapByLabel at @lib/data/pagesHrefList.ts
export function getHrefbyLabelFromPagesHrefMap(
  map: Map<string, string | null>,
  label: string,
): string {
  const labelLowered = label.toLowerCase();
  const res = map.get(labelLowered);
  if (!res) {
    console.warn(
      `[getHrefbyLabelFromPagesHrefMap]: no href found with label "${label}"... switched to "/"...`,
    );
  }
  return res || "/";
}
