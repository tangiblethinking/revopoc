import { createFileRoute, Link } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import patterns from "@/catalog/patterns.json";
import { CaptureNote } from "@/components/CaptureNote";
import { ReturnTo } from "@/components/ReturnTo";
import { Specimen } from "@/components/Specimen";
import { validateKitSearch } from "@/components/kit-path";
import { featureById, featuresByPattern } from "@/features/catalog";
import { patternSnippets } from "@/patterns/snippets";
import { patternViews } from "@/patterns/views";

export const Route = createFileRoute("/_kit/patterns/$id")({
  validateSearch: validateKitSearch,
  component: PatternPage,
});

function PatternPage() {
  const { id } = Route.useParams();
  const item = patterns.find((entry) => entry.id === id);
  const View = patternViews[id];
  if (!item || !View) {
    return (
      <Typography>
        That pattern is not in the catalog. <Link to="/patterns">Back to patterns</Link>
      </Typography>
    );
  }
  const hosted = (featuresByPattern[id] ?? []).map((featureId) => featureById(featureId)).filter((feature) => feature != null);
  return (
    <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
      <ReturnTo />
      <Typography variant="h5">{item.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, mb: 1.5, maxWidth: 680 }}>
        {item.summary}
      </Typography>
      {hosted.length > 0 ? (
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2 }}>
          {hosted.map((feature) => (
            <Link key={feature.id} to="/features/$id" params={{ id: feature.id }} search={{ from: `/patterns/${id}` }} style={{ textDecoration: "none" }}>
              <Chip size="small" clickable variant="outlined" label={feature.name} />
            </Link>
          ))}
        </Box>
      ) : null}
      <Box sx={{ mb: 2 }}>
        <CaptureNote />
      </Box>
      <Specimen
        preview={<View />}
        code={patternSnippets[id] ?? `// Reconstructed from capture ${item.folder}. Not original source.`}
        tokens={item.tokens}
        classes={item.classes}
        shot={item.shot}
        shotNote="Internal reference capture."
      />
    </Box>
  );
}
