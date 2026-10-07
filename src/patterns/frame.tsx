import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { IconBell, IconGear, IconSearch, PulseMark } from "@/icons/icons";

const groups = [
  { title: "Overview", items: ["Dashboard", "My business", "Points & rank", "Contest", "Pulse Check"] },
  { title: "People", items: ["CRM", "Genealogy", "Geography", "Playbook", "Inbox"] },
  { title: "Field", items: ["Recognition", "Plexus U", "Hub", "Live", "Kickoff"] },
];

export function ProductShell({
  active = "Dashboard",
  title = "Dashboard",
  children,
}: {
  active?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: 640, bgcolor: "background.default", position: "relative" }}>
      <Box
        component="nav"
        aria-label="Product"
        sx={{
          width: "var(--SideNav-width)",
          flex: "0 0 var(--SideNav-width)",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          backgroundColor: "var(--NavChrome-950)",
          backgroundImage: "linear-gradient(180deg, var(--NavChrome-900) 0%, var(--NavChrome-950) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box sx={{ px: 2.25, pt: 2.25, pb: 1.5, display: "flex", gap: 1.25, alignItems: "center" }}>
          <PulseMark />
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: 14, lineHeight: 1.2 }}>Plexus Pulse</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Sample workspace</Typography>
          </Box>
        </Box>
        <Box sx={{ px: 1.5, pb: 1 }}>
          {groups.map((group) => (
            <Box key={group.title} sx={{ mb: 1.25 }}>
              <Typography sx={{ px: 1, py: 0.5, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
                {group.title}
              </Typography>
              {group.items.map((item) => {
                const on = item === active;
                return (
                  <Box
                    key={item}
                    sx={{
                      px: 1.25,
                      py: 0.7,
                      borderRadius: 1,
                      fontSize: 13,
                      color: on ? "#fff" : "rgba(255,255,255,0.72)",
                      bgcolor: on ? "rgba(94, 135, 179, 0.18)" : "transparent",
                    }}
                  >
                    {item}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: "auto", px: 2, py: 1.75, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center", fontSize: 11 }}>SA</Box>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: 13, lineHeight: 1.2 }}>Sample Ambassador</Typography>
            <Typography sx={{ color: "var(--NavChrome-300)", fontSize: 11 }}>Diamond</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Box
          component="header"
          sx={{
            minHeight: "var(--MainNav-height)",
            px: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="subtitle1" sx={{ mr: "auto" }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              border: 1,
              borderColor: "divider",
              color: "text.secondary",
              minWidth: 180,
              fontSize: 13,
            }}
          >
            <IconSearch size={16} />
            Search people
          </Box>
          <Chip size="small" variant="outlined" color="secondary" label="Viewing as Sample Ambassador" />
          <IconButton size="small" color="secondary" aria-label="Notifications">
            <IconBell size={18} />
          </IconButton>
          <IconButton size="small" color="secondary" aria-label="Settings">
            <IconGear size={18} />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export function Overlay({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "right" | "popover";
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        bgcolor: align === "popover" ? "transparent" : "rgba(15, 21, 32, 0.48)",
        display: "flex",
        alignItems: align === "right" ? "stretch" : align === "popover" ? "flex-start" : "center",
        justifyContent: align === "right" ? "flex-end" : align === "popover" ? "flex-end" : "center",
        p: align === "right" ? 0 : 2,
      }}
    >
      {children}
    </Box>
  );
}
