import React from "react";
import s from "./iconTextLink.module.scss";
import clsx from "clsx";
import {IIconTextLinkProps} from "@/types";

export default function IconTextLink({
	                                     href = "#",
	                                     className,
	                                     children,
	                                     ...rest
                                     }: IIconTextLinkProps) {
	return (
		<a
			className={clsx(
				s.iconTextLink,
				className ?? ""
			)}
			href={href}
			{...rest}
		>
			{/*<MailIcon className={s.icon_14}/>*/}
			{children}
		</a>
	);

}