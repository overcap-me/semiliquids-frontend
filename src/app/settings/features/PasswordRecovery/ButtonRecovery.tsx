import { ButtonOrLink } from "@/components/ButtonOrLink"
import { Typography } from "@/components/Typography"
import styles from './PasswordRecovery.module.css'
import { useFormStatus } from "react-dom";

export const ButtonRecovery = () => {
  const { pending } = useFormStatus();

  return (
    <ButtonOrLink disabled={pending} className={styles.recoveryButton} asTag="button" type="submit" underline="bottom" color="accent-50">
      <Typography color="accent">
        Email me the link to recover my password
      </Typography>
    </ButtonOrLink>
  )
}