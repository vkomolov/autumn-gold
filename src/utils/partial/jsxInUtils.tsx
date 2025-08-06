import {INavItem, TNavItemStyles} from "@/types";
import cn from "@/lib/cn";
import {JSX} from "react";

import NavLink from "@/components/NavLink";

import s from "@/components/Header/header.module.scss";

export function getNavMenu(data: INavItem[], stylesData: TNavItemStyles): JSX.Element {
	const {className, activeClassName} = stylesData;

	const navItems: JSX.Element[] = [];

	for (const item of data) {
		const {id, label, type, href, children} = item;

		if (type === "link" && href) {
			navItems.push(
				<li
					key={id}
				>
					<NavLink
						href={href}
						className={className}
						activeClassName={activeClassName}
						aria-label={`to ${label}`}
						tabIndex={0}
					>
						{label}
					</NavLink>
				</li>
			);
			continue;
		}

		if (type === "node" && children) {
			navItems.push(
				<li
					key={id}
					className={className} //<li> with the type "node" will take the styles of NavLink component
					style={{
						position: "relative", //getNavMenu writes position: "relative"
						cursor: "default"
					}}
				>
					{label}

					{/*! <DropDownMenu style={} className={} ...other props of HTMLDivElement, HTMLUListElement >  */}

					{getNavMenu(children, stylesData)}

					{/*					<DropDownMenu >
						{getNavMenu(children, stylesData)}
					</DropDownMenu>*/}

				</li>
			);
		} else {
			// Optional for dev
			console.warn(`${id} with ${label} is omitted with not proper data...`);
		}
	}

	return (
		<ul>
			{navItems}
		</ul>
	);
}

export function getSpans(textItems: string[]) {
	const lastIndex = textItems.length - 1;

	return textItems.map((textItem, index) => {
		if (index === lastIndex) { //if the last item in the list...

		}

		return (
			<span
				key={`span-${index}`}
				className={cn(
					s.addressText,
					index === lastIndex && s.addressTextBoarded
				)}
			>
				{textItem}
			</span>
		);
	})
}