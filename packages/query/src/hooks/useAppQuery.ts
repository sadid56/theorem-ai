import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useToastAdapter } from "../toast-adapter";

export interface AppQueryOptions<TData, TError = any> extends Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  "queryKey" | "queryFn"
> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  showErrorToast?: boolean;
  errorMessage?: string;
}

export function useAppQuery<TData, TError = any>({
  queryKey,
  queryFn,
  showErrorToast = true,
  errorMessage,
  ...options
}: AppQueryOptions<TData, TError>): UseQueryResult<TData, TError> {
  const toast = useToastAdapter();

  const query = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });

  useEffect(() => {
    if (query.error && showErrorToast) {
      const err = query.error as any;
      const message =
        err?.message ||
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        errorMessage ||
        "Failed to load data";
      toast?.error?.(message);
    }
  }, [query.error, showErrorToast, errorMessage, toast]);

  return query;
}
