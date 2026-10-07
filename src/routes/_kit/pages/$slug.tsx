import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import patterns from "@/catalog/patterns.json";
import { pageGroupId } from "@/catalog/nav";
import { kitNav } from "@/catalog/nav";
import { CaptureNote } from "@/components/CaptureNote";
import { CodePanel } from "@/components/CodePanel";
import { useCopy } from "@/components/copy-context";

const classPrimitive: Record<string, string> = {
  MuiButton: "button",
  MuiIconButton: "iconButton",
  MuiChip: "chip",
  MuiTypography: "typography",
  MuiPaper: "paper",
  MuiCard: "card",
  MuiDivider: "divider",
  MuiTable: "table",
  MuiSelect: "select",
  MuiLinearProgress: "linearProgress",
  MuiToggleButton: "toggleButton",
  MuiAvatar: "avatar",
  MuiDrawer: "drawer",
  MuiDialog: "dialog",
  MuiLink: "link",
  MuiTextField: "textField",
  MuiMenu: "menu",
  MuiPopover: "popover",
  MuiTabs: "tabs",
  MuiBreadcrumbs: "breadcrumbs",
  MuiCircularProgress: "circularProgress",
  MuiList: "list",
};

export const Route = createFileRoute("/_kit/pages/$slug")({
  component: PageDetail,
});

function PageDetail() {
  const { slug } = Route.useParams();
  const copy = useCopy();
  const page = pages.find((entry) => entry.slug === slug);
  if (!page) {
    return (
      <Typography>
        That capture is not in the catalog. <Link to="/pages">Back to pages</Link>
      </Typography>
    );
  }
  const groupId = pageGroupId(page.folder);
  const group = kitNav.find((item) => item.href === "/pages")?.children.find((child) => child.id === groupId);
  const pattern = patterns.find((item) => page.folder === item.folder || page.folder.startsWith(`${item.folder}__`) || page.folder.startsWith(`${item.folder}-`));
  const primitives = page.classes
    .map((item) => ({ name: item.name.replace(/-root$/, ""), id: classPrimitive[item.name.replace(/-root$/, "")] }))
    .filter((item) => item.id);
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h5">{page.title.replace(" | Plexus Pulse", "")}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {page.path} · {page.colorScheme}
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Chip size="small" label={page.opened} />
          {page.overlayKind ? <Chip size="small" variant="outlined" label={page.overlayKind} /> : null}
          {group ? (
            <Link to={group.href} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable variant="outlined" label={group.label} />
            </Link>
          ) : null}
        </Stack>
      </Box>
      <CaptureNote />
      <Box component="img" src={page.shot} alt="" sx={{ width: "100%", borderRadius: 1, border: 1, borderColor: "divider" }} />
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Built from
        </Typography>
        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
          <Link to="/tokens/colors" style={{ textDecoration: "none" }}>
            <Chip size="small" clickable variant="outlined" label="Color tokens" />
          </Link>
          <Link to="/tokens/type" style={{ textDecoration: "none" }}>
            <Chip size="small" clickable variant="outlined" label="Type tokens" />
          </Link>
          <Link to="/tokens/states" style={{ textDecoration: "none" }}>
            <Chip size="small" clickable variant="outlined" label="States" />
          </Link>
          {pattern ? (
            <Link to="/patterns/$id" params={{ id: pattern.id }} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable label={pattern.title} />
            </Link>
          ) : null}
          {primitives.map((item) => (
            <Link key={item.id} to="/primitives/$id" params={{ id: item.id }} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable variant="outlined" label={item.name.replace("Mui", "")} />
            </Link>
          ))}
        </Stack>
      </Box>
      {page.overlayKind ? <CodePanel code={page.snippet} onCopy={copy} /> : null}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Classes
        </Typography>
        {page.classes.map((item) => (
          <Box key={item.name} sx={{ display: "flex", gap: 1, py: 0.4 }}>
            <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
              {item.count}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
