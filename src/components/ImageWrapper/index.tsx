import React from 'react';
import Image, {StaticImageData} from "next/image";
import {TImageWrapperProps} from "@/types";
import {getImageSizes, getImageWrapperStyle} from "@/utils"; //calculating Wrapper inline styles
import {imageMap} from "@/lib/generated/imageMap";

/* END OF IMPORTS */

export default function ImageWrapper({
	                                     wrapper: Wrapper,
	                                     wrapperProps = {},
	                                     imageProps,
                                     }: TImageWrapperProps
) {
	const {
		src,
		alt,
		width,
		height,
		objectFit,
		breakPoints,
		...restImageProps // any other attributes for Image (<img>)
	} = imageProps;

	const {propStyle, ...restWrapperProps} = wrapperProps;

	// Try to resolve src from imageMap if it's a key
	const isStatic = src.startsWith("generated");

	//checking the generated image name in imageMap, as src cannot be empty...
	if (isStatic && !imageMap[src as keyof typeof imageMap]) {
		console.warn(
			`[ImageWrapper] The generated image name "${src}" was not found in the imageMap.`
		);
		return null;
	}

	const resolvedSrc: string | StaticImageData = isStatic ? imageMap[src as keyof typeof imageMap] : src;

	//getting inline safe wrapper styles
	const wrapperStyle = getImageWrapperStyle(src, width, height, propStyle);

	// Generate responsive sizes if any
	const sizes = breakPoints ? getImageSizes(breakPoints) : undefined;

	return (
		<Wrapper style={wrapperStyle} {...restWrapperProps} >
			<Image
				fill
				src={resolvedSrc}
				alt={alt}
				sizes={sizes}
				style={objectFit ? { objectFit } : undefined}
				{...restImageProps}
			/>
		</Wrapper>
	);
}