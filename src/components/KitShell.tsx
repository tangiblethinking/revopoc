import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";
import { Link, useRouterState } from "@tanstack/react-router";
import themeSource from "@/theme/theme.ts?raw";
import { searchCatalog } from "@/catalog/search";
import { IconMenu, IconMoon, IconSearch, IconSun, PulseMark } from "@/icons/icons";
import { CopyContext } from "@/components/copy-context";

const nav = [
  { href: "/tokens", label: "Tokens" },
  { href: "/primitives", label: "Primitives" },
  { href: "/components", label: "Components" },
  { href: "/features", label: "Features" },
  { href: "/patterns", label: "Patterns" },
  { href: "/pages", label: "Pages" },
] as const;

export function KitShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { mode, setMode } = useColorScheme();
  const scheme = mode === "dark" ? "dark" : "light";
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const hits = searchCatalog(query);

  function copy(text: string, label: string) {
    void navigator.clipboard.writeText(text).then(() => setNotice(label));
  }

  function downloadTheme() {
    const blob = new Blob([themeSource], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "theme.ts";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("theme.ts downloaded");
  }

  const rail = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        width: "100%",
        boxSizing: "border-box",
        p: 2,
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Box component={Link} to="/" sx={{ display: "flex", flexShrink: 0, gap: 1.25, alignItems: "center", textDecoration: "none", color: "inherit", minHeight: 44 }}>
        <PulseMark />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.1 }}>
            Pulse Kit
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Plexus Pulse
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          gap: 1,
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          px: 1.25,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.default",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", flexShrink: 0, color: "text.secondary" }}>
          <IconSearch size={16} />
        </Box>
        <Box
          component="input"
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          placeholder="Search the kit"
          aria-label="Search the kit"
          sx={{
            flex: "1 1 auto",
            width: "100%",
            minWidth: 0,
            border: 0,
            outline: 0,
            bgcolor: "transparent",
            color: "inherit",
            font: "inherit",
            fontSize: 14,
            py: 1,
          }}
        />
      </Box>
      <Box sx={{ flex: "1 1 auto", minHeight: 0, overflow: "auto" }}>
        {query ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {hits.length === 0 ? (
              <Typography variant="caption" color="text.secondary" sx={{ px: 1.5 }}>
                No matches
              </Typography>
            ) : (
              hits.map((hit) => (
                <Box
                  key={`${hit.kind}-${hit.href}-${hit.title}`}
                  component={Link}
                  to={hit.href as never}
                  onClick={() => {
                    setQuery("");
                    setMenu(false);
                  }}
                  sx={{ textDecoration: "none", color: "inherit", px: 1.5, py: 0.75, borderRadius: 1, "&:hover": { bgcolor: "action.hover" } }}
                >
                  <Typography variant="caption" color="primary.main">
                    {hit.kind}
                  </Typography>
                  <Typography variant="body2">{hit.title}</Typography>
                </Box>
              ))
            )}
          </Box>
        ) : (
          <Box component="nav" aria-label="Kit" sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {nav.map((item) => {
              const on = path === item.href || path.startsWith(`${item.href}/`);
              return (
                <Box
                  key={item.href}
                  component={Link}
                  to={item.href}
                  onClick={() => setMenu(false)}
                  aria-current={on ? "page" : undefined}
                  sx={{
                    textDecoration: "none",
                    color: on ? "primary.main" : "text.primary",
                    bgcolor: on ? "action.selected" : "transparent",
                    borderRadius: 1,
                    px: 1.5,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
        Rebrand by editing theme.ts. Specimens read the same CSS variables.
      </Typography>
    </Box>
  );

  return (
    <CopyContext.Provider value={copy}>
      <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", maxWidth: "100%", overflowX: "hidden", bgcolor: "background.default", color: "text.primary" }}>
        <Box
          sx={{
            width: 248,
            flex: "0 0 248px",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            borderRight: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {rail}
        </Box>
        <Box sx={{ flex: "1 1 auto", minWidth: 0, maxWidth: "100%" }}>
          <Box
            component="header"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: { xs: 1.5, md: 3 },
              minHeight: 64,
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <IconButton aria-label="Open menu" onClick={() => setMenu(true)} sx={{ display: { md: "none" } }}>
              <IconMenu />
            </IconButton>
            <Typography variant="subtitle1" sx={{ mr: "auto" }}>
              {titleFor(path)}
            </Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={scheme}
              aria-label="Color scheme"
              onChange={(_, next: string | null) => {
                if (next === "light" || next === "dark") setMode(next);
              }}
            >
              <ToggleButton value="light" aria-label="Light">
                <IconSun size={16} />
              </ToggleButton>
              <ToggleButton value="dark" aria-label="Dark">
                <IconMoon size={16} />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button size="small" variant="contained" onClick={downloadTheme}>
              Copy theme
            </Button>
          </Box>
          <Box component="main" sx={{ px: { xs: 2, md: 4 }, py: { xs: 2.5, md: 4 }, width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }}>
            {children}
          </Box>
        </Box>
        <Drawer open={menu} onClose={() => setMenu(false)} slotProps={{ paper: { sx: { width: 280, display: "flex", flexDirection: "column", overflow: "hidden" } } }}>
          {rail}
        </Drawer>
        <Snackbar open={Boolean(notice)} message={notice ?? ""} autoHideDuration={1800} onClose={() => setNotice(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
      </Box>
    </CopyContext.Provider>
  );
}

function titleFor(path: string) {
  if (path === "/") return "Overview";
  if (path.startsWith("/tokens")) return "Tokens";
  if (path.startsWith("/primitives/")) return "Primitive";
  if (path.startsWith("/primitives")) return "Primitives";
  if (path.startsWith("/components/")) return "Component";
  if (path.startsWith("/components")) return "Components";
  if (path.startsWith("/features/")) return "Feature";
  if (path.startsWith("/features")) return "Features";
  if (path.startsWith("/patterns/")) return "Pattern";
  if (path.startsWith("/patterns")) return "Patterns";
  if (path.startsWith("/pages/")) return "Capture";
  if (path.startsWith("/pages")) return "Pages";
  return "Pulse Kit";
}
