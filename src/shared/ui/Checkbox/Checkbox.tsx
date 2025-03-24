import type { FC } from "react";
import styles from './Checkbox.module.css'
import { Typography } from "@/components/Typography";
import { ErrorList } from "@/components/forms/Error";

type CheckboxProps = {
  name?: string

  value?: boolean;

  onChange?: (value: boolean) => void;

  disabled?: boolean;

  active?: boolean;

  labelText?: string;

  required?: boolean;

  errors?: string[];
};

export const Checkbox: FC<CheckboxProps> = ({ name, labelText, required, errors }) => {
  return (
    <div>
      <label className={styles.label}>
        <div className={styles.checkbox}>
          <input name={name} type="checkbox" required={required} />
          <span />
        </div >

        <Typography className={styles.text}>{labelText}</Typography>
      </label>
      <ErrorList errors={errors} />
    </div>
  )
};

