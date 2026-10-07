import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import { CaptureNote } from "@/components/CaptureNote";
import { CodePanel } from "@/components/CodePanel";
import { useCopy } from "@/components/copy-context";

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
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h5">{page.title.replace(" | Plexus Pulse", "")}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {page.path} · {page.colorScheme}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip size="small" label={page.opened} />
          {page.overlayKind ? <Chip size="small" variant="outlined" label={page.overlayKind} /> : null}
        </Stack>
      </Box>
      <CaptureNote />
      <Box component="img" src={page.shot} alt="" sx={{ width: "100%", borderRadius: 1, border: 1, borderColor: "divider" }} />
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
