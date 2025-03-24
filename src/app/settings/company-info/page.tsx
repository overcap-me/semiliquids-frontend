import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper"
import stylesSpace from "@/styles/module/Spacing.module.css";
import { CompanyInformation } from "../entities/company/CompanyInformation";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";

const CompanyInfoPage = async () => {
  const user = await UserActionsServiceInstance.me();

  return <>
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
      <Narrow>
        <Typography spacing="m" as="h2">
          Company Info
        </Typography>

        <CompanyInformation profile={user?.profile} />
      </Narrow>
    </Wrapper>
  </>
}

export default CompanyInfoPage;