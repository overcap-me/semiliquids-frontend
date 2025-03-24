import LogoutIcon from "@/assets/icons/Logout.svg";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import styles from "./Logout.module.css";
import { handleLogout } from "./actions";
import { SIZE_PROPS } from "@/shared/lib/icons";

export const Logout = () => {
  return (
    <ButtonOrLink
      className={styles.Button}
      type="button"
      asTag="button"
      onClick={() => handleLogout()}
    >
      <LogoutIcon {...SIZE_PROPS} />
    </ButtonOrLink>
  );
};
