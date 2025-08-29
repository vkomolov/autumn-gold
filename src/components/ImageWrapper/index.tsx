import React, {JSX} from "react";
import Image, {StaticImageData} from "next/image";

type TWrapper =
	| keyof JSX.IntrinsicElements //"div", "a", "section", etc...
//TODO: to add type of Next Components (React Components)

/**
 * Calculates the aspect ratio (as a string) to be used in inline styles like `aspectRatio`.
 *
 * Supports two cases:
 *
 * 1. If `src` is a string (e.g. dynamic URL from CMS or API), both `width` and `height` must be provided manually.
 * 2. If `src` is a StaticImageData object (e.g. from `import example from "../image.jpg"`),
 *    the intrinsic dimensions from `src.width` and `src.height` are used.
 *
 * If height is missing in case 1 or the StaticImageData object is malformed,
 * a warning is logged and the function returns `undefined`.
 *
 * @param width - The known or desired width of the image container.
 * @param src - Either a dynamic string URL or StaticImageData object.
 * @param height - (Optional) The known height of the image, required if `src` is a string.
 *
 * @returns The calculated aspect ratio as a string (e.g. "3.0000"), or `undefined` if it cannot be determined.
 */
function getAspectRatio(
	width: number,
	src: string | StaticImageData,
	height?: number,
): string | undefined {
	//! Case 1: When src is a string (dynamic URL), we need both width and height from props
	if (typeof src === "string" ) {
		if (!height) {
			console.warn(
				`[ImageWrapper] src="${src}": Cannot calculate aspect ratio — 
				"height" is missing and "src" is not StaticImageData.`
			)
			return undefined;
		}
		return (width/height).toFixed(4);
	}
	//! Case 2: When src is StaticImageData (e.g. imported with `next/image`), use its built-in width/height
	else {
		if (src.width && src.height) {
			return (src.width/src.height).toFixed(4);
		}
		// Fallback warning if StaticImageData lacks dimensions (very unlikely)
		console.warn(`[ImageWrapper] Invalid StaticImageData: Missing "src.width" or "src.height". 
		Cannot determine aspect ratio.`);
		return undefined;
	}
}

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
function omit<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> {
	const clone = { ...obj };
	for (const key of keys) {
		delete clone[key];
	}
	return clone;
}

/**
 * Generates a reliable inline `style` object for an image wrapper
 * that works seamlessly with `<Image fill />` in Next.js.
 *
 * This function enforces layout-critical properties like `position`, `width`,
 * and (optionally) `aspectRatio`, while allowing custom user-defined styles
 * to be merged in — excluding any overrides for those critical properties.
 *
 * It's especially useful in components that dynamically build wrapper styles
 * based on image dimensions or props.
 *
 * - `position: 'relative'` is always applied to ensure proper positioning for `Image fill`
 * - `width` is required and defines the visual width of the container
 * - `aspectRatio` is calculated if possible (based on `src`, `width`, and `height`)
 * - Any custom styles (`propsStyle`) are merged, except for restricted layout keys
 *
 * @param propsStyle - Optional user-defined styles to apply to the wrapper.
 * @param src - Either a string (dynamic image URL) or StaticImageData (with known dimensions).
 * @param width - Required width of the wrapper container (used in aspect ratio calculation).
 * @param height - Optional height of the wrapper (required if `src` is a string).
 *
 * @returns A `style` object safe to apply directly to a wrapper `<div>` around `<Image fill />`.
 */
function getWrapperStyle(
	propsStyle: React.CSSProperties | undefined,
	src: string | StaticImageData,
	width: number,
	height?: number,
): React.CSSProperties {
	// Calculate aspect ratio based on src and dimensions
	const aspectRatio = getAspectRatio(width, src, height);

	// Exclude layout-critical keys from user-defined style
	const cleanedStyle = omit(
		propsStyle ?? {},
		['position', 'width', 'aspectRatio']
	);

	return {
		// Required for <Image fill />
		position: "relative",

		// Fixed container width
		width,

		// If aspectRatio could be calculated, include it
		...(aspectRatio ? { aspectRatio } : {}),

		// apply any custom user-defined styles (safe to override non-layout properties)
		...cleanedStyle,
	}
}

export default function ImageWrapper({
	wrapper: Wrapper,
	wrapperProps,
	imageProps,
}: {
	wrapper: TWrapper;
	wrapperProps: Record<string, unknown>;
	imageProps: Record<string, unknown>;
}) {
	const {style} = wrapperProps;
	const {src, } = imageProps;

	return (
		<Wrapper >
			<Image src={} alt={} />
		</Wrapper>
	);
}