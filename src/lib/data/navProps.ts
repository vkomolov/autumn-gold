import {INavImageProps} from "@/types";

//as Header is a server component, LogoImg will be imported on a server side. It will not enlarge the client bundle...
//! import from "/public/..." is not allowed, as "/public" is used from the browser
import LogoImg from "@/assets/images/logo/logo-autumn.webp";
import LogoAlccImg from "@/assets/images/logo/alcc_tr.webp";

/**
 *@ Description
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
 */
export const navImageProps: INavImageProps = {
	src: LogoImg, //statically loaded on server
	alt: "Logo",
	href: "/",
	width: "15em",
	height: "4.408em",
	sizes: "15em",
	objectFit: "cover",
	"aria-label": "Go to homepage", // 👈 native HTML-attribute
}

export const navImageAlccProps: INavImageProps = {
	src: LogoAlccImg,
	alt: "ALCC Logo",
	href: "https://www.alcc.com/",
	width: "135px",
	height: "48px",
	sizes: "135px",
	objectFit: "cover",
	"aria-label": "go to ALCC",
	target: "_blank",
	rel: "nofollow noopener noreferrer"
}