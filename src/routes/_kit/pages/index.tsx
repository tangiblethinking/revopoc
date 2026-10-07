import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import { kitNav, pageGroupId } from "@/catalog/nav";
import { CaptureNote } from "@/components/CaptureNote";

export const Route = createFileRoute("/_kit/pages/")({
  component: PagesIndex,
});

function PagesIndex() {
  const groups = kitNav.find((item) => item.href === "/pages")?.children ?? [];
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
        The capture library. Each card is a real Plexus Pulse screen, including overlays that were open. Open a surface, then a capture, to follow the chips into the tokens, primitives, components, and pattern that construct it.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CaptureNote />
      </Box>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
        {groups.map((group) => {
          const count = pages.filter((page) => pageGroupId(page.folder) === group.id).length;
          return (
            <Link key={group.href} to={group.href} style={{ textDecoration: "none" }}>
              <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 96, "&:hover": { borderColor: "primary.main" } }}>
                <Typography variant="h6">{group.label}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                  {count} captures
                </Typography>
              </Paper>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
