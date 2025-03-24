"use client";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import { ButtonSubmit } from "@/components/forms";
import stylesForm from "@/components/forms/Form.module.css";
import { FormField } from "@/components/forms/FormField";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { clsx } from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { reset } from "./actions";
import { useTimerMessage } from "@/shared/hooks/useTimerMessage";

const ResetPassword = () => {
  const [state, formAction] = useFormState(reset, undefined);
  const { showMessage } = useTimerMessage(state)

  return (
    <Wrapper
      bg={EBackgroundColor.Primary}
      classNameContainer={stylesSpace.Spacing__Inner_40x100}
    >
      <div className={stylesForm.FormContainer}>
        <Typography spacing="m" as="h1">
          Forgot your password?
        </Typography>

        <div className={stylesForm.FormWrapper}>
          <Typography className={stylesForm.Separate} align="center">
            We will send you a link to reset your password
          </Typography>

          {!showMessage && (
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
                name="email"
                type="email"
                caption="Work Email"
                required
                errors={state?.errors?.email}
              />

              <ButtonSubmit title="Reset password" />
            </form>
          )}

          {showMessage && (
            <Typography className={stylesForm.Message} align="center">
              {state.message}
            </Typography>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
