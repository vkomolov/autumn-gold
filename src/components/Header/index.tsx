import { getContactsHeaderData, getHeaderNavMenuTree } from "@/lib/data";

import ContactsWrapper from "@/components/ContactsWrapper";
import NavWrapper from "@/components/NavWrapper";
import LogoBlock from "@/components/LogoBlock";
import { FaEnvelope } from "react-icons/fa6";
import { getLogoBlockImageData } from "@/lib/data";

import s from "./header.module.scss";
import type { IContactsHeaderData } from "@/types"; // for className={s.someClass}

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
  /**
   * We explicitly cast to `NonNullable<IContactsHeaderData>` to keep TypeScript happy:
   * - `getContactsHeaderData()` may return `null`, but we handle that case via `hasContactsData`
   * - the fallback `{}` is never rendered unless `hasContactsData` is true
   * - this ensures correct typing for `rest` (TContactsDataHeaderRest) without runtime risk
   */
  const { hrefMailTo, email, ...rest } =
    (await getContactsHeaderData()) ?? ({} as NonNullable<IContactsHeaderData>);
  const { wrapperProps, imageProps } = (await getLogoBlockImageData()) ?? {};

  const navLinksData = (await getHeaderNavMenuTree()) ?? [];

  //!= null works for both null and undefined...
  const hasLogo = wrapperProps != null && imageProps != null;

  const hasContactsData =
    hrefMailTo != null && email != null && Object.keys(rest).length > 0;

  return (
    <div className={s.headerLayer}>
      <header className={s.header} role="banner">
        {hasLogo && hasContactsData && (
          <LogoBlock
            wrapperProps={wrapperProps}
            imageProps={imageProps}
            textLinkHref={hrefMailTo}
          >
            <FaEnvelope size={14} className="icon-sm" />
            {email}
          </LogoBlock>
        )}

        <div className={s.headerInfo}>
          {hasContactsData && <ContactsWrapper data={rest} />}
          {navLinksData.length > 0 && <NavWrapper data={navLinksData} />}
        </div>
      </header>
    </div>
  );
}
