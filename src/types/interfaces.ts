import React from "react";
import Link from "next/link";
import { TPageCmsAttributes } from "@/types/types";

/////////

export interface INavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  exact?: boolean; // exact path match or "starts from ..."
  className?: string;
  replace?: boolean;
  activeClassName?: string; //is used when "active"
}

export interface IIconTextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export interface IContactsDataHeader {
  hrefMailTo: string;
  hrefTelTo: string;
  telLabel: string;
  telAriaLabel: string;
  email: string;
  addressItems: string[];
}

// The full page type that comes from the CMS
export interface IPageCms {
  id: string;
  attributes: TPageCmsAttributes;

  blocks: unknown[]; //rest page content
}

export interface IPageHref {
  id: string;
  label: string; //label for navigation menu
  href: string | null; //if null then it is the node with a list of typeof IPageHref
}

export interface INormalizedPagesHref {
  pagesHrefMap: Map<IPageHref["id"], IPageHref>;
  idList: IPageHref["id"][];
}

export interface INavItem extends IPageHref {
  type: "link" | "node";
  children: INavItem[] | null;
}
