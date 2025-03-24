import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { Typography } from "@/components/Typography";
import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import type { DisclaimerDetail } from "@/types/schema/fund";

import { type FC, Fragment } from "react";

type TermsAndConditionsProps = {
  endnotes?: DisclaimerDetail[];
  disclosures?: DisclaimerDetail[];
};

export const TermsAndConditions: FC<TermsAndConditionsProps> = async ({
  endnotes,
  disclosures,
}) => {
  const hasData = !!endnotes?.length || !!disclosures?.length;
  const settings = hasData
    ? { endnotes, disclosures }
    : await FundsActionsServiceInstance.getSettings();

  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_120x120}>
      {!!settings?.endnotes?.length && (
        <Typography as="div" spacing="m">
          <Typography spacing="s" as="h3">
            Endnotes
          </Typography>

          {settings?.endnotes?.map((opt, index) => (
            <Typography
              key={index}
              color="primary-50"
              size="xs"
              spacing="xs"
              as="p"
            >
              {opt.text}
            </Typography>
          ))}
        </Typography>
      )}

      {!!settings?.disclosures?.length && (
        <Fragment>
          <Typography spacing="s" as="h3">
            Disclosures
          </Typography>

          {settings?.disclosures?.map((opt, index) => (
            <Typography
              key={index}
              color="primary-50"
              size="xs"
              spacing="xs"
              as="p"
            >
              {opt.text}
            </Typography>
          ))}
        </Fragment>
      )}
    </Wrapper>
  );
};
