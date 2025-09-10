import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TMenuRef } from "@/types";

export function useDropDownMenu(childrenElem: TMenuRef) {
  const divRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isDiv = useMemo(() => childrenElem.type === "div", [childrenElem.type]);
  const menuRef = useMemo(() => (isDiv ? divRef : ulRef), [isDiv]);

  const handleClick = useCallback(() => setIsOpen(prev => !prev), []);
  const handleEnter = useCallback(() => setIsOpen(true), []);
  const handleLeave = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const menuElem = menuRef.current;
    if (!menuElem) return;

    const parent = menuElem.parentElement;
    if (!parent) return;

    parent.style.position = "relative";

    const isTouchDevice = matchMedia("(hover: none)").matches;

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
  }, [menuRef, handleClick, handleEnter, handleLeave]);

  return {
    isDiv,
    menuRef,
    isOpen,
  };
}
