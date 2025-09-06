import {INavLinkProps, IPageHref} from "@/types/interfaces";
import React, {JSX, ReactElement} from "react";
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

// Sizes can be numeric or string with units ${'px' | 'vw' | '%'}`
//! no "em", as "em" asks for loading CSS, which is later, then inline styles...
export type TImageSizeValue = number | `${number}${'px' | 'vw' | '%'}`;

// Mapping breakpoints → sizes
export type TImageSizes = Partial<Record<TBreakPoints, TImageSizeValue>>;

// Final shape of image data (used in CMS, UI configs, etc.)
export type TImageProps = {
	src: TImageSource;
	alt: string;

	// Required width for container, aspect ratio will be calculated
	width: number;

	// Optional height — required if src is a string (not StaticImageData)
	height?: number;

	//objectFit?: React.CSSProperties['objectFit'];
	objectFit?: string; //objectFit is taken from imageProps.objectFit which is string

	// Responsive sizes
	breakPoints?: TImageSizes;

	// Allow passing any other native <img> or <Image> props if needed
	[key: string]: unknown;
};

export type TImageWrapper<P = object> =
	| keyof JSX.IntrinsicElements //"div", "a", "section", etc...
	| React.ComponentType<P & { children?: React.ReactNode }>;


/*export type TImageWrapper<P> =
	| keyof JSX.IntrinsicElements //"div", "a", "section", etc...
	| React.ComponentType<P>*/

export type TWrapperProps<P> = Omit<P, "style"> & { style?: React.CSSProperties };

/*export type TWrapperProps<P = Record<string, unknown>> = P & {
	propStyle?: CSSProperties;
};*/

/*export type TImageWrapperProps<W extends TImageWrapper<unknown>> = {
	wrapper: TImageWrapper<W>;
	imageProps: TImageProps;
	wrapperProps?: W extends React.ComponentType<infer P>
		? TWrapperProps<P>
		: W extends keyof JSX.IntrinsicElements
			? React.HTMLAttributes<W>
			: never;
}*/

/*export type TImageWrapperProps<P = object> = {
	wrapper: React.ComponentType<P & { children?: React.ReactNode }>;
	wrapperProps?: TWrapperProps<P>;
	imageProps: TImageProps;
} | {
	wrapper: keyof JSX.IntrinsicElements;
	wrapperProps?: React.HTMLAttributes<keyof JSX.IntrinsicElements>;
	imageProps: TImageProps;
}*/

export type TImageWrapperProps<P = object> = {
	wrapper: TImageWrapper<P>;
	imageProps: TImageProps;
	wrapperProps?: TWrapperProps<P>;
}



/*export type TImageWrapperProps<P = Record<string, unknown>> = {
	wrapper: TImageWrapper<P>;
	imageProps: TImageProps;
	wrapperProps?: TWrapperProps<P> & { children?: React.ReactNode };
}*/


/*export type TImageWrapperProps<P = Record<string, unknown>> = {
	wrapper: TImageWrapper<P>;
	imageProps: TImageProps;
	wrapperProps?: TWrapperProps<P>;
}*/


export type TLogoBlockProps = {
	imageProps: TImageProps;
	wrapperProps: TWrapperProps<INavLinkProps>; //href is required...
	textLinkHref: string;
	children: React.ReactNode;
}

export type TImageData = {
	wrapperProps: Record<string, unknown>,
	imageProps: TImageProps,
}

export type TLogoBlockImageData = Omit<TImageData, "wrapperProps"> & {
	wrapperProps: TWrapperProps<INavLinkProps>
};
