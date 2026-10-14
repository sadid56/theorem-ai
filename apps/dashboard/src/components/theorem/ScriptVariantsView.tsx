import { Box, Typography, Paper, Grid, Chip, Button, Stack } from "@mui/material";

export interface ScriptVariantItem {
  id: string;
  variantName: string;
  hookText: string;
  bodyText: string;
  ctaText: string;
  claims: Array<{ claim: string; factId: string; verified: boolean }>;
  estimatedAiSeconds: number;
}

interface ScriptVariantsViewProps {
  variants: ScriptVariantItem[];
  isGenerating: boolean;
  onGenerateBatch: () => void;
  onSelectVariant: (variant: ScriptVariantItem) => void;
  selectedVariantId?: string;
}

export function ScriptVariantsView({
  variants,
  isGenerating,
  onGenerateBatch,
  onSelectVariant,
  selectedVariantId,
}: ScriptVariantsViewProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 0.5 }}>
            4. Proof-Led Ad Variants (3x Formulations)
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Unique AI-generated hooks paired with shared proof body & customer footage to minimize generation costs.
          </Typography>
        </Box>

        <Button
          variant="contained"
          disabled={isGenerating}
          onClick={onGenerateBatch}
          sx={{
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
          }}
        >
          {isGenerating ? "Synthesizing 3x Batch..." : "Generate 3x Ad Batch"}
        </Button>
      </Box>

      <Grid container spacing={2.5}>
        {variants.map((v) => {
          const isSelected = selectedVariantId === v.id;
          return (
            <Grid key={v.id} item xs={12} md={4}>
              <Paper
                elevation={0}
                onClick={() => onSelectVariant(v)}
                sx={{
                  p: 2.5,
                  cursor: "pointer",
                  height: "100%",
                  backgroundColor: isSelected
                    ? "rgba(99, 102, 241, 0.08)"
                    : "rgba(255, 255, 255, 0.02)",
                  border: isSelected
                    ? "1px solid #6366f1"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "rgba(99, 102, 241, 0.5)",
                  },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                    {v.variantName}
                  </Typography>
                  <Chip
                    label={`${v.estimatedAiSeconds}s AI Hook`}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      color: "#38bdf8",
                    }}
                  />
                </Stack>

                <Box sx={{ mb: 1.5, p: 1.5, borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
                    HOOK (AI GENERATED)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.25 }}>
                    {v.hookText}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1.5, p: 1.5, borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
                    BODY & PROOF (REUSABLE ASSET)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.25 }}>
                    {v.bodyText}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2, p: 1.5, borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
                    CTA & OFFER
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#FFE600", fontWeight: 600, mt: 0.25 }}>
                    {v.ctaText}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                  {v.claims.map((c, i) => (
                    <Chip
                      key={i}
                      label={`Claim: ${c.claim.slice(0, 20)}...`}
                      size="small"
                      sx={{
                        fontSize: "0.68rem",
                        height: 20,
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        color: "#34d399",
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
