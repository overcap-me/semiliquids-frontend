
import { z } from 'zod';

export const SearchParamsSchema = z.object({
  'filter[asset_class][]': z.array(z.string()).optional(),
  'filter[focus][]': z.array(z.string()).optional(),
  'filter[strategy][]': z.array(z.string()).optional(),
  search: z.string().optional(),
  page: z.string().optional(),
})

export type FiltersQueryParams = z.infer<typeof SearchParamsSchema>;
