"use client"

import {INavLinkProps} from "@/types";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function NavLink({
	                                href,
	                                exact = true,
	                                replace = false,
	                                className = "",
	                                activeClassName,
	                                children,
	                                ...rest
                                }: INavLinkProps) {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href) && pathname !== "/";

	return (
		<Link
			href={isActive ? "#" : href}
			className={isActive && activeClassName
				? `${className} ${activeClassName}`
				: className
			}
			onNavigate={(e) => {
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