import { useState } from "react";
import { Typography, TextField, Paper, Stack, Chip, Button } from "@mui/material";

export interface BuyerQuestionItem {
  id: string;
  question: string;
  category: string;
}

interface BuyerQuestionsCardProps {
  questions: BuyerQuestionItem[];
  onAddQuestion: (q: string) => void;
  onRemoveQuestion: (id: string) => void;
}

export function BuyerQuestionsCard({
  questions,
  onAddQuestion,
  onRemoveQuestion,
}: BuyerQuestionsCardProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    if (inputVal.trim()) {
      onAddQuestion(inputVal.trim());
      setInputVal("");
    }
  };

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
        2. Real Buyer Objections & Questions
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 2 }}>
        Direct customer inquiries drive the hook and proof structure of each variant.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="e.g. Does it survive drops on concrete?"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          fullWidth
        />
        <Button variant="contained" size="small" onClick={handleAdd}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
        {questions.map((q) => (
          <Chip
            key={q.id}
            label={q.question}
            onDelete={() => onRemoveQuestion(q.id)}
            sx={{
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              borderColor: "rgba(99, 102, 241, 0.3)",
              color: "#c7d2fe",
              fontSize: "0.82rem",
            }}
            variant="outlined"
          />
        ))}
      </Stack>
    </Paper>
  );
}
