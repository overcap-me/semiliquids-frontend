"use client";

import { ButtonSubmit, FormField } from "@/components/forms";
import { Select } from "@/components/forms/Select";
import { counrtyList } from "@/shared/utils/country";
import stylesLayout from "@/styles/module/Layout.module.css";
import type { UserProfileResponse } from "@/types/schema/user/profile";
import { clsx } from "clsx";
import type { FC } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "./server-action/action";
import { GroupField } from "@/components/forms/Group";
import { aumList, geoFocusList, investmentFocusList, options } from "./utils/options";
import { Typography } from "@/components/Typography";

type CompanyInformationProps = {
  profile?: UserProfileResponse;
};

export const CompanyInformation: FC<CompanyInformationProps> = ({ profile }) => {
  const [formState, formAction] = useFormState(updateProfile, undefined);

  return (
    <form action={formAction} className={clsx(stylesLayout.Flex, stylesLayout.Gap_20)}>
      <Select
        required
        name="company_type"
        caption="Company Type"
        defaultValue={{
          value: profile?.company_type,
          name: profile?.company_type,
        }}
        options={options}
        errors={formState?.errors.company_type}
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
          required
          caption="Company Name"
          name="company_name"
          type="text"
          defaultValue={profile?.company_name}
          errors={formState?.errors.company_name}
        />
        <Select
          required
          name="country"
          caption="Country"
          options={counrtyList}
          defaultValue={{
            value: profile?.country,
            name: profile?.country,
          }}
          errors={formState?.errors.country}
        />
      </div>

      <FormField
        caption="Title/Occupation (optional)"
        name="occupation"
        type="text"
        defaultValue={profile?.occupation}
        errors={formState?.errors.occupation}
      />
      <GroupField
        caption={<>AUM ($) <Typography textTransform="lowercase" color="primary-50" size="xs" fontWeight="500" as="span">(optional)</Typography> </>}
        name="aum"
        type="radio"
        options={aumList}
        defaultChecked={profile?.aum}
        errors={formState?.errors.aum}
      />
      <GroupField
        caption={<>Investment Focus <Typography textTransform="lowercase" color="primary-50" size="xs" fontWeight="500" as="span">(optional)</Typography> </>}
        name="investment_focus"
        type="checkbox"
        options={investmentFocusList}
        multiple
        defaultChecked={profile?.investment_focus}
        errors={formState?.errors.investment_focus}
      />
      <GroupField
        caption={<>Geo Focus <Typography textTransform="lowercase" color="primary-50" size="xs" fontWeight="500" as="span">(optional)</Typography> </>}
        name="geo_focus"
        type="checkbox"
        options={geoFocusList}
        multiple
        defaultChecked={profile?.geo_focus}
        errors={formState?.errors?.geo_focus}
      />

      <FormField required caption="Phone Number" name="phone" type="tel" defaultValue={profile?.phone} errors={formState?.errors?.phone} />

      <ButtonSubmit title="Update" />
    </form>
  );
};
