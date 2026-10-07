import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function TokenSwatch({
  name,
  cssVar,
  light,
  dark,
  active,
  onCopy,
  id,
}: {
  name: string;
  cssVar: string;
  light: string;
  dark: string;
  active: "light" | "dark";
  onCopy: (text: string, label: string) => void;
  id?: string;
}) {
  const current = active === "dark" ? dark : light;
  const readable = isDark(current) ? "#fff" : "#1a2230";
  return (
    <Box
      id={id}
      component="button"
      type="button"
      onClick={() => onCopy(`${current}  ${cssVar}`, `${name} copied`)}
      sx={{
        textAlign: "left",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        p: 0,
        color: "text.primary",
        minWidth: 0,
        scrollMarginTop: 80,
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Box sx={{ height: 72, bgcolor: current, color: readable, display: "flex", alignItems: "flex-end", p: 1 }}>
        <Typography variant="caption" sx={{ color: "inherit", fontVariantNumeric: "tabular-nums" }}>
          {current}
        </Typography>
      </Box>
      <Box sx={{ p: 1.25 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", wordBreak: "break-all" }}>
          {cssVar}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
          Light {light} · Dark {dark}
        </Typography>
      </Box>
    </Box>
  );
}

function isDark(hex: string) {
  const raw = hex.trim();
  if (!raw.startsWith("#") || (raw.length !== 7 && raw.length !== 4)) return false;
  const full = raw.length === 4 ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}` : raw;
  const r = parseInt(full.slice(1, 3), 16);
  const g = parseInt(full.slice(3, 5), 16);
  const b = parseInt(full.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 150;
}
