import process from "process";
import type {
  TNavItemStyles,
  TImageSizes,
  TBreakPoints,
  TImageSizeValue,
  IPageCms,
  TCmsPageMeta,
  TMetaHandler,
  TPageCmsDataHref,
  TPageCmsDataHrefMap,
  TOGImages,
  THeaderNavMenuItem,
  THeaderNavMenuNode,
  ICmsHeaderData,
  TNavImageWrapperProps,
} from "@/types";

import cn from "@/lib/cn";
import React, { type JSX } from "react";

import NavLink from "@/components/NavLink";

import s from "@/components/Header/header.module.scss";
import { type StaticImageData } from "next/image";
import { omit, getAbsPath } from "@/utils";
import { cmsPageDataList } from "@/lib/data";

/*** END OF IMPORTS ***/

/**
 * Retrieves a value from `process.env` by key, with optional transformation.
 *
 * @template T - The return type after applying the optional callback.
 * @param {string} envKey - The name of the environment variable to fetch.
 * @param {(value: string) => T} [cb] - Optional callback to transform the string value into another type.
 * @returns {(T | undefined)} The raw or transformed value if it exists, or `undefined` if the variable is not set.
 *
 * @example
 * // Get the raw value
 * const port = getLocalEnv('PORT');
 *
 * // Get the value parsed as a number
 * const portNumber = getLocalEnv('PORT', parseInt);
 */
export function getLocalEnv<T = string>(
  envKey: string,
  cb?: (value: string) => T,
): T | undefined {
  // Try to get the value from environment variables
  const envValue = process.env[envKey];

  // Warn if the variable is not defined
  if (!envValue) {
    console.warn(`process.env.${envKey} is undefined.`);
    return undefined;
  }

  // Apply the callback if provided, otherwise return the raw string
  return cb ? cb(envValue) : (envValue as T);
}

/**
 * Converts an array of dynamic route segments (slug parameters)
 * into a normalized page href path string.
 *
 * For example:
 *   ["services", "design-and-build"] → "/services/design-and-build"
 *   undefined → "/"
 */
export const getPageHrefFromSlugParams = (page?: string[]) => {
  return "/" + (page?.join("/") || "");
};

/*** HEADER LOGO IMAGE ***/
export const buildLogoBlockImageData = (
  logoData: ICmsHeaderData["logoData"],
): TNavImageWrapperProps | null => {
  if (!logoData) return null;
  return {
    wrapperProps: {
      href: logoData.linkHref,
      rel: "noopener", //It disables new tab access to window.opener, protects against phishing
      "aria-label": "to the Main Page",
    },
    imageProps: logoData.imageData,
  };
};

/*** NAVIGATION ITEMS ***/

const sortTree = (nodes: THeaderNavMenuNode[]) => {
  nodes.sort((a, b) => a.order - b.order);
  nodes.forEach(node => node.children && sortTree(node.children));
};

/**
 * Builds a hierarchical navigation tree from a flat list of menu items.
 *
 * Each item with a `parentId` is attached as a child to its parent node,
 * forming a nested structure suitable for rendering multi-level navigation menus.
 *
 * Steps:
 * 1. Creates a lookup map of all items by ID.
 * 2. Connects child items to their parent nodes.
 * 3. Collects root-level items (where `parentId` is null).
 * 4. Sorts each level by the `order` property.
 *
 * @param {THeaderNavMenuItem[]} items - Flat array of navigation menu items.
 * @returns {THeaderNavMenuNode[]} Hierarchical tree of menu nodes, sorted by order.
 */
export const buildHeaderNavMenuTree = (
  items: THeaderNavMenuItem[],
): THeaderNavMenuNode[] => {
  const map: Record<string, THeaderNavMenuNode> = {};
  const roots: THeaderNavMenuNode[] = [];

  // 1️⃣ creating a map of all elements
  items.forEach(item => {
    map[item.id] = { ...item };
  });

  // 2️⃣ forming a tree of navigation nodes
  items.forEach((item: THeaderNavMenuItem) => {
    if (item.parentId) {
      const parentItem = map[item.parentId];

      if (parentItem) {
        parentItem.children = parentItem.children || [];
        parentItem.children.push(map[item.id]);
      } else {
        console.warn(
          `[buildHeaderNavMenuTree]: referencing to unavailable parentId ${item.parentId}. Omitting...`,
        );
      }
    } else {
      roots.push(map[item.id]);
    }
  });

  // 3️⃣ sorting by order
  sortTree(roots);
  return roots;
};

