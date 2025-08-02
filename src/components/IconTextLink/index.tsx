import React from "react";
import s from "./iconTextLink.module.scss";
import cn from "@/lib/cn";
import {IIconTextLinkProps} from "@/types";

export default function IconTextLink({
	                                     href = "#",
	                                     className,
	                                     children,
	                                     ...rest
                                     }: IIconTextLinkProps) {
	return (
		<a
			className={cn(
				s.iconTextLink,
				className
			)}
			href={href}
			{...rest}
		>
			{/*<MailIcon className={s.icon_14}/>*/}
			{children}
		</a>
	);

}