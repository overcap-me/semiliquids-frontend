import { Fragment } from "react";
import { Skeleton } from "../Skeleton";
import styles from "./SkeletonList.module.css";

const items = Array.from({ length: 4 });

export const SkeletonList = () => {
  return (
    <Fragment>
      {items?.map((it, index) => (
        <Skeleton className={styles.Row} key={`${it}-${index}`} />
      ))}
    </Fragment>
  );
};
