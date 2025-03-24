import { Menu } from "@/components/Menu";
import { MainBanner } from "@/ui/MainBanner";
import type { ReactNode } from "react";
import { menuItems } from "./menu.items";

const SettingsLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <MainBanner title="My Account" />
      <Menu items={menuItems} />
      {children}
    </>
  );
};

export default SettingsLayout;
