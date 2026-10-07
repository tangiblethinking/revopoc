import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { CodePanel } from "@/components/CodePanel";
import { useCopy } from "@/components/copy-context";

export function Specimen({
  preview,
  code,
  tokens,
  classes,
  shot,
  shotNote,
}: {
  preview: React.ReactNode;
  code: string;
  tokens: string[];
  classes: { name: string; count: number }[];
  shot?: string;
  shotNote?: string;
}) {
  const [tab, setTab] = useState("code");
  const copy = useCopy();
  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          overflow: "auto",
          maxHeight: "70vh",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        {preview}
      </Box>
      <Paper variant="outlined" sx={{ width: "100%", maxWidth: "100%", minWidth: 0, p: 1.5, overflow: "hidden", boxSizing: "border-box" }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ maxWidth: "100%", minHeight: 48 }}
        >
          <Tab value="code" label="Code" />
          <Tab value="tokens" label="Tokens" />
          <Tab value="classes" label="Classes" />
          <Tab value="shot" label="Screenshot" />
        </Tabs>
        <Box sx={{ pt: 2 }}>
          {tab === "code" ? <CodePanel code={code} onCopy={copy} /> : null}
          {tab === "tokens" ? (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {tokens.map((token) => (
                <Chip key={token} size="small" variant="outlined" label={token} onClick={() => copy(token, "Token copied")} />
              ))}
            </Stack>
          ) : null}
          {tab === "classes" ? (
            <Stack spacing={0.75}>
              {classes.map((item) => (
                <Box key={item.name} sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : null}
          {tab === "shot" ? (
            shot ? (
              <Stack spacing={1}>
                {shotNote ? (
                  <Typography variant="caption" color="text.secondary">
                    {shotNote}
                  </Typography>
                ) : null}
                <Box component="img" src={shot} alt="" sx={{ width: "100%", height: "auto", maxWidth: "100%", borderRadius: 1, border: 1, borderColor: "divider" }} />
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                This primitive is aggregated across captures, so there is no single screenshot.
              </Typography>
            )
          ) : null}
        </Box>
      </Paper>
    </Stack>
  );
}
