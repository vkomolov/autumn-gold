
import React from "react";
import s from "./LogoBlock.module.scss";
import NavImage from "@/components/NavImage";
import IconTextLink from "@/components/IconTextLink";
import {INavImageProps} from "@/types";

/**
 *@ Description INavImageProps
 *  src: imported image (StaticImport) or src path: string
 * 	alt: alt value for the image
 * 	ariaLabel: aria-label for the link
 * 	href: target href for the Link
 * 	width: dimensions... the inner image will fill the area
 * 	height: dimensions... the inner image will fill the area
 * 	objectFit: "cover", //image layout
 * 	//className: s.logoLink //if additional className is used
 * 	//style: {} //inline styling of NavLink if necessary
 *! other html/next attributes can be written to Link as ...rest
 *
 * @example
 * const navImageProps: INavImageProps = {
 * 	src: LogoImg, //statically loaded on server
 * 	alt: "Logo",
 * 	href: "/",
 * 	width: "15em",
 * 	height: "4.408em",
 * 	sizes: "15em",
 * 	objectFit: "cover",
 * 	"aria-label": "Go to homepage", // 👈 native HTML-attribute
 * }
 *
/**/


export default function LogoBlock({
	                                  navImageProps,
	                                  textLinkHref = "#",
	                                  children,
                                  }: {
	navImageProps: INavImageProps;
	textLinkHref: string;
	children: React.ReactNode;
}) {

	return (
		<div className={s.logoWrapper}>
			<NavImage {...navImageProps} />

			<IconTextLink
				href={textLinkHref}
			>
				{children}
			</IconTextLink>

		</div>
	);
}