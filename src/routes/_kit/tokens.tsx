import { useEffect } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";
import tokens from "@/catalog/tokens.json";
import { ReturnTo } from "@/components/ReturnTo";
import { TokenSwatch } from "@/components/TokenSwatch";
import { useCopy } from "@/components/copy-context";
import { validateKitSearch } from "@/components/kit-path";

export const Route = createFileRoute("/_kit/tokens")({
  validateSearch: validateKitSearch,
  component: TokensPage,
});

const groups = ["primary", "secondary", "neutral", "status", "background", "text"] as const;

function swatchTokenId(group: string, name: string) {
  if (group === "status") return `palette.${name}.main`;
  if (group === "text" && name === "divider") return "palette.divider";
  return `palette.${group}.${name}`;
}

function TokensPage() {
  const copy = useCopy();
  const { mode } = useColorScheme();
  const active = mode === "dark" ? "dark" : "light";
  const hash = useRouterState({ select: (state) => state.location.hash });
  useEffect(() => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "center" });
  }, [hash]);
  return (
    <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
      <ReturnTo />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 680 }}>
        Both schemes are listed on every swatch. The toggle in the top bar switches the kit and the specimens together. Click a swatch to copy the hex and the CSS variable.
      </Typography>
      {groups.map((group) => (
        <Box key={group} sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.25, textTransform: "capitalize" }}>
            {group}
          </Typography>
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
            {tokens.swatches
              .filter((swatch) => swatch.group === group)
              .map((swatch) => (
                <TokenSwatch key={`${swatch.group}-${swatch.name}`} {...swatch} id={swatchTokenId(swatch.group, swatch.name)} active={active} onCopy={copy} />
              ))}
          </Box>
        </Box>
      ))}
      <Typography variant="subtitle2" sx={{ mb: 1.25 }}>
        Layout
      </Typography>
      <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 3 }}>
        {tokens.layout.map((item, index) => (
          <Paper
            key={item.name}
            id={index === tokens.layout.findIndex((entry) => entry.cssVar === item.cssVar) ? item.cssVar : undefined}
            variant="outlined"
            component="button"
            onClick={() => copy(`${item.value}  ${item.cssVar}`, `${item.name} copied`)}
            sx={{ p: 1.5, textAlign: "left", color: "inherit", scrollMarginTop: 80 }}
          >
            <Typography variant="body2">{item.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              {item.cssVar}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1.25 }}>
        Type
      </Typography>
      <Box sx={{ display: "grid", gap: 1 }}>
        {tokens.type.map((item) => (
          <Box key={item.name} sx={{ display: "flex", gap: 2, py: 0.75, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body2" sx={{ width: 120 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        {tokens.note}
      </Typography>
    </Box>
  );
}
