const banner = (folder: string) => `// Reconstructed from capture ${folder}. Not original source.`;

export const patternSnippets: Record<string, string> = {
  "app-shell": `${banner("dashboard")}
<Box sx={{ display: "flex", minHeight: "100vh" }}>
  <Box component="nav" sx={{ width: "var(--SideNav-width)", bgcolor: "var(--NavChrome-950)", color: "common.white" }}>
    <Typography variant="subtitle2">Plexus Pulse</Typography>
  </Box>
  <Box sx={{ flex: 1 }}>
    <Stack direction="row" sx={{ minHeight: "var(--MainNav-height)", px: 2, alignItems: "center", gap: 1 }}>
      <Typography variant="subtitle1" sx={{ mr: "auto" }}>Dashboard</Typography>
      <TextField size="small" placeholder="Search people" />
      <Chip size="small" variant="outlined" color="secondary" label="Viewing as Sample Ambassador" />
      <IconButton size="small" color="secondary" aria-label="Notifications" />
    </Stack>
  </Box>
</Box>`,
  "dashboard-home": `${banner("dashboard")}
<Stack spacing={2}>
  <Typography variant="h5">Good morning</Typography>
  <Stack direction="row" spacing={2}>
    <Paper elevation={1} sx={{ p: 2 }}><Typography variant="h6">18,420</Typography></Paper>
    <Paper elevation={1} sx={{ p: 2 }}><Typography variant="h6">28</Typography></Paper>
  </Stack>
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
        <TableCell><Chip size="small" variant="outlined" color="secondary" label="Diamond" /></TableCell>
        <TableCell align="right">4,280</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Stack>`,
  "plex-ray": `${banner("dashboard-contest__plex-ray")}
<Dialog open fullWidth maxWidth="sm">
  <DialogTitle>pleX-Ray Quick View</DialogTitle>
  <DialogContent>
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
      <Avatar>AL</Avatar>
      <Box>
        <Typography variant="subtitle1">Avery Lane</Typography>
        <Typography variant="caption" color="text.secondary">Diamond · PV 4,280</Typography>
      </Box>
      <Chip size="small" color="success" label="On track" />
    </Stack>
    <Stack direction="row" spacing={1}>
      <Paper elevation={1} sx={{ p: 1.5, flex: 1 }}><Typography variant="h6">4,280</Typography></Paper>
      <Paper elevation={1} sx={{ p: 1.5, flex: 1 }}><Typography variant="h6">36</Typography></Paper>
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button size="small">Close</Button>
    <Button size="small" variant="contained">Open profile</Button>
  </DialogActions>
</Dialog>`,
  "plexi-glass": `${banner("dashboard__open-plexi-glass")}
<Dialog open fullWidth maxWidth="sm">
  <DialogTitle>PleXi-Glass</DialogTitle>
  <DialogContent>
    <Typography variant="body2" color="text.secondary">Coaching view for Sample Ambassador</Typography>
    <LinearProgress variant="determinate" value={72} sx={{ my: 2 }} />
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      <Typography variant="subtitle2">Suggested next step</Typography>
      <Typography variant="body2" color="text.secondary">Ask about enrollments without a second order.</Typography>
    </Paper>
  </DialogContent>
  <DialogActions>
    <Button size="small" variant="contained">Ask Plexi</Button>
  </DialogActions>
</Dialog>`,
  "ask-plexi": `${banner("dashboard__ask-plexi")}
<Drawer anchor="right" open PaperProps={{ sx: { width: 360 } }}>
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Ask Plexi</Typography>
    <Typography variant="caption" color="text.secondary">Coaching drawer</Typography>
    <TextField size="small" fullWidth placeholder="Ask about this team" sx={{ mt: 2 }} />
  </Box>
</Drawer>`,
  "command-palette": `${banner("dashboard__search")}
<Dialog open fullWidth maxWidth="sm">
  <Box sx={{ p: 2 }}>
    <TextField autoFocus size="small" fullWidth placeholder="Search people" />
  </Box>
  <MenuItem>
    <ListItemText primary="Avery Lane" secondary="Diamond" />
  </MenuItem>
</Dialog>`,
  "settings-drawer": `${banner("dashboard__settings")}
<Drawer anchor="right" open PaperProps={{ sx: { width: 340 } }}>
  <Box sx={{ p: 2.5 }}>
    <Typography variant="h6">Settings</Typography>
    <Stack divider={<Divider />} sx={{ mt: 1 }}>
      <Stack direction="row" sx={{ py: 1 }}><Typography variant="body2">Appearance</Typography><Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>Light</Typography></Stack>
      <Stack direction="row" sx={{ py: 1 }}><Typography variant="body2">Language</Typography><Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>English</Typography></Stack>
    </Stack>
  </Box>
</Drawer>`,
  notifications: `${banner("dashboard__notifications")}
<Popover open anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
  <Box sx={{ width: 320, p: 1.5 }}>
    <Typography variant="subtitle2">Notifications</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>Contest pace</Typography>
    <Typography variant="caption" color="text.secondary">Team is 6% ahead of last month.</Typography>
  </Box>
</Popover>`,
  "page-guide": `${banner("dashboard__page-guide")}
<Paper elevation={6} sx={{ p: 2, maxWidth: 300 }}>
  <Typography variant="caption" color="text.secondary">1 of 10</Typography>
  <Typography variant="subtitle1">Daily briefing</Typography>
  <Typography variant="body2" color="text.secondary">Start here each morning.</Typography>
  <Button size="small" variant="contained" sx={{ mt: 1.5 }}>Next</Button>
</Paper>`,
  contest: `${banner("dashboard-contest")}
<Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
  <Chip size="small" color="primary" label="September" />
  <Chip size="small" variant="outlined" color="secondary" label="All ranks" />
  <Button size="small" variant="outlined">Export</Button>
</Stack>
<Table size="small">{/* rank, PV, status columns */}</Table>`,
  "new-contest": `${banner("dashboard-admin-contest__new-contest")}
<Dialog open fullWidth maxWidth="sm">
  <DialogTitle>New contest</DialogTitle>
  <DialogContent>
    <Stack spacing={1.5} sx={{ pt: 1 }}>
      <TextField size="small" label="Name" defaultValue="Fall sprint" fullWidth />
      <TextField size="small" label="Period" defaultValue="October 2026" fullWidth />
      <TextField size="small" label="PV target" defaultValue="2500" fullWidth />
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button size="small">Cancel</Button>
    <Button size="small" variant="contained">Create contest</Button>
  </DialogActions>
</Dialog>`,
  crm: `${banner("dashboard-crm")}
<Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
  <Chip size="small" color="primary" label="All people" />
  <Chip size="small" variant="outlined" label="Needs note" />
</Stack>
<Table size="small" />`,
  "crm-person": `${banner("dashboard-crm-5423")}
<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
  <Avatar>AL</Avatar>
  <Box>
    <Typography variant="subtitle1">Avery Lane</Typography>
    <Typography variant="caption" color="text.secondary">Diamond · PV 4,280</Typography>
  </Box>
  <Chip size="small" color="success" label="On track" />
</Stack>`,
  inbox: `${banner("dashboard-my-inbox")}
<Stack direction="row" spacing={1.5}>
  <Paper variant="outlined" sx={{ width: 240 }}>
    <Typography variant="body2" sx={{ p: 1.5 }}>Team check-in</Typography>
  </Paper>
  <Paper variant="outlined" sx={{ flex: 1, p: 2 }}>
    <Typography variant="subtitle2">Team check-in</Typography>
    <Button size="small" variant="outlined" sx={{ mt: 2 }}>New chat</Button>
  </Paper>
</Stack>`,
  playbook: `${banner("dashboard-playbook")}
<Typography variant="body2" color="text.secondary">Follow-ups due this week.</Typography>
<Table size="small" />`,
  "pulse-check": `${banner("dashboard-pulse-check")}
<Stack direction="row" spacing={1.5}>
  <Paper elevation={1} sx={{ p: 2 }}><Typography variant="caption">Base</Typography><Typography variant="h6">18,420</Typography></Paper>
  <Paper elevation={1} sx={{ p: 2 }}><Typography variant="caption">Stretch</Typography><Typography variant="h6">21,000</Typography></Paper>
  <Paper elevation={1} sx={{ p: 2 }}><Typography variant="caption">Slip</Typography><Typography variant="h6">16,100</Typography></Paper>
</Stack>`,
  "points-rank": `${banner("dashboard-points-rank")}
<Stack direction="row" spacing={1}>
  <Chip size="small" color="primary" label="September 2026" />
  <Chip size="small" variant="outlined" color="secondary" label="Diamond" />
</Stack>
<LinearProgress variant="determinate" value={68} sx={{ mt: 2 }} />`,
  genealogy: `${banner("dashboard-genealogy")}
<Stack spacing={1}>
  <Paper variant="outlined" sx={{ p: 1.5, maxWidth: 280 }}>
    <Typography variant="subtitle2">Sample Ambassador</Typography>
  </Paper>
  <Stack direction="row" spacing={1}>
    <Paper variant="outlined" sx={{ p: 1.25 }}><Typography variant="body2">Avery Lane</Typography></Paper>
  </Stack>
</Stack>`,
  geography: `${banner("dashboard-geography")}
<Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
  <Chip size="small" color="primary" label="New enrollments" />
  <Chip size="small" variant="outlined" color="secondary" label="Last 30 days" />
</Stack>
<Table size="small" />`,
  sharing: `${banner("dashboard-sharing-plexus")}
<Dialog open>
  <DialogTitle>QR code</DialogTitle>
  <DialogContent>
    <Box sx={{ width: 148, height: 148, border: 1, borderColor: "divider" }} />
  </DialogContent>
  <DialogActions><Button size="small">Close</Button></DialogActions>
</Dialog>`,
  "my-account": `${banner("dashboard-my-account")}
<Stack spacing={1.5} sx={{ maxWidth: 480 }}>
  <TextField size="small" label="Display name" defaultValue="Sample Ambassador" />
  <TextField size="small" label="Email" defaultValue="ambassador@example.com" />
  <Button size="small" variant="outlined">Add to subscription</Button>
</Stack>`,
  "my-business": `${banner("dashboard-my-business")}
<Stack direction="row" spacing={1.5}>
  <Paper elevation={1} sx={{ p: 2 }}><Typography variant="caption">Personal PV</Typography><Typography variant="h6">4,280</Typography></Paper>
  <Paper elevation={1} sx={{ p: 2 }}><Typography variant="caption">Team PV</Typography><Typography variant="h6">18,420</Typography></Paper>
</Stack>`,
  hub: `${banner("dashboard-plexus-hub")}
<Paper variant="outlined" sx={{ p: 1.5, display: "flex" }}>
  <Typography variant="caption" color="text.secondary">HUB-001</Typography>
  <Typography variant="body2" sx={{ ml: 2 }}>Label update</Typography>
  <Chip size="small" variant="outlined" color="secondary" label="Pinned" sx={{ ml: "auto" }} />
</Paper>`,
  "plexus-u": `${banner("dashboard-plexus-u")}
<Paper elevation={1} sx={{ p: 2 }}>
  <Typography variant="subtitle2">Welcome sequence</Typography>
  <LinearProgress variant="determinate" value={80} sx={{ mt: 1.5 }} />
</Paper>`,
  live: `${banner("dashboard-plexus-live")}
<Paper elevation={1} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
  <Chip size="small" color="error" label="Live" />
  <Typography variant="subtitle1">Monday field call</Typography>
  <Button size="small" variant="contained">Join</Button>
</Paper>`,
  recognition: `${banner("dashboard-recognition")}
<Paper variant="outlined" sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
  <Avatar>A</Avatar>
  <Typography variant="body2" sx={{ flex: 1 }}>Avery Lane</Typography>
  <Chip size="small" color="success" label="Diamond" />
</Paper>`,
  kickoff: `${banner("dashboard-monthly-kickoff")}
<Typography variant="h6">October kickoff</Typography>
<Stack divider={<Divider />}>
  <Typography variant="body2" sx={{ py: 1 }}>01  Open the room</Typography>
  <Typography variant="body2" sx={{ py: 1 }}>02  Rank story</Typography>
</Stack>`,
  journey: `${banner("dashboard-360-journey")}
<Paper variant="outlined" sx={{ p: 1.5, display: "flex" }}>
  <Typography variant="body2" sx={{ flex: 1 }}>Consistency</Typography>
  <Chip size="small" color="primary" label="In progress" />
</Paper>`,
};
