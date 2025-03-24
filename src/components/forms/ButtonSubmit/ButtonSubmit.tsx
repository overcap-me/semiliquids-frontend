"use client";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { type ClassValue, clsx } from "clsx";
import type { FC } from "react";
import styles from "./ButtonSubmit.module.css";
import { useFormStatus } from "react-dom";

type ButtonSubmitProps = {
  title: string;
  onClick?: () => void;
  className?: ClassValue;
};

export const ButtonSubmit: FC<ButtonSubmitProps> = ({
  title,
  onClick,
  className,
}) => {
  const { pending } = useFormStatus();

  return (
    <ButtonOrLink
      asTag="button"
      className={clsx(styles.button, className)}
      type="submit"
      color="accent"
      onClick={onClick}
      disabled={pending}
    >
      <Typography
        textTransform="uppercase"
        fontWeight="800"
        align="center"
        as="h6"
      >
        {pending ? "Submitting" : title}
      </Typography>
    </ButtonOrLink>
  );
};
