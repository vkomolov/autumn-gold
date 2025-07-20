
import s from "./header.module.scss";
//as Header is a server component, LogoImg will be imported on a server side. It will not enlarge the client bundle...
//! import from "/public/..." is not allowed, as "/public" is used from the browser
import LogoImg from  "@/assets/images/logo/logo-autumn.webp";
import LogoAlccImg from  "@/assets/images/logo/alcc_tr.webp";
import { Mail as MailIcon, PhoneCall } from 'lucide-react';
import NavImage from "@/components/NavImage";
import {INavImageProps} from "@/types";
import IconTextLink from "@/components/IconTextLink";
import LogoBlock from "@/components/LogoBlock";
import clsx from "clsx";

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
const navImageProps: INavImageProps = {
	src: LogoImg, //statically loaded on server
	alt: "Logo",
	href: "/",
	width: "15em",
	height: "4.408em",
	sizes: "15em",
	objectFit: "cover",
	"aria-label": "Go to homepage", // 👈 native HTML-attribute
}

const navImageAlccProps: INavImageProps = {
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

const hrefMailTo = "mailto:agl@ag-landscape.com";
const hrefTel = "tel:+13034679619";
const telAriaLabel = "make a call to the master";
const email = "agl@ag-landscape.com";
const addressItems: string[] = [
	"4310 Youngfield St.",
	"Wheat Ridge, CO"
];

const getSpans = (textItems: string[]) => {
	const lastIndex = textItems.length - 1;

	return textItems.map((textItem, index) => {
		if (index === lastIndex) { //if the last item in the list...

		}

		return (
			<span
				key={`span-${index}`}
				className={clsx(
					s.addressText,
					index === lastIndex && s.addressTextBoarded
				)}
			>
				{textItem}
			</span>
		);
	})
};


export default function Header () {

	return (
		<div className={s.headerLayer}>
			<header className={s.header} role="banner">
				<LogoBlock
					{...{navImageProps}}
					textLinkHref={hrefMailTo}
				>
					<MailIcon className={s.icon_14}/>
					{ email }
				</LogoBlock>

				<div className={s.headerInfo}>
					<div className={s.contactsWrapper}>

						<div className={s.addressWrapper}>
							<IconTextLink
								href={hrefTel}
								aria-label={telAriaLabel}
								tabIndex={0}
								className={s.customFoxy}
							>
								<PhoneCall className={s.icon_14}/>
								303-467-9619
							</IconTextLink>

							{
								getSpans(addressItems)
							}

						</div>
						<NavImage {...navImageAlccProps} />

					</div>
					<div className={s.navWrapper}>

					</div>
				</div>
			</header>
		</div>
	);
}