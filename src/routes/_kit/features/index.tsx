import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { featureGroups, features } from "@/features/catalog";

export const Route = createFileRoute("/_kit/features/")({
  component: FeaturesIndex,
});

function FeaturesIndex() {
  return (
    <Box>
      <Typography variant="h5">Features</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, mb: 2.5, maxWidth: 680 }}>
        A feature is the set of components that finishes one job. pleX-Ray is the reference: open a person and read the period. Names are the same sample people used everywhere else in the kit.
      </Typography>
      {featureGroups.map((group) => (
        <Box key={group} sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            {group}
          </Typography>
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
            {features
              .filter((feature) => feature.group === group)
              .map((feature) => (
                <Link key={feature.id} to="/features/$id" params={{ id: feature.id }} style={{ textDecoration: "none" }}>
                  <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 160, "&:hover": { borderColor: "primary.main" } }}>
                    <Typography variant="h6">{feature.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      {feature.task}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 1.5 }}>
                      {feature.components.slice(0, 3).map((id) => (
                        <Chip key={id} size="small" variant="outlined" label={id} />
                      ))}
                    </Box>
                  </Paper>
                </Link>
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
