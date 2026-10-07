export type Feature = {
  id: string;
  name: string;
  group: string;
  task: string;
  components: string[];
  shot: string;
};

export const featureGroups = ["Inspect", "Find", "Work a list", "Run the period", "Share"] as const;

export const features: Feature[] = [
  {
    id: "plex-ray",
    name: "pleX-Ray",
    group: "Inspect",
    task: "Open a person from the list and read this period: PV, subscription, last order, rank path, momentum, and team.",
    components: ["person-cell", "rank-chip", "status-chip", "kpi-stat", "progress-meter", "page-header"],
    shot: "/shots/dashboard-recognition__plex-ray.png",
  },
  {
    id: "plexi-glass",
    name: "PleXi-Glass",
    group: "Inspect",
    task: "Read the coaching brief and send the next step to the playbook.",
    components: ["daily-briefing", "coach-action", "progress-meter", "status-chip"],
    shot: "/shots/dashboard__open-plexi-glass.png",
  },
  {
    id: "ask-plexi",
    name: "Ask Plexi",
    group: "Find",
    task: "Ask who is closest to qualifying, or who to call, and keep the answer in the drawer.",
    components: ["plexi-bar", "daily-briefing", "person-cell"],
    shot: "/shots/dashboard__ask-plexi.png",
  },
  {
    id: "search-people",
    name: "Search people",
    group: "Find",
    task: "Find a person from the top bar and open their quick view.",
    components: ["top-bar", "person-cell", "rank-chip"],
    shot: "/shots/dashboard__search.png",
  },
  {
    id: "notifications",
    name: "Notifications",
    group: "Find",
    task: "Read each bell item until the list is clear.",
    components: ["top-bar", "status-chip"],
    shot: "/shots/dashboard__notifications.png",
  },
  {
    id: "settings",
    name: "Settings",
    group: "Find",
    task: "Change density, the page guide, and whether Plexi sits in the briefing.",
    components: ["top-bar", "segment-control"],
    shot: "/shots/dashboard__settings.png",
  },
  {
    id: "crm-work",
    name: "CRM work",
    group: "Work a list",
    task: "Switch a saved view, then save a note on the person.",
    components: ["saved-views", "filter-bar", "crm-table", "person-cell"],
    shot: "/shots/dashboard-crm__add-note.png",
  },
  {
    id: "playbook",
    name: "Playbook follow-up",
    group: "Work a list",
    task: "Mark a follow-up done. The queue drops that row.",
    components: ["action-list", "status-chip", "page-header"],
    shot: "/shots/dashboard-playbook__actions.png",
  },
  {
    id: "pulse-scenarios",
    name: "Forecast scenarios",
    group: "Work a list",
    task: "Choose Hold, Stretch, or Slip and see the forecast change.",
    components: ["pulse-widget", "segment-control", "scenario-table", "segmented-meter", "kpi-stat"],
    shot: "/shots/dashboard-pulse-check__explain-scenarios.png",
  },
  {
    id: "new-contest",
    name: "New contest",
    group: "Run the period",
    task: "Name a contest and add it beside the current summary.",
    components: ["contest-summary", "page-header", "filter-bar"],
    shot: "/shots/dashboard-admin-contest__new-contest.png",
  },
  {
    id: "period",
    name: "Period",
    group: "Run the period",
    task: "Switch the rank period. The pace meter follows.",
    components: ["page-header", "progress-meter", "kpi-strip"],
    shot: "/shots/dashboard-points-rank__september-2026.png",
  },
  {
    id: "geo-measure",
    name: "GeoPulse measure",
    group: "Run the period",
    task: "Switch what the region list is counting.",
    components: ["page-header", "region-bars", "filter-bar"],
    shot: "/shots/dashboard-geography__new-enrollments.png",
  },
  {
    id: "page-guide",
    name: "Page guide",
    group: "Run the period",
    task: "Step through the tour without leaving the briefing.",
    components: ["daily-briefing", "page-header"],
    shot: "/shots/dashboard__page-guide.png",
  },
  {
    id: "new-chat",
    name: "New chat",
    group: "Share",
    task: "Pick a person and start a thread.",
    components: ["message-list", "thread", "person-cell"],
    shot: "/shots/dashboard-my-inbox__new-chat.png",
  },
  {
    id: "share-link",
    name: "Share link",
    group: "Share",
    task: "Copy the monthly special link from the share card.",
    components: ["share-card"],
    shot: "/shots/dashboard-sharing-plexus__show-qr-code.png",
  },
  {
    id: "subscription",
    name: "Add to subscription",
    group: "Share",
    task: "Add this month’s special onto the active subscription.",
    components: ["subscription-row", "profile-form"],
    shot: "/shots/dashboard-my-account__add-to-a-subscription.png",
  },
  {
    id: "hub-alert",
    name: "Hub alert",
    group: "Share",
    task: "Acknowledge the label update so the hub row clears.",
    components: ["hub-row", "notice-banner"],
    shot: "/shots/dashboard-plexus-hub__alert.png",
  },
];

export function featureById(id: string) {
  return features.find((feature) => feature.id === id);
}

/** Features a pattern hosts. Missing ids, app shell, and journey have no chips. */
export const featuresByPattern: Record<string, string[]> = {
  "plex-ray": ["plex-ray"],
  "plexi-glass": ["plexi-glass"],
  "ask-plexi": ["ask-plexi"],
  "command-palette": ["search-people"],
  "settings-drawer": ["settings"],
  notifications: ["notifications"],
  "page-guide": ["page-guide"],
  contest: ["plex-ray"],
  "new-contest": ["new-contest"],
  crm: ["crm-work", "plex-ray"],
  "crm-person": ["plex-ray", "ask-plexi"],
  inbox: ["new-chat"],
  playbook: ["playbook", "plex-ray"],
  "pulse-check": ["pulse-scenarios"],
  "points-rank": ["period"],
  genealogy: ["plex-ray"],
  geography: ["geo-measure"],
  sharing: ["share-link"],
  "my-account": ["subscription"],
  hub: ["hub-alert"],
  recognition: ["plex-ray"],
};
