import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Overlay, ProductShell } from "./frame";
import { Metric, PeopleTable, ProgressLine, Section, people } from "./bits";
import { PlexRayFeature } from "@/features/ui";
import { ContestBoard, CrmTable, DashboardHome, FilterBar, JourneyStage, MessageList, MyBusinessBoard, PulseBoard, RegionBars, SavedViews, ShareCard, Thread, TreeNode } from "@/product/ui";

function stage(active: string, title: string, node: React.ReactNode, overlay?: React.ReactNode, align?: "center" | "right" | "popover") {
  return (
    <Box sx={{ position: "relative" }}>
      <ProductShell active={active} title={title}>
        {node}
      </ProductShell>
      {overlay ? <Overlay align={align}>{overlay}</Overlay> : null}
    </Box>
  );
}

function dialogShell(title: string, body: React.ReactNode, actions?: React.ReactNode) {
  return (
    <Paper elevation={8} sx={{ width: "min(520px, 100%)", borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center" }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Divider />
      <Box sx={{ px: 2.5, py: 2 }}>{body}</Box>
      <Divider />
      <Box sx={{ px: 2.5, py: 1.5, display: "flex", justifyContent: "flex-end", gap: 1 }}>{actions}</Box>
    </Paper>
  );
}

const briefing = (
  <Box>
    <Typography variant="h5" sx={{ mb: 0.5 }}>
      Good morning
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Four ambassadors need a touch today. Contest pace is ahead of last month.
    </Typography>
    <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
      <Metric label="Team PV" value="18,420" hint="+6.2% vs last period" />
      <Metric label="On track" value="28" hint="of 36 enrolled" />
      <Metric label="At risk" value="3" hint="Pulse Check" />
    </Stack>
    <Section title="Growth" action="Open contest">
      <PeopleTable />
    </Section>
  </Box>
);

const personCard = (
  <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: "center" }}>
    <Avatar sx={{ bgcolor: "primary.main" }}>AL</Avatar>
    <Box>
      <Typography variant="subtitle1">Avery Lane</Typography>
      <Typography variant="caption" color="text.secondary">
        Diamond · PV 4,280 · enrolled 2022
      </Typography>
    </Box>
    <Chip size="small" color="success" label="On track" sx={{ ml: "auto" }} />
  </Stack>
);

