import { z } from "zod";
import { UserResponseSchema } from "../user/profile";

export const UserFullNameSchema = UserResponseSchema.pick({
  name: true,
  last_name: true,
}).extend({
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
});
