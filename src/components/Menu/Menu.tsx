"use client";

import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { ButtonOrLink } from "../ButtonOrLink";
import styles from "./Menu.module.css";
// import { useFiltersContext } from "@/app/(index)/contexts/FiltersProvider";

type TProps = {
  items: {
    id: string;
    href: string;
    title: string;
  }[];

  scroll?: boolean;
};

// TODO: refactor to move shared
export const Menu: FC<TProps> = ({ items, scroll }) => {
  const pathname = usePathname();

  return (
    <Wrapper
      classNameContainer={styles.Menu}
      bg={EBackgroundColor.Navigation}
      classNameWrapper={clsx(styles.Menu__Wrapper)}
    >
      {items.map((nav) => (
        <div key={nav.id} className={styles.Menu__Item}>
          <ButtonOrLink
            isActive={nav.href === pathname}
            asTag="a"
            color="active"
            scroll={scroll}
            href={{
              pathname: nav.href,
              // query: storeData ?? undefined,
            }}
            pointDirection="bottom"
          >
            <Typography as="h4">{nav.title}</Typography>
          </ButtonOrLink>
        </div>
      ))}
    </Wrapper>
  );
};
