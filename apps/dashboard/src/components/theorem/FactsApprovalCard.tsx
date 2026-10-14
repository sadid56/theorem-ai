import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Chip,
  Stack,
} from "@mui/material";

export interface FactItem {
  id: string;
  fieldName: string;
  value: string;
  sourceType: string;
  approvalStatus: "approved" | "pending" | "rejected";
}

interface FactsApprovalCardProps {
  facts: FactItem[];
  onToggleApproval: (id: string, approved: boolean) => void;
}

export function FactsApprovalCard({ facts, onToggleApproval }: FactsApprovalCardProps) {
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 0.5 }}>
            3. Strict Truth & Fact Provenance
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Only seller-approved facts are eligible for script claims. Unapproved claims are automatically omitted.
          </Typography>
        </Box>
        <Chip
          label="Deterministic Guard Active"
          size="small"
          sx={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            color: "#34d399",
            fontWeight: 600,
            borderRadius: "6px",
          }}
        />
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
                Fact / Property
              </TableCell>
              <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
                Evidence Value
              </TableCell>
              <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
                Source Provenance
              </TableCell>
              <TableCell align="right" sx={{ color: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(255, 255, 255, 0.08)" }}>
                Seller Approval
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facts.map((fact) => {
              const isApproved = fact.approvalStatus === "approved";
              return (
                <TableRow key={fact.id}>
                  <TableCell sx={{ color: "#FFFFFF", fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.05)" }}>
                    {fact.fieldName}
                  </TableCell>
                  <TableCell sx={{ color: "rgba(255, 255, 255, 0.8)", borderColor: "rgba(255, 255, 255, 0.05)" }}>
                    {fact.value}
                  </TableCell>
                  <TableCell sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
                    <Chip
                      label={fact.sourceType}
                      size="small"
                      sx={{
                        fontSize: "0.72rem",
                        height: 22,
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                      <Typography
                        variant="caption"
                        sx={{
                          color: isApproved ? "#4ade80" : "rgba(255, 255, 255, 0.4)",
                          fontWeight: 600,
                        }}
                      >
                        {isApproved ? "Approved" : "Pending"}
                      </Typography>
                      <Switch
                        size="small"
                        checked={isApproved}
                        onChange={(e) => onToggleApproval(fact.id, e.target.checked)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
