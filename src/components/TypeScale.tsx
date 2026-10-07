import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { typeScale } from "@/theme/tokens";

export function TypeScale() {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 680 }}>
        Full Inter scale, largest to smallest. Same-size pairs keep the heavier role first. Headings are weight 500. Buttons do not uppercase.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {typeScale.map((item) => (
          <Box key={item.name} sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", md: "160px 1fr" }, alignItems: "baseline", borderBottom: 1, borderColor: "divider", pb: 1.5 }}>
            <Box>
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                {item.weight} · {item.size} · {item.note}
              </Typography>
            </Box>
            <Typography variant={item.name as "body1"} sx={{ minWidth: 0 }}>
              The quick briefing
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
