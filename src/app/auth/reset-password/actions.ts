"use server";

import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { formDataToObject } from "@/shared/utils/formDataToObject";
import { AuthResetPasswordEmailSchema } from "@/types/schema/auth";

export async function reset(_: unknown, formData: FormData) {
  const formDataObject = formDataToObject(formData);
  const parseResult = AuthResetPasswordEmailSchema.safeParse(formDataObject);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await AuthActionsServiceInstance.forgotPassword(
    formDataObject
  );

  const json = await serverResponse?.json();

  if (!serverResponse?.ok) {
    return json;
  }

  return json;
}
