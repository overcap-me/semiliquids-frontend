import ArrowRight from '@/assets/icons/ArrowRight.svg'
import { ButtonOrLink } from "@/components/ButtonOrLink"
import { SIZE_PROPS } from "@/shared/lib/icons"
import { ARROW_DIRECTION, useArrowRedirect } from './useArrowRedirect';

export const ArrowNext = () => {
  const { href } = useArrowRedirect(ARROW_DIRECTION.NEXT);

  return (
    <ButtonOrLink mode="arrow-right" asTag="a" href={href}>
      <ArrowRight {...SIZE_PROPS} />
    </ButtonOrLink>
  )
}