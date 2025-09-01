import {IPageHref} from "@/types/interfaces";
import React, {CSSProperties, JSX, ReactElement} from "react";
import {imageMap} from "@/lib/generated/imageMap";

/* END OF IMPORTS */

export type TNavItemStyles = {
	className?: string; //basic className of NavLink
	activeClassName?: string; //active className of NavLink (when NavLink href === usePathname()
};

export type TLinkItem = {
	id: IPageHref["id"];
	children: TLinkItem[] | null;
}

// acceptable types of children
export type TMenuRef =
	| ReactElement<JSX.IntrinsicElements["ul"], "ul">
	| ReactElement<JSX.IntrinsicElements["div"], "div">;

export type TRef<T extends HTMLElement> = {
	ref: React.Ref<T>;
	className?: string;
	style?: React.CSSProperties;
};

// Keys from imageMap (auto-generated from /imagesStatic and located at @lib/genereated/imageMap.ts)
export type TLocalImageKeys = keyof typeof imageMap;

// Accept either a string path (e.g. CMS or /public) or a local key
export type TImageSource = string | TLocalImageKeys;

// Valid breakpoint keys
//TODO: `${string}${'px' | 'vw' | '%'}`
export type TBreakPoints =
	| "min_1921"
	| "max_1920"
	| "min_1441"
	| "max_1440"
	| "min_1281"
	| "max_1280"
	| "min_1025"
	| "max_1024"
	| "min_861"
	| "max_860"
	| "min_769"
	| "max_768"
	| "min_641"
	| "max_640"
	| "min_577"
	| "max_576"
	| "min_481"
	| "max_480"
	| "min_376"
	| "max_375"
	| "min_321"
	| "max_320";

// Sizes can be numeric (default: px), or string with unit
//! no "em", as "em" asks for loading CSS, which is later, then inline styles...
export type TImageSizeValue = number | `${number}${'px' | 'vw' | '%'}`;

// Mapping breakpoints → sizes
export type TImageSizes = Record<TBreakPoints, TImageSizeValue>;

const sample = {
	"min_1441": "25vw",
	"max_1440": "33.3vw",
	"max_1024": "50vw",
	"max_480": "100vw",
}

// Final shape of image data (used in CMS, UI configs, etc.)
export type TImageProps = {
	src: TImageSource;
	alt: string;

	// Required width for container, aspect ratio will be calculated
	width: number;

	// Optional height — required if src is a string (not StaticImageData)
	height?: number;

	objectFit?: React.CSSProperties['objectFit'];

	// Responsive sizes
	breakPoints?: TImageSizes;

	// Allow passing any other native <img> or <Image> props if needed
	[key: string]: unknown;
};

export type TImageWrapper =
	| keyof JSX.IntrinsicElements //"div", "a", "section", etc...
	| React.ComponentType<unknown>

export type TWrapperProps = {
	propStyle?: CSSProperties;  //adding optional inline style
	[key: string]: unknown; //The remaining properties can be also optional.
}

export type TImageWrapperProps = {
	wrapper: TImageWrapper;
	wrapperProps?: TWrapperProps;
	imageProps: TImageProps;
}