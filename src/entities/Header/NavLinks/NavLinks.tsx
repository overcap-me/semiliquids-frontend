"use client";

import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import styles from "./NavLinks.module.css";
import { publicLinks } from "./list";
import { useHeaderMenu } from "./useHeaderMenu";
import { MyProfile } from "@/entities/Header/User/MyProfile";
import { ROUTE_PATHS } from "@/shared/routes";
import type { UserResponse } from "@/types/schema/user/profile";
import { useCompareContext } from "@/entities/compare/context";

type TProps = {
  isAuth: boolean;

  /* Mobile adaptive */
  isActive: boolean;

  onCloseMenu: () => void;

  user: UserResponse;

  // TODO: Fix type
  protectedItems: unknown[];
};

export const NavLinks: FC<TProps> = ({
  isAuth,
  isActive,
  user,
  onCloseMenu,
  protectedItems,
}) => {
  const pathname = usePathname();
  const { compareUrl, count } = useCompareContext();

  const isActiveLink = (href: string) => {
    if (href !== "/") {
      return pathname.includes(href);
    }

    if (href === "/" && pathname.startsWith(ROUTE_PATHS.FUND_BY_ID.PATH)) {
      return true;
    }

    return pathname === href;
  };

  if (!isAuth) {
    return (
      <nav
        className={clsx(styles.NavWrapper, stylesLayout.Gap_40, {
          [styles.Visible]: isActive,
        })}
      >
        {publicLinks.map((nav) => (
          <ButtonOrLink
            key={nav.id}
            className={clsx(styles.Link, {
              [styles.Active]: isActiveLink(nav.href),
            })}
            asTag="a"
            pointDirection="bottom"
            href={nav.href}
            onClick={onCloseMenu}
          >
            <Typography fontWeight="400" as="h6">
              {nav.title}
            </Typography>
          </ButtonOrLink>
        ))}
      </nav>
    );
  }

  return (
    <nav
      className={clsx(styles.NavWrapper, stylesLayout.Gap_40, {
        [styles.Visible]: isActive,
      })}
    >
      {Object.entries(protectedItems.data.items).map(([id, nav]) => (
        <ButtonOrLink
          key={id}
          className={clsx(styles.Link, {
            [styles.Active]: isActiveLink(
              nav?.type === "page" ? `/${nav.data.url}` : nav.data.url
            ),
          })}
          asTag="a"
          href={nav?.type === "page" ? `/${nav.data.url}` : nav.data.url}
          pointDirection="bottom"
          onClick={onCloseMenu}
        >
          <Typography fontWeight="400" as="h6">
            {nav.label}
          </Typography>
        </ButtonOrLink>
      ))}
      <ButtonOrLink
        className={clsx(styles.Link, {
          [styles.Active]: isActiveLink(ROUTE_PATHS.FAVORITES.BASE),
        })}
        asTag="a"
        href={ROUTE_PATHS.FAVORITES.BASE}
        pointDirection="bottom"
        onClick={onCloseMenu}
      >
        <Typography fontWeight="400" as="h6">
          My list
        </Typography>
      </ButtonOrLink>
      <ButtonOrLink
        className={clsx(styles.Link, {
          [styles.Active]: isActiveLink(ROUTE_PATHS.COMPARE.BASE),
        })}
        asTag="a"
        href={{
          pathname: ROUTE_PATHS.COMPARE.BASE,
          query: { q: compareUrl },
        }}
        pointDirection="bottom"
        onClick={onCloseMenu}
      >
        <Typography fontWeight="400" as="h6">
          Compare{" "}
          <Typography
            color="active"
            className={styles.compareCount}
            size="xxs"
            as="span"
          >
            {count}
          </Typography>
        </Typography>
      </ButtonOrLink>
      <MyProfile user={user} />
    </nav>
  );
};

const MoblieButton = ({
  onClick,
  isActive,
}: {
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.MobileButton, { [styles.Active]: isActive })}
      type="button"
    >
      <span />
    </button>
  );
};

export const NavLinksWithMobileButton: FC<Pick<TProps, "user" | "items">> = ({
  user,
  items,
}) => {
  const { visible, handleToggle, handleCloseAll } = useHeaderMenu();

  return (
    <>
      <NavLinks
        isActive={visible}
        isAuth={!!user}
        user={user}
        onCloseMenu={handleCloseAll}
        protectedItems={items}
      />
      <MoblieButton isActive={visible} onClick={handleToggle} />
    </>
  );
};
