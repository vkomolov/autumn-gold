import {INavItem, INormalizedPages, IPageData, TLinkItem} from "@/types";

export function getNavItems(
	pagesData: IPageData[],
	navlinkList: TLinkItem[]
): INavItem[] {
	const { pagesMap } = getPagesDataNormailized(pagesData);

	return getNavItemList(pagesMap, navlinkList);
}


function getNavItemList(pagesMap: Map<string, IPageData>, navlinkList: TLinkItem[]) {

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

function getPagesDataNormailized(pages: IPageData[]): INormalizedPages {
	const pagesMap: INormalizedPages["pagesMap"] = new Map(pages.map(page => [page.id, page]));
	const idList: INormalizedPages["idList"] = [...pagesMap.keys()];
	return {
		pagesMap,
		idList,
	};
}
