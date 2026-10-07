import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import primitives from "@/catalog/primitives.json";

export const Route = createFileRoute("/_kit/primitives/")({
  component: PrimitivesIndex,
});

function PrimitivesIndex() {
  return (
    <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
      {primitives.map((item) => (
        <Link key={item.id} to="/primitives/$id" params={{ id: item.id }} style={{ textDecoration: "none" }}>
          <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 132, "&:hover": { borderColor: "primary.main" } }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {item.description}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            {item.variants.length} variants in the captures
          </Typography>
          </Paper>
        </Link>
      ))}
    </Box>
  );
}
