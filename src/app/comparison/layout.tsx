"use client";
import { Typography } from "@/components/Typography";
import { useCompareContext } from "@/entities/compare/context";
import { ROUTE_PATHS } from "@/shared/routes";
import { MainBanner } from "@/ui/MainBanner";
import { RemoveButton } from "@/ui/RemoveButton";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

export const MainSection = () => {
  const { onClear } = useCompareContext();
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q");

  return (
    <MainBanner>
      <Typography fontWeight="400" as="h1">
        Compare Funds
      </Typography>

      {q && (
        <RemoveButton
          onClick={() => {
            onClear();
            router.push(ROUTE_PATHS.INDEX.BASE);
          }}
          color="pink"
          title="Clear Comparison List"
        />
      )}
    </MainBanner>
  );
};

const CompareLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Suspense>
      <MainSection />
      <main>{children}</main>
    </Suspense>
  );
};

export default CompareLayout;
