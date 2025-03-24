'use client'
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import stylesForm from "@/components/forms/Form.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";

import { UserSetNewPassword } from "../entities/UserSetNewPassword";
import { Suspense } from "react";

const SetPassword = () => {
  return (
    <Wrapper
      bg={EBackgroundColor.Primary}
      classNameContainer={stylesSpace.Spacing__Inner_40x100}
    >
      <div className={stylesForm.FormContainer}>
        <Typography spacing="m" as="h1">
          Set a New Password
        </Typography>

        <Suspense>
          <UserSetNewPassword />
        </Suspense>
      </div>
    </Wrapper>
  );
};

export default SetPassword;
