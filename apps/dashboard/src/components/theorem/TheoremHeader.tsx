import { Box, Typography, Chip, Stack } from "@mui/material";
import { AuthStatus } from "../AuthStatus";

export function TheoremHeader() {
  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        pb: 3,
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        gap: 2,
      }}
    >
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Theorem AI
          </Typography>
          <Chip
            label="MVP Blueprint"
            size="small"
            sx={{
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontWeight: 600,
              fontSize: "0.75rem",
              borderRadius: "6px",
            }}
          />
        </Stack>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255, 255, 255, 0.6)", mt: 0.5 }}
        >
          Proof-led 3x vertical video ad variations with strict truth traceability & reusable asset pipeline
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          label="Est. Cost: $1.68–$2.13 / batch"
          variant="outlined"
          sx={{
            borderColor: "rgba(34, 197, 94, 0.3)",
            color: "#4ade80",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        />
        <AuthStatus />
      </Box>
    </Box>
  );
}
