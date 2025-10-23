"use client";

import React, { cloneElement, useMemo } from "react";
import type { JSX, ReactElement, RefObject } from "react";

import type { TRef, TMenuRef } from "@/types";
import cn from "@/lib/cn/index";
import s from "./DropDownMenu.module.scss";
import { useDropDownMenu } from "@/hooks";

const setProps = <T extends HTMLElement>({ ref, className, style, ...rest }: TRef<T>) => {
  return {
    ...(ref && { ref }),
    ...(className && { className }),
    ...(style && { style }),
    ...rest,
  };
};

// Generic function for cloning menu element with proper typing
const cloneMenuElement = <T extends "div" | "ul">(
  elementType: T,
  children: TMenuRef,
  menuRef: RefObject<HTMLDivElement | HTMLUListElement | null>,
  computedClassName: string,
  style?: React.CSSProperties,
  restProps?: Record<string, unknown>,
) => {
  // Base props common for both elements
  const baseProps = {
    className: computedClassName,
    style,
    ...(restProps && restProps),
  };

  if (elementType === "div") {
    const props = setProps<HTMLDivElement>({
      ref: menuRef as RefObject<HTMLDivElement>,
      ...baseProps,
    });
    return cloneElement(children as ReactElement<JSX.IntrinsicElements["div"]>, props);
  }

  const props = setProps<HTMLUListElement>({
    ref: menuRef as RefObject<HTMLUListElement>,
    ...baseProps,
  });
  return cloneElement(children as ReactElement<JSX.IntrinsicElements["ul"]>, props);
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
  const { isDiv, menuRef, isOpen } = useDropDownMenu(children);

  const computedClassName = useMemo(
    () =>
      cn(
        children.props.className,
        isOpen ? `${s.dropMenu} ${s.menuOpen}` : s.dropMenu,
        className,
      ),
    [children.props.className, isOpen, className],
  );

  return cloneMenuElement(
    isDiv ? "div" : "ul",
    children,
    menuRef,
    computedClassName,
    style,
    rest,
  );
}
