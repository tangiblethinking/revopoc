import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import { pageGroupId } from "@/catalog/nav";

export const Route = createFileRoute("/_kit/pages/business")({
  component: function Page() {
    const visible = pages.filter((page) => pageGroupId(page.folder) === "business");
    return (
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
          My business captures. Open one to see the shot, the classes it used, and links into the tokens, primitives, and pattern that construct it.
        </Typography>
        <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
          {visible.map((page) => (
            <Link key={page.slug} to="/pages/$slug" params={{ slug: page.slug }} style={{ textDecoration: "none" }}>
              <Paper variant="outlined" sx={{ overflow: "hidden", color: "inherit", height: "100%", "&:hover": { borderColor: "primary.main" } }}>
                <Box component="img" src={page.shot} alt="" sx={{ width: "100%", height: 150, objectFit: "cover", objectPosition: "top", bgcolor: "background.level2", display: "block" }} />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2">{page.title.replace(" | Plexus Pulse", "")}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                    {page.path}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.75, mt: 1, flexWrap: "wrap" }}>
                    <Chip size="small" variant="outlined" label={page.opened === "shell" ? "Shell" : "Overlay"} />
                    {page.colorScheme === "dark" ? <Chip size="small" label="Dark" /> : null}
                  </Box>
                </Box>
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
    );
  },
});
