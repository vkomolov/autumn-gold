import {IPageData} from "@/types/interfaces";
import React, {JSX, ReactElement} from "react";

export type TNavItemStyles = {
	className?: string; //basic className of NavLink
	activeClassName?: string; //active className of NavLink (when NavLink href === usePathname()
	//liClassName?: string;
};

export type TLinkItem = {
	id: IPageData["id"];
	children: TLinkItem[] | null;
}

// acceptable types of children
export type TMenuRef =
	| ReactElement<JSX.IntrinsicElements["ul"], "ul">
	| ReactElement<JSX.IntrinsicElements["div"], "div">;

export type TRef<T extends HTMLElement> = {
	ref: React.Ref<T>;
	className?: string;
	style?: React.CSSProperties;
};