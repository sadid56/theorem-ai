import { client } from "@/lib/orpc";
import { usersKeys } from "./users.keys";
import { useAppMutation, useAppQuery } from "@repo/query";

export function useUsers({ search = "" }: { search?: string } = {}) {
  return useAppQuery({
    queryKey: usersKeys.lists(search),
    queryFn: () => client.user.list({ search }),
    errorMessage: "Failed to load users",
  });
}

export function useUser(id: string) {
  return useAppQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => client.user.get({ id }),
    enabled: !!id,
    errorMessage: "Failed to load user",
  });
}

export function useGetMe(initialData?: any) {
  return useAppQuery({
    queryKey: ["users", "me"],
    queryFn: () => client.user.me(),
    initialData,
    errorMessage: "Failed to load current user",
  });
}

export function useToggleBanUser() {
  return useAppMutation<{ userId: string; banned: boolean; reason?: string }>({
    mutationFn: (data) => client.user.toggleBan(data),
    invalidateKeys: [["users"]],
    successMessage: "User ban status updated successfully",
    errorMessage: "Failed to update ban status",
  });
}

export function useUpdateGlobalRole() {
  return useAppMutation<{ userId: string; role: "ADMIN" | "MEMBER" }>({
    mutationFn: (data) => client.user.updateRole(data),
    invalidateKeys: [["users"]],
    successMessage: "Global role updated successfully",
    errorMessage: "Failed to update global role",
  });
}

export function useDeleteUser() {
  return useAppMutation<string>({
    mutationFn: (id) => client.user.delete({ id }),
    invalidateKeys: [["users"]],
    successMessage: "User deleted successfully",
    errorMessage: "Failed to delete user",
  });
}

export function useUpdateProfile() {
  return useAppMutation<{ name?: string; image?: string }>({
    mutationFn: (data) => client.user.updateProfile(data),
    invalidateKeys: [["users", "me"]],
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
  });
}
