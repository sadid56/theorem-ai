import { Typography, TextField, Paper, Stack } from "@mui/material";

export interface ProductIntakeData {
  name: string;
  price: string;
  currency: string;
  productUrl: string;
  category: string;
}

interface ProductIntakeCardProps {
  data: ProductIntakeData;
  onChange: (field: keyof ProductIntakeData, value: string) => void;
}

export function ProductIntakeCard({ data, onChange }: ProductIntakeCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 0.5 }}>
        1. Product Brief & Inputs
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 2.5 }}>
        Specify product identity, commercial offer, and source URL.
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Product Name"
          variant="outlined"
          size="small"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          fullWidth
        />
        <Stack direction="row" spacing={1.5}>
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            value={data.price}
            onChange={(e) => onChange("price", e.target.value)}
            sx={{ flex: 2 }}
          />
          <TextField
            label="Currency"
            variant="outlined"
            size="small"
            value={data.currency}
            onChange={(e) => onChange("currency", e.target.value)}
            sx={{ flex: 1 }}
          />
        </Stack>
        <TextField
          label="Product URL (Optional)"
          variant="outlined"
          size="small"
          placeholder="https://brand.com/products/case"
          value={data.productUrl}
          onChange={(e) => onChange("productUrl", e.target.value)}
          fullWidth
        />
        <TextField
          label="Category"
          variant="outlined"
          size="small"
          value={data.category}
          onChange={(e) => onChange("category", e.target.value)}
          fullWidth
        />
      </Stack>
    </Paper>
  );
}
