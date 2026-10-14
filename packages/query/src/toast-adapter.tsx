import { createContext, useContext, useMemo, type FC, type ReactNode } from "react";

export interface ToastAdapter {
  success?: (message: string) => void;
  error?: (message: string) => void;
  info?: (message: string) => void;
  warning?: (message: string) => void;
}

const ToastAdapterContext = createContext<ToastAdapter | null>(null);

export interface ToastAdapterProviderProps {
  toast?: ToastAdapter | null;
  children: ReactNode;
}

export const ToastAdapterProvider: FC<ToastAdapterProviderProps> = ({ toast = null, children }) => {
  const value = useMemo(() => toast, [toast]);
  return <ToastAdapterContext.Provider value={value}>{children}</ToastAdapterContext.Provider>;
};

export function useToastAdapter(): ToastAdapter | null {
  return useContext(ToastAdapterContext);
}
