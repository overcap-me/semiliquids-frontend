import { nullableObject } from "@/shared/lib/zod";
import { z } from "zod";

export const MetaSchema = z.object({
  current_page: z.number(),
  from: z.number().nullable(),
  last_page: z.number(),

  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string().nullable(),
      active: z.boolean(),
    }),
  ),

  path: z.string(),
  per_page: z.number(),
  to: z.number().nullable(),
  total: z.number(),
})

export const LinksSchema = nullableObject(
  z.object({
    first: z.string(),
    last: z.string(),
    prev: z.string(),
    next: z.string(),
  })
)

export type Meta = z.infer<typeof MetaSchema>

export type Link = z.infer<typeof LinksSchema>