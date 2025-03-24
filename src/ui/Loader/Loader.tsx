import stylesLayout from "@/styles/module/Layout.module.css";
import { type ClassValue, clsx } from "clsx";
import type { FC } from "react";
import styles from "./Loader.module.css";

type TProps = {
  size?: "xs" | "small" | "medium" | "large";
  theme?: "dark" | "light";
  className?: ClassValue;
};

export const Loader: FC<TProps> = ({ size = "medium", theme, className }) => {
  return (
    <div
      className={clsx(
        stylesLayout.Flex,
        stylesLayout.JCC,
        stylesLayout.AIC,
        className,
      )}
    >
      <div
        className={clsx(styles.Loader, {
          [styles.XSmall]: size === "xs",
          [styles.Small]: size === "small",
          [styles.Dark]: theme === "dark",
          [styles.Light]: theme === "light",
        })}
      />
    </div>
  );
};
