// @ts-nocheck
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useHeaderMenu = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleCloseAll = useCallback(() => {
    setVisible(false);
  }, []);


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleCloseAll();
  }, [pathname]);

  return { visible, handleToggle, handleCloseAll };
};
