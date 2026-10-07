import { createFileRoute, Outlet } from "@tanstack/react-router";
import { validateKitSearch } from "@/components/kit-path";

export const Route = createFileRoute("/_kit/tokens")({
  validateSearch: validateKitSearch,
  component: function TokensLayout() {
    return <Outlet />;
  },
});
