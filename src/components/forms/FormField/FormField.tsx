"use client";
import { Typography } from "@/components/Typography";
import stylesForm from "@/components/forms/Form.module.css";
import { type ReactNode, useState } from "react";

import Password from "@/assets/icons/Password.svg";
import clsx from "clsx";
import { ErrorList } from "../Error";
import { SIZE_PROPS } from "@/shared/lib/icons";

type TProps<T> = {
  caption: string;
  errors?: string[] | undefined;
  type?: "email" | "text" | "password" | "tel";
  required?: boolean;
  name: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  placeholder?: string;
  additionalNode?: ReactNode;
};

export const FormField = <T,>({
  name,
  caption,
  errors,
  required = false,
  type = "text",
  defaultValue,
  disabled,
  placeholder,
  additionalNode,
}: TProps<T>) => {
  const [stateType, setStateType] = useState(type);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    setStateType(!isPasswordVisible ? "text" : "password");
  };

  const hasError = errors && errors?.length > 0;

  return (
    <div className={stylesForm.Field}>
      <div className={stylesForm.Caption}>
        <Typography color="primary-50">{caption}</Typography>
        {additionalNode}
      </div>
      <label className={stylesForm.Label}>
        <input
          disabled={disabled}
          defaultValue={defaultValue}
          required={required}
          className={clsx(stylesForm.Input, {
            [stylesForm.hasError]: hasError,
          })}
          type={stateType}
          name={name}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            className={clsx(stylesForm.InputIcon, {
              [stylesForm.Visible]: isPasswordVisible,
            })}
            type="button"
          >
            <Password {...SIZE_PROPS} />
          </button>
        )}
      </label>
      <ErrorList errors={errors} />
    </div>
  );
};
