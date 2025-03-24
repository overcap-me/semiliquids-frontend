import stylesWrapper from "@/components/Wrapper/Wrapper.module.css";

import { NavigationActionsServiceInstance } from "@/api/navigation/NavigationActionsService";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { ROUTE_PATHS } from "@/shared/routes";
import { NavLinksWithMobileButton } from "@/entities/Header/NavLinks";
import { clsx } from "clsx";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import styles from "./Header.module.css";
import { Logo } from "./Logo";

export const Header = async () => {
  const navs = await NavigationActionsServiceInstance.getNavigation("header");
  const user = await UserActionsServiceInstance.me();

  return (
    <header className={styles.Header}>
      <div className={clsx(stylesWrapper.Wrapper, styles.Wrapper)}>
        <ButtonOrLink
          asTag="a"
          href={{
            pathname: ROUTE_PATHS.INDEX.BASE,
            query: {
              page: 1,
            },
          }}
        >
          <Logo />
        </ButtonOrLink>

        <NavLinksWithMobileButton items={navs} user={user} />
      </div>
    </header>
  );
};
