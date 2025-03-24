import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { ROUTE_PATHS } from "@/shared/routes";
import { Logout } from "../Logout";
import styles from "./MyProfile.module.css";
import { GLOBAL_TEXT } from "@/shared/content/globalText";

export const MyProfile = () => {
  return (
    <div className={styles.Block}>
      <ButtonOrLink
        asTag="a"
        href={ROUTE_PATHS.PROFILE.BASE}
        color="white"
        underline="bottom"
      >
        <Typography fontWeight="600" as="h6">
          {GLOBAL_TEXT.header.account}
        </Typography>
      </ButtonOrLink>
      <Logout />
    </div>
  );
};
