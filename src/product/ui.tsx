import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IconBell, IconClose, IconSearch, PulseMark } from "@/icons/icons";

const team = [
  { name: "Avery Lane", rank: "Diamond", pv: "4,280", delta: "+6.1%", neu: "2", status: "On track", tone: "success" as const, initials: "AL" },
  { name: "Jordan Hale", rank: "Emerald", pv: "3,140", delta: "+1.4%", neu: "1", status: "Watch", tone: "warning" as const, initials: "JH" },
  { name: "Riley Chen", rank: "Gold", pv: "1,860", delta: "−4.2%", neu: "0", status: "At risk", tone: "error" as const, initials: "RC" },
  { name: "Morgan Ellis", rank: "Silver", pv: "940", delta: "+12%", neu: "3", status: "New", tone: "primary" as const, initials: "ME" },
];

const months = [
  { month: "Jan", current: 12200, prior: 10800 },
  { month: "Feb", current: 13100, prior: 11600 },
  { month: "Mar", current: 14800, prior: 12900 },
  { month: "Apr", current: 15420, prior: 14100 },
  { month: "May", current: 16890, prior: 15040 },
  { month: "Jun", current: 18420, prior: 16110 },
];

const forecast = [
  { month: "Apr", pv: 14200 },
  { month: "May", pv: 15110 },
  { month: "Jun", pv: 16340 },
  { month: "Jul", pv: 17120 },
  { month: "Aug", pv: 17880 },
  { month: "Sep", pv: 18420 },
];

const mix = [
  { name: "Retail", value: 42 },
  { name: "Preferred", value: 31 },
  { name: "Ambassador", value: 27 },
];

const regions = [
  { name: "Phoenix", value: 86 },
  { name: "Dallas", value: 64 },
  { name: "Atlanta", value: 51 },
  { name: "Denver", value: 38 },
  { name: "Seattle", value: 22 },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <Typography variant="caption" color="primary.main" sx={{ letterSpacing: "0.08em" }}>
      {children}
    </Typography>
  );
}

export function KpiStat({ label, value, delta, tone = "success" }: { label: string; value: string; delta?: string; tone?: "success" | "error" | "text.secondary" }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.75, flex: "1 1 140px", minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" sx={{ mt: 0.5, lineHeight: 1.15 }}>
        {value}
      </Typography>
      {delta ? (
        <Typography variant="caption" color={tone === "text.secondary" ? "text.secondary" : `${tone}.main`} sx={{ display: "block", mt: 0.5 }}>
          {delta}
        </Typography>
      ) : null}
    </Paper>
  );
}

export function KpiStrip() {
  return (
    <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
      <KpiStat label="Personal PV" value="4,280" delta="+3.2% vs prior" />
      <KpiStat label="Team PV" value="18,420" delta="+6.2% vs prior" />
      <KpiStat label="Customers" value="64" delta="+4" />
      <KpiStat label="Orders" value="112" delta="+9" />
      <KpiStat label="New customers" value="11" delta="−2" tone="error" />
      <KpiStat label="Retention" value="61%" delta="+1.1 pts" />
    </Box>
  );
}

export function ProgressMeter({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 0.75, gap: 1 }}>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
          {hint ?? `${value}%`}
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} sx={{ height: 8, borderRadius: 99 }} />
    </Box>
  );
}

const segments = [
  { month: "Apr", tone: "success.main" },
  { month: "May", tone: "success.main" },
  { month: "Jun", tone: "warning.main" },
  { month: "Jul", tone: "success.main" },
  { month: "Aug", tone: "error.main" },
  { month: "Sep", tone: "success.main" },
];

export function SegmentedMeter() {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {segments.map((segment) => (
          <Box key={segment.month} sx={{ flex: 1, height: 10, borderRadius: 0.5, bgcolor: segment.tone }} />
        ))}
      </Box>
      <Box sx={{ display: "flex", mt: 0.5 }}>
        {segments.map((segment) => (
          <Typography key={segment.month} variant="caption" color="text.secondary" sx={{ flex: 1, textAlign: "center" }}>
            {segment.month}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export function RankChip({ label = "Diamond" }: { label?: string }) {
  return <Chip size="small" variant="outlined" color="secondary" label={label} />;
}

export function StatusChip({ label = "On track", tone = "success" }: { label?: string; tone?: "success" | "warning" | "error" | "primary" }) {
  return <Chip size="small" color={tone} label={label} />;
}

export function PersonCell({ name, meta, initials }: { name: string; meta: string; initials: string }) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", minWidth: 0 }}>
      <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: "primary.main" }}>{initials}</Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
          {meta}
        </Typography>
      </Box>
    </Stack>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: { sm: "flex-end" }, flexWrap: "wrap", mb: 2 }}>
      <Box sx={{ mr: "auto" }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      {actions}
    </Box>
  );
}