export const renderHeaderNavMenu = (
  data: THeaderNavMenuNode[],
  classNameData: TNavItemStyles,
): JSX.Element => {
  const { className, activeClassName } = classNameData;
  const navItems: JSX.Element[] = [];

  for (const item of data) {
    const { id, label, href, children } = item;

    if (href) {
      navItems.push(
        <li key={id}>
          <NavLink
            href={href}
            className={className}
            activeClassName={activeClassName}
            aria-label={`Go to ${label}`}
            tabIndex={0}
          >
            {label}
          </NavLink>
        </li>,
      );
    } else if (href === null && children && children.length > 0) {
      navItems.push(
        <li
          key={id}
          className={className} //<li> with the type "node" will take the styles of NavLink component
          style={{
            position: "relative", //getNavMenu writes position: "relative"
            cursor: "default",
          }}
        >
          {label}

          {renderHeaderNavMenu(children, classNameData)}
        </li>,
      );
    } else {
      // Optional for dev
      console.warn(`${id} with ${label} is omitted with not proper data...`);
    }
  }

  return <ul>{navItems}</ul>;
};

export function getSpans(textItems: string[]) {
  const lastIndex = textItems.length - 1;

  return textItems.map((textItem, index) => {
    if (index === lastIndex) {
      //if the last item in the list...
    }

    return (
      <span
        key={`span-${index}`}
        className={cn(s.addressText, index === lastIndex && s.addressTextBoarded)}
      >
        {textItem}
      </span>
    );
  });
}

/***  CMS PAGES DATA  ***/

export const getCmsPageDataMapByHref = (): Map<TPageCmsDataHref, IPageCms> => {
  return new Map<TPageCmsDataHref, IPageCms>(
    cmsPageDataList.map(pageCms => {
      return [pageCms.attributes.href, pageCms];
    }),
  );
};

/*** CACHING MAP for [getPageHrefByLabel] ***/

/*let hrefByLabelMap: Map<TPagesLabel, TPagesHrefMapValue> | null = null;
let hrefMapCreatedAt: number | null = null;*/

const TTL_MS = getLocalEnv("NEXT_PUBLIC_TTL_MS", val => parseInt(val, 10)) ?? 1800000;

//TODO: to delete getPageHrefByLabel
/*export const getPageHrefByLabel = (label: string, cmsPageDataList: IPageCms[]) => {
  const now = Date.now();
  const _label = label.toLowerCase();

  const isCacheExpired =
    !hrefByLabelMap || !hrefMapCreatedAt || now - hrefMapCreatedAt > TTL_MS;

  if (isCacheExpired) {
    hrefByLabelMap = getPagesHrefMapByLabel(cmsPageDataList);

    hrefMapCreatedAt = now;
  }

  if (!hrefByLabelMap) {
    throw new Error(
      `[getPageHrefByLabel]: hrefByLabelMap is null with label: ${_label}... `,
    );
  }

  const hrefRes = hrefByLabelMap.get(_label);

  if (!hrefRes) {
    throw new Error(
      `[getPageHrefByLabel]: could not find href for the given label: ${label} lowered to ${_label}`,
    );
    //console.warn(`could not find href for the given label: ${label}`);
    //return undefined;
  }

  return hrefRes.href;
};*/

/*** CACHING REQUESTS IN [getCmsPageDataByHref] ***/

//making cache for each request with href path
const pageDataByHrefCache = new Map<string, IPageCms>();

//to clear cache...
export const clearPageDataCache = () => {
  pageDataByHrefCache.clear();
};

let cmsPageDataMap: TPageCmsDataHrefMap | null = null;
let cmsPageDataMapCreatedAt: number | null = null;
export const getCmsPageDataByHref = async (
  pageHref: string,
  fakeDelay: number = 0,
): Promise<IPageCms | undefined> => {
  //console.log("pageHref from getCmsPageData: ", pageHref);

  if (pageDataByHrefCache.has(pageHref)) {
    //! fake getting data from CMS with "pageHref";
    return new Promise(resolve => {
      setTimeout(() => {
        /* console.log(
					`the pageHref: ${pageHref} was cashed before...:`,
					pageDataByHrefCache.get(pageHref),
				);*/

        resolve(pageDataByHrefCache.get(pageHref));
      }, fakeDelay);
    });
  }

  const now = Date.now();

  const isCacheExpired =
    !cmsPageDataMap || !cmsPageDataMapCreatedAt || now - cmsPageDataMapCreatedAt > TTL_MS;

  if (isCacheExpired) {
    cmsPageDataMap = getCmsPageDataMapByHref();
    cmsPageDataMapCreatedAt = now;
  }

  if (!cmsPageDataMap) {
    throw new Error(
      `[getCmsPageDataByHref]: cmsPageDataMap is null with pageHref: ${pageHref}... `,
    );
  }

  const pageData = cmsPageDataMap.get(pageHref);

  if (!pageData) {
    throw new Error(
      `[getCmsPageDataByHref]: Page Data with href: ${pageHref} not found...`,
    );
  }

  pageDataByHrefCache.set(pageHref, pageData);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(pageData);
    }, fakeDelay);
  });
};

