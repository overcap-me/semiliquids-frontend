import type { FC, ReactNode } from "react";
import styles from "./Wrapper.module.css";
import clsx from "clsx";

type TProps = {
  children: ReactNode;
  type?: "default" | "large" | "extra";
};

export const Narrow: FC<TProps> = ({ children, type = "default" }) => {
  return (
    <div
      className={clsx(styles.Narrow, {
        [styles.Large]: type === "large",
        [styles.ExtraLarge]: type === "extra",
      })}
    >
      {children}
    </div>
  );
};
