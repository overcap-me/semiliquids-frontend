
import { z } from "zod";

export const FilterSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
})

export const FiltersResponseSchema = z.object({
  asset_classes: z.array(FilterSchema),
  focuses: z.array(FilterSchema),
  strategies: z.array(FilterSchema),
});

export type Filter = z.infer<typeof FilterSchema>;

export type FiltersResponse = z.infer<typeof FiltersResponseSchema>;

export type FiltersKeys = keyof FiltersResponse;

export const FiltersTitleList: Record<FiltersKeys, string> = {
  asset_classes: "Main Asset Class",
  focuses: "Geo Focus",
  strategies: "Strategy",
}

export const NameOfFiltersInSingularList: Record<FiltersKeys, string> = {
  asset_classes: "asset_class",
  focuses: "focus",
  strategies: "strategy",
}