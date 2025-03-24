import { Fragment } from "react";
import { Skeleton } from "../Skeleton";
import styles from "./SkeletonArticle.module.css";

const items = Array.from({ length: 4 });

export const SkeletonArticle = () => {
  return (
    <Fragment>
      {items?.map((it, index) => (
        <Fragment key={`${it}-${index}`}>
          <Skeleton className={styles.Heading_1} />
          <Skeleton className={styles.Heading_2} />
          <Skeleton className={styles.Text} />
        </Fragment>
      ))}
    </Fragment>
  );
};
