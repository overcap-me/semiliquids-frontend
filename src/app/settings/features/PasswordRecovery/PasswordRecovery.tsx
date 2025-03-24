import { Typography } from "@/components/Typography";

import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { FormPasswordRecoveryClient } from "./FormPasswordRecoveryClient";

export const PasswordRecovery = async () => {
  const user = await UserActionsServiceInstance.me();

  return (
    <div>
      <Typography spacing="sm" as="h2">
        Password Recovery
      </Typography>

      <FormPasswordRecoveryClient user={user} />
    </div>
  );
};
