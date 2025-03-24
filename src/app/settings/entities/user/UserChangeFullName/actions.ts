"use server";

import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { UserTags } from "@/api/user/tags";
import { revalidateTag } from "next/cache";
import { UserFullNameSchema } from "@/types/schema/settings/user";
import { formDataToObject } from "@/shared/utils/formDataToObject";

export async function handleChangeFullName(_, formData: FormData) {
  const formDataObject = formDataToObject(formData);

  const validatedFields = UserFullNameSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const serverResponse = await UserActionsServiceInstance.updateProfile(
    formDataObject
  );
  const json = await serverResponse?.json();

  console.log({ json });

  if (!serverResponse?.ok) {
    return json;
  }

  revalidateTag(UserTags.CHECK_ME);
}
