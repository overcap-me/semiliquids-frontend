import { Typography } from "@/components/Typography";
import styles from "./NotData.module.css";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import type { FC } from "react";
import { Block } from "@/shared/ui/Block";

type TProps = {
  href: string;
  title: string;
  text: string;
  buttonTitle?: string;
};


export const NotData: FC<TProps> = ({ title, text, href, buttonTitle = 'Explore Funds' }) => {
  return (
    <Block
      className={clsx(stylesLayout.Flex, stylesLayout.FDC, stylesLayout.AIC)}
    >
      <Typography as="div" spacing="sm">
        <Typography align="center" as="h3" spacing="s">
          {title}
        </Typography>
        <Typography align="center" as="h6" color="primary-70">
          {text}
        </Typography>
      </Typography>
      <ButtonOrLink asTag="a" href={href} className={styles.Button}>
        <Typography as="h6" textTransform="uppercase" fontWeight="800">
          {buttonTitle}
        </Typography>
      </ButtonOrLink>
    </Block>
  );
};
