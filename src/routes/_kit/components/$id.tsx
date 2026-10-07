import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { ReturnTo } from "@/components/ReturnTo";
import { Specimen } from "@/components/Specimen";
import { validateKitSearch } from "@/components/kit-path";
import { productComponents } from "@/product/catalog";
import { buildComponentSource } from "@/product/source";
import { componentPreviews } from "@/product/ui";
import uiSource from "@/product/ui.tsx?raw";

const primitiveId: Record<string, string> = {
  Button: "button",
  IconButton: "iconButton",
  Chip: "chip",
  Typography: "typography",
  Paper: "paper",
  Card: "card",
  Divider: "divider",
  Table: "table",
  Select: "select",
  LinearProgress: "linearProgress",
  ToggleButton: "toggleButton",
  Avatar: "avatar",
  Drawer: "drawer",
  Dialog: "dialog",
  Link: "link",
  TextField: "textField",
  Menu: "menu",
  Popover: "popover",
  Tabs: "tabs",
  Breadcrumbs: "breadcrumbs",
  CircularProgress: "circularProgress",
  List: "list",
};

export const Route = createFileRoute("/_kit/components/$id")({
  validateSearch: validateKitSearch,
  component: ComponentPage,
});

function ComponentPage() {
  const { id } = Route.useParams();
  const item = productComponents.find((entry) => entry.id === id);
  const Preview = componentPreviews[id];
  if (!item || !Preview) {
    return (
      <Typography>
        That component is not in the catalog. <Link to="/components">Back to components</Link>
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
        {item.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 1 }}>
        {item.primitives.map((name) =>
          primitiveId[name] ? (
            <Link key={name} to="/primitives/$id" params={{ id: primitiveId[name] }} search={{ from: `/components/${id}` }} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable label={name} variant="outlined" />
            </Link>
          ) : (
            <Chip key={name} size="small" variant="outlined" label={name} />
          ),
        )}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        Used on {item.usedOn.join(" · ")}
      </Typography>
      <Specimen
        preview={
          <Box sx={{ p: 3 }}>
            <Preview />
          </Box>
        }
        code={buildComponentSource(uiSource, id)}
        tokens={["palette.primary.main", "palette.text.secondary", "palette.divider", "--mui-shape-borderRadius"]}
        classes={item.primitives.map((name) => ({ name: `Mui${name}-root`, count: 1 }))}
      />
    </Box>
  );
}
