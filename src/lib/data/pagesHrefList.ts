import type { INavItemFlat } from "@/types";

const navItemsIdList = ["1", "2", "3", "7", "10", "11"];
const navItemFlatList: INavItemFlat[] = [
  { id: "1", label: "Home", href: "/", children: [] },
  { id: "2", label: "About Us", href: "/about", children: [] },
  { id: "3", label: "Services", href: null, children: ["4", "5", "6"] },
  {
    id: "4",
    label: "Design & Build",
    href: "/services/design-and-build",
    children: [],
  },
  {
    id: "5",
    label: "Xeriscape Experts",
    href: "/services/xeriscape-experts",
    children: [],
  },
  {
    id: "6",
    label: "Sprinkler Service",
    href: "/services/sprinkler-service",
    children: [],
  },
  { id: "7", label: "Portfolio", href: null, children: ["8", "9"] },
  { id: "8", label: "Gallery", href: "/portfolio/gallery", children: [] },
  { id: "9", label: "Before & After", href: "/portfolio/before-after", children: [] },
  { id: "10", label: "Blog", href: "/blog", children: [] },
  { id: "11", label: "Contact", href: "/contact", children: [] },
];

//fake response from db or cms
export const getNavItemsIdList = async (): Promise<string[]> => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(navItemsIdList);
    }, 0);
  });
};

//fake response from db or cms
export const getNavItemFlatList = async (): Promise<INavItemFlat[]> => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(navItemFlatList);
    }, 0);
  });
};
