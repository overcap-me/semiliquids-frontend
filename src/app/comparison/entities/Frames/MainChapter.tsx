"use client";
import type { FC } from "react";
import { Row } from "../../ui/Row";
import { Head } from "../../ui/Head";
import { Cell } from "../../ui/Cell";
import { WishlistButton } from "@/entities/WishlistButton";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { ButtonOrLink } from "@/components/ButtonOrLink";

import Bin from "@/assets/icons/Bin.svg";
import { SIZE_PROPS } from "@/shared/lib/icons";

import styles from "./MainChapter.module.css";
import { ROUTE_PATHS } from "@/shared/routes";
import { Typography } from "@/components/Typography";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import { useTableCompareContext } from "../TableOfCompare";

type MainChapterProps = {
  funds: FundByIdCompareResponse[];
  length?: number;
};

export const MainChapter: FC<MainChapterProps> = ({ funds, length }) => {

  const { removeRow } = useTableCompareContext();

  return (
    <>
      <Row>
        <Head>Fund Name</Head>
        {funds?.map((cls) => (
          <Cell classNameBody={styles.names} key={cls.id} as="div">
            <ButtonOrLink
              color="accent"
              underline="bottom"
              asTag="a"
              href={ROUTE_PATHS.FUND_BY_ID.BASE(
                cls.__fund.slug,
                cls?.share_class.slug,
              )}
            >
              <Typography>{cls?.__fund?.name}</Typography>
            </ButtonOrLink>
            <ButtonOrLink
              color="accent"
              underline="bottom"
              asTag="a"
              href={ROUTE_PATHS.FIRM_BY_ID.BASE(
                cls.__fund.manager.slug
              )}
            >
              <Typography>{cls?.__fund?.manager?.name}</Typography>
            </ButtonOrLink>
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>Main asset class</Head>
        {funds?.map((cls) => (
          <Cell key={cls.id}>{cls?.__fund?.asset_class}</Cell>
        ))}
      </Row>

      <Row>
        <Head subtitle="Currency">Share Class</Head>
        {funds?.map((cls) => (
          <Cell key={cls.id} as="div">
            <CellWithTwoRow
              title={cls?.share_class?.name}
              subtitle={cls?.currency?.name}
            />
          </Cell>
        ))}
      </Row>

      <Row>
        <Head />
        {funds?.map((cls) => {
          return (
            <Cell key={cls.id} as="div" classNameBody={styles.buttons}>
              <WishlistButton
                className={styles.wishlist}
                bg="accent-8"
                mode="regular"
                classDetails={cls}
              />

              <ButtonOrLink
                className={styles.remove}
                color="error"
                asTag="button"
                onClick={() => {
                  removeRow(cls?.id);
                }}
              >
                <Bin {...SIZE_PROPS} />
              </ButtonOrLink>
            </Cell>
          );
        })}
      </Row>
    </>
  );
};
