'use client' // Error boundaries must be Client Components

import { Typography } from '@/components/Typography'
import { Wrapper } from '@/components/Wrapper'
import stylesSpace from "@/styles/module/Spacing.module.css";

export default function Error() {
  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
      <Typography as="h2">Something went wrong!</Typography>
    </Wrapper>
  )
}