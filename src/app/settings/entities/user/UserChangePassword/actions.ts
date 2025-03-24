"use server";
import { UserTags } from "@/api/user/tags";
import { revalidateTag } from "next/cache";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { UserPasswordSchemaWithRefine } from "@/types/schema/settings/password";
import { formDataToObject } from "@/shared/utils/formDataToObject";

export async function handleChangePassword(_: undefined, formData: FormData) {
  const formDataObject = formDataToObject(formData);

  const parseResult = UserPasswordSchemaWithRefine.safeParse(formDataObject);

  if (!parseResult.success) {
    return {
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await UserActionsServiceInstance.changePassword(
    formDataObject
  );
  const json = await serverResponse?.json();

  if (!serverResponse?.ok) {
    return json;
  }

  revalidateTag(UserTags.CHECK_ME);
}
