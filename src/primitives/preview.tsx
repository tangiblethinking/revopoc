import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Popover from "@mui/material/Popover";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { ButtonProps, ChipProps } from "@mui/material";
import { IconBell } from "@/icons/icons";
import type primitives from "@/catalog/primitives.json";

type Primitive = (typeof primitives)[number];
type Variant = Primitive["variants"][number];

function pick(variants: Variant[]) {
  const colors = ["success", "warning", "error", "primary", "secondary", "info", "inherit", "default"];
  const picked: Variant[] = [];
  for (const color of colors) {
    const hit = variants.find((variant) => prop(variant, "color") === color || variant.id.includes(color));
    if (hit && !picked.some((item) => item.id === hit.id)) picked.push(hit);
  }
  for (const variant of variants) {
    if (picked.length >= 8) break;
    if (!picked.some((item) => item.id === variant.id)) picked.push(variant);
  }
  return picked.slice(0, 8);
}

function prop(variant: Variant, key: string) {
  return (variant.props as Record<string, string>)[key] ?? "";
}

function caption(variant: Variant) {
  return (
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
      {variant.label} · {variant.count}
    </Typography>
  );
}

export function primitiveSnippet(name: string, variant: Variant, folder: string) {
  const entries = Object.entries(variant.props as Record<string, string>)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  return `// Reconstructed from capture ${folder}. Not original source.\n<${name} ${entries}>\n  Action\n</${name}>`;
}

export function PrimitivePreview({ item }: { item: Primitive }) {
  const variants = pick(item.variants);
  if (item.id === "button") {
    return (
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" alignItems="flex-end">
        {variants.map((variant) => (
          <Box key={variant.id}>
            <Button variant={prop(variant, "variant") as ButtonProps["variant"]} size={prop(variant, "size") as ButtonProps["size"]} color={prop(variant, "color") as ButtonProps["color"]}>
              Action
            </Button>
            {caption(variant)}
          </Box>
        ))}
      </Stack>
    );
  }
  if (item.id === "iconButton") {
    return (
      <Stack direction="row" spacing={2}>
        {variants.map((variant) => (
          <Box key={variant.id}>
            <IconButton size={prop(variant, "size") as "small" | "medium"} color={(prop(variant, "color") === "default" ? "default" : prop(variant, "color")) as "secondary"} aria-label="Notifications">
              <IconBell />
            </IconButton>
            {caption(variant)}
          </Box>
        ))}
      </Stack>
    );
  }
  if (item.id === "chip") {
    return (
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {variants.map((variant) => (
          <Box key={variant.id}>
            <Chip
              size="small"
              variant={prop(variant, "variant") as ChipProps["variant"]}
              color={(prop(variant, "color") === "default" ? "default" : prop(variant, "color")) as ChipProps["color"]}
              label="Diamond"
            />
            {caption(variant)}
          </Box>
        ))}
      </Stack>
    );
  }
  if (item.id === "typography") {
    return (
      <Stack spacing={1}>
        {variants.map((variant) => (
          <Typography key={variant.id} variant={prop(variant, "variant") as "body1"}>
            {prop(variant, "variant")} — The quick briefing
          </Typography>
        ))}
      </Stack>
    );
  }
  if (item.id === "paper") {
    return (
      <Stack direction="row" spacing={2}>
        <Paper elevation={1} sx={{ p: 2 }}>
          Elevation 1
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}>
          Outlined
        </Paper>
      </Stack>
    );
  }
  if (item.id === "card") {
    return (
      <Card elevation={1} sx={{ maxWidth: 360 }}>
        <CardHeader title="Daily briefing" subheader="Sample workspace" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Four ambassadors need a touch today.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (item.id === "divider") return <Divider />;
  if (item.id === "table") {
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ambassador</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell align="right">PV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Avery Lane</TableCell>
            <TableCell>Diamond</TableCell>
            <TableCell align="right">4,280</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Jordan Hale</TableCell>
            <TableCell>Emerald</TableCell>
            <TableCell align="right">3,140</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  if (item.id === "select") return <SelectStory />;
  if (item.id === "linearProgress") return <LinearProgress variant="determinate" value={68} />;
  if (item.id === "toggleButton") return <ToggleStory />;
  if (item.id === "avatar") {
    return (
      <Avatar sx={{ bgcolor: "primary.main" }} variant="circular">
        AL
      </Avatar>
    );
  }
  if (item.id === "drawer") return <DrawerStory />;
  if (item.id === "dialog") return <DialogStory />;
  if (item.id === "link") {
    return (
      <Link href="#rank" color="primary" underline="hover" onClick={(event) => event.preventDefault()}>
        Open rank detail
      </Link>
    );
  }
  if (item.id === "textField") return <TextField size="small" label="Search people" defaultValue="" placeholder="Name or ID" />;
  if (item.id === "menu") return <MenuStory />;
  if (item.id === "popover") return <PopoverStory />;
  if (item.id === "tabs") return <TabsStory />;
  if (item.id === "breadcrumbs") {
    return (
      <Breadcrumbs>
        <Link href="#hub" underline="hover" onClick={(event) => event.preventDefault()}>
          Hub
        </Link>
        <Typography color="text.primary">HUB-001</Typography>
      </Breadcrumbs>
    );
  }
  if (item.id === "circularProgress") return <CircularProgress size={28} />;
  if (item.id === "list") {
    return (
      <List dense sx={{ width: 280, bgcolor: "background.paper" }}>
        <ListItemButton selected>
          <ListItemText primary="Avery Lane" secondary="Can you look at last week?" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Jordan Hale" secondary="Rank question" />
        </ListItemButton>
      </List>
    );
  }
  return null;
}

function SelectStory() {
  const [value, setValue] = useState("september");
  return (
    <Select size="small" value={value} onChange={(event) => setValue(event.target.value)}>
      <MenuItem value="september">September 2026</MenuItem>
      <MenuItem value="august">August 2026</MenuItem>
    </Select>
  );
}

function ToggleStory() {
  const [value, setValue] = useState("all");
  return (
    <ToggleButtonGroup size="small" exclusive value={value} onChange={(_, next) => next && setValue(next)}>
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="risk">At risk</ToggleButton>
    </ToggleButtonGroup>
  );
}

function DialogStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>pleX-Ray Quick View</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Sample Ambassador · Diamond · PV 4,280</Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function DrawerStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6">Ask Plexi</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Settings and coaching drawers use this anchor.
          </Typography>
          <Button size="small" sx={{ mt: 2 }} onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

function MenuStory() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button size="small" variant="outlined" onClick={(event) => setAnchor(event.currentTarget)}>
        Language
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem selected onClick={() => setAnchor(null)}>
          English
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>Español</MenuItem>
      </Menu>
    </>
  );
}

function PopoverStory() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button size="small" variant="outlined" onClick={(event) => setAnchor(event.currentTarget)}>
        Notifications
      </Button>
      <Popover open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Box sx={{ p: 2, width: 260 }}>
          <Typography variant="subtitle2">Rank pace</Typography>
          <Typography variant="body2" color="text.secondary">
            Two ambassadors slipped under the line.
          </Typography>
        </Box>
      </Popover>
    </>
  );
}

function TabsStory() {
  const [tab, setTab] = useState(0);
  return (
    <Tabs value={tab} onChange={(_, next) => setTab(next)}>
      <Tab label="All people" />
      <Tab label="Needs note" />
      <Tab label="New" />
    </Tabs>
  );
}
