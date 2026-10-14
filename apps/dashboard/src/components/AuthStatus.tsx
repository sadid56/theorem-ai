import { useState } from "react";
import { Button, Input, tokens } from "@repo/ui";
import { Box, Typography, Stack } from "@mui/material";
import { useToast } from "../context/ToastContext";
import { useAuth } from "@repo/auth";

export function AuthStatus() {
  const { user, loading, isConfigured, signInWithPassword, signUp, signOut } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <Box sx={{ p: 2, textAlign: "center", color: tokens.textMuted }}>Checking authentication...</Box>;
  }

  if (!isConfigured) {
    return (
      <Box
        sx={{
          p: 2.5,
          borderRadius: `${tokens.radiusMd}px`,
          border: `1px solid ${tokens.warningBorder}`,
          bgcolor: tokens.warningSubtle,
          color: tokens.warning,
          maxWidth: 480,
          mx: "auto",
          textAlign: "left",
        }}
      >
        <Typography variant='subtitle2' sx={{ fontWeight: 700, mb: 0.5 }}>
          Supabase Not Configured
        </Typography>
        <Typography variant='body2' sx={{ fontSize: "0.82rem" }}>
          Please add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.
        </Typography>
      </Box>
    );
  }

  if (user) {
    return (
      <Box
        sx={{
          p: 2.5,
          borderRadius: `${tokens.radiusMd}px`,
          border: `1px solid ${tokens.borderDefault}`,
          bgcolor: tokens.bgPanel,
          maxWidth: 480,
          mx: "auto",
          textAlign: "left",
        }}
      >
        <Typography variant='subtitle2' sx={{ color: tokens.textPrimary, mb: 0.5 }}>
          Signed in as: <strong>{user.email}</strong>
        </Typography>
        <Typography variant='caption' sx={{ color: tokens.textMuted, display: "block", mb: 2 }}>
          User ID: {user.id}
        </Typography>
        <Button
          variant='danger'
          size='small'
          onClick={async () => {
            const { error } = await signOut();
            if (error) {
              toast.error(error.message);
            } else {
              toast.success("Signed out successfully");
            }
          }}
        >
          Sign Out
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: `${tokens.radiusMd}px`,
        border: `1px solid ${tokens.borderDefault}`,
        bgcolor: tokens.bgPanel,
        maxWidth: 400,
        mx: "auto",
        textAlign: "left",
      }}
    >
      <Typography variant='h6' sx={{ color: tokens.textPrimary, mb: 2, fontSize: "1.1rem" }}>
        Supabase Authentication
      </Typography>

      <Stack spacing={2}>
        <Input
          label='Email'
          placeholder='name@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Input
          label='Password'
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />

        <Stack direction='row' spacing={1.5} sx={{ pt: 1 }}>
          <Button
            variant='primary'
            loading={submitting}
            onClick={async () => {
              if (!email || !password) {
                toast.warning("Please enter both email and password");
                return;
              }
              setSubmitting(true);
              const { error } = await signInWithPassword({ email, password });
              setSubmitting(false);
              if (error) {
                toast.error(error.message);
              } else {
                toast.success("Signed in successfully!");
              }
            }}
          >
            Sign In
          </Button>

          <Button
            variant='outlined'
            disabled={submitting}
            onClick={async () => {
              if (!email || !password) {
                toast.warning("Please enter both email and password");
                return;
              }
              setSubmitting(true);
              const { error } = await signUp({ email, password });
              setSubmitting(false);
              if (error) {
                toast.error(error.message);
              } else {
                toast.success("Check your email to confirm registration!");
              }
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
