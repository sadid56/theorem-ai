import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  Chip,
} from "@mui/material";
import type { ScriptVariantItem } from "./ScriptVariantsView";

interface TimelineEditorViewProps {
  variant: ScriptVariantItem;
  videoUrl?: string;
  onSaveOverlays: (overlays: { hook: string; cta: string }) => void;
  isSavingOverlays: boolean;
}

export function TimelineEditorView({
  variant,
  videoUrl,
  onSaveOverlays,
  isSavingOverlays,
}: TimelineEditorViewProps) {
  const [hookOverlay, setHookOverlay] = useState(variant.hookText);
  const [ctaOverlay, setCtaOverlay] = useState(variant.ctaText);

  const previewUrl = videoUrl || "/sample-video.mp4";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 0.5 }}>
            5. Canonical Timeline & Non-Generative Overlay Editor
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Edit captions, price, and CTA overlays with zero video-model re-run cost.
          </Typography>
        </Box>
        <Chip
          label="0 Model Calls on Revisions"
          size="small"
          sx={{
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            color: "#38bdf8",
            fontWeight: 600,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 280,
            aspectRatio: "9/16",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "#000000",
            position: "relative",
            mx: { xs: "auto", md: 0 },
          }}
        >
          <video
            src={previewUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 24,
              left: 12,
              right: 12,
              p: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography variant="caption" sx={{ color: "#FFFFFF", fontWeight: 700, display: "block", textAlign: "center" }}>
              {hookOverlay}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 12,
              right: 12,
              p: 1,
              backgroundColor: "rgba(255, 230, 0, 0.9)",
              borderRadius: "6px",
            }}
          >
            <Typography variant="caption" sx={{ color: "#000000", fontWeight: 800, display: "block", textAlign: "center" }}>
              {ctaOverlay}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2.5}>
          <Alert severity="info" sx={{ backgroundColor: "rgba(56, 189, 248, 0.08)", color: "#bae6fd" }}>
            Revising text, price, or CTA re-renders overlays via server-side FFmpeg and does not incur model fees.
          </Alert>

          <TextField
            label="Hook Overlay Text (0s - 3.5s)"
            multiline
            rows={2}
            size="small"
            value={hookOverlay}
            onChange={(e) => setHookOverlay(e.target.value)}
            fullWidth
          />

          <TextField
            label="CTA Overlay / Offer Text (End Scene)"
            multiline
            rows={2}
            size="small"
            value={ctaOverlay}
            onChange={(e) => setCtaOverlay(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
            <Button
              variant="contained"
              disabled={isSavingOverlays}
              onClick={() => onSaveOverlays({ hook: hookOverlay, cta: ctaOverlay })}
              sx={{
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                fontWeight: 600,
                textTransform: "none",
                px: 3,
              }}
            >
              {isSavingOverlays ? "Recomposing Overlays..." : "Save Overlays (0 Model Cost)"}
            </Button>
            <Button
              variant="outlined"
              href={previewUrl}
              target="_blank"
              download
              sx={{ textTransform: "none" }}
            >
              Export Finished MP4
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
