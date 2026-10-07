export type NavChild = { href: string; label: string; id: string };
export type NavItem = { href: string; label: string; children: NavChild[] };

export const kitNav: NavItem[] = [
  {
    href: "/tokens",
    label: "Tokens",
    children: [
      { id: "colors", href: "/tokens/colors", label: "Color" },
      { id: "layout", href: "/tokens/layout", label: "Layout" },
      { id: "type", href: "/tokens/type", label: "Type" },
      { id: "states", href: "/tokens/states", label: "States" },
    ],
  },
  {
    href: "/primitives",
    label: "Primitives",
    children: [
      { id: "actions", href: "/primitives/actions", label: "Actions" },
      { id: "inputs", href: "/primitives/inputs", label: "Inputs" },
      { id: "navigation", href: "/primitives/navigation", label: "Navigation" },
      { id: "surfaces", href: "/primitives/surfaces", label: "Surfaces" },
      { id: "data", href: "/primitives/data", label: "Data" },
      { id: "feedback", href: "/primitives/feedback", label: "Feedback" },
      { id: "type", href: "/primitives/type", label: "Type" },
    ],
  },
  {
    href: "/components",
    label: "Components",
    children: [
      { id: "chrome", href: "/components/chrome", label: "Chrome" },
      { id: "dashboard", href: "/components/dashboard", label: "Dashboard" },
      { id: "metrics", href: "/components/metrics", label: "Metrics" },
      { id: "charts", href: "/components/charts", label: "Charts" },
      { id: "people", href: "/components/people", label: "People" },
      { id: "tables", href: "/components/tables", label: "Tables" },
      { id: "work", href: "/components/work", label: "Work" },
      { id: "field", href: "/components/field", label: "Field" },
    ],
  },
  {
    href: "/features",
    label: "Features",
    children: [
      { id: "inspect", href: "/features/inspect", label: "Inspect" },
      { id: "find", href: "/features/find", label: "Find" },
      { id: "work-a-list", href: "/features/work-a-list", label: "Work a list" },
      { id: "run-the-period", href: "/features/run-the-period", label: "Run the period" },
      { id: "share", href: "/features/share", label: "Share" },
    ],
  },
  {
    href: "/patterns",
    label: "Patterns",
    children: [
      { id: "shell", href: "/patterns/shell", label: "Shell" },
      { id: "assist", href: "/patterns/assist", label: "Assist" },
      { id: "work", href: "/patterns/work", label: "Work" },
      { id: "rank", href: "/patterns/rank", label: "Rank & field" },
      { id: "account", href: "/patterns/account", label: "Account" },
    ],
  },
  {
    href: "/pages",
    label: "Pages",
    children: [
      { id: "home", href: "/pages/home", label: "Home" },
      { id: "contest", href: "/pages/contest", label: "Contest" },
      { id: "crm", href: "/pages/crm", label: "CRM" },
      { id: "inbox", href: "/pages/inbox", label: "Inbox" },
      { id: "playbook", href: "/pages/playbook", label: "Playbook" },
      { id: "pulse-check", href: "/pages/pulse-check", label: "Pulse Check" },
      { id: "points-rank", href: "/pages/points-rank", label: "Points & rank" },
      { id: "genealogy", href: "/pages/genealogy", label: "Genealogy" },
      { id: "geography", href: "/pages/geography", label: "Geography" },
      { id: "business", href: "/pages/business", label: "My business" },
      { id: "account", href: "/pages/account", label: "Account" },
      { id: "sharing", href: "/pages/sharing", label: "Sharing" },
      { id: "hub", href: "/pages/hub", label: "Hub" },
      { id: "plexus-u", href: "/pages/plexus-u", label: "Plexus U" },
      { id: "live", href: "/pages/live", label: "Live" },
      { id: "recognition", href: "/pages/recognition", label: "Recognition" },
      { id: "kickoff", href: "/pages/kickoff", label: "Kickoff" },
      { id: "journey", href: "/pages/journey", label: "Journey" },
    ],
  },
];

export const primitiveGroups: Record<string, string[]> = {
  actions: ["button", "iconButton", "toggleButton", "link"],
  inputs: ["textField", "select"],
  navigation: ["tabs", "breadcrumbs", "drawer", "menu"],
  surfaces: ["paper", "card", "dialog", "popover"],
  data: ["table", "list", "chip", "avatar"],
  feedback: ["linearProgress", "circularProgress", "divider"],
  type: ["typography"],
};

export const patternGroups: Record<string, string[]> = {
  shell: ["app-shell", "dashboard-home"],
  assist: ["plex-ray", "plexi-glass", "ask-plexi", "command-palette", "settings-drawer", "notifications", "page-guide"],
  work: ["contest", "new-contest", "crm", "crm-person", "inbox", "playbook", "pulse-check"],
  rank: ["points-rank", "genealogy", "geography", "recognition", "kickoff", "journey"],
  account: ["sharing", "my-account", "my-business", "hub", "plexus-u", "live"],
};

export const featureGroupLabel: Record<string, string> = {
  inspect: "Inspect",
  find: "Find",
  "work-a-list": "Work a list",
  "run-the-period": "Run the period",
  share: "Share",
};

export function pageGroupId(folder: string) {
  if (folder.startsWith("dashboard-admin-contest") || folder.startsWith("dashboard-contest")) return "contest";
  if (folder.startsWith("dashboard-crm")) return "crm";
  if (folder.startsWith("dashboard-my-inbox")) return "inbox";
  if (folder.startsWith("dashboard-playbook")) return "playbook";
  if (folder.startsWith("dashboard-pulse-check")) return "pulse-check";
  if (folder.startsWith("dashboard-points-rank")) return "points-rank";
  if (folder.startsWith("dashboard-genealogy")) return "genealogy";
  if (folder.startsWith("dashboard-geography")) return "geography";
  if (folder.startsWith("dashboard-my-business")) return "business";
  if (folder.startsWith("dashboard-my-account")) return "account";
  if (folder.startsWith("dashboard-sharing")) return "sharing";
  if (folder.startsWith("dashboard-plexus-hub")) return "hub";
  if (folder.startsWith("dashboard-plexus-u")) return "plexus-u";
  if (folder.startsWith("dashboard-plexus-live")) return "live";
  if (folder.startsWith("dashboard-recognition")) return "recognition";
  if (folder.startsWith("dashboard-monthly-kickoff")) return "kickoff";
  if (folder.startsWith("dashboard-360-journey")) return "journey";
  return "home";
}
