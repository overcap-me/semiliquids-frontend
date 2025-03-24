import {
  CUSTOM_ERRORS_FIELD,
  mobilePhoneSchema,
  passwordSchema,
} from "@/shared/lib/zod";
import { z } from "zod";

export const AuthRegisterUserSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-–]+$/,
      "The name can only contain letters, spaces, hyphens, and en dashes"
    ),
  last_name: z
    .string()
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-–]+$/,
      "The name can only contain letters, spaces, hyphens, and en dashes"
    ),
  password: passwordSchema,
  password_confirmation: z.string(),
  allow: z.boolean().optional().default(false),
});

export const AuthRegisterUserWithRefine = AuthRegisterUserSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  }
);

export const AuthRegisterCompanySchema = z.object({
  company_type: z.string().min(1, { message: CUSTOM_ERRORS_FIELD.REQUIRED }),
  company_name: z.string().min(1, { message: CUSTOM_ERRORS_FIELD.REQUIRED }),
  country: z.string().min(1, { message: CUSTOM_ERRORS_FIELD.REQUIRED }),
  occupation: z.string().optional().nullable(),
  aum: z.string().optional().nullable().optional(),
  investment_focus: z.array(z.string().optional().nullable()).optional(),
  geo_focus: z.array(z.string().optional().nullable()).optional(),
  phone: mobilePhoneSchema,
  agree: z.string({ message: CUSTOM_ERRORS_FIELD.REQUIRED }),
});

export const AuthLoginSchema = AuthRegisterUserSchema.pick({
  email: true,
}).extend({
  password: z.string(),
});

export const AuthResetPasswordEmailSchema = AuthRegisterUserSchema.pick({
  email: true,
});

export const AuthResetPasswordSchema = AuthRegisterUserSchema.pick({
  email: true,
  password: true,
  password_confirmation: true,
});

export const AuthRegisterCompanyViaLinkedInSchema =
  AuthRegisterCompanySchema.extend({
    provider_id: z.string(),
  });

export const AuthRegisterSchema = AuthRegisterUserSchema.merge(
  AuthRegisterCompanySchema
);

export type AuthRegister = z.infer<typeof AuthRegisterSchema>;
