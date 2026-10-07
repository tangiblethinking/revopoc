import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { kitNav } from "@/catalog/nav";
import { ReturnTo } from "@/components/ReturnTo";
import { validateKitSearch } from "@/components/kit-path";

export const Route = createFileRoute("/_kit/tokens/")({
  validateSearch: validateKitSearch,
  component: TokensIndex,
});

function TokensIndex() {
  const children = kitNav.find((item) => item.href === "/tokens")?.children ?? [];
  return (
    <Box>
      <ReturnTo />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 680 }}>
        Color, layout, type, and interaction states. Each group is its own page so a developer can land on just that set.
      </Typography>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        {children.map((child) => (
          <Link key={child.href} to={child.href} style={{ textDecoration: "none" }}>
            <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 96, "&:hover": { borderColor: "primary.main" } }}>
              <Typography variant="h6">{child.label}</Typography>
            </Paper>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
