import { ROUTE_PATHS } from "@/shared/routes";

export const menuItems = (firmId: string) => ([
  {
    id: "basic",
    href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.BASE(firmId),
    title: "Overview",
  },
  {
    id: "performance",
    href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.PERFORMANCE(firmId),
    title: "Performance",
  },
  {
    id: "strategy-data",
    href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.STRATEDY_DATA(firmId),
    title: "Portfolio",
  },
  {
    id: "terms",
    href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.TERMS(firmId),
    title: "Terms",
  },
]);
