'use client';
import { useState, type FC } from "react";
import clsx from "clsx";

import { Typography } from "@/components/Typography";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import styles from "./Table.module.css";

type TableProps = {
  columns: unknown
  data: unknown
};

export const Table: FC<TableProps> = ({ columns, data }) => {
  const [__data] = useState(() => data)

  const table = useReactTable({
    data: __data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className={styles.Block}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.row}>
              {headerGroup.headers.map((header) => {
                const headerClassName = header.column.columnDef?.cellClassName;
                const headerStyles = header.column.columnDef?.cellStyles;
                return (
                  <th key={header.id} className={clsx(styles.cell, headerClassName)} style={{
                    ...headerStyles,
                  }}>
                    <Typography
                      fontWeight="800"
                      textTransform="uppercase"
                      fontFamily="manrope"
                      as="h6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Typography>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map((cell) => {

                const cellClassName = cell.column.columnDef?.cellClassName;
                const cellStyles = cell.column.columnDef?.cellStyles;
                return (
                  <td key={cell.id}
                    className={clsx(styles.cell, cellClassName)}
                    style={{
                      ...cellStyles,
                    }}>
                    <Typography color="primary-70">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Typography>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
