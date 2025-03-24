"use client";
import { useFormState } from "react-dom";
import { ButtonRecovery } from "./ButtonRecovery";
import { recoveryPassword } from "./server-actions/recoveryPassword";
import type { UserResponse } from "@/types/schema/user/profile";
import type { FC } from "react";
import { Typography } from "@/components/Typography";

type FormPasswordRecoveryClientProps = {
  user: UserResponse;
};

export const FormPasswordRecoveryClient: FC<
  FormPasswordRecoveryClientProps
> = ({ user }) => {
  const [state, formAction] = useFormState(recoveryPassword, undefined);


  return (
    <form action={formAction}>
      {user?.email && <input hidden readOnly type="text" name="email" value={user?.email} />}
      <ButtonRecovery />

      {/* <Typography>{state?.message}</Typography> */}
    </form>
  )
};
