"use client";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { ROUTE_PATHS } from "@/shared/routes";
import stylesLayout from "@/styles/module/Layout.module.css";
import { formattedDate } from "@/utils/actionsWithDate";
import { cellWithPostfix, cellWithPrefix } from "@/utils/calcCell";
import { GLOBAL_OPTIONS_DATE, PREFIX_AS_DATE } from "@/utils/constans";
import { calcValueWithCurrency } from "@/utils/currency";
import { lastSegment } from "@/utils/lastSegment";
import { clsx } from "clsx";
import { useParams, usePathname } from "next/navigation";
import { type FC, Fragment, useMemo } from "react";
import { Thumb } from "../Thumb";
import { CompareButton } from "@/entities/compare/CompareButton";
import { WishlistButton } from "@/entities/WishlistButton";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import styles from "./BannerFundById.module.css";
import type { FundByIdResponse } from "@/types/schema/fund";
import type { ClassDetail } from "@/types/schema/funds";

type TProps = {
  fund: FundByIdResponse;

  currentClass: ClassDetail;
};

export const optionsOfDate = GLOBAL_OPTIONS_DATE;

export const BannerFundById: FC<TProps> = ({
  fund,
  currentClass: currentData,
}) => {
  const pathname = usePathname();
  const { fundId, shareId } = useParams()

  const segment = lastSegment(pathname, shareId)?.toUpperCase();

  const items = useMemo(
    () => [{ href: ROUTE_PATHS.FIRM_BY_ID.BASE(fund?.manager.slug), title: fund?.manager?.name }],
    [fund?.manager?.slug, fund?.manager?.name],
  );

  const _fund = { ...currentData, ...{ __fund: fund } }

  return (
    <Fragment>
      <Breadcrumbs items={items} />
      {fund?.name && (
        <Typography fontWeight="400" as="h1" spacing="sm">
          {fund.name}
        </Typography>
      )}

      <Typography
        as="div"
        spacing="xl"
        className={clsx(stylesLayout.Flex, stylesLayout.Gap_16)}
      >
        {fund?.classes?.map((cls) => (
          <ButtonOrLink
            key={cls.id}
            isActive={cls.share_class.slug === shareId}
            color="white-50"
            pointDirection="bottom"
            asTag="a"
            href={ROUTE_PATHS.FUND_BY_ID[segment](
              fundId,
              cls?.share_class?.slug,
            )}
          >
            <Typography size="xs">{cls.share_class.name}</Typography>
          </ButtonOrLink>
        ))}
      </Typography>

      <div
        className={clsx(
          stylesLayout.Flex,
          stylesLayout.JCSB,
          stylesLayout.Gap_32,
        )}
      >
        <div className={clsx(stylesLayout.Flex, stylesLayout.Gap_32)}>
          <Thumb
            title="NAV"
            time={cellWithPrefix(
              formattedDate(currentData?.updated_at, optionsOfDate),
              PREFIX_AS_DATE,
            )}
            total={calcValueWithCurrency(currentData?.nav, {
              currency: currentData?.currency?.name,
            })}
          />
          <Thumb
            title="YTD"
            time={cellWithPrefix(
              formattedDate(currentData?.updated_at, optionsOfDate),
              PREFIX_AS_DATE,
            )}
            total={cellWithPostfix(currentData?.ytd, "%")}
          />

          <Thumb
            title="Fund AUM"
            time={cellWithPrefix(
              formattedDate(fund?.aum_date, optionsOfDate),
              PREFIX_AS_DATE,
            )}
            total={cellWithPostfix(
              calcValueWithCurrency(fund?.aum?.value, {
                currency: fund?.currency?.name,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }),
              fund?.aum?.unit,
            )}
          />
          <Thumb title="Main Asset Class" time="" total={fund?.asset_class} />
        </div>
        <div
          className={clsx(
            stylesLayout.Flex,
            stylesLayout.Gap_16,
            styles.actions,
          )}
        >
          <WishlistButton mode="regular" classDetails={currentData} className={styles.buttonWishlist} />
          <CompareButton mode="regular" classDetails={_fund} tooltip />
        </div>
      </div>
    </Fragment>
  );
};
