import { createFileRoute, Outlet } from "@tanstack/react-router";
import { KitShell } from "@/components/KitShell";

export const Route = createFileRoute("/_kit")({
  component: function KitLayout() {
    return (
      <KitShell>
        <Outlet />
      </KitShell>
    );
  },
});
