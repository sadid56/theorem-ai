declare const process: {
  env?: Record<string, string | undefined>;
};

export function getSupabaseUrl(): string {
  const url =
    (typeof import.meta !== "undefined" &&
      ((import.meta as any).env?.VITE_SUPABASE_URL ||
        (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL)) ||
    (typeof process !== "undefined" &&
      (process.env?.NEXT_PUBLIC_SUPABASE_URL ||
        process.env?.VITE_SUPABASE_URL ||
        process.env?.SUPABASE_URL)) ||
    "";
  return url.replace(/\/+$/, "");
}

export function getSupabaseAnonKey(): string {
  return (
    (typeof import.meta !== "undefined" &&
      ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
        (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY)) ||
    (typeof process !== "undefined" &&
      (process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env?.VITE_SUPABASE_ANON_KEY ||
        process.env?.SUPABASE_ANON_KEY)) ||
    ""
  );
}
