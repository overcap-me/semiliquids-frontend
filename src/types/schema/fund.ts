import { z } from "zod";
import { FundResponseSchema, MonthlyReportSchema } from "./funds";
import { nullableObject } from "@/shared/lib/zod";


export const DisclaimerSchema = z.object({
  text: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
})

export const FundByIdResponseSchema = nullableObject(
  z.object({
    overview: z.string(),

    features: z.array(
      nullableObject(
        z.object({
          value: z.string(),
          caption: z.string(),
        })
      )
    ).nullable(),

    reasons: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string().nullable().optional(),
          text: z.string(),
        })
      ),
    }),
    considerations: z.unknown(),
    fund_literature: z.array(MonthlyReportSchema).nullable(),
    regulatory_documents: z.array(MonthlyReportSchema).nullable(),
    monthly_report: MonthlyReportSchema.nullable(),
    endnotes: z.array(DisclaimerSchema).nullable(),
    disclosures: z.array(DisclaimerSchema).nullable(),
  })
)
  .merge(FundResponseSchema)


export const FundByIdResponseDTOSchema = z.object({
  data: FundByIdResponseSchema
})

export type FundByIdResponse = z.infer<typeof FundByIdResponseSchema>

export type FundByIdResponseDTO = z.infer<typeof FundByIdResponseDTOSchema>

export type DisclaimerDetail = z.infer<typeof DisclaimerSchema>