import { renderHeaderNavMenu } from "@/utils";
import type { THeaderNavMenuNode, TNavItemStyles } from "@/types";
import s from "./navWrapper.module.scss";

export default function NavWrapper({ data }: { data: THeaderNavMenuNode[] }) {
  const stylesData: TNavItemStyles = {
    className: s.navLink, //regular classname of <a>
    activeClassName: s.activeLink, //when usePathname() === href of the link
  };

  return (
    <nav className={s.navWrapper} aria-label="Navigation to pages">
      {renderHeaderNavMenu(data, stylesData)}
    </nav>
  );
}
