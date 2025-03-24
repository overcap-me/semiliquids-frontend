import { Typography } from "@/components/Typography";
import clsx, { type ClassValue } from "clsx";
import type { FC, ReactNode } from "react";

// TODO: Move to separate file
import styles from "../../entities/TableOfCompare/TableOfCompare.module.css";
import type { TagVariants } from "@/components/Typography";

type CellProps = {
  children: ReactNode;

  as?: TagVariants;

  className?: ClassValue;

  classNameBody?: ClassValue;
};

export const Cell: FC<CellProps> = ({ children, className, classNameBody, as }) => {
  return (
    <td className={clsx(styles.Cell, className)}>
      <Typography className={clsx(classNameBody)} as={as}>{children}</Typography>
    </td>
  );
};
