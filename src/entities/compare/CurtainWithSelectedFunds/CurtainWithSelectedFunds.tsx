import clsx from "clsx";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import type { FundResponse } from "@/types/schema/funds";

import styles from "./CurtainWithSelectedFunds.module.css";
import Close from "@/assets/icons/Cross.svg";
import stylesLayout from "@/styles/module/Layout.module.css";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { ROUTE_PATHS } from "@/shared/routes";
import { SIZE_PROPS } from "@/shared/lib/icons";
import { createCompareUrl } from "../utils/createCompareUrl";

type CurtainWithSelectedFundsProps<T> = {
  items: T[];
  onDeleteById: (fund: T) => void;
  pathname: string;
};

type CompareChipProps<T> = {
  fund: T;
  onRemove: () => void;
};

const CompareChip = <F,>({ fund, onRemove }: CompareChipProps<F>) => {
  return (
    <div className={styles.compareChip}>
      <div className={styles.chipDesc}>
        <Typography color="primary" as="h6">
          {fund?.name ??
            fund?.fund?.name ??
            fund?.__fund?.name ??
            fund?.__fund?.__name}
        </Typography>
        {fund?.share_class?.name && (
          <Typography color="primary-50" as="h6">
            {fund?.share_class?.name}
          </Typography>
        )}
      </div>

      <ButtonOrLink
        asTag="button"
        className={styles.chipIcon}
        onClick={onRemove}
      >
        <Close {...SIZE_PROPS} />
      </ButtonOrLink>
    </div>
  );
};

export const CurtainWithSelectedFunds = <T extends FundResponse>({
  items,
  onDeleteById,
  pathname,
}: CurtainWithSelectedFundsProps<T>) => {
  const query = createCompareUrl(items);

  if (
    items?.length < 1 ||
    [
      ROUTE_PATHS.BLOG.BASE,
      ROUTE_PATHS.FAQ.BASE,
      ROUTE_PATHS.PROFILE.BASE,
      ROUTE_PATHS.COMPARE.BASE,
      ROUTE_PATHS.AUTH.PATH,
    ].some((route) => pathname.startsWith(route))
  ) {
    return null;
  }

  return (
    <Wrapper
      classNameContainer={clsx(styles.curtain, {
        [styles.active]: items.length > 0,
      })}
      classNameWrapper={clsx(styles.curtainWrapper, stylesLayout.Gap_40)}
      bg={EBackgroundColor.Primary}
    >
      <Typography as="h3">Comparison list</Typography>

      <div className={clsx(stylesLayout.Flex, stylesLayout.Gap_16)}>
        {items.map((item) => (
          <CompareChip
            key={item.id}
            fund={item}
            onRemove={() => onDeleteById(item)}
          />
        ))}
      </div>

      <ButtonOrLink
        className={styles.compareButton}
        asTag="a"
        href={{
          pathname: ROUTE_PATHS.COMPARE.BASE,
          query: {
            q: query,
          },
        }}
      >
        <Typography
          fontFamily="manrope"
          as="h6"
          fontWeight="800"
          textTransform="uppercase"
        >
          Compare
        </Typography>
      </ButtonOrLink>
    </Wrapper>
  );
};
