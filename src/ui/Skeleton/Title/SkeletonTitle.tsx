import { Skeleton } from "../Skeleton"
import styles from './SkeletonTitle.module.css'

type SkeletonTitleProps = {
}

export const SkeletonTitle = () => {
  return <Skeleton className={styles.title} />
}