import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

export const people = [
  { name: "Avery Lane", rank: "Diamond", pv: "4,280", status: "On track", color: "success" as const },
  { name: "Jordan Hale", rank: "Emerald", pv: "3,140", status: "Watch", color: "warning" as const },
  { name: "Riley Chen", rank: "Gold", pv: "1,860", status: "At risk", color: "error" as const },
  { name: "Morgan Ellis", rank: "Silver", pv: "940", status: "New", color: "primary" as const },
];

export function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Paper elevation={1} sx={{ p: 1.5, flex: 1, minWidth: 120 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6">{value}</Typography>
      {hint ? (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      ) : null}
    </Paper>
  );
}

export function PeopleTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? people.slice(0, 3) : people;
  return (
    <Paper elevation={1} sx={{ overflow: "hidden" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ambassador</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell align="right">PV</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Chip size="small" variant="outlined" color="secondary" label={row.rank} />
              </TableCell>
              <TableCell align="right">{row.pv}</TableCell>
              <TableCell>
                <Chip size="small" color={row.color} label={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        {action ? (
          <Typography variant="caption" color="primary.main" sx={{ ml: "auto" }}>
            {action}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Box>
  );
}

export function ProgressLine({ label, value }: { label: string; value: number }) {
  return (
    <Box sx={{ mb: 1.25 }}>
      <Box sx={{ display: "flex", mb: 0.5 }}>
        <Typography variant="caption">{label}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
}
