import type { FC } from "react";
import type { ClassValue } from "clsx";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { SIZE_PROPS } from "@/shared/lib/icons";
import Bin from "@/assets/icons/Bin.svg";
import styles from "./ClearAll.module.css";
import clsx from "clsx";

type ClearAllProps = {
  onClear: () => void;

  href: string

  className?: ClassValue;

  active?: boolean;
};

export const ClearAll: FC<ClearAllProps> = ({ onClear, href, className, active }) => {
  return (
    <ButtonOrLink
      asTag="a"
      color="error"
      href={href}
      scroll={false}
      onClick={onClear}
      className={clsx(styles.button, {
        [styles.active]: active
      }, className)}
    >
      <Bin {...SIZE_PROPS} className={styles.icon} />
      <Typography>Clear Filters</Typography>
    </ButtonOrLink>
  );
};
