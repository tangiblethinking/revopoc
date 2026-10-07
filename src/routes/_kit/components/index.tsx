import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { componentGroups, productComponents } from "@/product/catalog";

export const Route = createFileRoute("/_kit/components/")({
  component: ComponentsIndex,
});

function ComponentsIndex() {
  return (
    <Box>
      <Typography variant="h5">Components</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, mb: 2.5, maxWidth: 680 }}>
        The product pieces built from the primitives. Dashboard cards, charts, tables, and the rows inside them. Each one lists the primitives it uses and the pages it shows up on.
      </Typography>
      {componentGroups.map((group) => {
        const items = productComponents.filter((item) => item.group === group);
        return (
          <Box key={group} sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              {group}
            </Typography>
            <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
              {items.map((item) => (
                <Link key={item.id} to="/components/$id" params={{ id: item.id }} style={{ textDecoration: "none" }}>
                  <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 148, "&:hover": { borderColor: "primary.main" } }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 1.5 }}>
                      {item.primitives.slice(0, 4).map((name) => (
                        <Chip key={name} size="small" variant="outlined" label={name} />
                      ))}
                    </Box>
                  </Paper>
                </Link>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
