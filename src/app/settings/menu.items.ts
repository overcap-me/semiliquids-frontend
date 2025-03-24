import { ROUTE_PATHS } from "@/shared/routes";

export const menuItems = [
  {
    id: "personal-info",
    href: ROUTE_PATHS.PROFILE.BASE,
    title: "Personal Info",
  },
  {
    id: "company-info",
    href: ROUTE_PATHS.PROFILE.COMPANY_INFO,
    title: "Company Info",
  },
  {
    id: "password-settings",
    href: ROUTE_PATHS.PROFILE.CHANGE_PASSWORD,
    title: "Password Settings",
  },
  {
    id: "danger-zone",
    href: ROUTE_PATHS.PROFILE.REMOVE_ACCOUNT,
    title: "Danger Zone",
  },
];
