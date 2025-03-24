"use client";
import {
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState, type FC } from "react";
import clsx from "clsx";
import { Sort } from "@/shared/ui/icons/Sort";
import styles from "./TableAdapterClient.module.css";
import { useHandleRedirect } from "@/app/funds/(index)/hooks/useHandleRedirect";
import { NotDataTable } from "./ui/NotDataTable";
import { Typography } from "@/components/Typography";
import type { AccessorFundFormatted } from "@/types/schema/funds";

type TableAdapterClientProps = {
  /**
   * The prop is funds from request
   */
  funds?: AccessorFundFormatted[];

  columns: unknown;
};

export const TableAdapterClient: FC<TableAdapterClientProps> = ({
  funds,
  columns,
}) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  /**
   * Remake redirect
   * extend firm and fund
   */
  const handleRedirect = useHandleRedirect();

  const table = useReactTable({
    data: funds,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    state: {
      expanded,
      sorting,
      columnPinning: {
        left: ["fund_name", "share_class_name"],
      },
    },

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    onExpandedChange: setExpanded,

    getSubRows: (row) => row.classes,
  });

  if (funds?.length === 0 || typeof funds === "undefined") {
    return <NotDataTable />;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.row} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const enableSorting =
                  header.column.columnDef.enableSorting ?? true;
                const headerClassName = header.column.columnDef?.cellClassName;
                const headerStyles = header.column.columnDef?.cellStyles;

                if (enableSorting) {
                  return (
                    <th
                      className={clsx(styles.cell, headerClassName)}
                      key={header.id}
                      style={{
                        ...headerStyles,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className={clsx(styles.cellWithSort, {
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
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Typography>

                          {enableSorting && (
                            <Sort
                              className={styles.iconSort}
                              direction={header.column.getIsSorted()}
                            />
                          )}
                        </button>
                      )}
                    </th>
                  );
                }

                return (
                  <th
                    className={clsx(styles.cell, headerClassName)}
                    key={header.id}
                    style={{
                      ...headerStyles,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <Typography
                        as="span"
                        size="xs"
                        fontWeight="800"
                        textTransform="uppercase"
                        className={styles.cellHeadTitle}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Typography>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => {
            return (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <tr
                key={row.id}
                className={styles.row}
                onClick={handleRedirect(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  const cellClassName = cell.column.columnDef?.cellClassName;
                  const cellStyles = cell.column.columnDef?.cellStyles;

                  // @TODO: eadidenko, Should I add a font-weight: 500; to the cell?
                  return (
                    <td
                      key={cell.id}
                      className={clsx(styles.cell, cellClassName)}
                      style={{
                        ...cellStyles,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
