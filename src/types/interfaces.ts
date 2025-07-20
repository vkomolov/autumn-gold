
import React from "react";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface INavLinkProps extends React.ComponentProps<typeof Link> {
	href: string;
	exact?: boolean; // exact path match or "starts from ..."
	className?: string;
	replace?: boolean;
	activeClassName?: string; //is used when "active"
	children: React.ReactNode;
}

export interface IIconTextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	className?: string;
}

/**
 *! The StaticImport type is an internal Next.js type that describes the result of importing an image
 *! using import logo from "/logo.webp":
 * type StaticImport = {
 *   src: string;
 *   height: number;
 *   width: number;
 *   blurDataURL?: string;
 * }
 *
 *! style is omitted from TNavImageProps - style will be generated internally in NavImage
 */
export interface INavImageProps extends Omit<React.ComponentProps<typeof NavLink>, "children"> {
	src: StaticImport | string;
	alt: string;
	width: string;
	height: string;
	objectFit?: React.CSSProperties["objectFit"];
	sizes?: string;
}