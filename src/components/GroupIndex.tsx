import { Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function GroupIndex({
  lede,
  items,
}: {
  lede: string;
  items: { href: string; title: string; body: string; meta?: string }[];
}) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 680 }}>
        {lede}
      </Typography>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" } }}>
        {items.map((item) => (
          <Link key={item.href} to={item.href as never} style={{ textDecoration: "none" }}>
            <Paper variant="outlined" sx={{ p: 2, color: "inherit", minHeight: 120, height: "100%", "&:hover": { borderColor: "primary.main" } }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                {item.body}
              </Typography>
              {item.meta ? (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                  {item.meta}
                </Typography>
              ) : null}
            </Paper>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
