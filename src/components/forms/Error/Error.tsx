import { Typography } from "@/components/Typography";
import stylesForm from "@/components/forms/Form.module.css";
import type { FC } from "react";

type ErrorFieldProps = {
  name: string;
};

export const ErrorList: FC<{ errors: unknown[] }> = ({ errors = [] }) => {
  return errors?.map((error, index) => (
    <ErrorField key={index as number} name={error as string} />
  ));
}

export const ErrorField: FC<ErrorFieldProps> = ({ name }) => {
  return (
    <Typography className={stylesForm.Error} color="error-70" as="h6">
      {name}
    </Typography>
  );
};
