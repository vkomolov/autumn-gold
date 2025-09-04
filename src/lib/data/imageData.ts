import {getHrefbyLabelFromPagesHrefMap} from "@/utils";
import {pagesHrefMapByLabel} from "@/lib/data/pagesHrefList";
import {TImageSizes, TLogoBlockImageData} from "@/types";

export const logoBlockImageData: TLogoBlockImageData = {
	wrapperProps: {
		href: getHrefbyLabelFromPagesHrefMap(pagesHrefMapByLabel, "Home"),
		propStyle: {border: "1px solid red"}
	},
	imageProps: {
		src: "generated-landscapes_hero.webp",
		alt: "LogoBlock",
		width: 245,
		objectFit: "cover",
		breakPoints: {
			max_1440: "245px",
			max_1024: "180px"
		} as TImageSizes
	}
}