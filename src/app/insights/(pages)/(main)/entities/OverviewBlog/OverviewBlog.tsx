import { Typography } from "@/components/Typography"
import { Narrow } from "@/components/Wrapper"

export const OverviewBlog = () => {
  return <>
    <Narrow>
      <Typography spacing="l" as="div">
        <Typography as="h2" spacing="xs">
          Market Pulse
        </Typography>
        <Typography as="p" color="primary-70">
          Serached high and low for this jewels.
        </Typography>
      </Typography>
    </Narrow>
  </>
}