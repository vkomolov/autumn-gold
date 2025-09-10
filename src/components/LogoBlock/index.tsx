import React from "react";
import s from "./LogoBlock.module.scss";
import IconTextLink from "@/components/IconTextLink";
import ImageWrapper from "@/components/ImageWrapper";
import NavLink from "@/components/NavLink";
import { INavLinkProps, TLogoBlockProps } from "@/types";

export default function LogoBlock({
  wrapperProps,
  imageProps,
  textLinkHref,
  children,
}: TLogoBlockProps) {
  const wrapperPropsStyled = {
    ...wrapperProps,
    className: s.logoBlock,
  };

  return (
    <div className={s.logoWrapper}>
      <ImageWrapper<INavLinkProps>
        wrapper={NavLink}
        wrapperProps={wrapperPropsStyled}
        imageProps={imageProps}
      />

      <IconTextLink
        href={textLinkHref}
        aria-label="mail to us"
        tabIndex={0}
        className="iconTextLink"
      >
        {children}
      </IconTextLink>
    </div>
  );
}
