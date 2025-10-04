import { INavLinkProps, IStrictOpenGraph, IStrictTwitter } from "@/types/interfaces";
import React, { JSX, ReactElement } from "react";
import { imageMap } from "@/lib/generated/imageMap";
import type { Metadata, MetadataRoute } from "next";

/* END OF IMPORTS */

/* META DATA */

type TChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type TSitemapVideoEntry = {
  title: string;
  thumbnail_loc: string;
  description?: string;
  [key: string]: unknown;
};

export type TSitemapEntry = Omit<MetadataRoute.Sitemap[number], "lastModified"> & {
  lastModified?: string | Date; //adding case with Date...
  //url: string;
  changeFrequency?: TChangeFrequency;
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
  images?: string[];
  videos?: TSitemapVideoEntry[];
};

export type TPageCmsAttributes = {
  href: string; // "", "about", "about/history"
  label: string; //"About","Services" .... for navigation links
  meta: TCmsPageMeta;
  sitemapEntry: TSitemapEntry;
};

export type TStrictMetaData = Omit<Metadata, "title" | "description"> & {
  //! making "title" and "description" to be required
  title: Metadata["title"]; //making required
  description: Metadata["description"]; //making required
};

export type TCmsPageMeta = TStrictMetaData & {
  //! adding custom meta which is not in Metadata
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
  og?: IStrictOpenGraph;
  twitter?: IStrictTwitter;

  alternate?: Record<string, string>; //'en-US': '/en/contact', 'es-ES': '/es/contact'

  // any future properties...
  [key: string]: unknown;
};

export type TMetaHandler = (cmsPageMeta: TCmsPageMeta) => TCmsPageMeta;

export type TNavItemStyles = {
  className?: string; //basic className of NavLink
  activeClassName?: string; //active className of NavLink (when NavLink href === usePathname()
};

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
export type TImageSizeValue = number | `${number}${"px" | "vw" | "%"}`;

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

export type TWrapperProps<P> = Omit<P, "style"> & {
  style?: React.CSSProperties;
  [key: `data-${string}`]: string | undefined;
};

export type TImageWrapperProps<P = object> = {
  wrapper: TImageWrapper<P>;
  imageProps: TImageProps;
  wrapperProps?: TWrapperProps<P>;
};

export type TNavImageWrapperProps = {
  wrapperProps: TWrapperProps<INavLinkProps>; //href is required...
  imageProps: TImageProps;
};

export type TLogoBlockProps = TNavImageWrapperProps & {
  textLinkHref: string;
  children: React.ReactNode;
};
