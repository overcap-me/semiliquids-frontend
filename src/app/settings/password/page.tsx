import { UserChangePassword } from "@/app/settings/entities/user/UserChangePassword";
import { PasswordRecovery } from "@/app/settings/features/PasswordRecovery";
import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { Suspense } from "react";

const SettingsPasswordPage = () => {
  return (
    <>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
        <Narrow>
          <Typography spacing="m" as="h2">
            Change Password
          </Typography>

          <UserChangePassword />
        </Narrow>
      </Wrapper>

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <Narrow>
          <Suspense>
            <PasswordRecovery />
          </Suspense>
        </Narrow>
      </Wrapper>
    </>
  );
};

export default SettingsPasswordPage;
