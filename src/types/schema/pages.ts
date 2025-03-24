import { z } from 'zod';

const SeoSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
})

export const PageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  sections: z.array(z.unknown()),
  meta: z.object({
    seo: SeoSchema
  })
})

export const PageResponseDTO = z.object({
  data: PageSchema
});

export type PageProps = z.infer<typeof PageSchema>

export type PageResponse = z.infer<typeof PageResponseDTO>

export const SettingResponseDTO = z.object({
  endnotes: z.array(
    z.object({
      text: z.string().nullable()
    })
  ),
  disclosures: z.array(
    z.object({
      text: z.string().nullable()
    })
  )
})

export type SettingResponse = z.infer<typeof SettingResponseDTO>

