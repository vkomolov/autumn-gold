import { getHrefbyLabelFromPagesHrefMap } from "@/utils";
import { pagesHrefMapByLabel } from "@/lib/data/pagesHrefList";
import { TImageSizes, TNavImageWrapperProps } from "@/types";

export const logoBlockImageData: TNavImageWrapperProps = {
  wrapperProps: {
    href: getHrefbyLabelFromPagesHrefMap(pagesHrefMapByLabel, "Home"),
    rel: "noopener", //It disables new tab access to window.opener, protects against phishing
    "aria-label": "to the Main Page",
  },
  imageProps: {
    src: "generated-logo-autumn.webp",
    alt: "Company Logo",
    width: 245,
    objectFit: "cover",
    fetchPriority: "high", //! HTML priority attribute
    priority: true,
    breakPoints: {
      min_1025: "245px",
      max_1024: "200px",
    } as TImageSizes,
  },
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
    } as TImageSizes,
  },
};
