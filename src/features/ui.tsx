import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Overlay, ProductShell } from "@/patterns/frame";
import {
  ActionList,
  ContestSummary,
  CrmTable,
  DailyBriefing,
  FilterBar,
  HubRow,
  KpiStat,
  KpiStrip,
  MessageList,
  NoticeBanner,
  PageHeader,
  PersonCell,
  PlexiBar,
  ProgressMeter,
  PulseWidget,
  RankChip,
  RegionBars,
  SavedViews,
  ScenarioTable,
  SegmentControl,
  SegmentedMeter,
  ShareCard,
  StatusChip,
  SubscriptionRow,
  Thread,
  TopBar,
} from "@/product/ui";

const people = [
  { name: "Jordan Hale", initials: "JH", rank: "Gold", meta: "jordan.hale@example.com · Phoenix, AZ" },
  { name: "Riley Chen", initials: "RC", rank: "Silver", meta: "riley.chen@example.com · Tempe, AZ" },
  { name: "Avery Lane", initials: "AL", rank: "Diamond", meta: "avery.lane@example.com · Scottsdale, AZ" },
];

function Stage({ active, title, children, overlay }: { active: string; title: string; children: React.ReactNode; overlay?: React.ReactNode }) {
  return (
    <Box sx={{ position: "relative" }}>
      <ProductShell active={active} title={title}>
        {children}
      </ProductShell>
      {overlay}
    </Box>
  );
}

