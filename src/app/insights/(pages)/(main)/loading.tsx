import clsx from "clsx";
import { Wrapper } from "@/components/Wrapper";
import { OverviewBlog } from "./entities/OverviewBlog";

import { SkeletonCard } from "@/ui/Skeleton/Card/SkeletonCard";
import { MainBanner } from "@/ui/MainBanner";
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";

export default function Loading() {
  return <>
    <MainBanner>
      <SkeletonCard primary />
    </MainBanner>

    <Wrapper classNameContainer={[stylesSpace.Spacing__Outer_80x80]}>
      <OverviewBlog />

      <div className={clsx(
        stylesLayout.Grid,
        stylesLayout.Grid__Col_3,
        stylesLayout.Gap_40,
        stylesLayout.AIS,
      )}>
        {['a', 'b', 'c', 'd'].map((it, index) => <SkeletonCard key={`${it}-${index}`} />)}
      </div>
    </Wrapper>

  </>
}