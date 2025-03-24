import {  useCallback, useRef, useState, type FC } from "react";
import { Typography } from "@/components/Typography";
import Arrow from "@/assets/icons/ArrowLeft.svg";

import styles from "./Select.module.css";
import { SIZE_PROPS } from "@/shared/lib/icons";
import clsx from "clsx";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useHeightSmooth } from "@/shared/hooks/useHeightSmooth";
import { ErrorList } from "../Error";

type SelectProps = {
  caption: string;

  name: string;

  options: { name: string, value: string }[]

  defaultValue?: string

  required?: boolean

  errors?: string[]
};

export const Select: FC<SelectProps> = ({ caption, name, options, defaultValue, required, errors }) => {
  const [selected, setSelected] = useState(defaultValue);
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdowBodyRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setActive(false), active);
  useHeightSmooth({ ref: dropdowBodyRef, active, duration: 300, scrollHeight: 300, cb: setActive });

  const handleChange = useCallback((option) => {
    setSelected(option)
    setActive(false)
  }, [setSelected, setActive])

  const hasError = errors?.length > 0;

  return (
    <div className={styles.field}>
      <div >
        <Typography className={styles.caption} color="primary-50">{caption}</Typography>

        <input required={required} type="hidden" name={name} value={selected?.value} />

        <div ref={dropdownRef} className={clsx(
          styles.dropdown,
          {
            [styles.active]: active,
            [styles.error]: hasError
          }
        )}>
          <div className={styles.header}>
            <button onClick={() => setActive((prev) => !prev)} type="button" className={styles.button}>
              <Typography>
                {selected?.name}
              </Typography>
              <Arrow className={styles.icon} {...SIZE_PROPS} />
            </button>
          </div>

          <div
            ref={dropdowBodyRef}
            className={styles.body}
            style={{
              zIndex: active && 11,
            }}>
            <div className={styles.list}>
              {options.map((option) => (
                <button key={option.value} type="button" onClick={() => handleChange(option)} className={styles.option}>
                  <Typography>{option.name}</Typography>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ErrorList errors={errors} />
      </div>
    </div >
  );
};
