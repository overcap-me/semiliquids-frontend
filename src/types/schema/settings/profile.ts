import { z } from "zod";
import { UserProfileResponseSchema } from "../user/profile";

export const UserCompanySettingSchema = UserProfileResponseSchema
  .extend({
    company_name: z.string().min(1, { message: "Company name cannot be empty" }),
    country: z.string().min(1, { message: "Country cannot be empty" }),
    phone: z.string()
      .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
    company_type: z.string().min(1, {
      message: "Company type cannot be empty"
    }),
  })
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    user_id: true,
  });

