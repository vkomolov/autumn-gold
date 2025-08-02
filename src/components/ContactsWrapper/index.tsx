

import {PhoneCall} from "lucide-react";

import NavImage from "@/components/NavImage";
import IconTextLink from "@/components/IconTextLink";

import {navImageAlccProps} from "@/lib/data";

import s from "@/components/ContactsWrapper/contactsWrapper.module.scss";
import {getSpans} from "@/utils";
import {IContactsDataHeader} from "@/types";

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

			<div className={s.addressWrapper}>
				<IconTextLink
					href={hrefTelTo}
					aria-label={telAriaLabel}
					tabIndex={0}
					className={s.customFoxy}
				>
					<PhoneCall className={s.icon_14}/>

					{ telLabel }

				</IconTextLink>

				{
					getSpans(addressItems)
				}

			</div>
			<NavImage {...navImageAlccProps} />

		</div>
	);
}