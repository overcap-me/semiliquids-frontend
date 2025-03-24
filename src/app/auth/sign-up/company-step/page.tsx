import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper"
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesForm from "@/components/forms/Form.module.css";
import { RegisterCompanyStepForm } from "../../entities/RegisterCompanyStepForm";
import { Suspense } from "react";

const CompanyStepAuthPage = () => {
  return (
    <Wrapper
      bg={EBackgroundColor.Primary}
      classNameContainer={stylesSpace.Spacing__Inner_40x100}
    >
      <Typography as="div" className={stylesForm.FormContainer}>
        <Typography spacing="m" as="h1">Sign Up</Typography>

        <Suspense>
          <RegisterCompanyStepForm />
        </Suspense>
      </Typography>
    </Wrapper>
  )
}

export default CompanyStepAuthPage;