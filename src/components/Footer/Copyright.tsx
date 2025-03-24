import { ButtonOrLink } from "../ButtonOrLink"
import { Typography } from "../Typography"

export const Copyright = () => {
  return <div>
    <Typography fontWeight="600" as="h6">
      SemiLiquids.com by <ButtonOrLink color="primary" asTag="a" href="https://overcap.me/" target="_blank">
        <Typography size="xs" as="span" fontWeight="700">OverCap</Typography>
      </ButtonOrLink>
    </Typography>
    <Typography fontWeight="600" as="h6" color="primary-50">
      Copyright &copy;{new Date().getFullYear()}
    </Typography>
  </div>
}