export function SideNav() {
  const items = ["Dashboard", "My business", "Contest", "Pulse Check", "CRM"];
  return (
    <Box sx={{ width: 252, borderRadius: 2, overflow: "hidden", color: "#fff", bgcolor: "var(--NavChrome-950)", py: 2 }}>
      <Stack direction="row" spacing={1.25} sx={{ px: 2, pb: 1.5, alignItems: "center" }}>
        <PulseMark />
        <Box>
          <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>Plexus Pulse</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Sample workspace</Typography>
        </Box>
      </Stack>
      <Typography sx={{ px: 2.5, py: 0.5, fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>OVERVIEW</Typography>
      {items.map((item) => (
        <Box key={item} sx={{ mx: 1, px: 1.5, py: 0.8, borderRadius: 1, fontSize: 13.5, color: item === "Dashboard" ? "#fff" : "rgba(255,255,255,0.72)", bgcolor: item === "Dashboard" ? "rgba(94,135,179,0.22)" : "transparent" }}>
          {item}
        </Box>
      ))}
    </Box>
  );
}

export function TopBar() {
  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1.25, minHeight: 64 }}>
      <Typography variant="subtitle1" sx={{ mr: "auto" }}>
        Dashboard
      </Typography>
      <TextField size="small" placeholder="Search people" slotProps={{ input: { startAdornment: <IconSearch size={16} /> } }} sx={{ width: 220, "& .MuiInputBase-input": { pl: 1 } }} />
      <Chip size="small" variant="outlined" color="secondary" label="EN" />
      <IconButton size="small" color="secondary" aria-label="Notifications">
        <IconBell />
      </IconButton>
      <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: "primary.main" }}>SA</Avatar>
    </Paper>
  );
}

export function PlexiBar() {
  return (
    <Paper elevation={1} sx={{ p: 1.25, display: "flex", gap: 1.25, alignItems: "center" }}>
      <Avatar sx={{ bgcolor: "primary.dark", width: 32, height: 32, fontSize: 12 }}>Px</Avatar>
      <TextField size="small" fullWidth placeholder="Ask PleXi about today’s briefing" />
      <Button size="small" variant="contained">
        Ask
      </Button>
    </Paper>
  );
}

export function DailyBriefing() {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Eyebrow>DAILY BRIEFING</Eyebrow>
        <Typography variant="h6" sx={{ mt: 0.5 }}>
          Four ambassadors need a touch today
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 560 }}>
          Contest pace is ahead of last month. Start with the at-risk Gold before the team call.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <CoachAction />
        </Box>
      </CardContent>
    </Card>
  );
}

export function CoachAction() {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
      <PersonCell name="Riley Chen" meta="Gold · last order 18 days ago" initials="RC" />
      <Box sx={{ flex: 1, minWidth: 180 }}>
        <Typography variant="body2">No second order after the enrollment bonus. A short call beats another message.</Typography>
      </Box>
      <Button size="small" variant="outlined">
        Message
      </Button>
      <Button size="small" variant="contained">
        Log note
      </Button>
      <Button size="small" variant="text">
        pleX-Ray
      </Button>
    </Paper>
  );
}

export function ContestSummary() {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ mr: "auto" }}>
            Fall sprint
          </Typography>
          <Chip size="small" variant="outlined" color="secondary" label="Sep 1 – Sep 30" />
          <Button size="small">View contest</Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap", mb: 2 }}>
          <KpiStat label="Your place" value="24" delta="of 86" tone="text.secondary" />
          <KpiStat label="Team PV" value="18,420" delta="Goal 22,000" tone="text.secondary" />
          <KpiStat label="Personal PV" value="4,280" delta="Goal 2,500" />
          <KpiStat label="New" value="6" delta="Goal 8" tone="text.secondary" />
        </Box>
        <ProgressMeter label="Qualification" value={72} hint="18,420 / 22,000 PV" />
      </CardContent>
    </Card>
  );
}

