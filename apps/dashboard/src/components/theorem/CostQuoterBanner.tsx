import { Box, Typography, Grid, Paper } from "@mui/material";

export function CostQuoterBanner() {
  const items = [
    { label: "New AI Hook Footage", value: "19 sec ($0.04/s = $0.76)", sub: "3x unique hooks only" },
    { label: "Proof Body Reused", value: "10 sec ($0.00)", sub: "Zero model re-run" },
    { label: "Retry & Render Reserve", value: "$0.68 - $1.37", sub: "FFmpeg + Cloudflare R2" },
    { label: "Total Target Batch Cost", value: "$1.68 - $2.13", sub: "3 finished 9:16 ads" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 4,
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "rgba(255, 255, 255, 0.5)",
          fontWeight: 700,
        }}
      >
        Verified Unit Economics (19-Second Shared Architecture)
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {items.map((item, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.8rem" }}>
                {item.label}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700, mt: 0.25 }}>
                {item.value}
              </Typography>
              <Typography variant="caption" sx={{ color: "#38bdf8", fontSize: "0.72rem" }}>
                {item.sub}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
