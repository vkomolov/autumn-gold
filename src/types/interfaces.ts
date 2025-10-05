import React from "react";
import Link from "next/link";
import { TPageCmsAttributes } from "@/types/types";
import { type Metadata } from "next";

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
  href: string; //each page must have href
}

export interface INavItem extends Omit<IPageHref, "href"> {
  href: string | null;
  children: INavItem[];
}

export interface INavItemFlat extends Omit<INavItem, "children"> {
  children: string[];
}

// Тип для OG
export type TOG = Metadata["openGraph"];
// Тип для Twitter
export type TTW = Metadata["twitter"];

export type TOGImages = NonNullable<TOG>["images"];

export interface IStrictOpenGraph
  extends Omit<TOG, "title" | "description" | "url" | "siteName" | "images"> {
  //making them to be required...
  title: string;
  description: string;
  url: string;
  siteName: string;
  images?: TOGImages;
}

export interface IStrictTwitter extends Omit<TTW, "title" | "description" | "images"> {
  //making them to be required...
  title: string;
  description: string;
  images?: TOGImages;
}

/**
 * interface OpenGraph {
 *   title?: string;
 *   description?: string;
 *   url?: string;
 *   siteName?: string;
 *   images?: Array<{
 *     url: string;
 *     secureUrl?: string;
 *     type?: string;
 *     width?: number;
 *     height?: number;
 *     alt?: string;
 *   }>;
 *   locale?: string;
 *   type?: 'website' | 'article' | 'book' | 'profile' | string;
 * }
 *
 * interface Twitter {
 *   card?: 'summary' | 'summary_large_image' | 'app' | 'player';
 *   title?: string;
 *   description?: string;
 *   site?: string;
 *   creator?: string;
 *   images?: string[]; // массив строк (в отличие от openGraph.images)
 * }
 */
