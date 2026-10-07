import Button from "@mui/material/Button";
import { Link, useRouterState } from "@tanstack/react-router";
import { kitPathTitle } from "@/components/kit-path";

const buttonSx = { px: 0.5, minWidth: 0, mb: 1, alignSelf: "flex-start" } as const;

type KitTo = "/features/$id" | "/components/$id" | "/primitives/$id" | "/patterns/$id";

function ReturnLink({ to, id, label }: { to: KitTo; id: string; label: string }) {
  const Comp = Button as React.ElementType;
  return (
    <Comp component={Link} to={to} params={{ id }} variant="text" size="small" sx={buttonSx}>
      {label}
    </Comp>
  );
}

/**
 * Text button back to the kit page that linked here.
 * Renders nothing when `from` is missing or is not a real kit path.
 * The link does not append another `from`.
 */
export function ReturnTo() {
  const from = useRouterState({
    select: (state) => {
      const search = state.location.search as { from?: unknown };
      return typeof search.from === "string" ? search.from : undefined;
    },
  });
  if (!from) return null;
  const title = kitPathTitle(from);
  const id = from.split("/")[2];
  if (!title || !id) return null;
  const label = `Return to ${title}`;
  if (from.startsWith("/features/")) return <ReturnLink to="/features/$id" id={id} label={label} />;
  if (from.startsWith("/components/")) return <ReturnLink to="/components/$id" id={id} label={label} />;
  if (from.startsWith("/primitives/")) return <ReturnLink to="/primitives/$id" id={id} label={label} />;
  if (from.startsWith("/patterns/")) return <ReturnLink to="/patterns/$id" id={id} label={label} />;
  return null;
}
