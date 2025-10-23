import React from "react";
import Link from "next/link";
import s from "./iconTextLink.module.scss";
import cn from "@/lib/cn";
import type { IIconTextLinkProps } from "@/types";

export default function IconTextLink({
  href = "#",
  className,
  children,
  ...rest
}: IIconTextLinkProps) {
  const isInternalLink = href.startsWith("/") && !href.startsWith("//");

  if (isInternalLink) {
    return (
      <Link href={href} className={cn(s.iconTextLink, className)} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a className={cn(s.iconTextLink, className)} href={href} {...rest}>
      {children}
    </a>
  );
}
