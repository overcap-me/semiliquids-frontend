"use client";
import { createContext, useContext } from "react";
import { Tooltip } from "react-tooltip";

type TProps = {};

const TooltipContext = createContext<TProps>({});

export const TOOLTIP_ID = "TOOLTIP_COMMON";

export const TooltipProvider = ({ children }) => {
  return (
    <TooltipContext.Provider value={{}}>
      {children}
      <Tooltip id={TOOLTIP_ID} noArrow />
    </TooltipContext.Provider>
  );
};

export const useTooltipContext = (): TProps => useContext(TooltipContext);
