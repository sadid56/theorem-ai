export * from "./toast-adapter";
export * from "./provider";
export * from "./hooks/useAppQuery";
export * from "./hooks/useAppMutation";

// Re-export TanStack Query essentials for unified usage across apps
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQueries,
  useIsFetching,
  useIsMutating,
  QueryClient,
  QueryClientProvider,
  isServer,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
