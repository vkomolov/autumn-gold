//todo: TO MAKE FAKE CMS DATA FOR ALL PAGES

import { IPageCms, TCmsPageMeta } from "@/types";
import path from "path";

export const cmsPageDataList: IPageCms[] = [
  {
    id: "1",

    attributes: {
      label: "Home", //label for navigation menu
      href: "/",
      meta: {
        title: "Landscape Design & Hardscaping in Front Range Metro",
        description:
          "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
        noIndex: true,
        noFollow: true,
        canonical: "/", //!Правильно ли прописывать так корневую страницу?

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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "2",
    attributes: {
      label: "About Us",
      href: "/about",
      meta: {
        title: "About Us",
        description:
          "Pavel Byezgachin in the sole owner and President of Autumn Gold Landscapes. He moved to Colorado with his family in 2016, with the intention to own and manage Autumn Gold Landscapes. He considered it to be a unique business with excellent reputation and potential.",
        noIndex: true,
        noFollow: true,
        canonical: "/about",

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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "3",
    attributes: {
      label: "Design & Build",
      href: "/services/design-and-build",
      meta: {
        title: "Design & Build",
        description:
          "We carry you through the whole process from conceptual design to manifesting your dream outdoor living space. We'll take the time to discover your priorities so we can create a space perfectly suited to your family's lifestyle. Our design staff is involved with your project  from start to completion to make sure the design intent is implemented. But it's better to see once. Please have a look at the GALLERY of our jobs.",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "4",
    attributes: {
      label: "Xeriscape Experts",
      href: "/services/xeriscape-experts",
      meta: {
        title: "Xeriscape Experts",
        description:
          "We have been aware of and have practiced xeriscape concepts from the start.  Creating a beautiful space with low water consumption can be easily obtained and will end up actually costing less in the future. We embrace the Best Management Practices developed by GreenCO, the seven principles of xeriscaping, and many of our staff have completed the Landscape Association’s training in Sustainable Landscapes. But it's better to see once. Please have a look at the GALLERY of our jobs.",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "5",
    attributes: {
      label: "Sprinkler Service",
      href: "/services/sprinkler-service",
      meta: {
        title: "Sprinkler Systems. Installation and Service",
        description:
          "The Ag-Landscape team of professionals have extensive experience in the design, installation and maintenance of sprinkler systems. More than 300 homeowners have relied on us to keep their yards green and healthy.",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "6",
    attributes: {
      label: "Gallery",
      href: "/portfolio/gallery",
      meta: {
        //todo: to make default suffix | Autumn Gold Landscapes Denver
        title: "Our Projects",
        description: "Some examples of our work, made for the Customers",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "7",

    attributes: {
      label: "Before & After",
      href: "/portfolio/before-after",
      meta: {
        title: "Before & After",
        description: "Some examples of our work, made for the Customers",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "8",

    attributes: {
      label: "Blog",
      href: "/blog",
      meta: {
        title: "Blog Posts",
        description: "Blog Posts and company events",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
  {
    id: "9",

    attributes: {
      label: "Contact",
      href: "/contact",
      meta: {
        title: "Contact",
        description:
          "Autumn Gold Landscapes Phone: 303.467.9619 Email: agl@ag-landscape.com",
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
      },
    },

    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
];

export const cmsPageDataMapByHref = new Map<string, IPageCms>(
  cmsPageDataList.map(pageCms => {
    return [pageCms.attributes.href, pageCms];
  }),
);

//making cache for each request with href path
const pageDataByHrefCache = new Map<string, IPageCms>();

export const clearPageDataCache = () => {
  pageDataByHrefCache.clear();
};
export const getCmsPageData = async (
  pageHref: string,
  fakeDelay: number = 1000,
): Promise<IPageCms | undefined> => {
  console.log("pageHref from getCmsPageData: ", pageHref);

  if (pageDataByHrefCache.has(pageHref)) {
    //! fake getting data from CMS with "pageHref";
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(
          `the pageHref: ${pageHref} was cashed before...:`,
          pageDataByHrefCache.get(pageHref),
        );

        resolve(pageDataByHrefCache.get(pageHref));
      }, fakeDelay);
    });
  }

  const pageData = cmsPageDataMapByHref.get(pageHref);

  if (!pageData) {
    console.warn(`Page Data with href: ${pageHref} not found`);

    return undefined;
  }

  console.log(`data with ${pageHref} is not still cashed... it will be cashed...`);
  console.log(pageData);

  pageDataByHrefCache.set(pageHref, pageData);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(pageData);
    }, fakeDelay);
  });
};
export const getAbsPath = (rel: string) => {
  const base = process.env.NEXT_PUBLIC_URL || "";

  console.log("[getAbsPath]: base: ", base);
  console.log("[getAbsPath]: rel: ", rel);

  const absUrl = new URL(rel, base).toString();

  console.log("absUrl: ", absUrl);

  return absUrl;
};

export const getAlternateWithAbsolutePaths = (alternate: Record<string, string>) => {
  return Object.entries(alternate).reduce((acc, [key, relativePath]) => {
    return { ...acc, [key]: getAbsPath(relativePath) };
  }, {});
};

type TMetaHandler = (cmsPageMeta: TCmsPageMeta) => TCmsPageMeta;

export function isSafeObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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

    let canonicalCleaned;
    if (canonical.startsWith("http")) {
      canonicalCleaned = canonical.replace(/^\/+/, "");
    } else {
      canonicalCleaned = getAbsPath(canonical);
    }

    return {
      ...rest,
      alternates: isSafeObject(rest.alternates)
        ? { ...rest.alternates, canonical: canonicalCleaned }
        : { canonical: canonicalCleaned },
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

export const cmsPageMetaDefault: TCmsPageMeta = {
  title: "Landscape Design & Hardscaping in Front Range Metro",
  description:
    "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
  noIndex: true,

  /**
   * metadata on favicons is general for all pages and is written in defaults at app/layout.tsx metadata
   */
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "AGL",
    "apple-mobile-web-app-capable": "yes",
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
};
