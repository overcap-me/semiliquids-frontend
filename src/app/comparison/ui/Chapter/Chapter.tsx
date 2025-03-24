import { Typography } from "@/components/Typography";
import clsx, { type ClassValue } from "clsx";
import type { FC, ReactNode } from "react";

// TODO: Move to separate file
import styles from "../../entities/TableOfCompare/TableOfCompare.module.css";

type ChapterProps = {
  children: ReactNode;

  colSpan: number;

  className?: ClassValue;
};

export const Chapter: FC<ChapterProps> = ({ children, className, colSpan }) => {
  return (
    <th className={clsx(styles.Cell, className)} colSpan={colSpan + 1}>
      <Typography as="h2">{children}</Typography>
    </th>
  );
};
