import type {
  TNavImageWrapperProps,
  ICmsHeaderData,
  IContactsHeaderData,
  THeaderNavMenuNode,
  TCmsNavImageData,
} from "@/types";
import { buildHeaderNavMenuTree, buildNavImageWrapperProps } from "@/utils";
import mockHeaderData from "@/lib/data/mockHeaderData";

/*** END OF IMPORTS ***/

//! MOCK CMS GETTERS to be replaced with real getters on fetching CMS Data
//!TODO: to cache CMS fetched data

// Determining the type of keys, whose values correspond to TCmsNavImageData
type TNavImageKeys<T> = Extract<
  keyof T,
  {
    [K in keyof T]: T[K] extends TCmsNavImageData | undefined ? K : never;
  }[keyof T]
>;

// applying to our interface...
type TCmsNavImageKeys = TNavImageKeys<ICmsHeaderData>;

// Making sure TCmsNavImageKeys does not contain undefined
type TNonNullableNavImageKeys = Exclude<TCmsNavImageKeys, undefined>;

// Now CmsNavImageKeys will contain all ICmsHeaderData keys whose values are of type TCmsNavImageData
// For example: 'logoData' | 'anotherImageData' | 'yetAnotherImageData'
export const getNavImageWrapperProps = async (
  dataKey: TNonNullableNavImageKeys, // Using a type without undefined
): Promise<TNavImageWrapperProps | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const pageHeaderData = mockHeaderData[dataKey];
      if (!pageHeaderData) return resolve(null);

      const navImageWrapperProps = buildNavImageWrapperProps(pageHeaderData);
      console.log("navImageWrapperProps: ", navImageWrapperProps);

      resolve(navImageWrapperProps);
    }, 0);
  });
};

export const getContactsHeaderData = async (): Promise<IContactsHeaderData | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { contactsData } = mockHeaderData;
      if (!contactsData) return resolve(null);

      resolve(contactsData);
    }, 0);
  });
};

export const getHeaderNavMenuTree = async (): Promise<THeaderNavMenuNode[] | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { navMenuData } = mockHeaderData;
      if (!navMenuData) return resolve(null);

      const navMenuTree = buildHeaderNavMenuTree(navMenuData);
      console.log("navMenuTree: ", navMenuTree);

      resolve(navMenuTree);
    }, 0);
  });
};
