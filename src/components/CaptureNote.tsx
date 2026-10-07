import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function CaptureNote() {
  return (
    <Box sx={{ px: 1.5, py: 1, borderRadius: 1, bgcolor: "background.level2", border: 1, borderColor: "divider" }}>
      <Typography variant="caption" color="text.secondary">
        Internal reference capture. Screenshots can include member names from the source audit. Snippets use placeholders.
      </Typography>
    </Box>
  );
}
