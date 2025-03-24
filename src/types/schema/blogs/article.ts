import { LinksSchema, MetaSchema } from './../meta';

import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  author: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
  }),
  media: z.object({
    id: z.number(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    ext: z.string(),
    title: z.string(),
    url: z.string(),
    size_for_humans: z.string(),
    pretty_name: z.string(),
  }),
  published_at: z.string()
})

export const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema),
  links: LinksSchema,
  meta: MetaSchema
})

export type ArticleDetail = z.infer<typeof ArticleSchema>;

export type ArticlesResponse = z.infer<typeof ArticlesResponseSchema>;
