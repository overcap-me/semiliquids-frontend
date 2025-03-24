"use server";

import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { ROUTE_PATHS } from "@/shared/routes";
import { formDataToObject } from "@/shared/utils/formDataToObject";
import { AuthResetPasswordSchema } from "@/types/schema/auth";
import { redirect } from "next/navigation";

export const setNewPassword = async (_: unknown, formData: FormData) => {
  const formDataObject = formDataToObject(formData);
  const token = formDataObject.token;

  const parseResult = AuthResetPasswordSchema.safeParse(formDataObject);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await AuthActionsServiceInstance.setNewPassword(
    token,
    formDataObject
  );
  const json = await serverResponse?.json();

  if (!serverResponse?.ok) {
    return json;
  }

  redirect(ROUTE_PATHS.AUTH.LOGIN);
};
