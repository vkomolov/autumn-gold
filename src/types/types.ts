import {IPageData} from "@/types/interfaces";

export type TNavItemStyles = {
	className?: string; //basic className of NavLink
	activeClassName?: string; //active className of NavLink (when NavLink href === usePathname()
	//liClassName?: string;
};

export type TLinkItem = {
	id: IPageData["id"];
	children: TLinkItem[] | null;
}