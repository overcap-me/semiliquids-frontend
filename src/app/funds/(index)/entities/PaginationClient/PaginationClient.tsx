"use client";

import { Wrapper } from "@/components/Wrapper";
import { Pagination } from "@/ui/Pagination/Pagination";
import stylesSpace from "@/styles/module/Spacing.module.css";
import type { FC } from "react";
import { useFiltersContext } from "@/widgets/Filters/context";

type PaginationClientProps = {
  fund: unknown;
};

export const PaginationClient: FC<PaginationClientProps> = ({ fund }) => {
  const { updatePagination } = useFiltersContext();

  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_120x120}>
      <Pagination
        onPageChange={updatePagination}
        currentPage={fund?.meta?.current_page}
        totalPages={fund?.meta?.last_page}
      />
    </Wrapper>
  );
};
