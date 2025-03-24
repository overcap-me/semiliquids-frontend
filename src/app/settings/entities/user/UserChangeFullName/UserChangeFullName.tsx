"use client";
import { handleChangeFullName } from "@/app/settings/entities/user/UserChangeFullName/actions";
import { Typography } from "@/components/Typography";
import { ButtonSubmit, FormField } from "@/components/forms";
import stylesLayout from "@/styles/module/Layout.module.css";
import type { UserResponse } from "@/types/schema/user/profile";
import { clsx } from "clsx";
import type { FC } from "react";
import { useFormState } from "react-dom";

type UserChangeFullNameProps = {
  user: UserResponse;
};

export const UserChangeFullName: FC<UserChangeFullNameProps> = ({ user }) => {
  const [formState, formAction] = useFormState(handleChangeFullName, undefined);

  console.log({ formState });

  return (
    <Typography as="div" spacing="m">
      <form
        action={formAction}
        className={clsx(stylesLayout.Flex, stylesLayout.Gap_20)}
      >
        <div
          className={clsx(
            stylesLayout.Grid,
            stylesLayout.Grid__Col_2,
            stylesLayout.Gap_16,
            stylesLayout.Width_100
          )}
        >
          <FormField
            defaultValue={user?.name}
            name="name"
            type="text"
            caption="First Name"
            errors={formState?.errors?.name}
            required
          />
          <FormField
            defaultValue={user?.last_name}
            name="last_name"
            type="text"
            caption="Second Name"
            errors={formState?.errors?.last_name}
            required
          />
        </div>

        <ButtonSubmit title="Update profile" />
      </form>
    </Typography>
  );
};
