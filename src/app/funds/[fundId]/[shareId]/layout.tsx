import { Menu } from "@/components/Menu";
import { MainBanner } from "@/ui/MainBanner";
import type { ReactNode } from "react";
import { BannerFundById } from "./ui/BannerFundById";
import stylesArticle from "./ui/styles/Article.module.css";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { menuItems } from "./menu.items";
import type { TParams } from "./types";
import React, { Suspense } from "react";
import { FundProvider } from "./contexts/FundProvider";
import { currentTab } from "@/utils/currentTab";
import { TermsAndConditions } from "@/entities/TermsAndConditions";
import type { ClassDetail } from "@/types/schema/funds";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { SkeletonPage } from "@/ui/Skeleton";

const FundLayout = async ({
  children,
  params: { fundId, shareId },
}: Readonly<{ children: ReactNode; params: TParams }>) => {
  const fundById = await FundsActionsServiceInstance.getById(fundId);
  const perfomancesIndex =
    await UserActionsServiceInstance.getPerfomanceIndex();

  const currentData = currentTab<ClassDetail[]>(fundById?.classes, shareId);

  return (
    <Suspense fallback={<SkeletonPage />}>
      <FundProvider
        hub={fundById}
        shareId={shareId}
        currentData={currentData}
        perfomancesIndex={perfomancesIndex}
      >
        <MainBanner>
          <BannerFundById currentClass={currentData} fund={fundById} />
        </MainBanner>

        <Menu items={menuItems(fundId, shareId)} />

        <article className={stylesArticle.Content}>{children}</article>

        <TermsAndConditions
          disclosures={fundById?.disclosures}
          endnotes={fundById?.endnotes}
        />
      </FundProvider>
    </Suspense>
  );
};

export default FundLayout;
