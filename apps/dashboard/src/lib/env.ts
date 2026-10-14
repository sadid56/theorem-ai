export function getApiUrl(): string {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    "http://localhost:4000";
  return url.replace(/\/+$/, "");
}

export function getAppUrl(): string {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_APP_URL) ||
    "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

export function getRpcUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/v1/orpc`;
  }
  return `${getApiUrl()}/v1/orpc`;
}

export function getSupabaseUrl(): string {
  const url =
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_SUPABASE_URL) ||
    "";
  return url.replace(/\/+$/, "");
}

export function getSupabaseAnonKey(): string {
  return (
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
    ""
  );
}
