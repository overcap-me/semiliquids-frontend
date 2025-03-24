import type { FC } from "react";
import styles from "./Sort.module.css";
import { type ClassValue, clsx } from "clsx";

type SortProps = {
  direction: "asc" | "desc" | boolean;
  className?: ClassValue;
};

export const Sort: FC<SortProps> = ({ direction, className }) => {
  return (
    <div
      className={clsx(styles.box, {
        [styles[direction as "asc" | "desc"]]: direction,
      }, className)}
    >
      <i className={styles.t} />
      <i className={styles.b} />
    </div>
  );
};
