import { INavItem } from "@/types";
import { nanoid } from "nanoid";

//TODO: To use database for storing link data...

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
];