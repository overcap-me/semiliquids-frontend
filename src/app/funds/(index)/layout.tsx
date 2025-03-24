import { Menu } from "@/components/Menu";
import { MainBanner } from "@/ui/MainBanner";
import { Fragment, Suspense, type ReactNode } from "react";
import { Filters } from "./entities/Filters";
import { menuItems } from "./menu.items";
import { PagesActionsServiceInstance } from "@/api/pages/PagesActionsService";
import { FiltersProviderClient } from "@/widgets/Filters/context";
import { TermsAndConditions } from "@/entities/TermsAndConditions";
import { SkeletonPage } from "@/ui/Skeleton";

export async function generateMetadata() {
  const page = await PagesActionsServiceInstance.getPages("funds");

  return {
    title: page?.data?.meta?.seo?.title,
    description: page?.data?.meta?.seo?.description,
  };
}

const HomeLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const page = await PagesActionsServiceInstance.getPages("funds");

  return (
    <Suspense fallback={<SkeletonPage hiddenGeneratorContent />}>
      <FiltersProviderClient>
        <MainBanner title={page?.data?.name ?? "Catalog"} />
        <Filters />
        <Menu items={menuItems} />

        {children}

        <TermsAndConditions />
      </FiltersProviderClient>
    </Suspense>
  );
};

export default HomeLayout;
