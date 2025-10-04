//todo: TO MAKE FAKE CMS DATA FOR ALL PAGES

import { IPageCms, TCmsPageMeta, TMetaHandler } from "@/types";
import { isSafeObject, getAbsPath, getAlternateWithAbsolutePaths } from "@/utils";

export const defaultBaseUrl = "https://autumngoldlandscapes.com";

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
        canonical: "/",
        keywords: ["Autumn Gold Landscapes", "retaining wall", "landscape architect"],
        og: {
          title: "Landscape Design & Hardscaping in Front Range Metro",
          description:
            "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
          url: "/",
          siteName: "Autumn Gold Landscapes",
          images: [
            {
              url: "/someimage.jpg",
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
              url: "/someimage.jpg",
              width: 1200,
              height: 630,
              alt: "Autumn Gold Landscapes OG image",
            },
          ],
        },
      },
      sitemapEntry: {
        url: "/",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
        //TODO: to add images...
        //images: [`/image1.jpg`],

        /*                videos: [
          {
            title: "video title",
            thumbnail_loc: `/thumb.jpg`,
            description: "Company intro",
          },
        ],*/

        /*        alternates: {
          languages: {
            en: "https://example.com/en",
            de: "https://example.com/de",
          },
        },*/
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
        canonical: "/about",
        keywords: ["Autumn Gold Landscapes", "Autumn Gold Landscapes history"],
      },
      sitemapEntry: {
        url: "/about",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/services/design-and-build",
        keywords: ["Autumn Gold Landscapes", "Design & Build outdoor"],
      },
      sitemapEntry: {
        url: "/services/design-and-build",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/services/xeriscape-experts",
        keywords: ["Autumn Gold Landscapes", "Xeriscape services", "xeriscaping"],
      },
      sitemapEntry: {
        url: "/services/xeriscape-experts",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/services/sprinkler-service",
        keywords: [
          "Autumn Gold Landscapes",
          "sprinkler service",
          "maintenance of sprinkler systems",
          "sprinkler systems",
          "installation of sprinkler systems",
          "design of sprinkler systems",
        ],
      },
      sitemapEntry: {
        url: "/services/sprinkler-service",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/portfolio/gallery",
        keywords: [
          "Autumn Gold Landscapes gallery",
          "Autumn Gold Landscapes portfolio",
          "Autumn Gold Landscapes images",
        ],
      },
      sitemapEntry: {
        url: "/portfolio/gallery",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/portfolio/before-after",
        keywords: ["Autumn Gold Landscapes portfolio before after"],
      },
      sitemapEntry: {
        url: "/portfolio/before-after",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/blog",
        keywords: ["Autumn Gold Landscapes blog", "Autumn Gold Landscapes posts"],
      },
      sitemapEntry: {
        url: "/blog",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
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
        canonical: "/contact",
        keywords: ["Autumn Gold Landscapes contacts", "Autumn Gold Landscapes address"],
      },
      sitemapEntry: {
        url: "/contact",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    },
    blocks: [
      {
        someKey: "someKey value",
      },
    ], //rest page content
  },
];

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

export const cmsPageMetaDefault: TCmsPageMeta = {
  title: "Landscape Design & Hardscaping in Front Range Metro",
  description:
    "Autumn Gold Landscapes has been serving the front range metro area since 1984. Our focus has always been on blending beautiful creativity with conservation and care for our environment. We have over 60 years combined experience with both certified landscape technicians and retaining wall experts on staff. A landscape architect will put your vision on paper and will provide detailed proposals for your project.",
  noIndex: true,
  noFollow: true,
};

