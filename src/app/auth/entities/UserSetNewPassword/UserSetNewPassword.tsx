'use client'

import clsx from "clsx";
import { ButtonSubmit, FormField } from "@/components/forms";
import stylesForm from "@/components/forms/Form.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";
import { useFormState } from "react-dom";
import { setNewPassword } from "./server-actions/setNewPassword";
import { useSearchParams } from "next/navigation";

export const UserSetNewPassword = () => {
  const params = useSearchParams()
  const [state, formAction] = useFormState(setNewPassword, undefined)

  const token = params.get('token')
  return (
    <div className={stylesForm.FormWrapper}>
      <form
        className={clsx(
          stylesForm.Form,
          stylesLayout.Flex,
          stylesLayout.JCC,
          stylesLayout.Gap_20,
        )}
        action={formAction}
      >
        <FormField
          required
          name="email"
          type="email"
          caption="Email"
          errors={state?.errors?.email}
        />
        <FormField
          required
          name="password"
          type="password"
          caption="New Password"
          errors={state?.errors?.password}
        />


        <FormField
          required
          name="password_confirmation"
          type="password"
          caption="Repeat the New Password"
          errors={state?.errors?.password_confirmation}
        />

        {token && <input name="token" readOnly hidden type="text" value={token} />}

        <ButtonSubmit title="Reset password" />
      </form>
    </div>
  )
}