import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

export function createSupabaseClient(
  url?: string,
  anonKey?: string,
): SupabaseClient {
  const resolvedUrl = url || getSupabaseUrl();
  const resolvedKey = anonKey || getSupabaseAnonKey();

  return createClient(
    resolvedUrl || "https://placeholder.supabase.co",
    resolvedKey || "placeholder-anon-key",
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );
}

const defaultUrl = getSupabaseUrl();
const defaultKey = getSupabaseAnonKey();

export const isSupabaseConfigured = Boolean(defaultUrl && defaultKey);

export const supabase = createSupabaseClient(defaultUrl, defaultKey);
