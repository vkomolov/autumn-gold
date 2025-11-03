import React from "react";
import Link from "next/link";
import s from "./iconTextLink.module.scss";
import cn from "@/lib/cn";
import type { IIconTextLinkProps } from "@/types";

/**
 * A reusable React component that renders a styled text link with an optional icon.
 * It automatically determines whether to use Next.js <Link> (for internal links)
 * or a regular <a> tag (for external links).
 *
 * @component
 * @param props - The component props.
 * @param props.href - The link target URL. Internal links start with '/'.
 * @param props.className - Optional additional class names.
 * @param props.children - The link content (text and/or icon).
 * @returns The rendered link element with proper styling and behavior.
 *
 * @example
 * <IconTextLink href="/about">
 *   <Icon name="info" /> About Us
 * </IconTextLink>
 */
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
