
import { Mail as MailIcon } from 'lucide-react';

import LogoBlock from "@/components/LogoBlock";

import {contactsDataHeader, navImageProps, navLinksData } from "@/lib/data";
import {IContactsDataHeader} from "@/types"

import ContactsWrapper from "@/components/ContactsWrapper";
import NavWrapper from "@/components/NavWrapper";

import s from "./header.module.scss";

/*const hrefMailTo = "mailto:agl@ag-landscape.com";
const hrefTel = "tel:+13034679619";
const hrefMailTo = "mailto:agl@ag-landscape.com"
const telAriaLabel = "make a call to the master";
const email = "agl@ag-landscape.com";
const addressItems: string[] = [
	"4310 Youngfield St.",
	"Wheat Ridge, CO"
];*/


export default function Header () {
	const {
		hrefMailTo,
		email,
		...rest

	} = contactsDataHeader as IContactsDataHeader;

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

					<ContactsWrapper data={rest} />
					<NavWrapper data={navLinksData} />

				</div>

			</header>
		</div>
	);
}