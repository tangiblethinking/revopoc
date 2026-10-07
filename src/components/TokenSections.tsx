import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useColorScheme } from "@mui/material/styles";
import tokens from "@/catalog/tokens.json";
import { TokenSwatch } from "@/components/TokenSwatch";
import { useCopy } from "@/components/copy-context";
import { TypeScale } from "@/components/TypeScale";
import { InteractionStates } from "@/components/InteractionStates";

const groups = ["primary", "secondary", "neutral", "status", "background", "text"] as const;

function swatchTokenId(group: string, name: string) {
  if (group === "status") return `palette.${name}.main`;
  if (group === "text" && name === "divider") return "palette.divider";
  return `palette.${group}.${name}`;
}

export function ColorTokens() {
  const copy = useCopy();
  const { mode } = useColorScheme();
  const active = mode === "dark" ? "dark" : "light";
  return (
    <Box>
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
    </Box>
  );
}

export function LayoutTokens() {
  const copy = useCopy();
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 680 }}>
        Radius, spacing, elevation, and the chrome sizes the product shell actually uses.
      </Typography>
      <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        {tokens.layout.map((item, index) => (
          <Paper
            key={`${item.name}-${index}`}
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
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        {tokens.note}
      </Typography>
    </Box>
  );
}

export function TypeTokens() {
  return <TypeScale />;
}

export function StateTokens() {
  return <InteractionStates />;
}
