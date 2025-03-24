"use server";

import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { SessionServiceInstance } from "@/app/auth/entities/session";
import { ROUTE_PATHS } from "@/shared/routes";
import { redirect } from "next/navigation";

export async function handleLogout() {
  await AuthActionsServiceInstance.logout();
  SessionServiceInstance.delete();
  redirect(ROUTE_PATHS.AUTH.LOGIN);
}
