import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import patterns from "@/catalog/patterns.json";

export const Route = createFileRoute("/_kit/patterns/")({
  component: PatternsIndex,
});

function PatternsIndex() {
  return (
    <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
      {patterns.map((item) => (
        <Link key={item.id} to="/patterns/$id" params={{ id: item.id }} style={{ textDecoration: "none" }}>
          <Paper variant="outlined" sx={{ p: 2, color: "inherit", height: "100%", "&:hover": { borderColor: "primary.main" } }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {item.summary}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            {item.folder}
          </Typography>
          </Paper>
        </Link>
      ))}
    </Box>
  );
}
