import type React from "react";
import { Typography } from "@/components/Typography";
import styles from "./ChipsButton.module.css";

import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import { ErrorList } from "../Error";
import { useState, type ReactNode } from "react";

interface GroupFieldProps {
  caption: string | ReactNode;
  options: { label: string; value: string }[];
  type: "radio" | "checkbox";
  name: string;
  onChange?: (value: string) => void;
  defaultChecked?: string;
  multiple?: boolean;

  errors?: string[];
}

// Custom hook to toggle radio button
// TODO: MUST refactor
const useToggleRadioButton = (defaultChecked?: string) => {
  const [active, setActive] = useState({
    value: defaultChecked || ''
  });

  const handleClickOnRadio = (e) => {
    if (active.value === e.target.value) {
      e.target.checked = false;
      setActive({
        value: ''
      });
      return
    }

    setActive({
      value: e.target.value
    });
  }

  return {
    handleClickOnRadio
  }
}

export const GroupField: React.FC<GroupFieldProps> = ({
  caption,
  options,
  type,
  name,
  onChange,
  defaultChecked,
  multiple,
  errors,
}) => {
  const { handleClickOnRadio } = useToggleRadioButton(defaultChecked);

  return (
    <div className={styles.field}>
      <Typography
        color="primary"
        spacing="s"
        textTransform="uppercase"
        as="h6"
        fontWeight="800"
      >
        {caption}
      </Typography>
      <div className={clsx(stylesLayout.Flex, stylesLayout.Gap_8)}>
        {options?.map((option) => (
          <label
            className={clsx(styles.label, {
              [styles.radio]: type === "radio",
              [styles.checkbox]: type === "checkbox",
            })}
            key={option.value}
          >
            <input
              multiple={multiple}
              className={styles.input}
              type={type}
              name={name}
              defaultChecked={defaultChecked?.includes(option.value)}
              value={option.value}
              onChange={(e) => onChange?.(e.target.value)}
              onClick={type === "radio" ? handleClickOnRadio : undefined}
            />
            <Typography className={styles.text} as="h6">
              {option.label}
            </Typography>
          </label>
        ))}
      </div>
      <ErrorList errors={errors} />
    </div>
  );
};
