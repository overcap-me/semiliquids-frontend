"use client";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import stylesForm from "@/components/forms/Form.module.css";
import { FormField } from "@/components/forms/FormField";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { clsx } from "clsx";
import { ButtonOrLink } from "../../../components/ButtonOrLink";
import { useFormState } from "react-dom";
import { signup } from "./actions";
import { ROUTE_PATHS } from "@/shared/routes";
import { UserIntegrateLinkedin } from "../entities/UserIntegrateLinkedin";
import { useAuthRegisterContext } from "../contexts/AuthRegisterProvider";
import { ButtonSubmit } from "@/components/forms";

const SignUp = () => {
  const [state, action] = useFormState(signup, undefined);
  const { appendFields } = useAuthRegisterContext();


  return (
    <Wrapper
      bg={EBackgroundColor.Primary}
      classNameContainer={stylesSpace.Spacing__Inner_40x100}
    >
      <div className={stylesForm.FormContainer}>
        <Typography spacing="m" as="h1">
          Sign Up
        </Typography>

        <div className={stylesForm.FormWrapper}>
          <UserIntegrateLinkedin title="Sing up with LinkedIn" />

          <Typography className={stylesForm.Separate} align="center">
            or
          </Typography>

          <form
            action={(event) => {
              appendFields('signUp', event)
              action(event)
            }}
            className={clsx(
              stylesForm.Form,
              stylesLayout.Flex,
              stylesLayout.JCC,
              stylesLayout.Gap_20,
            )}
          >
            <FormField
              name="email"
              errors={state?.errors?.email}
              required
              type="email"
              caption="Work Email"
            />
            <div
              className={clsx(
                stylesLayout.Grid,
                stylesLayout.Grid__Col_2,
                stylesLayout.Gap_16,
                stylesLayout.Width_100,
              )}
            >
              <FormField
                name="name"
                type="text"
                caption="First Name"
                errors={state?.errors?.name}
                required
              />
              <FormField
                name="last_name"
                type="text"
                caption="Last Name"
                errors={state?.errors?.last_name}
                required
              />
            </div>

            <FormField
              name="password"
              type="password"
              errors={state?.errors?.password}
              caption="Password"
              required
            />

            <FormField
              name="password_confirmation"
              type="password"
              errors={state?.errors?.password_confirmation}
              caption="Repeat Password"
              required
            />

            <ButtonSubmit
              title="Get started"
            />
          </form>

          <div className={clsx(stylesLayout.Flex, stylesLayout.JCC)}>
            <Typography as="span">Already have an account? &nbsp;</Typography>
            <ButtonOrLink
              asTag="a"
              href={ROUTE_PATHS.AUTH.LOGIN}
              underline="bottom"
              color="accent"
            >
              <Typography>Log In</Typography>
            </ButtonOrLink>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
