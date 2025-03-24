'use server';
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";

import { ROUTE_PATHS } from "@/shared/routes";
import { redirect } from "next/navigation";

export async function deleteUser() {
  try {
    await UserActionsServiceInstance.deleteUser()
  } catch (e) {
    console.error(`Failed to delete user: ${e.message}`);
  }

  redirect(ROUTE_PATHS.AUTH.LOGIN);
}