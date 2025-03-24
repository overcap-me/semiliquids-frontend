import LinkedIn from "@/assets/icons/Linkedin.svg";
import { Typography } from "@/components/Typography";
import { ButtonOrLink } from "../../../../components/ButtonOrLink";
import styles from "./PersonalIntegrations.module.css";

export const PersonalIntegrations = () => {
  return (
    <div>
      <Typography spacing="m" as="h2">
        Personal Integrations
      </Typography>

      <div className={styles.Button}>
        <div className={styles.Button__Body}>
          <LinkedIn className={styles.Button__Icon} />
          <div className={styles.Button__Desc}>
            <Typography fontWeight="700">Linked In</Typography>
            <Typography>Link to your account</Typography>
          </div>
        </div>
        <ButtonOrLink asTag="a" href="/" underline="bottom" color="accent-50">
          <Typography color="accent">Connect</Typography>
        </ButtonOrLink>
      </div>
    </div>
  );
};
