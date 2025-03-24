import ArrowLeft from '@/assets/icons/ArrowLeft.svg'
import { ButtonOrLink } from "@/components/ButtonOrLink"
import { SIZE_PROPS } from "@/shared/lib/icons"
import { ARROW_DIRECTION, useArrowRedirect } from './useArrowRedirect'

export const ArrowPrev = () => {
  const { href } = useArrowRedirect(ARROW_DIRECTION.PREV);

  return (
    <ButtonOrLink mode="arrow-left" asTag="a" href={href}>
      <ArrowLeft {...SIZE_PROPS} />
    </ButtonOrLink>
  )
}