

import {PhoneCall} from "lucide-react";

import NavImage from "@/components/NavImage";
import IconTextLink from "@/components/IconTextLink";

import {navImageAlccProps} from "@/lib/data";
import {getSpans} from "@/utils";
import {IContactsDataHeader} from "@/types";

import s from "./contactsWrapper.module.scss";

type TContactsDataHeaderRest = Omit<IContactsDataHeader, 'hrefMailTo' | 'email'>;

export default function ContactsWrapper({data}: {
	data: TContactsDataHeaderRest;
}) {
	const {
		hrefTelTo,
		telAriaLabel,
		telLabel,
		addressItems,
	} = data;


	return (
		<div className={s.contactsWrapper}>

{/*			<div className={s.addressWrapper}>
				<IconTextLink
					href={hrefTelTo}
					aria-label={telAriaLabel}
					tabIndex={0}
					className="iconTextLink"
				>
					<PhoneCall className="icon-sm" />

					{ telLabel }

				</IconTextLink>

				<div className={s.addressSpanWrapper}>
					{
						getSpans(addressItems)
					}
				</div>

			</div>
			<NavImage {...navImageAlccProps} className={s.alccLogo} />*/}

		</div>
	);
}