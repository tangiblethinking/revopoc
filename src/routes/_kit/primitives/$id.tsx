import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import primitives from "@/catalog/primitives.json";
import { ReturnTo } from "@/components/ReturnTo";
import { Specimen } from "@/components/Specimen";
import { validateKitSearch } from "@/components/kit-path";
import { PrimitivePreview, primitiveSnippet } from "@/primitives/preview";
import { primitiveUsers } from "@/product/catalog";

export const Route = createFileRoute("/_kit/primitives/$id")({
  validateSearch: validateKitSearch,
  component: PrimitivePage,
});

function PrimitivePage() {
  const { id } = Route.useParams();
  const item = primitives.find((entry) => entry.id === id);
  if (!item) {
    return (
      <Typography>
        That primitive is not in the catalog. <Link to="/primitives">Back to primitives</Link>
      </Typography>
    );
  }
  const folder = item.variants[0]?.capture || "dashboard";
  const code = item.variants
    .slice(0, 6)
    .map((variant) => primitiveSnippet(item.name, variant, variant.capture || folder))
    .join("\n\n");
  const interactive = ["button", "iconButton", "chip", "toggleButton", "link", "textField", "select", "list", "tabs", "menu"].includes(item.id);
  const tokens = ["palette.primary.main", "palette.text.primary", "palette.divider", "--mui-shape-borderRadius", ...(interactive ? ["action.hover"] : [])];
  return (
    <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
      <ReturnTo />
      <Typography variant="h5">{item.name}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, mb: 2, maxWidth: 640 }}>
        {item.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2 }}>
        {tokens.map((token) => (
          <Link key={token} to={token.startsWith("action.") ? "/tokens/states" : token.startsWith("--mui-shape") ? "/tokens/layout" : "/tokens/colors"} search={{ from: `/primitives/${id}` }} style={{ textDecoration: "none" }}>
            <Chip size="small" clickable variant="outlined" label={token} />
          </Link>
        ))}
      </Box>
      <UsedBy name={item.name} from={`/primitives/${id}`} />
      <Specimen
        preview={
          <Box sx={{ p: 3 }}>
            <PrimitivePreview item={item} />
          </Box>
        }
        code={code}
        tokens={tokens}
        classes={item.variants.slice(0, 8).map((variant) => ({ name: variant.id, count: variant.count }))}
      />
    </Box>
  );
}

function UsedBy({ name, from }: { name: string; from: string }) {
  const users = primitiveUsers(name);
  if (users.length === 0) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.75 }}>
        Used by {users.length} components
      </Typography>
      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
        {users.map((item) => (
          <Link key={item.id} to="/components/$id" params={{ id: item.id }} search={{ from }} style={{ textDecoration: "none" }}>
            <Chip size="small" clickable variant="outlined" label={item.name} />
          </Link>
        ))}
      </Box>
    </Box>
  );
}
