import { z } from "zod";
import { PerformanceSchema } from "./funds";

export const ItemPerformanceIndexSchema = PerformanceSchema.extend({
  type: z.string().nullable(),
}).omit({
  fund_class_id: true,
});

export const PerformanceIndexesResponseSchema = z.object({
  all: z.array(ItemPerformanceIndexSchema),
  pe: z.array(ItemPerformanceIndexSchema),
  pd: z.array(ItemPerformanceIndexSchema),
});

export type ItemPerformanceIndex = z.infer<typeof ItemPerformanceIndexSchema>;

export type PerformanceIndexesResponse = z.infer<
  typeof PerformanceIndexesResponseSchema
>;
