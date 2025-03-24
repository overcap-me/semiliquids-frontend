"use server";

import { UserTags } from "@/api/user/tags";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { normalizeFieldToArray } from "@/shared/utils/fieldToArray";
import { formDataToObject } from "@/shared/utils/formDataToObject";
import { AuthRegisterCompanySchema } from "@/types/schema/auth";
import { revalidateTag } from "next/cache";

export async function updateProfile(_, formData: FormData) {
  const formDataObject = normalizeFieldToArray(formDataToObject(formData), [
    "investment_focus",
    "geo_focus",
  ]);

  const parseResult = AuthRegisterCompanySchema.omit({
    agree: true,
  }).safeParse(formDataObject);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await UserActionsServiceInstance.updateProfile({
    ...formDataObject,
    aum: formDataObject.aum ?? "",
    geo_focus: formDataObject.geo_focus ?? "",
    investment_focus: formDataObject.investment_focus ?? "",
  });

  const json = await serverResponse?.json();

  if (!serverResponse?.ok) {
    return json;
  }

  revalidateTag(UserTags.CHECK_ME);
}
