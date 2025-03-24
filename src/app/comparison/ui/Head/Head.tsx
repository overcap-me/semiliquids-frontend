import { Typography, TypographyProps } from "@/components/Typography";
import clsx, { type ClassValue } from "clsx";
import type { FC, ReactNode } from "react";

// TODO: Move to separate file
import styles from "../../entities/TableOfCompare/TableOfCompare.module.css";

type HeadProps = {
  children?: ReactNode;

  className?: ClassValue;

  subtitle?: string;

  subtitleOptions?: Omit<TypographyProps, "children">;
};


export const Head: FC<HeadProps> = ({ children, className, subtitle, subtitleOptions }) => {
  return (
    <th className={clsx(styles.Cell, className)}>
      <Typography textTransform="uppercase" as="h6" fontWeight="800">
        {children}
      </Typography>
      {
        subtitle && (
          <Typography as="p" color="primary-70" {...subtitleOptions}>
            {subtitle}
          </Typography>
        )
      }
    </th>
  );
};