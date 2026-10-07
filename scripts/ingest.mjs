/**
 * Reads Plexus Pulse captures and writes catalog JSON + public screenshots.
 * Run automatically before `npm run build`. Safe to re-run.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, copyFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const candidates = [
  join(root, "captures"),
  join(root, "artifacts/Dashboard _ Plexus Pulse_files/captures"),
];
const capturesDir = candidates.find((dir) => existsSync(dir));
const catalogDir = join(root, "src/catalog");
const shotsDir = join(root, "public/shots");

if (!capturesDir) {
  const existing = join(catalogDir, "pages.json");
  if (existsSync(existing)) {
    console.log("ingest: captures not found, keeping existing catalog");
    process.exit(0);
  }
  console.error("ingest: captures directory not found");
  process.exit(1);
}

const PATTERNS = [
  { id: "app-shell", title: "App shell", folder: "dashboard", summary: "Side nav at 252px, top bar, impersonation chip, and people search." },
  { id: "dashboard-home", title: "Dashboard home", folder: "dashboard", summary: "Daily briefing, contest summary, Pulse Check, and the growth table." },
  { id: "plex-ray", title: "pleX-Ray", folder: "dashboard-contest__plex-ray", summary: "Quick View dialog used from contest, CRM, genealogy, playbook, and recognition." },
  { id: "plexi-glass", title: "PleXi-Glass", folder: "dashboard__open-plexi-glass", summary: "ML coaching view with focus areas and a suggested next step." },
  { id: "ask-plexi", title: "Ask Plexi", folder: "dashboard__ask-plexi", summary: "Right-side coaching drawer." },
  { id: "command-palette", title: "Command palette", folder: "dashboard__search", summary: "Cmd+K search dialog for people." },
  { id: "settings-drawer", title: "Settings drawer", folder: "dashboard__settings", summary: "Appearance, density, and language." },
  { id: "notifications", title: "Notifications", folder: "dashboard__notifications", summary: "Bell popover with unread items." },
  { id: "page-guide", title: "Page guide", folder: "dashboard__page-guide", summary: "driver.js-style tour step over the daily briefing." },
  { id: "contest", title: "Contest", folder: "dashboard-contest", summary: "Contest detail, filters, and a dense small table." },
  { id: "new-contest", title: "New contest", folder: "dashboard-admin-contest__new-contest", summary: "Admin create-contest dialog." },
  { id: "crm", title: "CRM", folder: "dashboard-crm", summary: "Saved views, row status, and notes entry point." },
  { id: "crm-person", title: "CRM person", folder: "dashboard-crm-5423", summary: "Person page with rank, PV, and activity." },
  { id: "inbox", title: "Inbox", folder: "dashboard-my-inbox", summary: "Message list, thread, and new chat." },
  { id: "playbook", title: "Playbook", folder: "dashboard-playbook", summary: "Follow-up queue with actions." },
  { id: "pulse-check", title: "Pulse Check", folder: "dashboard-pulse-check", summary: "Forecast scenarios for the team." },
  { id: "points-rank", title: "Points & rank", folder: "dashboard-points-rank", summary: "Rank period and progress toward the next tier." },
  { id: "genealogy", title: "Genealogy", folder: "dashboard-genealogy", summary: "Downline tree with rank chips." },
  { id: "geography", title: "Geography", folder: "dashboard-geography", summary: "GeoPulse enrollment measures by region." },
  { id: "sharing", title: "Sharing", folder: "dashboard-sharing-plexus", summary: "Share links and the QR dialog." },
  { id: "my-account", title: "My account", folder: "dashboard-my-account", summary: "Profile and add-to-subscription." },
  { id: "my-business", title: "My business", folder: "dashboard-my-business", summary: "Business summary and period comparison." },
  { id: "hub", title: "Plexus Hub", folder: "dashboard-plexus-hub", summary: "Hub list and a HUB-001 style detail header." },
  { id: "plexus-u", title: "Plexus U", folder: "dashboard-plexus-u", summary: "Course list and lesson detail." },
  { id: "live", title: "Plexus Live", folder: "dashboard-plexus-live", summary: "Live session shell." },
  { id: "recognition", title: "Recognition", folder: "dashboard-recognition", summary: "Recognition feed and rank moments." },
  { id: "kickoff", title: "Monthly kickoff", folder: "dashboard-monthly-kickoff", summary: "Kickoff agenda and attendance." },
  { id: "journey", title: "360 Journey", folder: "dashboard-360-journey", summary: "Journey stages from launch to leadership." },
];

const NEUTRALS_LIGHT = {
  50: "#f5f6f8",
  100: "#eef1f5",
  200: "#e6e9ee",
  300: "#d2d7de",
  400: "#aab2bd",
  500: "#8a93a2",
  600: "#5a6473",
  700: "#424b59",
  800: "#2a323e",
  900: "#1a2230",
  950: "#0f1520",
};
const NEUTRALS_DARK = {
  50: "#fbfcfe",
  100: "#f0f4f8",
  200: "#dde7ee",
  300: "#cdd7e1",
  400: "#9fa6ad",
  500: "#636b74",
  600: "#555e68",
  700: "#32383e",
  800: "#202427",
  900: "#121517",
  950: "#090a0b",
};

function swatch(group, name, cssVar, light, dark) {
  return { group, name, cssVar, light, dark };
}

const tokens = {
  swatches: [
    swatch("primary", "main", "--mui-palette-primary-main", "#3a6ea5", "#6492bd"),
    swatch("primary", "light", "--mui-palette-primary-light", "#6492bd", "#8fb0d0"),
    swatch("primary", "dark", "--mui-palette-primary-dark", "#305d8c", "#4a7cab"),
    swatch("primary", "contrastText", "--mui-palette-primary-contrastText", "#ffffff", "#ffffff"),
    swatch("secondary", "main", "--mui-palette-secondary-main", "#32383e", "#dde7ee"),
    swatch("secondary", "light", "--mui-palette-secondary-light", "#555e68", "#f0f4f8"),
    swatch("secondary", "dark", "--mui-palette-secondary-dark", "#202427", "#cdd7e1"),
    swatch("secondary", "contrastText", "--mui-palette-secondary-contrastText", "#ffffff", "#000000"),
    ...Object.keys(NEUTRALS_LIGHT).map((step) =>
      swatch("neutral", step, `--mui-palette-neutral-${step}`, NEUTRALS_LIGHT[step], NEUTRALS_DARK[step]),
    ),
    swatch("status", "error", "--mui-palette-error-main", "#a8473f", "#ba564b"),
    swatch("status", "warning", "--mui-palette-warning-main", "#9a6b1f", "#b1842f"),
    swatch("status", "success", "--mui-palette-success-main", "#2f7d5b", "#4f9573"),
    swatch("status", "info", "--mui-palette-info-main", "#4a7aa9", "#6491bd"),
    swatch("background", "default", "--mui-palette-background-default", "#f5f6f8", "#090a0b"),
    swatch("background", "paper", "--mui-palette-background-paper", "#ffffff", "#121517"),
    swatch("background", "level1", "--mui-palette-background-level1", NEUTRALS_LIGHT[50], NEUTRALS_DARK[800]),
    swatch("background", "level2", "--mui-palette-background-level2", NEUTRALS_LIGHT[100], NEUTRALS_DARK[700]),
    swatch("background", "level3", "--mui-palette-background-level3", NEUTRALS_LIGHT[200], NEUTRALS_DARK[600]),
    swatch("text", "primary", "--mui-palette-text-primary", "#1a2230", "#f0f4f8"),
    swatch("text", "secondary", "--mui-palette-text-secondary", "#5a6473", "#9fa6ad"),
    swatch("text", "divider", "--mui-palette-divider", "#e6e9ee", "#32383e"),
  ],
  layout: [
    { name: "Side nav width", cssVar: "--SideNav-width", value: "252px" },
    { name: "Main nav height", cssVar: "--MainNav-height", value: "62px" },
    { name: "Radius", cssVar: "--mui-shape-borderRadius", value: "8px" },
    { name: "Spacing unit", cssVar: "--mui-spacing", value: "8px" },
    { name: "Shadow / elevation 1", cssVar: "--mui-shadows-1", value: "0px 1px 2px var(--mui-palette-shadow)" },
    { name: "Shadow color (light)", cssVar: "--mui-palette-shadow", value: "rgba(0, 0, 0, 0.08)" },
    { name: "Shadow color (dark)", cssVar: "--mui-palette-shadow", value: "rgba(0, 0, 0, 0.5)" },
    { name: "theme-color", cssVar: "theme-color", value: "#090a0b" },
    { name: "Nav chrome 950", cssVar: "--NavChrome-950", value: "#0f1d30" },
    { name: "Nav chrome 900", cssVar: "--NavChrome-900", value: "#13243a" },
    { name: "Nav chrome 300", cssVar: "--NavChrome-300", value: "#97b3d3" },
  ],
  type: [
    { name: "h1", value: "500 3.5rem/1.2 Inter" },
    { name: "h2", value: "500 3rem/1.2 Inter" },
    { name: "h3", value: "500 2.25rem/1.2 Inter" },
    { name: "h4", value: "500 2rem/1.2 Inter" },
    { name: "h5", value: "500 1.5rem/1.2 Inter" },
    { name: "h6", value: "500 1.125rem/1.2 Inter" },
    { name: "subtitle1", value: "500 1rem/1.57 Inter" },
    { name: "subtitle2", value: "500 0.875rem/1.57 Inter" },
    { name: "body1", value: "400 1rem/1.5 Inter" },
    { name: "body2", value: "400 0.875rem/1.57 Inter" },
    { name: "button", value: "500 0.875rem/1.75 Inter, no transform" },
    { name: "caption", value: "400 0.75rem/1.66 Inter" },
  ],
  note: "`--mui-custom-rankTier` is page state (for example `top` on a Diamond capture), not a brand color.",
};

function classList(html) {
  const found = [];
  const re = /class="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) found.push(match[1].split(/\s+/));
  return found;
}

function tally(html) {
  const roots = new Map();
  const variants = new Map();
  for (const tokens of classList(html)) {
    for (const token of tokens) {
      if (!token.startsWith("Mui")) continue;
      if (token.endsWith("-root")) roots.set(token, (roots.get(token) || 0) + 1);
      else if (token.includes("-")) variants.set(token, (variants.get(token) || 0) + 1);
    }
  }
  return { roots, variants };
}

function topEntries(map, limit = 16) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function pathFromUrl(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function overlayKind(html, opened) {
  if (!opened || opened === "shell") return null;
  if (html.includes("MuiDialog-root") || html.includes('role="dialog"')) {
    if (opened.toLowerCase().includes("drawer") || (html.includes("MuiDrawer-root") && !html.includes("MuiDialog-paper"))) {
      // dialogs also exist in the shell DOM; prefer the opened label
    }
  }
  const label = opened.toLowerCase();
  if (label.includes("drawer")) return "drawer";
  if (label.includes("popover") || label.includes("tour") || label.includes("guide")) return "popover";
  if (label.includes("menu")) return "menu";
  if (label.includes("dialog") || label.includes("quick view") || label.includes("search") || label.includes("qr")) return "dialog";
  if (html.includes("MuiDrawer-root") && label.includes("ask")) return "drawer";
  if (html.includes("MuiPopover-root")) return "popover";
  if (html.includes("MuiMenu-root")) return "menu";
  if (html.includes("MuiDialog-root")) return "dialog";
  return "overlay";
}

function snippetFor(folder, opened, kind) {
  const header = `// Reconstructed from capture ${folder}. Not original source.`;
  if (!kind) {
    return `${header}\n// Shell capture — compose it from the matching pattern specimen.\n<Box sx={{ bgcolor: "background.default", p: 3 }}>\n  <Typography variant="h6">${opened === "shell" ? "Page shell" : "Page"}</Typography>\n</Box>`;
  }
  if (kind === "drawer") {
    return `${header}\n<Drawer anchor="right" open PaperProps={{ sx: { width: 360 } }}>\n  <Box sx={{ p: 2 }}>\n    <Typography variant="h6">${opened.includes("Ask") ? "Ask Plexi" : "Settings"}</Typography>\n    <Typography variant="body2" color="text.secondary">\n      Placeholder copy. Member names stay out of the snippet.\n    </Typography>\n  </Box>\n</Drawer>`;
  }
  if (kind === "menu") {
    return `${header}\n<Menu open>\n  <MenuItem>View profile</MenuItem>\n  <MenuItem>Add note</MenuItem>\n  <MenuItem>Open pleX-Ray</MenuItem>\n</Menu>`;
  }
  if (kind === "popover") {
    return `${header}\n<Paper elevation={3} sx={{ p: 2, maxWidth: 320 }}>\n  <Typography variant="subtitle2">Guide</Typography>\n  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>\n    ${opened.replace(/[A-Z][a-z]+ [A-Z][a-z]+/g, "Sample Ambassador")}\n  </Typography>\n</Paper>`;
  }
  return `${header}\n<Dialog open fullWidth maxWidth="sm">\n  <DialogTitle>Quick view</DialogTitle>\n  <DialogContent>\n    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>\n      <Avatar>SA</Avatar>\n      <Box>\n        <Typography variant="subtitle1">Sample Ambassador</Typography>\n        <Typography variant="caption" color="text.secondary">Diamond · PV 4,280</Typography>\n      </Box>\n    </Stack>\n    <Chip size="small" color="success" label="On track" />\n  </DialogContent>\n  <DialogActions>\n    <Button size="small">Close</Button>\n    <Button size="small" variant="contained">Open profile</Button>\n  </DialogActions>\n</Dialog>`;
}

function buttonKey(classes) {
  if (!classes.includes("MuiButton-root")) return null;
  const variant = classes.includes("MuiButton-contained")
    ? "contained"
    : classes.includes("MuiButton-outlined")
      ? "outlined"
      : "text";
  const size = classes.includes("MuiButton-sizeLarge")
    ? "large"
    : classes.includes("MuiButton-sizeSmall")
      ? "small"
      : "medium";
  const color =
    ["secondary", "error", "warning", "success", "info", "inherit"].find((c) =>
      classes.includes(`MuiButton-color${c[0].toUpperCase()}${c.slice(1)}`),
    ) || "primary";
  return { id: `${variant}-${size}-${color}`, label: `${variant} · ${size} · ${color}`, props: { variant, size, color } };
}

function chipKey(classes) {
  if (!classes.includes("MuiChip-root")) return null;
  const variant = classes.includes("MuiChip-outlined") ? "outlined" : "filled";
  const size = classes.includes("MuiChip-sizeSmall") ? "small" : "medium";
  const color =
    ["primary", "secondary", "error", "warning", "success", "info"].find((c) =>
      classes.includes(`MuiChip-color${c[0].toUpperCase()}${c.slice(1)}`),
    ) || "default";
  return { id: `${variant}-${size}-${color}`, label: `${variant} · ${size} · ${color}`, props: { variant, size, color } };
}

function iconKey(classes) {
  if (!classes.includes("MuiIconButton-root")) return null;
  const size = classes.includes("MuiIconButton-sizeSmall")
    ? "small"
    : classes.includes("MuiIconButton-sizeLarge")
      ? "large"
      : "medium";
  const color =
    ["primary", "secondary", "error", "warning", "success", "info", "inherit"].find((c) =>
      classes.includes(`MuiIconButton-color${c[0].toUpperCase()}${c.slice(1)}`),
    ) || "default";
  return { id: `${size}-${color}`, label: `${size} · ${color}`, props: { size, color } };
}

const SIMPLE = {
  typography: {
    name: "Typography",
    description: "Inter at the product scale. Headings are weight 500. Buttons do not uppercase.",
    match: (classes) => {
      const variant = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "overline"].find((v) =>
        classes.includes(`MuiTypography-${v}`),
      );
      if (!classes.includes("MuiTypography-root") || !variant) return null;
      return { id: variant, label: variant, props: { variant } };
    },
  },
  paper: {
    name: "Paper",
    description: "Elevation 1 is the working surface. Background image is forced off so dark mode stays flat.",
    match: (classes) => {
      if (!classes.includes("MuiPaper-root")) return null;
      const elevation = ["elevation1", "elevation2", "elevation3", "elevation0"].find((e) => classes.includes(`MuiPaper-${e}`));
      return { id: elevation || "flat", label: elevation || "flat", props: { elevation: elevation ? elevation.replace("elevation", "") : "0" } };
    },
  },
  divider: {
    name: "Divider",
    description: "Full-width rules on divider token #e6e9ee / #32383e.",
    match: (classes) => (classes.includes("MuiDivider-root") ? { id: "fullWidth", label: "fullWidth", props: { orientation: "horizontal" } } : null),
  },
  table: {
    name: "Table",
    description: "size=\"small\" is the dominant table. Rows hover. Header cells are caption weight.",
    match: (classes) =>
      classes.includes("MuiTableCell-root")
        ? {
            id: classes.includes("MuiTableCell-sizeSmall") ? "size-small" : "size-medium",
            label: classes.includes("MuiTableCell-sizeSmall") ? "small cell" : "medium cell",
            props: { size: classes.includes("MuiTableCell-sizeSmall") ? "small" : "medium" },
          }
        : null,
  },
  select: {
    name: "Select",
    description: "Outlined, small, used for period, measure, and rank filters.",
    match: (classes) =>
      classes.includes("MuiSelect-root")
        ? { id: classes.includes("MuiInputBase-sizeSmall") ? "outlined-small" : "outlined", label: "outlined", props: { variant: "outlined", size: classes.includes("MuiInputBase-sizeSmall") ? "small" : "medium" } }
        : null,
  },
  linearProgress: {
    name: "LinearProgress",
    description: "Determinate bars for rank progress and course completion.",
    match: (classes) => (classes.includes("MuiLinearProgress-root") ? { id: "determinate", label: "determinate", props: { variant: "determinate" } } : null),
  },
  toggleButton: {
    name: "ToggleButton",
    description: "Segmented filters. Small is the size used beside tables.",
    match: (classes) =>
      classes.includes("MuiToggleButton-root")
        ? { id: classes.includes("MuiToggleButton-sizeSmall") ? "small" : "medium", label: classes.includes("MuiToggleButton-sizeSmall") ? "small" : "medium", props: { size: classes.includes("MuiToggleButton-sizeSmall") ? "small" : "medium" } }
        : null,
  },
  avatar: {
    name: "Avatar",
    description: "Circular initials. Default fill follows neutral, not a photo.",
    match: (classes) => (classes.includes("MuiAvatar-root") ? { id: "circular", label: "circular", props: { variant: "circular" } } : null),
  },
  drawer: {
    name: "Drawer",
    description: "Right anchor for Ask Plexi and settings. Permanent left nav is a Box, not this drawer.",
    match: (classes) => (classes.includes("MuiDrawer-root") ? { id: "temporary-right", label: "temporary", props: { anchor: "right", variant: "temporary" } } : null),
  },
  dialog: {
    name: "Dialog",
    description: "pleX-Ray, search, new contest, and QR all sit in Dialog.",
    match: (classes) => (classes.includes("MuiDialog-root") ? { id: "dialog", label: "dialog", props: { fullWidth: "true", maxWidth: "sm" } } : null),
  },
  link: {
    name: "Link",
    description: "Inline links inherit primary and do not introduce a second type style.",
    match: (classes) => (classes.includes("MuiLink-root") ? { id: "primary", label: "primary", props: { color: "primary", underline: "hover" } } : null),
  },
  card: {
    name: "Card",
    description: "Paper plus header and content. Used for briefing, courses, and hub items.",
    match: (classes) => (classes.includes("MuiCard-root") ? { id: "elevation1", label: "elevation 1", props: { elevation: "1" } } : null),
  },
};

const primitiveOrder = ["button", "iconButton", "chip", "typography", "paper", "card", "divider", "table", "select", "linearProgress", "toggleButton", "avatar", "drawer", "dialog", "link"];

const buckets = {};
for (const id of primitiveOrder) buckets[id] = new Map();

function bump(id, key, folder) {
  if (!key) return;
  const map = buckets[id];
  const prev = map.get(key.id) || { ...key, count: 0, capture: folder };
  prev.count += 1;
  if (prev.count === 1) prev.capture = folder;
  map.set(key.id, prev);
}

mkdirSync(catalogDir, { recursive: true });
mkdirSync(shotsDir, { recursive: true });

const pages = [];
const classByFolder = new Map();

for (const folder of readdirSync(capturesDir)) {
  const dir = join(capturesDir, folder);
  if (!statSync(dir).isDirectory()) continue;
  if (folder === "root") continue;
  const metaPath = join(dir, "meta.json");
  const htmlPath = join(dir, "page.html");
  if (!existsSync(metaPath) || !existsSync(htmlPath)) continue;
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  const html = readFileSync(htmlPath, "utf8");
  const { roots, variants } = tally(html);
  classByFolder.set(folder, { roots, variants });
  const shotSrc = join(dir, "shot.png");
  if (existsSync(shotSrc)) copyFileSync(shotSrc, join(shotsDir, `${folder}.png`));
  const kind = overlayKind(html, meta.opened);
  const lists = classList(html);
  for (const classes of lists) {
    bump("button", buttonKey(classes), folder);
    bump("iconButton", iconKey(classes), folder);
    bump("chip", chipKey(classes), folder);
    for (const [id, spec] of Object.entries(SIMPLE)) bump(id, spec.match(classes), folder);
  }
  pages.push({
    slug: folder,
    folder,
    title: meta.title || folder,
    path: pathFromUrl(meta.url || ""),
    colorScheme: meta.colorScheme || "light",
    opened: meta.opened || "shell",
    timestamp: meta.timestamp || "",
    shot: `/shots/${folder}.png`,
    overlayKind: kind,
    classes: topEntries(roots, 12),
    variants: topEntries(variants, 12),
    snippet: snippetFor(folder, meta.opened || "shell", kind),
  });
}

pages.sort((a, b) => a.slug.localeCompare(b.slug));

const descriptions = {
  button: "Text and outlined, size small, are the working styles. Contained is reserved for the primary commit.",
  iconButton: "Secondary and inherit icon buttons sit in the top bar and row actions.",
  chip: "Small chips carry rank, status, and saved-view labels. Outlined secondary is the quiet default.",
};

const primitives = primitiveOrder.map((id) => {
  const spec = SIMPLE[id];
  const variants = [...(buckets[id] || new Map()).values()].sort((a, b) => b.count - a.count);
  return {
    id,
    name: spec?.name || (id === "button" ? "Button" : id === "iconButton" ? "IconButton" : "Chip"),
    description: descriptions[id] || spec?.description || "",
    variants,
  };
});

const patterns = PATTERNS.map((pattern) => {
  const stats = classByFolder.get(pattern.folder);
  return {
    ...pattern,
    shot: `/shots/${pattern.folder}.png`,
    classes: stats ? topEntries(stats.roots, 10) : [],
    tokens: [
      "palette.primary.main",
      "palette.background.paper",
      "palette.background.default",
      "palette.text.primary",
      "palette.text.secondary",
      "palette.divider",
      "palette.success.main",
      "palette.warning.main",
      "palette.error.main",
      "--SideNav-width",
      "--mui-shape-borderRadius",
      "--mui-shadows-1",
    ],
  };
});

writeFileSync(join(catalogDir, "tokens.json"), JSON.stringify(tokens, null, 2));
writeFileSync(join(catalogDir, "primitives.json"), JSON.stringify(primitives, null, 2));
writeFileSync(join(catalogDir, "patterns.json"), JSON.stringify(patterns, null, 2));
writeFileSync(join(catalogDir, "pages.json"), JSON.stringify(pages, null, 2));
console.log(`ingest: ${pages.length} pages, ${patterns.length} patterns, shots -> public/shots`);
