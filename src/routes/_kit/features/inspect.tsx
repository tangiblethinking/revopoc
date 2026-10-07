import { createFileRoute } from "@tanstack/react-router";
import { features } from "@/features/catalog";
import { GroupIndex } from "@/components/GroupIndex";

export const Route = createFileRoute("/_kit/features/inspect")({
  component: function Page() {
    const items = features
      .filter((item) => item.group === "Inspect")
      .map((item) => ({
        href: `/features/${item.id}`,
        title: item.name,
        body: item.task,
        meta: item.components.slice(0, 3).join(" · "),
      }));
    return <GroupIndex lede="Inspect features. Each one is a job the components finish together." items={items} />;
  },
});
