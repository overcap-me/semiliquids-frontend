"use client";
import { Pagination } from "@/ui/Pagination/Pagination";

export const BlogPagination = ({ meta }) => {
  return (
    <Pagination
      onRedirect={() => { }}
      currentPage={meta?.current_page}
      totalPages={meta?.last_page}
    />
  );
};
