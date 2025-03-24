import { nullableObject } from '@/shared/lib/zod'
import { z } from 'zod'


export const UserProfileResponseSchema = nullableObject(
  z.object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    user_id: z.number(),
    company_name: z.string(),
    company_type: z.string(),
    country: z.string(),
    occupation: z.string(),
    aum: z.string(),
    investment_focus: z.union([z.string(), z.array(z.string())]),
    geo_focus: z.union([z.string(), z.array(z.string())]),
    phone: z.string(),
  })
)

export const UserResponseSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  wishlist: z.array(z.number()).nullable(),
  profile: UserProfileResponseSchema.nullable()
})

export const UserResponseDTOSchema = z.object({
  data: UserResponseSchema
})

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>

export type UserResponse = z.infer<typeof UserResponseSchema>

export type UserResponseDTO = z.infer<typeof UserResponseDTOSchema>