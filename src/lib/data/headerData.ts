import type {
  TNavImageWrapperProps,
  ICmsHeaderData,
  IContactsHeaderData,
  THeaderNavMenuNode,
} from "@/types";
import { buildHeaderNavMenuTree, buildLogoBlockImageData } from "@/utils";

/*** END OF IMPORTS ***/

//! MOCK CMS DATA
const cmsHeaderData: ICmsHeaderData = {
  logoData: {
    linkHref: "/",
    imageData: {
      src: "generated-logo-autumn.webp",
      alt: "Company Logo",
      width: 245,
      objectFit: "cover",
      fetchPriority: "high", //! HTML priority attribute
      priority: true,
      breakPoints: {
        min_1025: "245px",
        max_1024: "200px",
      },
    },
  },
  /**
   * @description
   * hrefMailTo - mailto params for email link "mailto:someEmail@some.com
   * hrefTel - params for telephone link "tel:......"
   */
  contactsData: {
    hrefMailTo: "mailto:agl@ag-landscape.com",
    hrefTelTo: "tel:+13034679619",
    telLabel: "303-467-9619",
    telAriaLabel: "make a call to the master",
    email: "agl@ag-landscape.com",
    addressItems: ["4310 Youngfield St.", "Wheat Ridge, CO"],
  },
  navMenuData: [
    { id: "1", label: "Home", href: "/", parentId: null, order: 1 },
    { id: "2", label: "About Us", href: "/about", parentId: null, order: 2 },
    { id: "3", label: "Services", href: null, parentId: null, order: 3 },
    {
      id: "4",
      label: "Design & Build",
      href: "/services/design-and-build",
      parentId: "3",
      order: 1,
    },
    {
      id: "5",
      label: "Xeriscape Experts",
      href: "/services/xeriscape-experts",
      parentId: "3",
      order: 2,
    },
    {
      id: "6",
      label: "Sprinkler Service",
      href: "/services/sprinkler-service",
      parentId: "3",
      order: 3,
    },
    { id: "7", label: "Portfolio", href: null, parentId: null, order: 7 },
    { id: "8", label: "Gallery", href: "/portfolio/gallery", parentId: "7", order: 1 },
    {
      id: "9",
      label: "Before & After",
      href: "/portfolio/before-after",
      parentId: "7",
      order: 2,
    },
    { id: "10", label: "Blog", href: "/blog", parentId: null, order: 8 },
    { id: "11", label: "Contact", href: "/contact", parentId: null, order: 9 },
  ],
};

//! MOCK CMS GETTERS to be replaced with real getters on fetching CMS Data
export const getLogoBlockImageData = async (): Promise<TNavImageWrapperProps | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { logoData } = cmsHeaderData;
      if (!logoData) return resolve(null);

      const logoBlockImageData = buildLogoBlockImageData(logoData);
      console.log("logoBlockImageData: ", logoBlockImageData);

      resolve(logoBlockImageData);
    }, 0);
  });
};

export const getContactsHeaderData = async (): Promise<IContactsHeaderData | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { contactsData } = cmsHeaderData;
      if (!contactsData) return resolve(null);

      resolve(contactsData);
    }, 0);
  });
};

export const getHeaderNavMenuTree = async (): Promise<THeaderNavMenuNode[] | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { navMenuData } = cmsHeaderData;
      if (!navMenuData) return resolve(null);

      const navMenuTree = buildHeaderNavMenuTree(navMenuData);
      console.log("navMenuTree: ", navMenuTree);

      resolve(navMenuTree);
    }, 0);
  });
};

export const alccImageData: TNavImageWrapperProps = {
  wrapperProps: {
    href: "https://www.alcc.com/",
    rel: "noopener", //It disables new tab access to window.opener, protects against phishing
    target: "_blank",
    "aria-label": "to the Partners` Site",
  },
  imageProps: {
    src: "generated-alcc_tr.webp",
    alt: "alcc.com",
    width: 135,
    objectFit: "cover",
    fetchPriority: "high", //! HTML priority attribute
    priority: true,
    breakPoints: {
      min_769: "135px",
      max_768: "100px",
    },
  },
};
