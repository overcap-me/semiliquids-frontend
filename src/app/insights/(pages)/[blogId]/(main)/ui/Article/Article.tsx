"use client";

import styles from "./Article.module.css";
import { Narrow, Wrapper } from "@/components/Wrapper";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import clsx from "clsx";
import { MainPhoto } from "../MainPhoto";
import { AsideNavigationOfPage } from "@/ui/Aside";
import { useCalcHeading } from "@/ui/Aside/hooks/useCalcHeading";
import { TextView } from "@/app/funds/[fundId]/[shareId]/ui/TextView";

export const Article = ({ article }) => {
  const { activeSection, sections } = useCalcHeading();

  return (
    <Wrapper
      classNameContainer={stylesSpace.Spacing__Outer_120x120}
      classNameWrapper={clsx(stylesLayout.Flex, stylesLayout.JCSB)}
    >
      <Narrow>
        <MainPhoto media={article?.data?.media} />
        <article className={styles.Content}>
          {
            article?.data?.sections?.map((section, index) => {
              return (
                <div className={clsx(
                  {
                    [stylesSpace.Spacing__Inner_40x56]: section?.data.add_background,
                    [stylesSpace.Spacing__Outer_40x64]: section?.data.add_background,
                    [styles.BackgroundFull]: section?.data.add_background,
                  })
                } key={index}>
                  <TextView content={section?.data?.text.content} />
                </div>
              )
            })
          }
        </article>
      </Narrow>

      <AsideNavigationOfPage activeId={activeSection} menu={sections} />
    </Wrapper>
  );
};
