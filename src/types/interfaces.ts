
import React from "react";
import Link from "next/link";


/////////

export interface INavLinkProps extends React.ComponentProps<typeof Link> {
	href: string;
	exact?: boolean; // exact path match or "starts from ..."
	className?: string;
	replace?: boolean;
	activeClassName?: string; //is used when "active"
}

export interface IIconTextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	className?: string;
}

export interface IContactsDataHeader {
	hrefMailTo: string,
	hrefTelTo: string,
	telLabel: string,
	telAriaLabel: string
	email: string,
	addressItems: string[]
}

export interface IPageHref {
	id: string;
	label: string;
	href: string | null;
}

export interface INavItem extends IPageHref {
	type: "link" | "node";
	children: INavItem[] | null;
}

export interface INormalizedPagesHref {
	pagesHrefMap: Map<IPageHref["id"], IPageHref>;
	idList: IPageHref["id"][];
}