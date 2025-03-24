import { ClassSchema } from './../funds';
import { z } from "zod";
import { FundResponseSchema } from "../funds";
import { LinksSchema, MetaSchema } from "../meta";

export const WishlistByIdResponseSchema = FundResponseSchema

export const WishlistResponseDTOSchema = z.object({
  data: z.array(WishlistByIdResponseSchema),
  links: LinksSchema,
  meta: MetaSchema,
})

export const AccessorWishlistSchema = z.object({
  __fund: FundResponseSchema.omit({ classes: true }),
}).merge(ClassSchema)

export type WishlistByIdResponse = z.infer<typeof WishlistByIdResponseSchema>

export type WishlistResponseDTO = z.infer<typeof WishlistResponseDTOSchema>

export type AccessorWishlist = z.infer<typeof AccessorWishlistSchema>