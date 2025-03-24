import { ButtonOrLink } from "@/components/ButtonOrLink";
import styles from "./AsideNavigationOfPage.module.css";
import { Typography } from "@/components/Typography";
import clsx from "clsx";
import stylesLayout from "@/styles/module/Layout.module.css";
import type { FC } from "react";

export const AsideNavigationOfPage: FC<{
  menu: unknown[];
  activeId: string | null;
}> = ({ menu, activeId }) => {
  return (
    <aside className={styles.Block}>
      <div
        className={clsx(styles.Body, stylesLayout.Grid, stylesLayout.Gap_20)}
      >
        {menu?.map((el) => (
          <ButtonOrLink
            key={el.id}
            className={clsx(styles.Item, {
              [styles.Sub]: el.tag === "H3",
            })}
            color="primary-70"
            pointDirection="left"
            asTag="a"
            href={`#${el.id}`}
            isActive={activeId === el.id}
          >
            <Typography>{el.label}</Typography>
          </ButtonOrLink>
        ))}
      </div>
    </aside>
  );
};
