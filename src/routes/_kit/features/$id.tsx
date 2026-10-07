import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ReturnTo } from "@/components/ReturnTo";
import { Specimen } from "@/components/Specimen";
import { validateKitSearch } from "@/components/kit-path";
import { featureById } from "@/features/catalog";
import { featurePreviews } from "@/features/ui";
import { buildComponentSource } from "@/product/source";
import { productComponents } from "@/product/catalog";
import uiSource from "@/features/ui.tsx?raw";

export const Route = createFileRoute("/_kit/features/$id")({
  validateSearch: validateKitSearch,
  component: FeaturePage,
});

function FeaturePage() {
  const { id } = Route.useParams();
  const item = featureById(id);
  const Preview = featurePreviews[id];
  if (!item || !Preview) {
    return (
      <Typography>
        That feature is not in the catalog. <Link to="/features">Back to features</Link>
      </Typography>
    );
  }
  return (
    <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
      <ReturnTo />
      <Typography variant="caption" color="primary.main" sx={{ letterSpacing: "0.08em" }}>
        {item.group}
      </Typography>
      <Typography variant="h5">{item.name}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, mb: 1.5, maxWidth: 680 }}>
        {item.task}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 1 }}>
        {item.components.map((componentId) => {
          const component = productComponents.find((entry) => entry.id === componentId);
          return (
            <Link key={componentId} to="/components/$id" params={{ id: componentId }} search={{ from: `/features/${id}` }} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable variant="outlined" label={component?.name ?? componentId} />
            </Link>
          );
        })}
      </Box>
      <Specimen
        preview={<Preview />}
        code={buildComponentSource(uiSource, id)}
        tokens={["palette.primary.main", "palette.text.secondary", "palette.background.paper", "--SideNav-width"]}
        classes={[
          { name: "MuiPaper-root", count: 1 },
          { name: "MuiButton-root", count: 1 },
          { name: "MuiTypography-root", count: 1 },
        ]}
        shot={item.shot}
        shotNote="Internal reference capture. The live feature uses sample people."
      />
    </Box>
  );
}
