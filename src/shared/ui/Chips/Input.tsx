import type { FC, ReactNode } from "react";
import styles from "./Chips.module.css";
import clsx from "clsx";
import { Typography } from "@/components/Typography";
import { ButtonOrLink } from "@/components/ButtonOrLink";

type InputChipsProps = {
  name: string;

  mode: "radio" | "checkbox";

  value?: string

  defaultValue?: string

  onChange: () => void;

  active?: boolean

  children: ReactNode;
};
export const InputChips: FC<InputChipsProps> = ({ name, mode, active, onChange, value, children }) => {
  return (
    <label>
      <input name={name} type={mode} value={value} onChange={onChange} />
      <ButtonOrLink
        type="button"
        className={clsx(styles.chips, {
          [styles.radio]: mode === "radio",
          [styles.multiple]: mode === "checkbox",
          [styles.active]: active,
        })}
        onClick={onChange}
        asTag="button"
      >
        <Typography as="h6">{children}</Typography>
      </ButtonOrLink>
    </label>
  );
};
