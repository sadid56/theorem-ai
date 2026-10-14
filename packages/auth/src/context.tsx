import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  User,
  Session,
  AuthError,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  Provider,
  SupabaseClient,
} from "@supabase/supabase-js";
import {
  supabase as defaultSupabase,
  isSupabaseConfigured as defaultIsConfigured,
} from "./client";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  client: SupabaseClient;
  signInWithPassword: (
    credentials: SignInWithPasswordCredentials,
  ) => Promise<{
    error: AuthError | null;
    data: { user: User | null; session: Session | null };
  }>;
  signUp: (
    credentials: SignUpWithPasswordCredentials,
  ) => Promise<{
    error: AuthError | null;
    data: { user: User | null; session: Session | null };
  }>;
  signInWithOAuth: (
    provider: Provider,
    redirectTo?: string,
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPasswordForEmail: (
    email: string,
    redirectTo?: string,
  ) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
  client?: SupabaseClient;
  isConfigured?: boolean;
}

export function AuthProvider({
  children,
  client = defaultSupabase,
  isConfigured = defaultIsConfigured,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    client.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, isConfigured]);

  const signInWithPassword = useCallback(
    async (credentials: SignInWithPasswordCredentials) => {
      const result = await client.auth.signInWithPassword(credentials);
      return { error: result.error, data: result.data };
    },
    [client],
  );

  const signUp = useCallback(
    async (credentials: SignUpWithPasswordCredentials) => {
      const result = await client.auth.signUp(credentials);
      return { error: result.error, data: result.data };
    },
    [client],
  );

  const signInWithOAuth = useCallback(
    async (provider: Provider, redirectTo?: string) => {
      const { error } = await client.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            redirectTo ||
            (typeof window !== "undefined"
              ? window.location.origin
              : undefined),
        },
      });
      return { error };
    },
    [client],
  );

  const signOut = useCallback(async () => {
    const { error } = await client.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  }, [client]);

  const resetPasswordForEmail = useCallback(
    async (email: string, redirectTo?: string) => {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo:
          redirectTo ||
          (typeof window !== "undefined"
            ? `${window.location.origin}/reset-password`
            : undefined),
      });
      return { error };
    },
    [client],
  );

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      loading,
      isConfigured,
      client,
      signInWithPassword,
      signUp,
      signInWithOAuth,
      signOut,
      resetPasswordForEmail,
    }),
    [
      user,
      session,
      loading,
      isConfigured,
      client,
      signInWithPassword,
      signUp,
      signInWithOAuth,
      signOut,
      resetPasswordForEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
