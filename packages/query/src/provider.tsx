import { useState, type ReactNode } from "react";
import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastAdapterProvider, type ToastAdapter } from "./toast-adapter";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (environmentManager.isServer()) {
    return createQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}

export interface QueryProviderProps {
  children: ReactNode;
  client?: QueryClient;
  toast?: ToastAdapter | null;
}

export function QueryProvider({ children, client, toast }: QueryProviderProps) {
  const [internalClient] = useState(() => client || getQueryClient());

  return (
    <QueryClientProvider client={client || internalClient}>
      <ToastAdapterProvider toast={toast}>{children}</ToastAdapterProvider>
    </QueryClientProvider>
  );
}
