import type { TCmsPageMeta, TMetaHandler } from "@/types";
import {
  isSafeObject,
  getAbsPath,
  getAlternateWithAbsolutePaths,
  makeOgImageUrlsAbsolute,
  getLocalEnv,
} from "@/utils";
import mockPageDataList from "@/lib/data/mockPageDataList";

/*** END OF IMPORTS ***/

export const baseUrl =
  getLocalEnv("NEXT_PUBLIC_URL") || "https://autumngoldlandscapes.com";

//! MOCK CMS DATA
export const cmsPageMetaDefault: TCmsPageMeta = {
  title: "Landscape Design & Hardscaping in Front Range Metro",
  description:
    "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
  noIndex: true,
  noFollow: true,

  /**
   * metadata on favicons is general for all pages and is written in defaults at app/layout.tsx metadata
   */
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "AGL",
    "mobile-web-app-capable": "yes",
    "mask-icon": "/favicons/safari-pinned-tab.svg",
  },
  icons: {
    icon: [
      {
        //rel: "icon",
        url: "/favicons/icon.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        //rel: "icon",
        url: "/favicons/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: [
      {
        //rel: "apple-touch-icon",
        url: "/favicons/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  /*  OG and Twitter Data:  */
  og: {
    title: "Landscape Design & Hardscaping in Front Range Metro",
    description:
      "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
    url: "/",
    siteName: "Autumn Gold Landscapes",
    images: [
      {
        url: "/ogImages/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autumn Gold Landscapes OG image",
      },
    ],
  },
  twitter: {
    title: "Landscape Design & Hardscaping in Front Range Metro",
    description:
      "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
    images: [
      {
        url: "/ogImages/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autumn Gold Landscapes OG image",
      },
    ],
  },
};

export const metaHandlers: Record<string, TMetaHandler> = {
  noIndex: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { noIndex, ...rest } = cmsPageMeta;
    const indexValue = noIndex !== undefined ? !noIndex : false;

    return {
      ...rest,
      robots: isSafeObject(rest.robots)
        ? {
            ...rest.robots,
            index: indexValue,
          }
        : {
            index: indexValue,
          },
    };
  },
  noFollow: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { noFollow, ...rest } = cmsPageMeta;
    const noFollowValue = noFollow !== undefined ? !noFollow : false;

    return {
      ...rest,
      robots: isSafeObject(rest.robots)
        ? {
            ...rest.robots,
            follow: noFollowValue,
          }
        : {
            follow: noFollowValue,
          },
    };
  },
  canonical: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { canonical, ...rest } = cmsPageMeta;
    if (!canonical) {
      return cmsPageMeta;
    }
    const canonicalAbs = getAbsPath(canonical);

    return {
      ...rest,
      alternates: isSafeObject(rest.alternates)
        ? { ...rest.alternates, canonical: canonicalAbs }
        : { canonical: canonicalAbs },
    };
  },
  alternate: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { alternate, ...rest } = cmsPageMeta;

    if (!alternate) {
      return cmsPageMeta;
    }

    const alternateWithAbsolutePaths = getAlternateWithAbsolutePaths(alternate);

    return {
      ...rest,
      alternates: {
        ...(isSafeObject(rest.alternates) ? rest.alternates : {}),
        languages: {
          ...(isSafeObject(rest.alternates?.languages) ? rest.alternates.languages : {}),
          ...alternateWithAbsolutePaths,
        },
      },
    };
  },

  og: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { og, ...rest } = cmsPageMeta;
    if (!og) {
      return cmsPageMeta;
    }

    const { url, images, ...ogRest } = og;

    return {
      ...rest,
      openGraph: {
        //writing existing openGraph from previous meta handlers...
        ...(isSafeObject(rest.openGraph) ? rest.openGraph : {}),
        ...ogRest,
        url: getAbsPath(url),
        images: makeOgImageUrlsAbsolute(images),
      },
    };
  },
  twitter: (cmsPageMeta: TCmsPageMeta): TCmsPageMeta => {
    const { twitter, ...rest } = cmsPageMeta;
    if (!twitter) {
      return cmsPageMeta;
    }

    const { images, ...twRest } = twitter;

    return {
      ...rest,
      twitter: {
        ...twRest,
        images: makeOgImageUrlsAbsolute(images), //or undefined which will be ingored...
      },
    };
  },
};

//! MOCK CMS GETTERS to be replaced with real fetchers
export const getCmsPageMetaDefault = async (): Promise<TCmsPageMeta> => {
  const mainPageMeta = mockPageDataList[0]?.attributes.meta || {};

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ...mainPageMeta,
        ...cmsPageMetaDefault,
      });
    }, 0);
  });
};
