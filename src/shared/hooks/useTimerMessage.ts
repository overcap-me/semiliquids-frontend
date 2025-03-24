import { useEffect, useState } from "react";

export const useTimerMessage = (state, delay = 5000) => {
  const [showMessage, setShowMessage] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (state?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [state?.message]);


  return {
    showMessage
  }
}