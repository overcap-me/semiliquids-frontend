import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import React from "react";
import styles from "./Chips.module.css";
import type { UrlObject } from "url";

export type ChipsProps = {
  children: ReactNode;

  mode: "radio" | "multiple";

  value: string;

  onChange: (value: string) => void;

  disabled?: boolean;

  active?: boolean;

  asTag?: "button" | "a";

  href?: string | UrlObject;
};

export const Chips: FC<ChipsProps> = ({
  mode,
  asTag = "button",
  href,
  onChange,
  active,
  children,
}) => {

  return (
    <ButtonOrLink
      className={clsx(styles.chips, {
        [styles.radio]: mode === "radio",
        [styles.multiple]: mode === "multiple",
        [styles.active]: active,
      })}
      // TODO
      onClick={onChange}
      asTag={asTag}
      href={href}
    >
      <Typography as="h6">{children}</Typography>
    </ButtonOrLink>
  );
};
