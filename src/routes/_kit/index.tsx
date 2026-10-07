import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import pages from "@/catalog/pages.json";
import patterns from "@/catalog/patterns.json";
import primitives from "@/catalog/primitives.json";
import { features } from "@/features/catalog";
import { productComponents } from "@/product/catalog";

export const Route = createFileRoute("/_kit/")({
  component: Home,
});

const areas = [
  { href: "/tokens", title: "Tokens", body: "Color, type, layout, and interaction states. Light and dark." },
  { href: "/primitives", title: "Primitives", body: "Every MUI component the captures actually render, with the variants found there." },
  { href: "/components", title: "Components", body: "Dashboard cards, charts, tables, chips, and the other pieces built from those primitives." },
  { href: "/features", title: "Features", body: "The jobs those components finish together. Start with pleX-Ray." },
  { href: "/patterns", title: "Patterns", body: "Full pages. Shell, contest, CRM, Pulse Check, and the rest, composed from the components." },
  { href: "/pages", title: "Pages", body: "Capture library. Each screen links through to the tokens, primitives, and pattern that construct it." },
] as const;

function Home() {
  return (
    <Box>
      <Typography variant="caption" color="primary.main" sx={{ letterSpacing: "0.08em" }}>
        DESIGN SYSTEM
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, maxWidth: 720, textWrap: "balance" }}>
        A click-through kit for Plexus Pulse
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640, textWrap: "pretty" }}>
        Tokens, primitives, and reconstructed patterns from the product. Edit theme.ts and every specimen follows, because previews read CSS variables.
      </Typography>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" }, mt: 3 }}>
        {[
          [String(pages.length), "Captures"],
          [String(primitives.length), "Primitives"],
          [String(productComponents.length), "Components"],
          [String(features.length), "Features"],
          [String(patterns.length), "Patterns"],
        ].map(([value, label]) => (
          <Paper key={label} variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5">{value}</Typography>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, mt: 1.5 }}>
        {areas.map((area) => (
          <Link key={area.href} to={area.href} style={{ textDecoration: "none" }}>
            <Paper variant="outlined" sx={{ p: 2.5, color: "inherit", minHeight: 140, "&:hover": { borderColor: "primary.main" } }}>
            <Typography variant="h6">{area.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {area.body}
            </Typography>
            </Paper>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
