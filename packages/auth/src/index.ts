export * from "./env";
export * from "./client";
export * from "./context";

// Re-export common Supabase Auth types for consumers
export type {
  User,
  Session,
  AuthError,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  Provider,
  SupabaseClient,
} from "@supabase/supabase-js";
