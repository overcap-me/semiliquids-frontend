"use client";

import { handleChangePassword } from "@/app/settings/entities/user/UserChangePassword/actions";
import { ButtonSubmit, FormField } from "@/components/forms";
import stylesLayout from "@/styles/module/Layout.module.css";
import { clsx } from "clsx";
import type { FC } from "react";
import { useFormState, } from "react-dom";


export const UserChangePassword: FC = () => {
  const [formState, formAction] = useFormState(handleChangePassword, undefined);

  return (
    <form
      action={formAction}
      className={clsx(stylesLayout.Flex, stylesLayout.Gap_20)}
    >
      <FormField
        type="password"
        name="current_password"
        caption="Current Password"
        errors={formState?.errors?.current_password}
        required
      />
      <FormField
        type="password"
        name="new_password"
        caption="New Password"
        errors={formState?.errors?.new_password}
        required
      />
      <FormField
        type="password"
        name="new_password_confirmation"
        caption="Repeat New Password"
        errors={formState?.errors?.new_password_confirmation}
        required
      />
      <ButtonSubmit title="Update password" />
    </form>
  );
};
