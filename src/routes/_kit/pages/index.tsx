import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import { CaptureNote } from "@/components/CaptureNote";

export const Route = createFileRoute("/_kit/pages/")({
  component: PagesIndex,
});

function PagesIndex() {
  const [filter, setFilter] = useState("all");
  const visible = useMemo(() => {
    return pages.filter((page) => {
      if (filter === "dark") return page.colorScheme === "dark";
      if (filter === "overlay") return page.opened !== "shell";
      if (filter === "shell") return page.opened === "shell";
      return true;
    });
  }, [filter]);
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <CaptureNote />
      </Box>
      <ToggleButtonGroup exclusive size="small" value={filter} onChange={(_, next) => next && setFilter(next)} sx={{ mb: 2 }}>
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="shell">Shell</ToggleButton>
        <ToggleButton value="overlay">Overlays</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
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
}
