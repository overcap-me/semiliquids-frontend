import { z } from "zod";
import { LinksSchema, MetaSchema } from "./meta";
import { nullableObject } from "@/shared/lib/zod";

export const CurrencySchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
});

export const ManagerSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  currency: CurrencySchema.nullable().optional(),
  overview: z.string().nullable(),
  aum: z.unknown().nullable(),
  capital_deployed: z.unknown().nullable(),
  transactions: z.unknown().nullable(),

  features: z
    .array(
      z.object({
        value: z.string().nullable(),
        caption: z.string().nullable(),
      })
    )
    .nullable(),
});

export const ShareClassSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  type: z.string().nullable(),
});

export const PerformanceSchema = z.object({
  id: z.number(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  fund_class_id: z.number().nullable(),
  year: z.number().nullable(),
  jan_value: z.string().nullable(),
  feb_value: z.string().nullable(),
  mar_value: z.string().nullable(),
  apr_value: z.string().nullable(),
  may_value: z.string().nullable(),
  jun_value: z.string().nullable(),
  jul_value: z.string().nullable(),
  aug_value: z.string().nullable(),
  sep_value: z.string().nullable(),
  oct_value: z.string().nullable(),
  nov_value: z.string().nullable(),
  dec_value: z.string().nullable(),
  ytd_value: z.string().nullable(),
  jan: z.string().nullable(),
  feb: z.string().nullable(),
  mar: z.string().nullable(),
  apr: z.string().nullable(),
  may: z.string().nullable(),
  jun: z.string().nullable(),
  jul: z.string().nullable(),
  aug: z.string().nullable(),
  sep: z.string().nullable(),
  oct: z.string().nullable(),
  nov: z.string().nullable(),
  dec: z.string().nullable(),
  ytd: z.string().nullable(),
});

export const ClassSchema = z.object({
  id: z.number(),
  slug: z.string(),
  inception_date: z.string().nullable().optional(),
  updated_at: z.string(),
  in_wishlist: z.boolean().default(false),
  currency: CurrencySchema.nullable(),
  share_class: ShareClassSchema.nullable(),
  nav: z.string().nullable(),
  one_month: z.string().nullable(),
  three_month: z.string().nullable(),
  six_month: z.string().nullable(),
  ytd: z.string().nullable(),
  one_year: z.string().nullable(),
  since_inception_cumulative: z.string().nullable(),
  since_inception_annualized: z.string().nullable(),
  three_years_annualized: z.string().nullable(),

  /**
   * @deprecated
   */
  pa_three_years: z.string().nullable().optional(),
  /**
   * @deprecated
   */
  pa_since_inception: z.string().nullable().optional(),

  fund_domicile: z.string().nullable(),
  minimum_investment: z.string().nullable(),
  /**
   * @deprecated
   */
  management_fee: z.string().nullable().optional(),
  /**
   * @deprecated
   */
  performance_fee: z.string().nullable().optional(),
  lock_up_period: z.string().nullable().optional(),
  fees: z.array(z.string().nullable()).nullable(),
  subscription: z.string().nullable(),
  liquidity: z.string().nullable(),

  other_terms: z.unknown(),
  performance: z.array(PerformanceSchema),
});

export const ItemSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const AssetClassSchema = ItemSchema.extend({
  asset_class: z.string().nullable(),
});

export const FocusSchema = ItemSchema.extend({ focus: z.string() });

export const IndustrySchema = ItemSchema.extend({ industry: z.string() });

export const StrategySchema = ItemSchema.extend({ strategy: z.string() });

export const InvestmentTypeSchema = ItemSchema.extend({
  investment_type: z.string(),
});

export const MonthlyReportSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  id: z.number(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  ext: z.string(),
  title: z.string(),
  url: z.string(),
  size_for_humans: z.string(),
  pretty_name: z.string(),
});

export const TopInvestments = z.object({
  rows: z
    .array(z.array(z.object({ value: z.string() })))
    .nullable()
    .optional(),
  headers: z
    .array(z.object({ title: z.string() }))
    .nullable()
    .optional(),
});

export const FundResponseSchema = z.object({
  id: z.number(),

  slug: z.string(),

  currency: CurrencySchema.nullable().optional(),

  aum_date: z.string().nullable(),

  aum: z.unknown().nullable(),

  abbreviation: z.string().nullable(),

  name: z.string(),

  manager: ManagerSchema,

  asset_class: z.string().nullable(),

  classes: z.array(ClassSchema).nullable(),

  asset_classes: z.array(AssetClassSchema).nullable(),

  focuses: z.array(FocusSchema).nullable(),

  industries: z.array(IndustrySchema).nullable(),

  strategies: z.array(StrategySchema).nullable(),

  investment_types: z.array(InvestmentTypeSchema).nullable(),

  top_investments: z.unknown().nullable(), //TopInvestments.nullable().optional()

  monthly_report: MonthlyReportSchema.nullable(),
});

export const FundsResponseDTOSchema = z.object({
  data: z.array(FundResponseSchema),
  links: LinksSchema,
  meta: MetaSchema,
});

export type FundResponse = z.infer<typeof FundResponseSchema>;

export type FundsResponseDTO = z.infer<typeof FundsResponseDTOSchema>;

export type ClassDetail = z.infer<typeof ClassSchema>;

export type AccessorFundFormatted = {
  __fund: Omit<FundResponse, "classes">;
  classes: ClassDetail & Omit<FundResponse, "classes">;
} & ClassDetail;

export type PerformanceDetail = z.infer<typeof PerformanceSchema>;

export type DocumentDetail = z.infer<typeof MonthlyReportSchema>;

export type MonthlyReportDetail = z.infer<typeof MonthlyReportSchema>;

export type TopInvestmentsDetail = z.infer<typeof TopInvestments>;

export type ShareClassDetail = z.infer<typeof ShareClassSchema>;
