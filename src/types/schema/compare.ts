import { z } from "zod";
import { FundByIdResponseSchema } from "./fund";
import { ClassSchema } from "./funds";

export const FundByIdCompareResponse = z.object({
  __fund: FundByIdResponseSchema.omit({ classes: true }),
})
  .merge(ClassSchema);


export type FundByIdCompareResponse = z.infer<typeof FundByIdCompareResponse>