export function PlexRayFeature() {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const person = people[index];
  return (
    <Stage
      active="Recognition"
      title="Recognition"
      overlay={
        open ? (
          <Overlay>
            <Paper elevation={8} sx={{ width: "min(680px, 100%)", p: 2, borderRadius: 2 }}>
              <Stack direction="row" sx={{ alignItems: "center", mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  pleX-Ray
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, letterSpacing: "0.08em" }}>
                  QUICK VIEW
                </Typography>
                <Button size="small" sx={{ ml: "auto" }} onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", mb: 1.5 }}>
                <PersonCell name={person.name} meta={person.meta} initials={person.initials} />
                <RankChip label={person.rank} />
                <RankChip label="L2" />
                <StatusChip label="Qualified" tone="success" />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <KpiStat label="100 PV" value="165 / 100" delta="Qualified this month" />
                <KpiStat label="Subscription" value="1 active" delta="Bills Oct 14 — this period" />
                <KpiStat label="Last order" value="Oct 2, 2026" delta="4d ago · 3 in 3mo" tone="text.secondary" />
              </Stack>
              <Stack spacing={1.25} sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  GOLD → SR. GOLD
                </Typography>
                <ProgressMeter label="Sponsored 100 PV" value={100} hint="7 / 3" />
                <ProgressMeter label="Org points" value={43} hint="107 / 250" />
                <ProgressMeter label="Outside leg" value={85} hint="34 / 40" />
                <ProgressMeter label="Points momentum" value={21} hint="107 / 499 cap · −199 vs last month" />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <KpiStat label="Downline" value="131" />
                <KpiStat label="Level 1" value="30" />
                <KpiStat label="Team pts" value="107" />
                <KpiStat label="Own pts" value="107" />
              </Stack>
              <Button size="small" variant="outlined" sx={{ mt: 1.5 }} onClick={() => setOpen(false)}>
                View profile
              </Button>
            </Paper>
          </Overlay>
        ) : null
      }
    >
      <PageHeader title="Recognition" subtitle="Celebrating the team’s wins — October 2026" actions={<Button size="small" variant="outlined" onClick={() => setOpen(true)}>Open quick view</Button>} />
      <Stack spacing={1}>
        {people.map((row, rowIndex) => (
          <Paper
            key={row.name}
            variant="outlined"
            onClick={() => {
              setIndex(rowIndex);
              setOpen(true);
            }}
            sx={{ p: 1.25, display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          >
            <PersonCell name={row.name} meta={row.meta} initials={row.initials} />
            <Box sx={{ ml: "auto" }}>
              <RankChip label={row.rank} />
            </Box>
          </Paper>
        ))}
      </Stack>
    </Stage>
  );
}

export function PlexiGlassFeature() {
  const [added, setAdded] = useState(false);
  return (
    <Stage
      active="Dashboard"
      title="Dashboard"
      overlay={
        <Overlay>
          <Paper elevation={8} sx={{ width: "min(480px, 100%)", p: 2.5, borderRadius: 2 }}>
            <Typography variant="h6">PleXi-Glass</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Coaching read for Riley Chen. Placeholder copy, not a live model.
            </Typography>
            <ProgressMeter label="Rank confidence" value={72} hint="Gold, 18 PV short" />
            <Box sx={{ mt: 1.5 }}>
              <ProgressMeter label="Enrollment pace" value={54} />
            </Box>
            <Paper variant="outlined" sx={{ p: 1.5, mt: 2 }}>
              <StatusChip label="Next step" tone="primary" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Confirm the subscription bills before Thursday, then ask for one enrollment.
              </Typography>
            </Paper>
            <Button size="small" variant="contained" sx={{ mt: 2 }} onClick={() => setAdded(true)}>
              {added ? "Added to playbook" : "Add to playbook"}
            </Button>
          </Paper>
        </Overlay>
      }
    >
      <DailyBriefing />
    </Stage>
  );
}

export function AskPlexiFeature() {
  const [log, setLog] = useState<string[]>([]);
  function ask(prompt: string) {
    const reply = prompt.includes("call")
      ? "Start with Riley Chen. No second order, and the last order is 18 days ago."
      : "Jordan Hale is the closest open path on the Gold line.";
    setLog((current) => [...current, prompt, reply]);
  }
  return (
    <Stage
      active="Dashboard"
      title="Dashboard"
      overlay={
        <Overlay align="right">
          <Paper square elevation={4} sx={{ width: 360, height: "100%", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="h6">Ask Plexi</Typography>
            <PlexiBar />
            {["Who is closest to qualifying?", "Who should I call?"].map((prompt) => (
              <Button key={prompt} size="small" variant="outlined" onClick={() => ask(prompt)} sx={{ justifyContent: "flex-start" }}>
                {prompt}
              </Button>
            ))}
            {log.map((line, lineIndex) => (
              <Typography key={`${line}-${lineIndex}`} variant="body2">
                {line}
              </Typography>
            ))}
          </Paper>
        </Overlay>
      }
    >
      <DailyBriefing />
    </Stage>
  );
}

export function SearchPeopleFeature() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const matches = people.filter((person) => person.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <Stage
      active="Dashboard"
      title="Dashboard"
      overlay={
        <Overlay>
          <Paper elevation={8} sx={{ width: "min(440px, 100%)", borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ p: 2 }}>
              <TextField autoFocus size="small" fullWidth placeholder="Search people" value={query} onChange={(event) => setQuery(event.target.value)} />
            </Box>
            {matches.map((person) => (
              <Box key={person.name} sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <PersonCell name={person.name} meta={person.rank} initials={person.initials} />
                </Box>
                <RankChip label={person.rank} />
                <Button size="small" onClick={() => setPicked(person.name)}>
                  Open
                </Button>
              </Box>
            ))}
            {picked ? (
              <Typography variant="body2" sx={{ px: 2, pb: 2 }}>
                Quick view ready for {picked}.
              </Typography>
            ) : null}
          </Paper>
        </Overlay>
      }
    >
      <TopBar />
    </Stage>
  );
}

export function NotificationsFeature() {
  const [items, setItems] = useState(["Rank path updated", "Subscription bills in 4 days", "A new note was added"]);
  return (
    <Stage active="Dashboard" title="Dashboard">
      <TopBar />
      <Stack spacing={1} sx={{ mt: 2, maxWidth: 480 }}>
        {items.length === 0 ? <Typography variant="body2">You are caught up.</Typography> : null}
        {items.map((item) => (
          <Paper key={item} variant="outlined" sx={{ p: 1.25, display: "flex", alignItems: "center", gap: 1 }}>
            <StatusChip label="New" tone="primary" />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {item}
            </Typography>
            <Button size="small" onClick={() => setItems((current) => current.filter((row) => row !== item))}>
              Read
            </Button>
          </Paper>
        ))}
      </Stack>
    </Stage>
  );
}

export function SettingsFeature() {
  const [compact, setCompact] = useState(true);
  const [guide, setGuide] = useState(false);
  return (
    <Stage
      active="Dashboard"
      title="Dashboard"
      overlay={
        <Overlay align="right">
          <Paper square elevation={4} sx={{ width: 340, height: "100%", p: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Settings
            </Typography>
            <SegmentControl />
            <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                Compact tables
              </Typography>
              <Switch checked={compact} onChange={() => setCompact((value) => !value)} />
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                Show the page guide next visit
              </Typography>
              <Switch checked={guide} onChange={() => setGuide((value) => !value)} />
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
              Tables are {compact ? "compact" : "comfortable"}. Guide is {guide ? "on" : "off"}.
            </Typography>
          </Paper>
        </Overlay>
      }
    >
      <TopBar />
    </Stage>
  );
}

export function CrmWorkFeature() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  return (
    <Stage active="CRM" title="CRM">
      <PageHeader title="CRM" subtitle="Saved views, then a note on the open person." />
      <SavedViews />
      <Box sx={{ my: 1.5 }}>
        <FilterBar />
      </Box>
      <CrmTable />
      <Paper variant="outlined" sx={{ p: 1.5, mt: 1.5 }}>
        <PersonCell name="Jordan Hale" meta="Gold · sample leg" initials="JH" />
        <TextField size="small" fullWidth multiline minRows={2} placeholder="Add a note" value={note} onChange={(event) => setNote(event.target.value)} sx={{ mt: 1 }} />
        <Button
          size="small"
          variant="contained"
          sx={{ mt: 1 }}
          disabled={!note.trim()}
          onClick={() => {
            setSaved(note.trim());
            setNote("");
          }}
        >
          Save note
        </Button>
        {saved ? (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {saved}
          </Typography>
        ) : null}
      </Paper>
    </Stage>
  );
}

export function PlaybookFeature() {
  const [left, setLeft] = useState(3);
  return (
    <Stage active="Playbook" title="Playbook">
      <PageHeader
        title="Playbook"
        subtitle={`${left} follow-ups still open.`}
        actions={
          <Button size="small" variant="contained" disabled={left === 0} onClick={() => setLeft((value) => Math.max(0, value - 1))}>
            Mark done
          </Button>
        }
      />
      <ActionList />
    </Stage>
  );
}

export function PulseScenariosFeature() {
  const [scenario, setScenario] = useState("Hold");
  const copy: Record<string, string> = {
    Hold: "Count them if the subscription bills.",
    Stretch: "Count them only if you will close about 20 PV.",
    Slip: "Leave them out of the commit number.",
  };
  return (
    <Stage active="Pulse Check" title="Pulse Check">
      <PageHeader title="Pulse Check" subtitle={copy[scenario]} />
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {Object.keys(copy).map((name) => (
          <Button key={name} size="small" variant={name === scenario ? "contained" : "outlined"} onClick={() => setScenario(name)}>
            {name}
          </Button>
        ))}
      </Stack>
      <SegmentControl />
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { md: "1fr 1fr" }, mt: 2 }}>
        <PulseWidget />
        <Paper variant="outlined" sx={{ p: 2 }}>
          <KpiStat label={scenario} value={scenario === "Slip" ? "14,200" : scenario === "Stretch" ? "19,840" : "18,420"} delta="Team PV in the forecast" />
          <Box sx={{ mt: 2 }}>
            <SegmentedMeter />
          </Box>
        </Paper>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ScenarioTable />
      </Box>
    </Stage>
  );
}

export function NewContestFeature() {
  const [name, setName] = useState("October sprint");
  const [created, setCreated] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  return (
    <Stage
      active="Contest"
      title="Contest"
      overlay={
        open ? (
          <Overlay>
            <Paper elevation={8} sx={{ width: "min(420px, 100%)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h6">New contest</Typography>
              <TextField size="small" fullWidth label="Name" value={name} onChange={(event) => setName(event.target.value)} sx={{ mt: 2 }} />
              <TextField size="small" fullWidth label="Metric" defaultValue="Personal PV" sx={{ mt: 1.5 }} />
              <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: "flex-end" }}>
                <Button size="small" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  disabled={!name.trim()}
                  onClick={() => {
                    setCreated(name.trim());
                    setOpen(false);
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Paper>
          </Overlay>
        ) : null
      }
    >
      <PageHeader title="Contests" subtitle={created ? `${created} is on the list.` : "No new contest yet."} actions={<Button size="small" onClick={() => setOpen(true)}>New contest</Button>} />
      <ContestSummary />
    </Stage>
  );
}

export function PeriodFeature() {
  const [period, setPeriod] = useState("October 2026");
  const value = period === "October 2026" ? 68 : period === "September 2026" ? 91 : 54;
  return (
    <Stage active="Points & rank" title="Points & rank">
      <PageHeader
        title="Points and rank"
        subtitle={period}
        actions={
          <Stack direction="row" spacing={1}>
            {["October 2026", "September 2026", "Last 6 months"].map((item) => (
              <Button key={item} size="small" variant={item === period ? "contained" : "outlined"} onClick={() => setPeriod(item)}>
                {item}
              </Button>
            ))}
          </Stack>
        }
      />
      <KpiStrip />
      <Box sx={{ mt: 2, maxWidth: 480 }}>
        <ProgressMeter label="PV toward next tier" value={value} hint={`${value}% of the line`} />
      </Box>
    </Stage>
  );
}

export function GeoMeasureFeature() {
  const [measure, setMeasure] = useState("New enrollments");
  return (
    <Stage active="Geography" title="GeoPulse">
      <PageHeader
        title="GeoPulse"
        subtitle={`Counting ${measure.toLowerCase()}.`}
        actions={
          <Stack direction="row" spacing={1}>
            {["New enrollments", "Personal PV", "Orders"].map((item) => (
              <Button key={item} size="small" variant={item === measure ? "contained" : "outlined"} onClick={() => setMeasure(item)}>
                {item}
              </Button>
            ))}
          </Stack>
        }
      />
      <FilterBar />
      <Box sx={{ mt: 2 }}>
        <RegionBars />
      </Box>
    </Stage>
  );
}

export function PageGuideFeature() {
  const steps = [
    ["Daily briefing", "Start here. It is the one list that matters today."],
    ["Recognition", "Open a name when you need the period, not the whole profile."],
    ["Playbook", "Turn the coaching note into a follow-up."],
  ];
  const [step, setStep] = useState(0);
  const [title, body] = steps[step];
  return (
    <Stage active="Dashboard" title="Dashboard">
      <PageHeader title="Dashboard" subtitle={`Guide · step ${step + 1} of ${steps.length}`} />
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 520, outline: "2px solid", outlineColor: "primary.main" }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          <Button size="small" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
            Back
          </Button>
          <Button size="small" variant="contained" disabled={step === steps.length - 1} onClick={() => setStep((value) => value + 1)}>
            Next
          </Button>
        </Stack>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <DailyBriefing />
      </Box>
    </Stage>
  );
}

export function NewChatFeature() {
  const [withWhom, setWithWhom] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  return (
    <Stage
      active="Inbox"
      title="Inbox"
      overlay={
        open ? (
          <Overlay>
            <Paper elevation={8} sx={{ width: "min(400px, 100%)", p: 2, borderRadius: 2 }}>
              <Typography variant="h6">New chat</Typography>
              <Stack spacing={1} sx={{ mt: 1.5 }}>
                {people.map((person) => (
                  <Button key={person.name} size="small" variant={withWhom === person.name ? "contained" : "text"} onClick={() => setWithWhom(person.name)} sx={{ justifyContent: "flex-start" }}>
                    {person.name}
                  </Button>
                ))}
              </Stack>
              <Button size="small" variant="contained" sx={{ mt: 1 }} disabled={!withWhom} onClick={() => setOpen(false)}>
                Start chat
              </Button>
            </Paper>
          </Overlay>
        ) : null
      }
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        <MessageList />
        {withWhom ? <Thread /> : <Typography variant="body2" color="text.secondary">Pick someone to start a thread.</Typography>}
      </Stack>
    </Stage>
  );
}

export function ShareLinkFeature() {
  const [copied, setCopied] = useState(false);
  return (
    <Stage active="Recognition" title="Sharing">
      <PageHeader title="Sharing" subtitle={copied ? "Link copied." : "The monthly special is ready to share."} />
      <ShareCard />
      <Button size="small" variant="contained" sx={{ mt: 1.5 }} onClick={() => setCopied(true)}>
        {copied ? "Copied" : "Copy link"}
      </Button>
    </Stage>
  );
}

export function SubscriptionFeature() {
  const [added, setAdded] = useState(false);
  return (
    <Stage active="Dashboard" title="Account">
      <PageHeader title="Account" subtitle={added ? "Monthly special is on the October subscription." : "Nothing extra is on this month’s subscription."} />
      <SubscriptionRow />
      <Button size="small" variant="contained" sx={{ mt: 1.5 }} disabled={added} onClick={() => setAdded(true)}>
        Add this month’s special
      </Button>
    </Stage>
  );
}

export function HubAlertFeature() {
  const [acked, setAcked] = useState(false);
  return (
    <Stage
      active="Hub"
      title="Hub"
      overlay={
        acked ? null : (
          <Overlay>
            <Paper elevation={8} sx={{ width: "min(420px, 100%)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h6">Label update</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>
                A field note changed. Read it before the next share.
              </Typography>
              <Button size="small" variant="contained" onClick={() => setAcked(true)}>
                Acknowledge
              </Button>
            </Paper>
          </Overlay>
        )
      }
    >
      <HubRow />
      {acked ? (
        <Box sx={{ mt: 2 }}>
          <NoticeBanner />
        </Box>
      ) : null}
    </Stage>
  );
}

export const featurePreviews: Record<string, () => React.ReactNode> = {
  "plex-ray": () => <PlexRayFeature />,
  "plexi-glass": () => <PlexiGlassFeature />,
  "ask-plexi": () => <AskPlexiFeature />,
  "search-people": () => <SearchPeopleFeature />,
  notifications: () => <NotificationsFeature />,
  settings: () => <SettingsFeature />,
  "crm-work": () => <CrmWorkFeature />,
  playbook: () => <PlaybookFeature />,
  "pulse-scenarios": () => <PulseScenariosFeature />,
  "new-contest": () => <NewContestFeature />,
  period: () => <PeriodFeature />,
  "geo-measure": () => <GeoMeasureFeature />,
  "page-guide": () => <PageGuideFeature />,
  "new-chat": () => <NewChatFeature />,
  "share-link": () => <ShareLinkFeature />,
  subscription: () => <SubscriptionFeature />,
  "hub-alert": () => <HubAlertFeature />,
};
