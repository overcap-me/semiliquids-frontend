"use client";

import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import { ButtonSubmit } from "@/components/forms";
import stylesForm from "@/components/forms/Form.module.css";
import { FormField } from "@/components/forms/FormField";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { clsx } from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";
import { ROUTE_PATHS } from "@/shared/routes";
import { UserIntegrateLinkedin } from "../entities/UserIntegrateLinkedin";

const Login = () => {
  const [state, action] = useFormState(login, undefined);

  return (
    <Wrapper
      bg={EBackgroundColor.Primary}
      classNameContainer={stylesSpace.Spacing__Inner_40x100}
    >
      <div className={stylesForm.FormContainer}>
        <Typography spacing="m" as="h1">
          Log In to your Account
        </Typography>

        <div className={stylesForm.FormWrapper}>
          <UserIntegrateLinkedin title="continue with LinkedIn" />

          <Typography className={stylesForm.Separate} align="center">
            or
          </Typography>

          <form
            action={action}
            className={clsx(
              stylesForm.Form,
              stylesLayout.Flex,
              stylesLayout.JCC,
              stylesLayout.Gap_20,
            )}
          >
            <FormField
              name="email"
              required
              type="email"
              caption="Work Email"
              errors={state?.errors?.email}
            />

            <FormField
              name="password"
              required
              type="password"
              caption="Password"
              errors={state?.errors?.password}
              additionalNode={
                <ButtonOrLink
                  color="primary-50"
                  asTag="a"
                  href={ROUTE_PATHS.AUTH.RESET_PASSWORD}
                >
                  <Typography>Forgot Password?</Typography>
                </ButtonOrLink>
              }
            />

            <ButtonSubmit
              title="Login"
            />
          </form>

          <div className={clsx(stylesLayout.Flex, stylesLayout.JCC)}>
            <Typography as="span">Don’t have an account? &nbsp;</Typography>
            <ButtonOrLink
              asTag="a"
              href={ROUTE_PATHS.AUTH.REGISTER}
              underline="bottom"
              color="accent"
            >
              <Typography>Sign Up</Typography>
            </ButtonOrLink>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
