import { Typography } from "@/components/Typography";
import type { FC } from "react";
import styles from "./Thumb.module.css";

type TProps = {
  title: string;
  time?: string;
  total: string | null;
};

export const Thumb: FC<TProps> = ({ title, time, total }) => {
  if (!total) {
    return null;
  }
  return (
    <div className={styles.Thumb}>
      <div className={styles.Thumb__Desc}>
        <Typography as="h6">{title}</Typography>
        {time && (
          <Typography as="h6" color="white-60">
            {time}
          </Typography>
        )}
      </div>
      {total && (
        <Typography fontWeight="500" as="h2">
          {total}
        </Typography>
      )}
    </div>
  );
};
