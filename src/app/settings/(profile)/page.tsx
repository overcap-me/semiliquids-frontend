import { Narrow, Wrapper } from "@/components/Wrapper";

import { WorkEmail } from "@/app/settings/features/WorkEmail";

import { Typography } from "@/components/Typography";

import stylesSpace from "@/styles/module/Spacing.module.css";

import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { UserChangeFullName } from "@/app/settings/entities/user/UserChangeFullName";

const ProfilePage = async () => {
  const user = await UserActionsServiceInstance.me();

  return (
    <>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
        <Narrow>
          <Typography spacing="m" as="h2">
            My Profile
          </Typography>

          <UserChangeFullName user={user} />

          <WorkEmail email={user?.email} />
        </Narrow>
      </Wrapper>
    </>
  );
};

export default ProfilePage;
