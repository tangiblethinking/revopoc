import { createFileRoute } from "@tanstack/react-router";
import patterns from "@/catalog/patterns.json";
import { patternGroups } from "@/catalog/nav";
import { GroupIndex } from "@/components/GroupIndex";

export const Route = createFileRoute("/_kit/patterns/rank")({
  component: function Page() {
    const ids = patternGroups.rank;
    const items = patterns
      .filter((item) => ids.includes(item.id))
      .map((item) => ({
        href: `/patterns/${item.id}`,
        title: item.title,
        body: item.summary,
        meta: item.folder,
      }));
    return <GroupIndex lede="Rank and field patterns, composed from the components." items={items} />;
  },
});
