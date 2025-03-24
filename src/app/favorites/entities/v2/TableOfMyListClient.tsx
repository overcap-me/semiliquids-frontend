"use client";
import { Fragment, useState, type FC } from "react";
import type { AccessorWishlist } from "@/types/schema/user/wishlist";
import { columns } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Sort } from "@/shared/ui/icons/Sort";
import styles from './TableOfMyListClient.module.css'
import clsx from "clsx";
import { Typography } from "@/components/Typography";

import { StrategyDataTable } from "../ExtraTables/StrategyDataTable";
import { PerformanceTable } from "../ExtraTables/PerformanceTable";
import { TermsTable } from "../ExtraTables/TermsTable";
import { Tabs } from "@/ui/Tabs";

type TableOfMyListClientProps = {
  funds: AccessorWishlist[];
};

const expandedRowNode = ({ row }) => {

  return <div className={styles.childTable}>
    <Tabs
      tabs={[
        { label: "Performance", content: <PerformanceTable row={row} /> },
        { label: "Portfolio", content: <StrategyDataTable row={row} /> },
        { label: "Terms", content: <TermsTable row={row} /> },
      ]}
    />
  </div>
}

export const TableOfMyListClient: FC<TableOfMyListClientProps> = ({
  funds,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: funds,
    columns,

    state: {
      sorting,
    },

    meta: {
      removeRow: () => { },
    },

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.row} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const enableSorting = header.column.columnDef.enableSorting ?? true;
                const headerClassName = header.column.columnDef?.cellClassName;
                const headerStyles = header.column.columnDef?.cellStyles;

                return (
                  <th className={clsx(styles.cell, headerClassName)} key={header.id} style={{ ...headerStyles }}>
                    {
                      header.isPlaceholder
                        ? null
                        : (
                          <button type="button" className={clsx(styles.cellWithSort, {
                            [styles.active]: header.column.getIsSorted(),
                            [styles.sort]: enableSorting,
                          })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <Typography
                              as="span"
                              size="xs"
                              fontWeight="800"
                              textTransform="uppercase"
                              className={styles.cellHeadTitle}
                            >
                              {
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )
                              }
                            </Typography>

                            {
                              enableSorting && <Sort className={styles.iconSort} direction={header.column.getIsSorted()} />
                            }

                          </button>
                        )
                    }
                  </th>
                )
              }
              )}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <tr className={clsx(styles.row,
                  {
                    [styles.activeExpanderRow]: row.getIsExpanded(),
                  }
                )}>
                  {row.getVisibleCells().map((cell) => {
                    const cellClassName = cell.column.columnDef?.cellClassName;
                    const cellStyles = cell.column.columnDef?.cellStyles;

                    return (
                      <td className={clsx(styles.cell, cellClassName)} key={cell.id} style={{
                        ...cellStyles,
                      }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
                {
                  row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        {expandedRowNode({ row })}
                      </td>
                    </tr>
                  )
                }
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
