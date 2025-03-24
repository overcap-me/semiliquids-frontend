"use client";
import { Narrow, Wrapper } from "@/components/Wrapper";

import { Typography } from "@/components/Typography";

import stylesSpace from "@/styles/module/Spacing.module.css";

import { RemoveButton } from "@/ui/RemoveButton";
import { ModalConfirmDeleteAccount } from "../features/ModalConfirmDeleteAccount";
import { useRef } from "react";

const SettingsDangerZonePage = () => {
  const refDialog = useRef<HTMLDialogElement>(null);

  const onOpenModal = () => {
    refDialog?.current?.showModal();
  };

  return (
    <>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
        <Narrow>
          <Typography spacing="m" as="h2">
            Danger Zone
          </Typography>

          <Typography size="m" spacing="s" as="p">
            Permanently delete the account and remove all access.
          </Typography>

          <RemoveButton
            onClick={onOpenModal}
            color="error"
            title="Delete my account"
          />
        </Narrow>
      </Wrapper>
      <ModalConfirmDeleteAccount refDialog={refDialog} />
    </>
  );
};

export default SettingsDangerZonePage;
