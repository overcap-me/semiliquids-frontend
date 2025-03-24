"use server";

import { AuthActionsServiceInstance } from "@/api/auth/AuthActionsService";
import { HttpStatus } from "@/api/httpStatus";
import { redirect } from "next/navigation";

export async function integrateLinkedin() {
  const request = await AuthActionsServiceInstance.getUrlOfLinkedinRedirect();

  const status = request.status;
  const resposne = await request.json();

  if (status === HttpStatus.OK) {
    const url = resposne.url_to_redirect;

    return redirect(url);
  }
}
