import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";
import { Link, useRouterState } from "@tanstack/react-router";
import themeSource from "@/theme/theme.ts?raw";
import { themeTokens } from "@/theme/tokens";
import { kitNav } from "@/catalog/nav";
import { searchCatalog } from "@/catalog/search";
import { IconMenu, IconMoon, IconSearch, IconSun, PulseMark } from "@/icons/icons";
import { CopyContext } from "@/components/copy-context";

export function KitShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { mode, setMode } = useColorScheme();
  const scheme = mode === "dark" ? "dark" : "light";
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const hits = searchCatalog(query);

  function copy(text: string, label: string) {
    void navigator.clipboard.writeText(text).then(() => setNotice(label));
  }

  function copyThemeJson() {
    copy(JSON.stringify(themeTokens, null, 2), "theme.json copied");
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
          <Box component="nav" aria-label="Kit" sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
            {kitNav.map((item) => {
              const on = path === item.href || path.startsWith(`${item.href}/`);
              const expanded = open[item.href] ?? on;
              return (
                <Box key={item.href}>
                  <Box sx={{ display: "flex", alignItems: "center", borderRadius: 1, bgcolor: path === item.href ? "action.selected" : "transparent" }}>
                    <Box
                      component={Link}
                      to={item.href}
                      onClick={() => {
                        setOpen((current) => ({ ...current, [item.href]: true }));
                        setMenu(false);
                      }}
                      aria-current={path === item.href ? "page" : undefined}
                      sx={{
                        textDecoration: "none",
                        color: on ? "primary.main" : "text.primary",
                        borderRadius: 1,
                        px: 1.5,
                        minHeight: 44,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </Box>
                    <IconButton
                      size="small"
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                      aria-expanded={expanded}
                      onClick={() => setOpen((current) => ({ ...current, [item.href]: !expanded }))}
                      sx={{ mr: 0.5, color: "text.secondary" }}
                    >
                      <Box component="span" sx={{ fontSize: 12, transform: expanded ? "rotate(90deg)" : "none", display: "block" }}>
                        ▸
                      </Box>
                    </IconButton>
                  </Box>
                  <Collapse in={expanded}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, pb: 0.5 }}>
                      {item.children.map((child) => {
                        const childOn = path === child.href;
                        return (
                          <Box
                            key={child.href}
                            component={Link}
                            to={child.href}
                            onClick={() => setMenu(false)}
                            aria-current={childOn ? "page" : undefined}
                            sx={{
                              textDecoration: "none",
                              color: childOn ? "primary.main" : "text.secondary",
                              bgcolor: childOn ? "action.selected" : "transparent",
                              borderRadius: 1,
                              pl: 3,
                              pr: 1.5,
                              minHeight: 36,
                              display: "flex",
                              alignItems: "center",
                              fontSize: 14,
                              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
                            }}
                          >
                            {child.label}
                          </Box>
                        );
                      })}
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
        theme.ts is the MUI import. Copy theme writes the JSON token file.
      </Typography>
    </Box>
  );

  return (
    <CopyContext.Provider value={copy}>
      <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", maxWidth: "100%", bgcolor: "background.default", color: "text.primary" }}>
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
            alignSelf: "flex-start",
            height: "100vh",
            zIndex: 20,
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
              zIndex: 15,
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
            <Button size="small" variant="outlined" onClick={downloadTheme}>
              theme.ts
            </Button>
            <Button size="small" variant="contained" onClick={copyThemeJson}>
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
  const item = kitNav.find((entry) => path === entry.href || path.startsWith(`${entry.href}/`));
  if (!item) return "Pulse Kit";
  const child = item.children.find((entry) => path === entry.href);
  if (child) return `${item.label} · ${child.label}`;
  if (path !== item.href) return item.label.slice(0, -1);
  return item.label;
}
