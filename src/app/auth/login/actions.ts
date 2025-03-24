"use server";
import { redirect } from "next/navigation";

import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { ROUTE_PATHS } from "@/shared/routes";
import { revalidateTag } from "next/cache";
import { UserTags } from "@/api/user/tags";
import { SessionServiceInstance } from "../entities/session";
import { AuthLoginSchema } from "@/types/schema/auth";
import { formDataToObject } from "@/shared/utils/formDataToObject";

export async function login(_: unknown, formData: FormData) {
  const formDataObject = formDataToObject(formData);

  const parseResult = AuthLoginSchema.safeParse(formDataObject);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }
  const serverResponse = await AuthActionsServiceInstance.login(formDataObject);
  const json = await serverResponse?.json();

  if (!serverResponse?.ok) {
    return json;
  }

  SessionServiceInstance.add(json?.access_token);
  revalidateTag(UserTags.CHECK_ME);
  redirect(ROUTE_PATHS.INDEX.BASE);
}
