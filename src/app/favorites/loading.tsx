import { Wrapper } from "@/components/Wrapper";
import { SkeletonList } from "@/ui/Skeleton";
import styles from '@/styles/module/Spacing.module.css'

export default function Loading() {
  return (
    <Wrapper classNameContainer={styles.Spacing__Outer_80x120} >
      <SkeletonList />
    </Wrapper>
  )
}