import type { FC } from "react";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";

import styles from "./ModalConfirmDeleteAccount.module.css";
import { ButtonSubmit } from "@/components/forms";
import { useFormState } from "react-dom";
import { deleteUser } from "../../danger-zone/server-action/deleteUser";

type ModalConfirmDeleteAccountProps = {
  refDialog: React.RefObject<HTMLDialogElement>;
};

export const ModalConfirmDeleteAccount: FC<ModalConfirmDeleteAccountProps> = ({
  refDialog,
}) => {
  const [_, action] = useFormState(deleteUser, undefined);

  const onClose = () => {
    refDialog?.current?.close();
  };

  return (
    <dialog className={styles.Dialog} ref={refDialog}>
      <div className={styles.Body}>
        <Typography align="center" spacing="smm" as="h2">
          Delete your entire account permanently?
        </Typography>
        <Typography align="center" spacing="sm" fontFamily="manrope" as="h4">
          This action cannot be undone. This will permanently delete your entire
          account. All private lists and comparisons will be deleted.
        </Typography>

        <form action={action}>
          <ButtonSubmit
            className={styles.Confirm}
            title="Permanently delete account"
          />
        </form>

        <ButtonOrLink
          onClick={onClose}
          asTag="button"
          color="accent"
          underline="bottom"
        >
          <Typography>Cancel</Typography>
        </ButtonOrLink>
      </div>
    </dialog>
  );
};