export const patternViews: Record<string, () => React.ReactNode> = {
  "app-shell": () => stage("Dashboard", "Dashboard", <Typography color="text.secondary">Content sits to the right of the 252px nav.</Typography>),
  "dashboard-home": () => stage("Dashboard", "Dashboard", <DashboardHome />),
  "plex-ray": () => <PlexRayFeature />,
  "plexi-glass": () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      dialogShell(
        "PleXi-Glass",
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Coaching view for Sample Ambassador
          </Typography>
          <ProgressLine label="Rank confidence" value={72} />
          <ProgressLine label="Enrollment pace" value={54} />
          <Paper variant="outlined" sx={{ p: 1.5, mt: 1 }}>
            <Typography variant="subtitle2">Suggested next step</Typography>
            <Typography variant="body2" color="text.secondary">
              Ask about the two new enrollments that have not placed a second order.
            </Typography>
          </Paper>
        </Box>,
        <Button size="small" variant="contained">
          Ask Plexi
        </Button>,
      ),
    ),
  "ask-plexi": () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      <Paper square elevation={4} sx={{ width: 360, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Ask Plexi</Typography>
          <Typography variant="caption" color="text.secondary">
            Coaching drawer. No live model is connected.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {["Who is closest to the next rank?", "Summarize contest pace", "Draft a check-in"].map((q) => (
            <Paper key={q} variant="outlined" sx={{ p: 1.25 }}>
              <Typography variant="body2">{q}</Typography>
            </Paper>
          ))}
        </Box>
        <Box sx={{ mt: "auto", p: 2 }}>
          <TextField size="small" fullWidth placeholder="Ask about this team" />
        </Box>
      </Paper>,
      "right",
    ),
  "command-palette": () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      <Paper elevation={8} sx={{ width: "min(480px, 100%)", borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ px: 2, py: 1.5 }}>
          <TextField autoFocus size="small" fullWidth placeholder="Search people" defaultValue="" />
        </Box>
        <Divider />
        {people.map((person) => (
          <Box key={person.name} sx={{ px: 2, py: 1.25, display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{person.name.slice(0, 1)}</Avatar>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {person.name}
            </Typography>
            <Chip size="small" variant="outlined" color="secondary" label={person.rank} />
          </Box>
        ))}
      </Paper>,
    ),
  "settings-drawer": () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      <Paper square elevation={4} sx={{ width: 340, p: 2.5, height: "100%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Settings
        </Typography>
        {[
          ["Appearance", "Light"],
          ["Density", "Comfortable"],
          ["Language", "English"],
          ["Start page", "Dashboard"],
        ].map(([label, value]) => (
          <Box key={label} sx={{ display: "flex", py: 1.25, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Paper>,
      "right",
    ),
  notifications: () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      <Paper elevation={6} sx={{ mt: 7, mr: 1, width: 320, p: 1.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Notifications
        </Typography>
        {[
          ["Contest pace", "Team is 6% ahead of last month."],
          ["Rank watch", "Jordan Hale is 180 PV from Emerald."],
          ["Inbox", "Two follow-ups are waiting."],
        ].map(([title, body]) => (
          <Box key={title} sx={{ py: 1, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {body}
            </Typography>
          </Box>
        ))}
      </Paper>,
      "popover",
    ),
  "page-guide": () =>
    stage(
      "Dashboard",
      "Dashboard",
      briefing,
      <Paper elevation={6} sx={{ mt: 8, ml: 4, width: 300, p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          1 of 10
        </Typography>
        <Typography variant="subtitle1">Daily briefing</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>
          Start here each morning. The briefing ranks who needs a conversation.
        </Typography>
        <Button size="small" variant="contained">
          Next
        </Button>
      </Paper>,
      "popover",
    ),
  contest: () => stage("Contest", "Contest", <ContestBoard />),
  "new-contest": () =>
    stage(
      "Contest",
      "Admin · Contest",
      <Typography color="text.secondary">Contest list stays behind the create dialog.</Typography>,
      dialogShell(
        "New contest",
        <Stack spacing={1.5}>
          <TextField size="small" label="Name" defaultValue="Fall sprint" fullWidth />
          <TextField size="small" label="Period" defaultValue="October 2026" fullWidth />
          <TextField size="small" label="PV target" defaultValue="2500" fullWidth />
        </Stack>,
        <>
          <Button size="small">Cancel</Button>
          <Button size="small" variant="contained">
            Create contest
          </Button>
        </>,
      ),
    ),
  crm: () =>
    stage(
      "CRM",
      "CRM",
      <Box>
        <SavedViews />
        <Box sx={{ my: 1.5 }}>
          <FilterBar />
        </Box>
        <CrmTable />
      </Box>,
    ),
  "crm-person": () =>
    stage(
      "CRM",
      "Avery Lane",
      <Box>
        {personCard}
        <Stack direction="row" spacing={1.5}>
          <Metric label="PV" value="4,280" />
          <Metric label="Orders" value="11" />
          <Metric label="Last touch" value="2d" />
        </Stack>
        <Section title="Notes">
          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="body2">Promised a follow-up after the team call. No personal details stored in this specimen.</Typography>
          </Paper>
        </Section>
      </Box>,
    ),
  inbox: () =>
    stage(
      "Inbox",
      "Inbox",
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        <MessageList />
        <Thread />
      </Stack>,
    ),
  playbook: () =>
    stage(
      "Playbook",
      "Playbook",
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Follow-ups due this week.
        </Typography>
        <PeopleTable />
      </Box>,
    ),
  "pulse-check": () => stage("Pulse Check", "Pulse Check", <PulseBoard />),
  "points-rank": () =>
    stage(
      "Points & rank",
      "Points & rank",
      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip size="small" color="primary" label="September 2026" />
          <Chip size="small" variant="outlined" color="secondary" label="Diamond" />
        </Stack>
        <ProgressLine label="PV toward next tier" value={68} />
        <ProgressLine label="Active legs" value={80} />
        <PeopleTable compact />
      </Box>,
    ),
  genealogy: () => stage("Genealogy", "Genealogy", <TreeNode />),
  geography: () =>
    stage(
      "Geography",
      "Geography",
      <Box>
        <FilterBar />
        <Box sx={{ mt: 1.5 }}>
          <RegionBars />
        </Box>
      </Box>,
    ),
  sharing: () =>
    stage(
      "Dashboard",
      "Sharing",
      <ShareCard />,
      dialogShell(
        "QR code",
        <Box sx={{ display: "grid", placeItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 148,
              height: 148,
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
              backgroundImage: "linear-gradient(90deg, currentColor 2px, transparent 2px), linear-gradient(currentColor 2px, transparent 2px)",
              backgroundSize: "12px 12px",
              color: "text.primary",
              opacity: 0.8,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Placeholder mark, not a live code.
          </Typography>
        </Box>,
        <Button size="small">Close</Button>,
      ),
    ),
  "my-account": () =>
    stage(
      "Dashboard",
      "My account",
      <Stack spacing={1.5} sx={{ maxWidth: 480 }}>
        <TextField size="small" label="Display name" defaultValue="Sample Ambassador" fullWidth />
        <TextField size="small" label="Email" defaultValue="ambassador@example.com" fullWidth />
        <Paper variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle2">Subscription</Typography>
            <Typography variant="caption" color="text.secondary">
              Monthly special is available to add.
            </Typography>
          </Box>
          <Button size="small" sx={{ ml: "auto" }} variant="outlined">
            Add
          </Button>
        </Paper>
      </Stack>,
    ),
  "my-business": () => stage("My business", "My business", <MyBusinessBoard />),
  hub: () =>
    stage(
      "Hub",
      "Plexus Hub",
      <Stack spacing={1}>
        {[
          ["HUB-001", "Label update", "Pinned"],
          ["HUB-002", "Launch notes", "New"],
          ["HUB-011", "Field script", "Updated"],
        ].map(([id, title, state]) => (
          <Paper key={id} variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ width: 72 }}>
              {id}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {title}
            </Typography>
            <Chip size="small" variant="outlined" color="secondary" label={state} />
          </Paper>
        ))}
      </Stack>,
    ),
  "plexus-u": () =>
    stage(
      "Plexus U",
      "Plexus U",
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        {[
          ["Welcome sequence", "4 lessons", 80],
          ["Rank path", "6 lessons", 35],
        ].map(([title, meta, value]) => (
          <Paper key={title} elevation={1} sx={{ p: 1.5 }}>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {meta}
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <ProgressLine label="Complete" value={Number(value)} />
            </Box>
          </Paper>
        ))}
      </Box>,
    ),
  live: () =>
    stage(
      "Live",
      "Plexus Live",
      <Paper elevation={1} sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Chip size="small" color="error" label="Live" />
        <Box>
          <Typography variant="subtitle1">Monday field call</Typography>
          <Typography variant="body2" color="text.secondary">
            Sample room. Playback is not connected.
          </Typography>
        </Box>
        <Button size="small" variant="contained" sx={{ ml: "auto" }}>
          Join
        </Button>
      </Paper>,
    ),
  recognition: () =>
    stage(
      "Recognition",
      "Recognition",
      <Stack spacing={1}>
        {people.map((person) => (
          <Paper key={person.name} variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>{person.name.slice(0, 1)}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">{person.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Recognized for {person.rank} pace
              </Typography>
            </Box>
            <Chip size="small" color={person.color} label={person.rank} />
          </Paper>
        ))}
      </Stack>,
    ),
  kickoff: () =>
    stage(
      "Kickoff",
      "Monthly kickoff",
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          October kickoff
        </Typography>
        {["Open the room", "Rank story", "Contest rules", "Close with asks"].map((step, index) => (
          <Box key={step} sx={{ display: "flex", gap: 1.5, py: 1, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="caption" color="text.secondary" sx={{ width: 24 }}>
              0{index + 1}
            </Typography>
            <Typography variant="body2">{step}</Typography>
          </Box>
        ))}
      </Box>,
    ),
  journey: () => stage("Dashboard", "360 Journey", <JourneyStage />),
};
