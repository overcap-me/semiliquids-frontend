"use client";
import { Typography } from "@/components/Typography";
import type { FC, ReactNode } from "react";
import styles from './CellWithTwoRow.module.css'

type CellWithTwoRowProps = {
  title: string | null | ReactNode;
  titleOptions?: Record<string, unknown>

  subtitle?: string | null;
  subtitleOptions?: Record<string, unknown>
};

export const CellWithTwoRow: FC<CellWithTwoRowProps> = ({
  title,
  titleOptions,
  subtitle,
  subtitleOptions
}) => {
  return (
    <>
      <Typography {...titleOptions}>{title}</Typography>
      {subtitle && title && (
        <Typography {...subtitleOptions} size="xs" color="primary-50">{subtitle}</Typography>
      )}
    </>
  );
};