export function PulseWidget() {
  const [scenario, setScenario] = useState("base");
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography variant="subtitle1">Pulse Check</Typography>
          <Select size="small" value={scenario} onChange={(event) => setScenario(event.target.value)} sx={{ ml: "auto", minWidth: 140 }}>
            <MenuItem value="base">Base</MenuItem>
            <MenuItem value="stretch">Stretch</MenuItem>
            <MenuItem value="slip">Slip</MenuItem>
          </Select>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Team PV · September 2026
        </Typography>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          18.4k
        </Typography>
        <SegmentedMeter />
      </CardContent>
    </Card>
  );
}

export function GrowthTable() {
  return (
    <Paper variant="outlined" sx={{ overflow: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ambassador</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell align="right">
              <TableSortLabel active direction="desc">
                PV
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">New</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {team.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>
                <PersonCell name={row.name} meta="Enrolled 2022" initials={row.initials} />
              </TableCell>
              <TableCell>
                <RankChip label={row.rank} />
              </TableCell>
              <TableCell align="right">{row.pv}</TableCell>
              <TableCell align="right">{row.delta}</TableCell>
              <TableCell align="right">{row.neu}</TableCell>
              <TableCell>
                <StatusChip label={row.status} tone={row.tone} />
              </TableCell>
              <TableCell align="right">
                <Button size="small">pleX-Ray</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function TeamGrowth() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
        <Typography variant="subtitle1">Your team’s growth</Typography>
        <Button size="small" sx={{ ml: "auto" }}>
          View all
        </Button>
      </Box>
      <GrowthTable />
    </Box>
  );
}

export function Leaderboard() {
  return (
    <Paper variant="outlined" sx={{ overflow: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Ambassador</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Personal</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell>Qualification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.map((row, index) => (
            <TableRow key={row.name} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <PersonCell name={row.name} meta={`${row.neu} new`} initials={row.initials} />
              </TableCell>
              <TableCell>
                <RankChip label={row.rank} />
              </TableCell>
              <TableCell align="right">{row.pv}</TableCell>
              <TableCell align="right">{index === 0 ? "18,420" : "9,140"}</TableCell>
              <TableCell sx={{ minWidth: 140 }}>
                <LinearProgress variant="determinate" value={[88, 71, 46, 30][index]} sx={{ height: 6, borderRadius: 99 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function OrdersTable() {
  const rows = [
    ["Sep 12", "Avery Lane", "Preferred", "$128", "Paid"],
    ["Sep 11", "Jordan Hale", "Retail", "$64", "Paid"],
    ["Sep 9", "Riley Chen", "Ambassador", "$210", "Pending"],
  ];
  return (
    <Paper variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            {["Date", "Customer", "Type", "Amount", "Status"].map((heading) => (
              <TableCell key={heading} align={heading === "Amount" ? "right" : "left"}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0] + row[1]} hover>
              {row.map((cell, index) => (
                <TableCell key={cell} align={index === 3 ? "right" : "left"}>
                  {index === 4 ? <StatusChip label={cell} tone={cell === "Pending" ? "warning" : "success"} /> : cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function CrmTable() {
  return (
    <Paper variant="outlined" sx={{ overflow: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {["Ambassador", "Status", "Rank", "PV", "Last order", "Owner"].map((heading) => (
              <TableCell key={heading}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {team.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>
                <PersonCell name={row.name} meta="Sample leg" initials={row.initials} />
              </TableCell>
              <TableCell>
                <StatusChip label={row.status} tone={row.tone} />
              </TableCell>
              <TableCell>
                <RankChip label={row.rank} />
              </TableCell>
              <TableCell>{row.pv}</TableCell>
              <TableCell>Sep 2</TableCell>
              <TableCell>You</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function ScenarioTable() {
  const rows = [
    ["Base", "18,420", "−3,580", "Short"],
    ["Stretch", "21,000", "−1,000", "Close"],
    ["Slip", "16,100", "−5,900", "Short"],
  ];
  return (
    <Paper variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            {["Scenario", "Team PV", "Gap", "Result"].map((heading) => (
              <TableCell key={heading}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]} hover>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>
                <StatusChip label={row[3]} tone={row[0] === "Stretch" ? "warning" : "error"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function ChartFrame({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const ready = useMounted();
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Box sx={{ ml: "auto" }}>{action}</Box>
      </Box>
      <Box sx={{ height: 220 }}>{ready ? children : null}</Box>
    </Paper>
  );
}

function useMounted() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

export function PeriodChart() {
  const theme = useTheme();
  return (
    <ChartFrame title="Period comparison" action={<Chip size="small" variant="outlined" color="secondary" label="Last 6 months" />}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={months}>
          <CartesianGrid stroke={theme.palette.divider} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip />
          <Line type="monotone" dataKey="current" name="This period" stroke={theme.palette.primary.main} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="prior" name="Prior" stroke={theme.palette.text.disabled} strokeWidth={2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function ForecastChart() {
  const theme = useTheme();
  return (
    <ChartFrame title="Volume forecast">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={forecast}>
          <CartesianGrid stroke={theme.palette.divider} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip />
          <ReferenceLine y={20000} stroke={theme.palette.warning.main} strokeDasharray="4 4" label={{ value: "Threshold", fill: theme.palette.text.secondary, fontSize: 11 }} />
          <Line type="monotone" dataKey="pv" name="Team PV" stroke={theme.palette.primary.main} strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function DonutChart() {
  const theme = useTheme();
  const ready = useMounted();
  const colors = [theme.palette.primary.main, theme.palette.primary.light, theme.palette.secondary.light];
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1">Distribution</Typography>
      <Box sx={{ height: 220 }}>
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mix} dataKey="value" nameKey="name" innerRadius={58} outerRadius={80} paddingAngle={2} stroke="none">
                {mix.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : null}
      </Box>
    </Paper>
  );
}

export function RegionBars() {
  const max = regions[0].value;
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
        New enrollments by region
      </Typography>
      <Stack spacing={1.25}>
        {regions.map((region) => (
          <Box key={region.name}>
            <Box sx={{ display: "flex", mb: 0.5 }}>
              <Typography variant="body2">{region.name}</Typography>
              <Typography variant="body2" sx={{ ml: "auto" }}>
                {region.value}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={(region.value / max) * 100} sx={{ height: 8, borderRadius: 99 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export function TreeNode() {
  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 1.5, maxWidth: 280, mb: 1.5 }}>
        <PersonCell name="Sample Ambassador" meta="Diamond · you" initials="SA" />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          36 in the leg
        </Typography>
      </Paper>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {team.slice(0, 3).map((person) => (
          <Paper key={person.name} variant="outlined" sx={{ p: 1.5, flex: "1 1 160px" }}>
            <PersonCell name={person.name} meta={`${person.rank} · PV ${person.pv}`} initials={person.initials} />
            <Box sx={{ mt: 1 }}>
              <RankChip label={person.rank} />
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export function FeedItem() {
  return (
    <Stack spacing={1}>
      {team.slice(0, 3).map((person) => (
        <Paper key={person.name} variant="outlined" sx={{ p: 1.5, display: "flex", gap: 1.5, alignItems: "center" }}>
          <PersonCell name={person.name} meta={`Reached ${person.rank} pace · 2h`} initials={person.initials} />
          <Box sx={{ ml: "auto" }}>
            <RankChip label={person.rank} />
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export function ActionList() {
  return (
    <Stack spacing={1}>
      {[
        ["Call Riley Chen", "No second order", "Today", "At risk"],
        ["Note for Jordan Hale", "Watch the Emerald leg", "Thu", "Watch"],
        ["Welcome Morgan Ellis", "Three new enrollments", "This week", "New"],
      ].map(([title, why, when, status]) => (
        <Paper key={title} variant="outlined" sx={{ p: 1.5, display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {why}
            </Typography>
          </Box>
          <Chip size="small" variant="outlined" color="secondary" label={when} />
          <StatusChip label={status} tone={status === "At risk" ? "error" : status === "Watch" ? "warning" : "primary"} />
          <Button size="small" variant="outlined">
            Done
          </Button>
        </Paper>
      ))}
    </Stack>
  );
}

export function MessageList() {
  const items = [
    ["Avery Lane", "Can you look at last week’s enrollments?", "9:14", true],
    ["Jordan Hale", "Rank question before Thursday", "Yesterday", false],
    ["New chat", "Start a conversation", " ", false],
  ] as const;
  return (
    <Paper variant="outlined" sx={{ width: 300, overflow: "hidden" }}>
      {items.map(([name, preview, time, unread], index) => (
        <Box key={name} sx={{ px: 1.5, py: 1.25, display: "flex", gap: 1.25, bgcolor: index === 0 ? "action.selected" : "transparent", borderBottom: 1, borderColor: "divider" }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: "primary.main" }}>{name.slice(0, 1)}</Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" sx={{ fontWeight: unread ? 600 : 400 }}>
                {name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
                {time}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
              {preview}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

export function Thread() {
  return (
    <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 1.25 }}>
      <Typography variant="subtitle2">Avery Lane</Typography>
      <Box sx={{ alignSelf: "flex-start", maxWidth: "80%", px: 1.5, py: 1, borderRadius: 1.5, bgcolor: "action.hover" }}>
        <Typography variant="body2">Can you look at the two enrollments from last week?</Typography>
      </Box>
      <Box sx={{ alignSelf: "flex-end", maxWidth: "80%", px: 1.5, py: 1, borderRadius: 1.5, bgcolor: "primary.main", color: "primary.contrastText" }}>
        <Typography variant="body2">I’ll review them before the team call.</Typography>
      </Box>
      <TextField size="small" placeholder="Reply" sx={{ mt: "auto" }} />
    </Paper>
  );
}

export function SavedViews() {
  const [tab, setTab] = useState(0);
  return (
    <Tabs value={tab} onChange={(_, next) => setTab(next)} sx={{ minHeight: 40 }}>
      <Tab label="All people · 36" />
      <Tab label="Needs note · 8" />
      <Tab label="New this month · 4" />
    </Tabs>
  );
}

export function FilterBar() {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ alignItems: "center" }}>
      <TextField size="small" placeholder="Search" sx={{ minWidth: 180 }} />
      <Select size="small" defaultValue="all" sx={{ minWidth: 120 }}>
        <MenuItem value="all">All ranks</MenuItem>
        <MenuItem value="diamond">Diamond</MenuItem>
      </Select>
      <Select size="small" defaultValue="active" sx={{ minWidth: 120 }}>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="risk">At risk</MenuItem>
      </Select>
      <Button size="small" variant="outlined" sx={{ ml: "auto" }}>
        Export
      </Button>
    </Stack>
  );
}

export function SegmentControl() {
  const [value, setValue] = useState("overview");
  return (
    <ToggleButtonGroup size="small" exclusive value={value} onChange={(_, next) => next && setValue(next)}>
      <ToggleButton value="overview">Overview</ToggleButton>
      <ToggleButton value="scenarios">Scenarios</ToggleButton>
      <ToggleButton value="actions">Actions</ToggleButton>
    </ToggleButtonGroup>
  );
}

export function ProfileForm() {
  return (
    <Stack spacing={1.5} sx={{ maxWidth: 440 }}>
      <TextField size="small" label="Display name" defaultValue="Sample Ambassador" fullWidth />
      <TextField size="small" label="Email" defaultValue="ambassador@example.com" fullWidth />
      <TextField size="small" label="Rank" defaultValue="Diamond" fullWidth disabled />
      <Button size="small" variant="contained" sx={{ alignSelf: "flex-start" }}>
        Save
      </Button>
    </Stack>
  );
}

export function SubscriptionRow() {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2">Monthly special</Typography>
        <Typography variant="caption" color="text.secondary">
          Billed monthly · $49
        </Typography>
      </Box>
      <Chip size="small" variant="outlined" color="secondary" label="Available" />
      <Button size="small" variant="outlined">
        Add
      </Button>
    </Paper>
  );
}

export function ShareCard() {
  return (
    <Paper variant="outlined" sx={{ p: 2, maxWidth: 480 }}>
      <Typography variant="subtitle1">Monthly special</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Copy the link or open the QR. This specimen does not call the product.
      </Typography>
      <TextField size="small" fullWidth defaultValue="https://example.com/share/sample" sx={{ mb: 1.5 }} />
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined">
          Copy link
        </Button>
        <Button size="small" variant="contained">
          Show QR code
        </Button>
      </Stack>
    </Paper>
  );
}

export function JourneyStage() {
  const stages = [
    ["Launch", "Done", 100],
    ["Consistency", "In progress", 46],
    ["Leadership", "Next", 0],
  ] as const;
  return (
    <Stack spacing={1}>
      {stages.map(([name, state, value], index) => (
        <Paper key={name} variant="outlined" sx={{ p: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="caption" color="primary.main" sx={{ width: 24 }}>
              {index + 1}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {name}
            </Typography>
            <Chip size="small" color={state === "In progress" ? "primary" : "secondary"} variant={state === "Done" ? "filled" : "outlined"} label={state} />
          </Box>
          <LinearProgress variant="determinate" value={value} sx={{ height: 6, borderRadius: 99 }} />
        </Paper>
      ))}
    </Stack>
  );
}

export function CourseCard() {
  return (
    <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: "1fr 1fr" }}>
      {[
        ["Welcome sequence", "4 lessons", 80],
        ["Rank path", "6 lessons", 35],
      ].map(([title, meta, value]) => (
        <Card key={String(title)} elevation={0} variant="outlined">
          <CardContent>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {meta}
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <ProgressMeter label="Complete" value={Number(value)} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export function HubRow() {
  const rows = [
    ["HUB-001", "Label update", "Pinned"],
    ["HUB-002", "Launch notes", "New"],
    ["HUB-011", "Field script", "Updated"],
  ];
  return (
    <Stack spacing={1}>
      {rows.map(([id, title, state]) => (
        <Paper key={id} variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ width: 72 }}>
            {id}
          </Typography>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {title}
          </Typography>
          <RankChip label={state} />
        </Paper>
      ))}
    </Stack>
  );
}

export function LiveSession() {
  return (
    <Paper variant="outlined" sx={{ p: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
      <StatusChip label="Live" tone="error" />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">Monday field call</Typography>
        <Typography variant="body2" color="text.secondary">
          Starts 7:00 PM · Sample room
        </Typography>
      </Box>
      <Button size="small" variant="contained">
        Join
      </Button>
    </Paper>
  );
}

export function KickoffAgenda() {
  const steps = [
    ["6:00", "Open the room", "Host"],
    ["6:10", "Rank story", "Recognition"],
    ["6:25", "Contest rules", "You"],
    ["6:40", "Close with asks", "Host"],
  ];
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        October kickoff
      </Typography>
      {steps.map(([time, item, owner]) => (
        <Box key={item} sx={{ display: "flex", gap: 1.5, py: 1, borderBottom: 1, borderColor: "divider", alignItems: "center" }}>
          <Typography variant="caption" color="text.secondary" sx={{ width: 40 }}>
            {time}
          </Typography>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {item}
          </Typography>
          <Chip size="small" variant="outlined" color="secondary" label={owner} />
        </Box>
      ))}
    </Box>
  );
}

export function NoticeBanner() {
  return (
    <Paper sx={{ p: 1.5, display: "flex", gap: 1.5, alignItems: "flex-start", bgcolor: "primary.main", color: "primary.contrastText" }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2">Label update is pinned</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          HUB-001 changed the product names used in share links. Review before the next team call.
        </Typography>
      </Box>
      <IconButton size="small" aria-label="Dismiss" sx={{ color: "inherit" }}>
        <IconClose size={16} />
      </IconButton>
    </Paper>
  );
}

export function DashboardHome() {
  return (
    <Stack spacing={1.5}>
      <PageHeader title="Good morning" subtitle="Four ambassadors need a touch today. Contest pace is ahead of last month." />
      <DailyBriefing />
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" } }}>
        <ContestSummary />
        <PulseWidget />
      </Box>
      <TeamGrowth />
      <PlexiBar />
    </Stack>
  );
}

export function MyBusinessBoard() {
  return (
    <Stack spacing={1.5}>
      <PageHeader
        title="My business"
        subtitle="Last 6 months against the prior period."
        actions={
          <Button size="small" variant="outlined">
            Ask Plexi
          </Button>
        }
      />
      <KpiStrip />
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", lg: "1.4fr 0.8fr" } }}>
        <PeriodChart />
        <DonutChart />
      </Box>
      <Typography variant="subtitle1">Recent orders</Typography>
      <OrdersTable />
    </Stack>
  );
}

export function PulseBoard() {
  return (
    <Stack spacing={1.5}>
      <PageHeader title="Pulse Check" subtitle="September 2026 · threshold 20,000 team PV" actions={<SegmentControl />} />
      <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
        <KpiStat label="Base" value="18,420" delta="Current pace" tone="text.secondary" />
        <KpiStat label="Stretch" value="21,000" delta="If 4 more orders land" />
        <KpiStat label="Slip" value="16,100" delta="If at-risk stalls" tone="error" />
        <KpiStat label="Gap" value="1,580" delta="To threshold on base" tone="text.secondary" />
      </Box>
      <ForecastChart />
      <ScenarioTable />
    </Stack>
  );
}

export function ContestBoard() {
  return (
    <Stack spacing={1.5}>
      <PageHeader
        title="Fall sprint"
        subtitle="Sep 1 – Sep 30 · 86 ambassadors"
        actions={
          <Button size="small" variant="contained">
            New contest
          </Button>
        }
      />
      <FilterBar />
      <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
        <KpiStat label="Qualified" value="28" delta="of 86" tone="text.secondary" />
        <KpiStat label="Team PV" value="18,420" delta="+6.2%" />
        <KpiStat label="Personal PV" value="4,280" delta="Goal met" />
        <KpiStat label="New" value="6" delta="Goal 8" tone="text.secondary" />
      </Box>
      <ProgressMeter label="Your qualification" value={72} hint="18,420 / 22,000 team PV" />
      <Leaderboard />
    </Stack>
  );
}

export const componentPreviews: Record<string, () => React.ReactNode> = {
  "side-nav": () => <SideNav />,
  "top-bar": () => <TopBar />,
  "page-header": () => <PageHeader title="My business" subtitle="Volume, customers, and orders for the selected period." actions={<Button size="small" variant="outlined">Ask Plexi</Button>} />,
  "plexi-bar": () => <PlexiBar />,
  "daily-briefing": () => <DailyBriefing />,
  "coach-action": () => <CoachAction />,
  "contest-summary": () => <ContestSummary />,
  "pulse-widget": () => <PulseWidget />,
  "team-growth": () => <TeamGrowth />,
  "kpi-stat": () => <KpiStat label="Team PV" value="18,420" delta="+6.2% vs last period" />,
  "kpi-strip": () => <KpiStrip />,
  "progress-meter": () => <ProgressMeter label="PV toward next tier" value={68} hint="4,280 / 6,300" />,
  "segmented-meter": () => <SegmentedMeter />,
  "rank-chip": () => (
    <Stack direction="row" spacing={1}>
      <RankChip label="Diamond" />
      <RankChip label="Emerald" />
      <RankChip label="Gold" />
      <RankChip label="Silver" />
    </Stack>
  ),
  "status-chip": () => (
    <Stack direction="row" spacing={1}>
      <StatusChip label="On track" tone="success" />
      <StatusChip label="Watch" tone="warning" />
      <StatusChip label="At risk" tone="error" />
      <StatusChip label="New" tone="primary" />
    </Stack>
  ),
  "period-chart": () => <PeriodChart />,
  "forecast-chart": () => <ForecastChart />,
  "donut-chart": () => <DonutChart />,
  "region-bars": () => <RegionBars />,
  "person-cell": () => <PersonCell name="Avery Lane" meta="Diamond · PV 4,280 · enrolled 2022" initials="AL" />,
  "tree-node": () => <TreeNode />,
  "feed-item": () => <FeedItem />,
  "growth-table": () => <GrowthTable />,
  "leaderboard": () => <Leaderboard />,
  "orders-table": () => <OrdersTable />,
  "crm-table": () => <CrmTable />,
  "scenario-table": () => <ScenarioTable />,
  "action-list": () => <ActionList />,
  "message-list": () => <MessageList />,
  "thread": () => <Thread />,
  "saved-views": () => <SavedViews />,
  "filter-bar": () => <FilterBar />,
  "segment-control": () => <SegmentControl />,
  "profile-form": () => <ProfileForm />,
  "subscription-row": () => <SubscriptionRow />,
  "share-card": () => <ShareCard />,
  "journey-stage": () => <JourneyStage />,
  "course-card": () => <CourseCard />,
  "hub-row": () => <HubRow />,
  "live-session": () => <LiveSession />,
  "kickoff-agenda": () => <KickoffAgenda />,
  "notice-banner": () => <NoticeBanner />,
};
