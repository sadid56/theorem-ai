import { useAppQuery, useAppMutation } from "@repo/query";
import { client } from "../lib/orpc";

export function useProductsQuery() {
  return useAppQuery({
    queryKey: ["products"],
    queryFn: () => client.products.list(),
    errorMessage: "Failed to load products",
  });
}

export function useCreateProductMutation() {
  return useAppMutation({
    mutationFn: (data: any) => client.products.create(data),
    invalidateKeys: [["products"]],
    successMessage: "Product created successfully",
    errorMessage: "Failed to create product",
  });
}