/*** METADATA HELPERS ***/

export const getAlternateWithAbsolutePaths = (alternate: Record<string, string>) => {
  return Object.entries(alternate).reduce((acc, [key, relativePath]) => {
    return { ...acc, [key]: getAbsPath(relativePath) };
  }, {});
};

export const makeOgImageUrlsAbsolute = (images?: TOGImages): TOGImages | undefined => {
  if (!images) return undefined;

  const imageArray = Array.isArray(images) ? images : [images];

  return imageArray.map(img => {
    // If it's a string or URL, just wrap it in getAbsPath
    if (typeof img === "string" || img instanceof URL) {
      return getAbsPath(img.toString());
    }

    // Otherwise, we consider it to be an OGImageDescriptor
    return {
      ...img,
      url: getAbsPath(img.url.toString()),
    };
  });
};

export const normalizeCMSPageMeta = (
  meta: TCmsPageMeta,
  metaHandlers: Record<string, TMetaHandler>,
): TCmsPageMeta => {
  //TStrictMetaData must contain only Metadata keys
  return Object.entries(metaHandlers).reduce((acc, [key, handler]) => {
    if (key in acc) {
      return {
        ...handler(acc),
      };
    }
    return acc;
  }, meta);
};

/*** IMAGE WRAPPER ***/
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
export function getAspectRatio(
  width: number,
  src: string | StaticImageData,
  height?: number,
): string | undefined {
  //! Case 1: When src is a string (dynamic URL), we need both width and height from props
  if (typeof src === "string") {
    if (!height) {
      console.warn(
        `[ImageWrapper] src="${src}": Cannot calculate aspect ratio — 
				"height" is missing and "src" is not StaticImageData.`,
      );
      return undefined;
    }
    return (width / height).toFixed(4);
  }
  //! Case 2: When src is StaticImageData (e.g. imported with `next/image`), use its built-in width/height
  else {
    if (src.width && src.height) {
      return (src.width / src.height).toFixed(4);
    }
    // Fallback warning if StaticImageData lacks dimensions (very unlikely)
    console.warn(`[ImageWrapper] Invalid StaticImageData: Missing "src.width" or "src.height". 
		Cannot determine aspect ratio.`);
    return undefined;
  }
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
 * @param style - Optional user-defined styles to apply to the wrapper.
 * @param src - Either a string (dynamic image URL) or StaticImageData (with known dimensions).
 * @param width - Required width of the wrapper container (used in aspect ratio calculation).
 * @param height - Optional height of the wrapper (required if `src` is a string).
 *
 * @returns A `style` object safe to apply directly to a wrapper `<div>` around `<Image fill />`.
 */
export function getImageWrapperStyle(
  src: string | StaticImageData,
  width: number,
  height?: number,
  style?: React.CSSProperties | undefined,
): React.CSSProperties {
  // Calculate aspect ratio based on src and dimensions
  const aspectRatio = getAspectRatio(width, src, height);

  // Exclude layout-critical keys from user-defined style
  const cleanedStyle = omit(style ?? {}, ["position", "width", "aspectRatio"]);

  return {
    // Required for <Image fill />
    position: "relative",

    // Fixed container width
    width,

    // If aspectRatio could be calculated, include it
    // if no aspectRatio, the container will have only width and will not be visible in browser till CSS, if it is
    ...(aspectRatio ? { aspectRatio } : {}),

    // apply any custom user-defined styles (safe to override non-layout properties)
    ...cleanedStyle,
  };
}

function normalizeBreakPoint(breakPoint: TBreakPoints, value: TImageSizeValue): string {
  const [prefix, bp] = breakPoint.split("_"); // e.g. ["max", "1920"]
  return `(${prefix}-width: ${bp}px) ${value}`;
}

export function getImageSizes(breakPoints: TImageSizes): string | undefined {
  /**
   *! Object.entries() always returns an array of [string, unknown] pairs.
   * Even if the keys are strongly typed, TypeScript forgets about it.
   *! Solution: to use Object.keys for strict typification...
   */

  return breakPoints
    ? (Object.keys(breakPoints) as TBreakPoints[])
        .map(key => {
          const value = breakPoints[key];
          if (!value) {
            console.warn(
              `[getImageSizes] no breakPoints value at media: ${key}... sizes is "undefined"...`,
            );
            return undefined;
          }
          return normalizeBreakPoint(key, value);
        })
        .join(", ")
    : undefined;
}
