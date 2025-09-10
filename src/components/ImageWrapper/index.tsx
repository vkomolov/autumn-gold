import React from "react";
import Image, { StaticImageData } from "next/image";
import { TImageWrapperProps, TWrapperProps } from "@/types";
import { getImageSizes, getImageWrapperStyle, omit } from "@/utils"; //calculating Wrapper inline styles
import { imageMap } from "@/lib/generated/imageMap";

/* END OF IMPORTS */

export default function ImageWrapper<
  P extends { style?: React.CSSProperties; children?: React.ReactNode } = object,
>({ wrapper: Wrapper, wrapperProps, imageProps }: TImageWrapperProps<P>) {
  const {
    src,
    alt,
    width,
    height,
    objectFit,
    breakPoints,
    ...restImageProps //! collect all other allowed attributes for <Image>
  } = imageProps;

  const { style, ...restWrapperProps } = wrapperProps ?? ({} as TWrapperProps<P>);

  // Detect whether src is a generated key for imageMap (StaticImageData).
  // "generated" prefix convention comes from imageMap auto-generation.
  const isStatic = src.startsWith("generated");

  // Prevent rendering if the given src key starts from "generated" but was not found in imageMap.
  if (isStatic && !imageMap[src as keyof typeof imageMap]) {
    console.warn(
      `[ImageWrapper] The generated image name "${src}" was not found in the imageMap.`,
    );
    return null;
  }

  // Resolve actual image source (StaticImageData or string URL).
  const resolvedSrc: string | StaticImageData = isStatic
    ? imageMap[src as keyof typeof imageMap]
    : src;

  /**
   * Build inline wrapper styles.
   * - Includes relative positioning, width, aspect-ratio.
   * - Preserves safe inline styles passed via propStyle (except restricted keys).
   */
  const wrapperStyle = getImageWrapperStyle(resolvedSrc, width, height, style);

  // Generate responsive sizes attribute if breakPoints are defined.
  //! sizes and imageProps.width are recommended to be in consistent units (px ↔ px, vw ↔ vw)
  const sizes =
    breakPoints && Object.keys(breakPoints).length
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
    ["fill", "sizes", "style", "className"] as (keyof typeof restImageProps)[], //className is omitted to exclude critical css styles
  );

  // Remove restricted props from wrapper to enforce style control.
  const restWrapperPropsCleaned = omit(restWrapperProps, [
    "style",
  ] as (keyof typeof restWrapperProps)[]);

  return (
    <Wrapper style={wrapperStyle} {...(restWrapperPropsCleaned as P)}>
      <Image
        fill
        src={resolvedSrc}
        alt={alt}
        // if sizes is undefined, ensure it stays undefined instead of "undefined" string
        sizes={sizes || undefined}
        style={
          objectFit
            ? { objectFit: objectFit as React.CSSProperties["objectFit"] }
            : undefined
        }
        {...restImagePropsCleaned}
      />
    </Wrapper>
  );
}
