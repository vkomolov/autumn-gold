import {INavItem, INormalizedPages, IPageHref, TLinkItem} from "@/types";

export function getNavItems(
	pagesHrefList: IPageHref[],
	navlinkList: TLinkItem[]
): INavItem[] {
	const { pagesHrefMap } = getPagesDataNormailized(pagesHrefList);

	return getNavItemList(pagesHrefMap, navlinkList);
}


function getNavItemList(pagesMap: Map<string, IPageHref>, navlinkList: TLinkItem[]) {

	const auxList = [];

	for (const linkData of navlinkList) {
		const itemData = pagesMap.get(linkData.id);
		const children:TLinkItem[] | null = linkData.children?? null;

		if (itemData) {
			const navItem: INavItem = {
				...itemData,
				type: children ? "node" : "link",
				children: children ? getNavItemList(pagesMap, children) : null,
			}
			auxList.push(navItem);
		}
		else {
			console.warn(`getNavItemList: missing page data for id: "${linkData.id}"`);
		}
	}

	return auxList;
}

function getPagesDataNormailized(pages: IPageHref[]): INormalizedPages {
	const pagesHrefMap: INormalizedPages["pagesHrefMap"] = new Map(pages.map(page => [page.id, page]));
	const idList: INormalizedPages["idList"] = [...pagesHrefMap.keys()];
	return {
		pagesHrefMap,
		idList,
	};
}
