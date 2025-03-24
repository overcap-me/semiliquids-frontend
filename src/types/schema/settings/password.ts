import { passwordSchema } from "@/shared/lib/zod";
import { z } from "zod";

export const UserPasswordSchema = z.object({
  current_password: z.string(),
  new_password: passwordSchema,
  new_password_confirmation: z.string()
})


export const UserPasswordSchemaWithRefine = UserPasswordSchema.refine(
  (data) => data.new_password === data.new_password_confirmation,
  {
    message: "Passwords do not match",
    path: ["new_password_confirmation"], // path of error
  }
);
