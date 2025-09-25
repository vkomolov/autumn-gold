import {
  INavItem,
  TNavItemStyles,
  TImageSizes,
  TBreakPoints,
  TImageSizeValue,
  IPageHref,
  TLinkItem,
  INormalizedPagesHref,
  IPageCms,
  TCmsPageMeta,
  TMetaHandler,
} from "@/types";

import cn from "@/lib/cn";
import React, { JSX } from "react";

import NavLink from "@/components/NavLink";

import s from "@/components/Header/header.module.scss";
import { StaticImageData } from "next/image";
import { omit, getAbsPath } from "@/utils";
import { cmsPageDataMapByHref } from "@/lib/data";

/* END OF IMPORTS */

export function getNavMenu(data: INavItem[], stylesData: TNavItemStyles): JSX.Element {
  const { className, activeClassName } = stylesData;

  const navItems: JSX.Element[] = [];

  for (const item of data) {
    const { id, label, type, href, children } = item;

    if (type === "link" && href) {
      navItems.push(
        <li key={id}>
          <NavLink
            href={href}
            className={className}
            activeClassName={activeClassName}
            aria-label={`to ${label}`}
            tabIndex={0}
          >
            {label}
          </NavLink>
        </li>,
      );
      continue;
    }

    if (type === "node" && children) {
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

          {/*! <DropDownMenu style={} className={} ...other props of HTMLDivElement, HTMLUListElement >  */}

          {getNavMenu(children, stylesData)}

          {/*					<DropDownMenu >
						{getNavMenu(children, stylesData)}
					</DropDownMenu>*/}
        </li>,
      );
    } else {
      // Optional for dev
      console.warn(`${id} with ${label} is omitted with not proper data...`);
    }
  }

  return <ul>{navItems}</ul>;
}

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

export function getNavItems(
  pagesHrefList: IPageHref[],
  navlinkList: TLinkItem[],
): INavItem[] {
  const { pagesHrefMap } = getPagesHrefNormalized(pagesHrefList);

  return getNavItemList(pagesHrefMap, navlinkList);
}

function getNavItemList(pagesMap: Map<string, IPageHref>, navlinkList: TLinkItem[]) {
  const auxList = [];

  for (const linkData of navlinkList) {
    const itemData = pagesMap.get(linkData.id);
    const children: TLinkItem[] | null = linkData.children ?? null;

    if (itemData) {
      const navItem: INavItem = {
        ...itemData,
        type: children ? "node" : "link",
        children: children ? getNavItemList(pagesMap, children) : null,
      };
      auxList.push(navItem);
    } else {
      console.warn(`getNavItemList: missing page data for id: "${linkData.id}"`);
    }
  }

  return auxList;
}

function getPagesHrefNormalized(pages: IPageHref[]): INormalizedPagesHref {
  const pagesHrefMap: INormalizedPagesHref["pagesHrefMap"] = new Map(
    pages.map(page => [page.id, page]),
  );
  const idList: INormalizedPagesHref["idList"] = [...pagesHrefMap.keys()];
  return {
    pagesHrefMap,
    idList,
  };
}

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

/* Metadata handling */

//making cache for each request with href path
const pageDataByHrefCache = new Map<string, IPageCms>();

//to clear cache...
export const clearPageDataCache = () => {
  pageDataByHrefCache.clear();
};

export const getCmsPageData = async (
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

  const pageData = cmsPageDataMapByHref.get(pageHref);

  if (!pageData) {
    console.warn(`Page Data with href: ${pageHref} not found`);

    return undefined;
  }

  pageDataByHrefCache.set(pageHref, pageData);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(pageData);
    }, fakeDelay);
  });
};

export const getAlternateWithAbsolutePaths = (alternate: Record<string, string>) => {
  return Object.entries(alternate).reduce((acc, [key, relativePath]) => {
    return { ...acc, [key]: getAbsPath(relativePath) };
  }, {});
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
