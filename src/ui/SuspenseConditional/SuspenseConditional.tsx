import React, { type FC, type ReactNode, Suspense } from "react";
import { Loader } from "../Loader";

type TProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

export const SuspenseConditional: FC<TProps> = ({
  children,
  fallback = <Loader />,
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
