import { Typography } from "@/components/Typography";
import clsx, { type ClassValue } from "clsx";
import type { FC, ReactNode } from "react";

// TODO: Move to separate file
import styles from "../../entities/TableOfCompare/TableOfCompare.module.css";

type RowProps = {
  children: ReactNode;

  className?: ClassValue;
};

export const Row: FC<RowProps> = ({ children, className }) => {
  return (
    <tr className={clsx(styles.Row, className)}>{children}</tr>
  );
};
