"use server";

import {
  AuthRegisterCompanyViaLinkedInSchema,
  AuthRegisterSchema,
} from "@/types/schema/auth";
import { redirect } from "next/navigation";
import { ROUTE_PATHS } from "@/shared/routes";
import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { revalidateTag } from "next/cache";
import { UserTags } from "@/api/user/tags";
import { SessionServiceInstance } from "@/app/auth/entities/session";
import { formDataToObject } from "@/shared/utils/formDataToObject";
import { normalizeFieldToArray } from "@/shared/utils/fieldToArray";

const registerRequest = {
  default: AuthActionsServiceInstance.register,
  linkedIn: AuthActionsServiceInstance.linkedinProfile,
};

export const register = async (_: unknown, formData: Map<string, FormData>) => {
  const personalInfoObject = formDataToObject(formData.get("signUp"));
  const companyInfoObject = normalizeFieldToArray(
    formDataToObject(formData.get("signUpCompany")),
    ["investment_focus", "geo_focus"]
  );

  /**
   * The case use only for linkedIn
   */
  const providerID = companyInfoObject?.provider_id;

  const currentSchema = providerID
    ? AuthRegisterCompanyViaLinkedInSchema
    : AuthRegisterSchema;

  const parseResult = currentSchema.safeParse(
    providerID
      ? companyInfoObject
      : { ...personalInfoObject, ...companyInfoObject }
  );

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  try {
    const serverResponse = await registerRequest[
      providerID ? "linkedIn" : "default"
    ](
      providerID
        ? companyInfoObject
        : { ...personalInfoObject, ...companyInfoObject }
    );
    const json = await serverResponse?.json();

    if (!serverResponse?.ok) {
      return json;
    }

    SessionServiceInstance.add(json?.access_token);
  } catch (error) {}

  revalidateTag(UserTags.CHECK_ME);
  redirect(ROUTE_PATHS.INDEX.BASE);
};
