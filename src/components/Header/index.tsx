import { contactsDataHeader } from "@/lib/data";
import type { IContactsDataHeader } from "@/types";
import { getNavItems } from "@/utils";

import ContactsWrapper from "@/components/ContactsWrapper";
import NavWrapper from "@/components/NavWrapper";
import LogoBlock from "@/components/LogoBlock";
import { FaEnvelope } from "react-icons/fa6";
import { getLogoBlockImageData } from "@/lib/data";

import s from "./header.module.scss"; // for className={s.someClass}

/* END OF IMPORTS */

/*const hrefMailTo = "mailto:agl@ag-landscape.com";
const hrefTel = "tel:+13034679619";
const hrefMailTo = "mailto:agl@ag-landscape.com"
const telAriaLabel = "make a call to the master";
const email = "agl@ag-landscape.com";
const addressItems: string[] = [
	"4310 Youngfield St.",
	"Wheat Ridge, CO"
];*/

export default async function Header() {
  const { hrefMailTo, email, ...rest } = contactsDataHeader as IContactsDataHeader;
  const { wrapperProps, imageProps } = getLogoBlockImageData();
  const navLinksData = await getNavItems();

  return (
    <div className={s.headerLayer}>
      <header className={s.header} role="banner">
        <LogoBlock
          wrapperProps={wrapperProps}
          imageProps={imageProps}
          textLinkHref={hrefMailTo}
        >
          <FaEnvelope size={14} className="icon-sm" />
          {email}
        </LogoBlock>

        <div className={s.headerInfo}>
          <ContactsWrapper data={rest} />
          <NavWrapper data={navLinksData} />
        </div>
      </header>
    </div>
  );
}
