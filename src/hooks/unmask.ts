import { useCallback } from "react";
export const useUnmask = () => {
  const unmask = useCallback((value: string): string => {
    return value.replace(/\D/g, "");
  }, []);
  return unmask;
};
