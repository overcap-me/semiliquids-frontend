"use client";
import { clsx } from "clsx";
import styles from "./Search.module.css";

import Close from "@/assets/icons/Cross.svg";
import { type FC, useEffect, useState } from "react";
import { SIZE_PROPS } from "@/shared/lib/icons";

type SearchProps = {
  name: string;

  search: string;

  onChange: (value: string) => void;
};

export const Search: FC<SearchProps> = ({ onChange, name, search }) => {
  const [value, setValue] = useState(() => search || "");

  const handleChange = (event) => {
    const {
      target: { value: __value },
    } = event;
    setValue(__value);

    if (onChange) {
      onChange(__value);
    }
  };

  const onReset = () => {
    setValue("");
    if (onChange) {
      onChange("");
    }
  };

  useEffect(() => {
    const handleFiltersCleared = () => {
      setValue("");
    };

    window.addEventListener("filtersCleared", handleFiltersCleared);

    return () => {
      window.removeEventListener("filtersCleared", handleFiltersCleared);
    };
  }, []);

  return (
    <label className={styles.label}>
      <input
        name={name}
        value={value}
        className={clsx(styles.input, {
          [styles.active]: value.length > 0,
        })}
        type="text"
        onChange={handleChange}
      />
      <button onClick={onReset} className={styles.close} type="button">
        <Close {...SIZE_PROPS} />
      </button>
    </label>
  );
};
