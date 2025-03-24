import { Narrow, Wrapper } from "@/components/Wrapper";
import { MainBanner } from "@/ui/MainBanner";
import { SkeletonText, SkeletonTitle } from "@/ui/Skeleton";
import stylesSpace from "@/styles/module/Spacing.module.css";

export default function Loading() {
  return <>
    <MainBanner>
      <SkeletonTitle />
    </MainBanner>

    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_120x120}>

      <Narrow>
        <SkeletonTitle />

        <SkeletonText />

        <SkeletonText />

        <SkeletonText />
      </Narrow>
    </Wrapper >
  </>
}