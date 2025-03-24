import { MainBanner } from "@/ui/MainBanner";
import { SkeletonTitle } from "../Title";
import { SkeletonGeneratorContent, SkeletonList } from "..";
import { Wrapper } from "@/components/Wrapper";

import stylesSpace from "@/styles/module/Spacing.module.css";
import { FC } from "react";

type SkeletonPageProps = {
  hiddenGeneratorContent?: boolean;
};

export const SkeletonPage: FC<SkeletonPageProps> = ({
  hiddenGeneratorContent = false,
}) => {
  return (
    <>
      <MainBanner>
        <SkeletonTitle />
      </MainBanner>

      {!hiddenGeneratorContent && (
        <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
          <SkeletonGeneratorContent />
        </Wrapper>
      )}

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <SkeletonList />
      </Wrapper>
    </>
  );
};
