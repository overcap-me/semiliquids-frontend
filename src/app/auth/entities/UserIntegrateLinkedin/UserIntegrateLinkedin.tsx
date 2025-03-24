"use client";
import clsx from "clsx";
import Linkedin from "@/assets/icons/Linkedin.svg";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";

import stylesForm from "@/components/forms/Form.module.css";

import { integrateLinkedin } from "./actions";

export const UserIntegrateLinkedin = ({ title }) => {
  return (
    <ButtonOrLink
      asTag="button"
      className={clsx(stylesForm.Button, stylesForm.Button__LN)}
      type="button"
      onClick={() => integrateLinkedin()}
    >
      <Linkedin className={stylesForm.Button__Icon} />
      <Typography
        textTransform="uppercase"
        align="center"
        fontWeight="800"
        as="h6"
      >
        {title}
      </Typography>
    </ButtonOrLink>
  );
};
