import { getNavMenu } from "@/utils";
import type { INavItem, TNavItemStyles } from "@/types";
import s from "./navWrapper.module.scss";

export default function NavWrapper({ data }: { data: INavItem[] }) {
  const stylesData: TNavItemStyles = {
    className: s.navLink, //regular classname of <a>
    activeClassName: s.activeLink, //when usePathname() === href of the link
  };

  return (
    <nav className={s.navWrapper} aria-label="Navigation to pages">
      {getNavMenu(data, stylesData)}
    </nav>
  );
}
