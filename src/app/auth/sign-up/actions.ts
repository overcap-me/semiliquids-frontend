"use server";
import { redirect } from "next/navigation";
import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { ROUTE_PATHS } from "@/shared/routes";
import { AuthRegisterUserWithRefine } from "@/types/schema/auth";
import { formDataToObject } from "@/shared/utils/formDataToObject";

const STEP_REGISTER_USER = [
  "email",
  "password",
  "password_confirmation",
  "name",
  "last_name",
];

export async function signup(_: unknown, formData: FormData) {
  const formDataObject = formDataToObject(formData);

  const parseResult = AuthRegisterUserWithRefine.safeParse(formDataObject);
  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await AuthActionsServiceInstance.register(
    formDataObject
  );
  const json = await serverResponse.json();

  if (!serverResponse.ok) {
    const keys = Object.keys(json.errors);
    const intersection = STEP_REGISTER_USER.filter((item) =>
      keys.includes(item)
    );

    if (intersection.length > 0) {
      return json;
    }

    redirect(ROUTE_PATHS.AUTH.REGISTER_COMPANY);
  }
}
