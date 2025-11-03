import React from "react";

import IconTextLink from "@/components/IconTextLink";
import ImageWrapper from "@/components/ImageWrapper";
import NavLink from "@/components/NavLink";

import { getNavImageWrapperProps } from "@/lib/data";
import { getSpans } from "@/utils";
import type { IContactsHeaderData, INavLinkProps } from "@/types";

import s from "./contactsWrapper.module.scss";
import { FaPhoneVolume } from "react-icons/fa6";

/* END OF IMPORTS */

type TContactsDataHeaderRest = Omit<
  IContactsHeaderData,
  "hrefMailTo" | "email" | "mailToAriaLabel"
>;

export default async function ContactsWrapper({
  data,
}: {
  data: TContactsDataHeaderRest;
}) {
  const { hrefTelTo, telToAriaLabel, telLabel, addressItems } = data;

  const { wrapperProps, imageProps } =
    (await getNavImageWrapperProps("partnerData")) ?? {};

  //!= null works for both null and undefined...
  const hasImageData = wrapperProps != null && imageProps != null;

  return (
    <div className={s.contactsWrapper}>
      <div className={s.addressWrapper}>
        <IconTextLink
          href={hrefTelTo}
          aria-label={telToAriaLabel}
          tabIndex={0}
          className="iconTextLink"
        >
          <FaPhoneVolume size={14} className="icon-sm" />

          {telLabel}
        </IconTextLink>

        <div className={s.addressSpanWrapper}>{getSpans(addressItems)}</div>
      </div>
      {hasImageData && (
        <ImageWrapper<INavLinkProps>
          wrapper={NavLink}
          wrapperProps={wrapperProps}
          imageProps={imageProps}
        />
      )}
    </div>
  );
}
