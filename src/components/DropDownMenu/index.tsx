"use client"

import React, {
	useEffect,
	useRef,
	cloneElement,
	JSX,
	ReactElement, useState,
} from "react";

import cn from "@/lib/cn/index";

import s from "./DropDownMenu.module.scss";

// acceptable types of children
type TMenuRef =
	| ReactElement<JSX.IntrinsicElements["ul"], "ul">
	| ReactElement<JSX.IntrinsicElements["div"], "div">;

type TRef<T extends HTMLElement> = {
	ref: React.Ref<T>;
	className?: string;
	style?: React.CSSProperties;
};

const setProps = <T extends HTMLElement>({
	                                         ref,
	                                         className,
	                                         style,
	                                         ...rest
                                         }: TRef<T>) => {
	return {
		...(ref && { ref }),
		...(className && { className }),
		...(style && { style }),
		...rest,
	};
};

export default function DropDownMenu({
	                                     className,
	                                     style,
	                                     children,
	                                     ...rest
                                     }: {
	className?: string;
	style?: React.CSSProperties;
	children: TMenuRef;
}) {

	const divRef = useRef<HTMLDivElement>(null);
	const ulRef = useRef<HTMLUListElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const isDiv = children.type === "div";
	const menuRef = isDiv ? divRef : ulRef;


	useEffect(() => {
		const menuElem = menuRef.current;
		if (!menuElem) return;

		const parent = menuElem.parentElement;
		if (!parent) return;

		parent.style.position = "relative";

		const isTouchDevice = matchMedia('(hover: none)').matches;

		const handleClick = () => setIsOpen(prev => !prev);
		const handleEnter = () => setIsOpen(true);
		const handleLeave = () => setIsOpen(false);

		if (isTouchDevice) {
			parent.addEventListener("click", handleClick);
		} else {
			parent.addEventListener("mouseenter", handleEnter);
			parent.addEventListener("mouseleave", handleLeave);
		}

		return () => {
			if (isTouchDevice) {
				parent.removeEventListener("click", handleClick);
			} else {
				parent.removeEventListener("mouseenter", handleEnter);
				parent.removeEventListener("mouseleave", handleLeave);
			}
		};
	}, []); // пустой deps — обработчики назначаются один раз

	// selecting cloneElement by type
	if (isDiv) {
		return cloneElement(
			children as ReactElement<JSX.IntrinsicElements["div"], "div">,
			setProps<HTMLDivElement>({
				ref: divRef,
				className: cn(
					children.props.className,
					isOpen ? `${s.dropMenu} ${s.menuOpen}` : s.dropMenu,
					className
				),
				style,
				...rest,
			})
		);
	}

	return cloneElement(
		children as ReactElement<JSX.IntrinsicElements["ul"], "ul">,
		setProps<HTMLUListElement>({
			ref: ulRef,
			className: cn(
				children.props.className,
				isOpen ? `${s.dropMenu} ${s.menuOpen}` : s.dropMenu,
				className
			),
			style,
			...rest,
		})
	);
}

/*
export default function DropDownMenu({
	                                     className,
	                                     style,
	                                     children,

	                                     //TODO: ...rest
                                     }: {
	className?: string;
	style?: string;
	children: TMenuRef; //! only one JSX Element "ul" or "div"
}) {

	const divRef = useRef<HTMLDivElement>(null);
	const ulRef = useRef<HTMLUListElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	console.log("children: ", children);

	// to figure out "div" or "ul"
	const isDiv = children.type === "div";
	const menuRef = isDiv ? divRef : ulRef;
	useEffect(() => {
		const menuElem = menuRef.current;

		if (!menuElem) {
			console.warn("at DropDownMenu useEffect: no ref of the menu is taken...")
			return;
		}

		//adding default styles settings...
		menuElem.classList.add(s.dropMenu);

		//adding received className
		if (className && className.length > 0) {
			menuElem.classList.add(className);
		}

		if (style) {
			menuElem.style = style;
		}

		const parent = menuElem.parentElement;
		if (parent) {
			parent.style.position = "relative";

			parent.onmouseenter = () => {
				setIsOpen(true)
			}

			parent.onmouseleave = () => {
				setIsOpen(false)
			}

			parent.onclick = () => {
				setIsOpen(!isOpen);
			}

/!*			parent.addEventListener("mouseenter", () => {
				menuElem.style.visibility = "visible";
				menuElem.style.opacity = "1";
				menuElem.style.transform = "translateY(0)";
			});
			parent.addEventListener("mouseleave", () => {
				menuElem.style.visibility = "hidden";
				menuElem.style.opacity = "0";
				menuElem.style.transform = "translateY(10px)";
			});*!/
		}

	}, [menuRef]);


	return cloneElement(children, {ref: menuRef});
}*/
