import type { FC, ReactNode } from "react";
import { AuthRegisterProvider } from "./contexts/AuthRegisterProvider";

type AuthRegisterLayoutProps = {
  children: ReactNode;
}

const AuthRegisterLayout: FC<AuthRegisterLayoutProps> = ({ children }) => {
  return <AuthRegisterProvider>{children}</AuthRegisterProvider>
};


export default AuthRegisterLayout