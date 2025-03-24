"use client";

import { createContext, useContext, useState, type FC, type ReactNode } from "react";

type AuthRegisterContextProps = {
  appendFields: (stepId: string, fields: FormData) => void;
  storeAuthRegister: Map<string, FormData>;
};

const AuthRegisterContext = createContext<AuthRegisterContextProps | null>(
  null,
);

type AuthRegisterProviderProps = {
  children: ReactNode;
};

export const AuthRegisterProvider: FC<AuthRegisterProviderProps> = ({
  children,
}) => {
  const [storeAuthRegister, setStoreAuthRegister] = useState(new Map());

  const appendFields = (stepId: string, fields: FormData) => {
    storeAuthRegister.set(stepId, fields);
  }

  return (
    <AuthRegisterContext.Provider value={{
      appendFields,
      storeAuthRegister
    }}>
      {children}
    </AuthRegisterContext.Provider>
  );
};


export const useAuthRegisterContext = (): AuthRegisterContextProps => {
  const authRegisterContextAccessor = useContext(AuthRegisterContext);

  if (!authRegisterContextAccessor) {
    throw new Error("useAuthRegisterContext must be used within a AuthRegisterProvider");
  }

  return authRegisterContextAccessor;
};
