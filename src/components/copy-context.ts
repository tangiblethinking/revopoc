import { createContext, useContext } from "react";

export const CopyContext = createContext<(text: string, label: string) => void>(() => {});

export function useCopy() {
  return useContext(CopyContext);
}
