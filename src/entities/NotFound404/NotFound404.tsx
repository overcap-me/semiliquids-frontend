import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import { ROUTE_PATHS } from "@/shared/routes";

import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import styles from "./NotFound.module.css";

export const NotFound404 = () => {
  return (
    <Wrapper
      classNameContainer={styles.HeightFull}
      bg={EBackgroundColor.Primary}
    >
      <div
        className={clsx(
          stylesLayout.Flex,
          stylesLayout.JCC,
          stylesLayout.FDC,
          stylesLayout.AIC,
        )}
      >
        <Typography as="h1">Not Found</Typography>
        <Typography>We couldn’t find the page you were looking for</Typography>
        <ButtonOrLink
          className={styles.Button}
          asTag="a"
          href={ROUTE_PATHS.INDEX.BASE}
          underline="bottom"
        >
          <Typography>Return Home</Typography>
        </ButtonOrLink>
      </div>
    </Wrapper>
  );
};
