import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IconBell } from "@/icons/icons";
import { interactionStates } from "@/theme/tokens";
import { useCopy } from "@/components/copy-context";

const buttonStates = ["Default", "Hover", "Pressed", "Disabled"] as const;

export function InteractionStates() {
  const copy = useCopy();
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
        Interactive pieces read these action tokens. Hover, pressed, focus, selected, and disabled are the same values on buttons, chips, icon buttons, list rows, and nav items.
      </Typography>
      <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 3 }}>
        {interactionStates.map((state) => (
          <Paper
            key={state.id}
            variant="outlined"
            component="button"
            onClick={() => copy(`${state.cssVar}  ${state.token}`, `${state.label} copied`)}
            sx={{ p: 1.5, textAlign: "left", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: state.token, border: 1, borderColor: "divider", flexShrink: 0 }} />
              <Box>
                <Typography variant="body2">{state.label}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {state.cssVar} · opacity {state.opacity}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              {state.use}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1.25 }}>
        Button
      </Typography>
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, mb: 3 }}>
        {(["text", "outlined", "contained"] as const).map((variant) => (
          <Paper key={variant} variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, textTransform: "capitalize" }}>
              {variant}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {buttonStates.map((state) => (
                <Button
                  key={state}
                  size="small"
                  variant={variant}
                  disabled={state === "Disabled"}
                  sx={
                    state === "Hover"
                      ? { bgcolor: "action.hover" }
                      : state === "Pressed"
                        ? { bgcolor: "action.active" }
                        : undefined
                  }
                >
                  {state}
                </Button>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1.25 }}>
        Icon button and chip
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
        <IconButton aria-label="Notifications" color="secondary">
          <IconBell />
        </IconButton>
        <IconButton aria-label="Notifications, hover" color="secondary" sx={{ bgcolor: "action.hover" }}>
          <IconBell />
        </IconButton>
        <IconButton aria-label="Notifications, pressed" color="secondary" sx={{ bgcolor: "action.active" }}>
          <IconBell />
        </IconButton>
        <IconButton aria-label="Notifications, disabled" color="secondary" disabled>
          <IconBell />
        </IconButton>
        <Chip size="small" label="On track" color="success" />
        <Chip size="small" label="Selected" color="primary" sx={{ bgcolor: "action.selected" }} />
        <Chip size="small" label="Disabled" disabled />
      </Box>
    </Box>
  );
}
