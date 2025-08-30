import NavLink from "@/components/NavLink";
import Image from "next/image";
import {INavImageProps} from "@/types";
import React from "react";


export default function NavImage({
	href,
	src,
	alt,
	width,
	height,
	objectFit,
	style = {},
	className,
	exact = true, //! exact path match or "starts from ..."
	replace = false, //! replace from history or false
	sizes = `${width}`, //! default sizes at Image
	...rest
  }: INavImageProps) {

	const navLinkStyles: React.CSSProperties = {
		position: "relative",
		width,
		height,
		...style,
	};

	/**
	 * position: "relative",
	 * width: "245px", // important: dimensions should be written inline, to omit time for css loading
	 * height: "72px"  // also, inline dimensions avoid CLS (Cumulative Layout Shift) when Image has "fill"
	 */
	return (
		<NavLink
			href={href}
			exact={exact} //
			replace={replace}
			style={navLinkStyles}
			className={className || ""}
			{...rest}
		>
			<Image
				src={src}
				priority={true} //! Next priority attribute
				//alt="Autumn Gold Landscapes Services"
				alt={alt || "image link"}
				fetchPriority={"high"} //! HTML priority attribute
				fill
				//width={245}
				//height={72}
				style={{objectFit: objectFit || "cover"}}
				sizes={sizes}
			/>
		</NavLink>
	);
}