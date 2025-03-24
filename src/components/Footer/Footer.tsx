import { clsx } from "clsx";
import { NavigationActionsServiceInstance } from "@/api/navigation/NavigationActionsService";

import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import { ButtonOrLink } from "../ButtonOrLink";
import { Wrapper } from "../Wrapper";
import { Copyright } from "./Copyright";
import styles from "./Footer.module.css";

export const Footer = async () => {
  const protectedNavs =
    await NavigationActionsServiceInstance.getNavigation("footer");

  return (
    <footer className={styles.Footer}>
      <Wrapper onlyInner>
        <div className={clsx(stylesLayout.Grid, stylesLayout.Grid__Col_4, styles.gap)}>
          <div className={styles.col}>
            <ButtonOrLink color="primary" asTag="a" href="mailto:info@semiliquids.com">
              <Typography as="p">info@semiliquids.com</Typography>
            </ButtonOrLink>
            <ButtonOrLink
              color="primary"
              asTag="a"
              target="_blank"
              href="https://www.linkedin.com/company/semiliquids/posts/?feedView=all"
            >
              <Typography as="p">LinkedIn</Typography>
            </ButtonOrLink>
          </div>

          <div className={styles.col} data-col-span="2">
            {protectedNavs?.data?.items &&
              Object.entries(protectedNavs?.data?.items).map(([id, nav]) => {
                return (
                  <ButtonOrLink
                    color="primary"
                    asTag="a"
                    key={id}
                    href={`/${nav?.data?.url}`}
                  >
                    <Typography as="p">{nav?.label}</Typography>
                  </ButtonOrLink>
                );
              })}
          </div>

          <div className={styles.col}>
            <Copyright />
          </div>

        </div>
      </Wrapper>
    </footer>
  );
};
