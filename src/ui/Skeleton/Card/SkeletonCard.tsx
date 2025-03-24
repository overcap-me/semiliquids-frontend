import clsx from "clsx";
import { Skeleton } from "../Skeleton";
import styles from "./SkeletonCard.module.css";

export const SkeletonCard = ({ primary = false }) => {
  return (
    <div className={clsx(styles.card, {
      [styles.primary]: primary,
    })}>
      <Skeleton className={styles.media} />

      <Skeleton className={styles.title} />
      <Skeleton className={styles.desc} />
    </div>
  );
};
