import clsx from "clsx";
import { Typography } from "@/components/Typography";
import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";
import { SkeletonText } from "../Text";
import { SkeletonTitle } from "../Title";

export const GeneratorContentSkeleton = () => {
  return (
    <>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x80}>
        <div
          className={clsx(
            stylesLayout.Grid,
            stylesLayout.JCSB,
            stylesLayout.AIC,
            stylesLayout.Grid__Col_2_content
          )}
        >
          <Typography as="div">
            <SkeletonTitle />
            <SkeletonText />
          </Typography>
        </div>
      </Wrapper>
    </>
  );
};
