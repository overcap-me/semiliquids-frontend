import { ROUTE_PATHS } from "@/shared/routes";

export const menuItems = (fundId: string, shareId: string) => [
  {
    id: "overview",
    href: ROUTE_PATHS.FUND_BY_ID.BASE(fundId, shareId),
    title: "Overview",
  },
  {
    id: "performance",
    href: ROUTE_PATHS.FUND_BY_ID.PERFORMANCE(fundId, shareId),
    title: "Performance",
  },
  {
    id: "portfolio",
    href: ROUTE_PATHS.FUND_BY_ID.PORTFOLIO(fundId, shareId),
    title: "Portfolio",
  },
  {
    id: "terms",
    href: ROUTE_PATHS.FUND_BY_ID.TERMS(fundId, shareId),
    title: "Terms",
  },
  {
    id: "documents",
    href: ROUTE_PATHS.FUND_BY_ID.DOCUMENTS(fundId, shareId),
    title: "Documents",
  },
];
