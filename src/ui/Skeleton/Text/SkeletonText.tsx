import { Fragment } from "react"
import { Skeleton } from "../Skeleton";
import styles from "./SkeletonText.module.css";

const items = Array.from({ length: 4 });

export const SkeletonText = () => {
  return <Fragment>
    {items?.map((it, index) => (
      <Skeleton className={styles.text} key={`${it}-${index}`} />
    ))}
  </Fragment>
}