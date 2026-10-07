import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(code: string) {
  const escaped = escapeHtml(code);
  return escaped.replace(
    /(\/\/.*$|&lt;\/?[A-Z][A-Za-z0-9.]*|&gt;|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b(?:const|return|import|from|export|function|true|false|null|sx)\b)/gm,
    (token) => {
      if (token.startsWith("//")) return `<span data-token="comment">${token}</span>`;
      if (token.startsWith('"') || token.startsWith("'")) return `<span data-token="string">${token}</span>`;
      if (token.startsWith("&lt;")) return `<span data-token="tag">${token}</span>`;
      if (token === "&gt;") return `<span data-token="tag">${token}</span>`;
      return `<span data-token="key">${token}</span>`;
    },
  );
}

export function CodePanel({ code, onCopy }: { code: string; onCopy: (text: string, label: string) => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          mb: 1.5,
          px: 1.5,
          py: 1,
          borderRadius: 1,
          bgcolor: "warning.main",
          color: "warning.contrastText",
        }}
      >
        <Typography variant="caption" sx={{ color: "inherit" }}>
          Reconstructed from rendered HTML and Emotion CSS. Not original source.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            onCopy(code, "Snippet copied");
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: "auto",
          maxWidth: "100%",
          maxHeight: 520,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          borderRadius: 1,
          bgcolor: "background.level1",
          border: 1,
          borderColor: "divider",
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "text.primary",
          "& [data-token='comment']": { color: "text.secondary" },
          "& [data-token='string']": { color: "success.main" },
          "& [data-token='tag']": { color: "primary.main" },
          "& [data-token='key']": { color: "info.main" },
        }}
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </Box>
  );
}
