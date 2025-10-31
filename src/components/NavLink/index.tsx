"use client";

import type { INavLinkProps } from "@/types";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * A wrapper around Next.js `<Link>` that adds active state handling.
 *
 * `NavLink` compares the current pathname (via `usePathname`) with its `href`
 * and applies an optional `activeClassName` when the link matches the current route.
 * This makes it easy to highlight the currently active navigation item.
 *
 * Features:
 * - Supports exact or "starts with" matching via the `exact` prop.
 * - Prevents navigation if the link is already active.
 * - Passes through all regular `<Link>` props and events.
 * @remarks
 * When `exact` is `true` (default), the link is considered active **only** if the current
 * pathname exactly equals its `href`.
 * When `exact` is `false`, the link is active if the current path **starts with** its `href`
 * (useful for sections like `/services` → `/services/design`).
 *
 * @component
 * @example
 * ```tsx
 * <NavLink href="/about" activeClassName="active">
 *   About Us
 * </NavLink>
 * ```
 */
export default function NavLink({
  href,
  exact = true,
  replace = false,
  className = "",
  activeClassName = "",
  children,
  ...rest
}: INavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) && pathname !== "/";

  return (
    <Link
      href={isActive ? "#" : href}
      className={
        isActive && activeClassName ? `${className} ${activeClassName}` : className
      }
      onNavigate={e => {
        if (isActive) {
          e.preventDefault();
          // Additional actions when trying to follow the active link could be here...
        }
      }}
      replace={replace} //or simply "replace"
      {...rest} // throwing style, id, aria-label etc...
    >
      {children}
    </Link>
  );
}
