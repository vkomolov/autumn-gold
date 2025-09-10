import { INavItem, IPageHref, TLinkItem } from "@/types";
import { getNavItems } from "@/utils";

export const pagesHrefList: IPageHref[] = [
  {
    id: "1",
    label: "Home",
    href: "/",
  },
  {
    id: "2",
    label: "About Us",
    href: "/about",
  },
  {
    id: "3",
    label: "Services",
    href: null,
  },
  {
    id: "4",
    label: "Design & Build",
    href: "/services/design-and-build",
  },
  {
    id: "5",
    label: "Xeriscape Experts",
    href: "/services/xeriscape-experts",
  },
  {
    id: "6",
    label: "Sprinkler Service",
    href: "/services/sprinkler-service",
  },
  {
    id: "7",
    label: "Gallery",
    href: "/portfolio/gallery",
  },
  {
    id: "8",
    label: "Before & After",
    href: "/portfolio/before-after",
  },
  {
    id: "9",
    label: "Portfolio",
    href: null,
  },
  {
    id: "10",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "11",
    label: "Contact",
    href: "/contact",
  },
];

export const pagesHrefMapByLabel = new Map<string, string | null>(
  pagesHrefList.map(({ label, href }) => [label.toLowerCase(), href]),
);

export const navlinkList: TLinkItem[] = [
  {
    id: "1",
    children: null,
  },
  {
    id: "2",
    children: null,
  },
  {
    id: "3",
    children: [
      {
        id: "4",
        children: null,
      },
      {
        id: "5",
        children: null,
      },
      {
        id: "6",
        children: null,
      },
    ],
  },
  {
    id: "9",
    children: [
      {
        id: "7",
        children: null,
      },
      {
        id: "8",
        children: null,
      },
    ],
  },
  {
    id: "10",
    children: null,
  },
  {
    id: "11",
    children: null,
  },
] as const;

export const navLinksData: INavItem[] = getNavItems(pagesHrefList, navlinkList);

/* EXAMPLE OF FAKE DATA from API|CMS
export const navLinksData: INavItem[] = [
	{
		id: nanoid(8),
		type: "link",
		label: "Home",
		href: "/",
		children: null,

	},
	{
		id: nanoid(8),
		type: "link",
		label: "About Us",
		href: "/about",
		children: null,
	},
	{
		id: nanoid(8),
		type: "node",
		label: "Services",
		href: null,
		children: [
			{
				id: nanoid(8),
				type: "link",
				label: "Design & Build",
				href: "/services/design-and-build",
				children: null,
			},
			{
				id: nanoid(8),
				type: "link",
				label: "Xeriscape Experts",
				href: "/services/xeriscape-experts",
				children: null,
			},
			{
				id: nanoid(8),
				type: "link",
				label: "Sprinkler Service",
				href: "/services/sprinkler-service",
				children: null,
			},
		]
	},
	{
		id: nanoid(8),
		type: "node",
		label: "Portfolio",
		href: null,
		children: [
			{
				id: nanoid(8),
				type: "link",
				label: "Gallery",
				href: "/portfolio/gallery",
				children: null,
			},
			{
				id: nanoid(8),
				type: "link",
				label: "Before & After",
				href: "/portfolio/before-after",
				children: null,
			},
		],
	},
	{
		id: nanoid(8),
		type: "link",
		label: "Blog",
		href: "/blog",
		children: null,
	},
	{
		id: nanoid(8),
		type: "link",
		label: "Contact",
		href: "/contact",
		children: null,
	},
];*/
