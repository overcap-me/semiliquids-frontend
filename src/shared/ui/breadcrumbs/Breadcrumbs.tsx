import type { FC } from "react";

import { ROUTE_PATHS } from "@/shared/routes";

import styles from './Breadcrumbs.module.css'
import ArrowRight from '@/assets/icons/ArrowRight.svg'
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";

type BreadcrumbProps = {
  href: string;
  title: string;
}

type BreadcrumbsProps = {
  items: BreadcrumbProps[]
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const onlyIndex = items?.length !== 0;

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ButtonOrLink className={styles.breadcrumb} asTag="a" href={ROUTE_PATHS.INDEX.BASE}>
        <Typography as="h6">Catalog</Typography>
        {onlyIndex && <ArrowRight className={styles.arrowRight} />}
      </ButtonOrLink>

      {
        items?.map((brd, index) => {
          const isLast = index === items.length - 1;

          return (
            <ButtonOrLink className={styles.breadcrumb} key={`${brd.title}-${index}`} asTag="a" href={brd.href}>
              <Typography as="h6">{brd.title}</Typography>
              {!isLast && <ArrowRight className={styles.arrowRight} />}
            </ButtonOrLink>
          )
        })
      }
    </nav>
  );
};