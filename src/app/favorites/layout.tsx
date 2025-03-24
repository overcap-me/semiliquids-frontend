import { Suspense, type ReactNode } from "react";
import { MainBanner } from "@/ui/MainBanner";

const FavoritesLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <Suspense>
      <MainBanner title="My List" />
      <main>{children}</main>
    </Suspense>
  );
};

export default FavoritesLayout;
