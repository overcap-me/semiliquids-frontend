"use client";
import ArrowLeft from "@/assets/icons/ArrowLeft.svg";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import { clsx } from "clsx";
import type { FC, SyntheticEvent } from "react";
import styles from "./Pagination.module.css";
import { SIZE_PROPS } from "@/shared/lib/icons";

type TProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};

const FIRST_OF_PAGE = 1;

export const Pagination: FC<TProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageToShow = 7;

    if (totalPages <= maxPageToShow) {
      // If total pages are less than or equal to 7, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);

      if (currentPage > 4) {
        pageNumbers.push("...");
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }

      // Always show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePagination = (event: SyntheticEvent, page: string | number) => {
    event.preventDefault();
    onPageChange?.(page)
  }

  const pageNumbers = getPageNumbers();

  if (totalPages === FIRST_OF_PAGE) {
    return null;
  }

  return (
    <div className={clsx(stylesLayout.Gap_16, styles.PaginationBlock)}>
      {!isFirstPage && (
        <ButtonOrLink
          className={styles.PaginationArrow}
          href={`?page=${prevPage}`}
          mode="arrow-left"
          asTag="a"
          onClick={(event) => handlePagination(event, prevPage)}
        >
          <ArrowLeft {...SIZE_PROPS} />
        </ButtonOrLink>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <ButtonOrLink
            key={index + 1}
            href={`?page=${page}`}
            isActive={page === currentPage}
            asTag="a"
            color="active"
            pointDirection="bottom"
            onClick={(event) => handlePagination(event, page)}

          >
            <Typography as="h4">{page}</Typography>
          </ButtonOrLink>
        ) : (
          <ButtonOrLink asTag="button" key="dots" type="button">
            <Typography as="h4">{page}</Typography>
          </ButtonOrLink>
        ),
      )}

      {/* Next Button */}
      {!isLastPage && (
        <ButtonOrLink
          className={styles.PaginationArrow}
          href={`?page=${nextPage}`}
          mode="arrow-right"
          asTag="a"
          onClick={(event) => handlePagination(event, nextPage)}
        >
          <ArrowRight  {...SIZE_PROPS} />
        </ButtonOrLink>
      )}
    </div>
  );
};
