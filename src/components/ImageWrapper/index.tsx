import React from 'react';
import Image, {StaticImageData} from "next/image";
import {TImageWrapperProps, TWrapperProps} from "@/types";
import {getImageSizes, getImageWrapperStyle, omit} from "@/utils"; //calculating Wrapper inline styles
import {imageMap} from "@/lib/generated/imageMap";

/* END OF IMPORTS */

/* --------------------------------------------------------------------------
 * ImageWrapper Component
 *
 * A wrapper around Next.js <Image> that provides:
 * - Automatic resolution of image sources (local StaticImageData or remote URL).
 * - Safe inline styles for the wrapper (aspectRatio, relative positioning, width).
 * - Responsive image sizes based on custom breakpoints.
 * - Separation of concerns between wrapperProps and imageProps.
 *
 * Restrictions:
 * - Wrapper styles are filtered to prevent overriding critical layout styles.
 * - Image props are sanitized (["fill", "sizes", "style"] are internally managed).
 *
 * For a detailed explanation, see documentation:
 * [docs/imageWrapper.md](./docs/imageWrapper.md)
 * -------------------------------------------------------------------------- */

/**
 * ImageWrapper
 *
 * @param wrapper - React element type for wrapping the image (e.g., "div", Link, or custom component).
 * @param wrapperProps - Additional props for the wrapper. Accepts:
 *   - `propStyle`: inline styles (except restricted keys).
 *   - any `aria-*` attributes or classNames.
 *   - Critical wrapper styles (position, width, aspectRatio) are injected automatically.
 * @param imageProps - Props for Next.js <Image>. Accepts:
 *   - `src`: either StaticImageData (imported image from imageMap) or string (public/CDN/CMS URL).
 *   - `alt`: required for accessibility.
 *   - `width` / `height`: numeric values (used when src is a string).
 *   ! sizes and imageProps.width must be in consistent units (px ↔ px, vw ↔ vw)
 *   - `objectFit`: CSS object-fit behavior. It is sent in imageProps.objectFit...
 *   - `breakPoints`: mapping of viewport breakpoints → sizes (for responsive behavior).
 *   - Other safe attributes are passed to <Image>.
 *
 * @returns A wrapped <Image> element with safe styles and responsive support.
 */
export default function ImageWrapper<
	P extends { style?: React.CSSProperties; children?: React.ReactNode } = Record<string, unknown
	>
>({
	wrapper: Wrapper,
	wrapperProps,
	imageProps,
}: TImageWrapperProps<P>){
	const {
		src,
		alt,
		width,
		height,
		objectFit,
		breakPoints,
		...restImageProps //! collect all other allowed attributes for <Image>
	} = imageProps;

	const {
		propStyle,
		...restWrapperProps
	} = wrapperProps ?? ({} as TWrapperProps<P>);

	// Detect whether src is a generated key for imageMap (StaticImageData).
	// "generated" prefix convention comes from imageMap auto-generation.
	const isStatic = src.startsWith("generated");

	// Prevent rendering if the given src key starts from "generated" but was not found in imageMap.
	if (isStatic && !imageMap[src as keyof typeof imageMap]) {
		console.warn(
			`[ImageWrapper] The generated image name "${src}" was not found in the imageMap.`
		);
		return null;
	}

	// Resolve actual image source (StaticImageData or string URL).
	const resolvedSrc: string | StaticImageData = isStatic ? imageMap[src as keyof typeof imageMap] : src;

	/**
	 * Build inline wrapper styles.
	 * - Includes relative positioning, width, aspect-ratio.
	 * - Preserves safe inline styles passed via propStyle (except restricted keys).
	 */
	const wrapperStyle = getImageWrapperStyle(resolvedSrc, width, height, propStyle);

	// Generate responsive sizes attribute if breakPoints are defined.
	//! sizes and imageProps.width are recommended to be in consistent units (px ↔ px, vw ↔ vw)
	const sizes = breakPoints && Object.keys(breakPoints).length
		? getImageSizes(breakPoints)
		: undefined;

	/**
	 * Remove restricted props from <Image> to avoid conflicts.
	 * - fill: always applied internally.
	 * - sizes: managed internally from breakPoints.
	 * - style: sanitized and only objectFit is allowed, but objectFit is sent as imageProps.objectFit.
	 */
	const restImagePropsCleaned = omit(
		restImageProps,
		["fill", "sizes", "style", "className"] //className is omitted to exclude critical css styles
	);

	// Remove restricted props from wrapper to enforce style control.
	const restWrapperPropsCleaned = omit(
		restWrapperProps as Record<string, unknown>,
		["style"]
	);

	return (
		<Wrapper
			style={wrapperStyle}
			{...(restWrapperPropsCleaned as unknown as P)}
		>
			<Image
				fill
				src={resolvedSrc}
				alt={alt}
				// if sizes is undefined, ensure it stays undefined instead of "undefined" string
				sizes={sizes || undefined}
				style={objectFit ? { objectFit: objectFit as React.CSSProperties["objectFit"] } : undefined}
				{...restImagePropsCleaned}
			/>
		</Wrapper>
	);
}