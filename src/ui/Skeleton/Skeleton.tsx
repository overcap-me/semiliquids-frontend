import type { ClassValue } from "clsx";
import styles from "./Skeleton.module.css";
import type { FC } from "react";
import clsx from "clsx";

type TProps = {
  className?: ClassValue;
};

export const Skeleton: FC<TProps> = ({ className }) => {
  return <div className={clsx(styles.Skeleton, className)} />;
};
