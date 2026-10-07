import { createFileRoute } from "@tanstack/react-router";
import { productComponents } from "@/product/catalog";
import { GroupIndex } from "@/components/GroupIndex";

export const Route = createFileRoute("/_kit/components/metrics")({
  component: function Page() {
    const items = productComponents
      .filter((item) => item.group === "Metrics")
      .map((item) => ({
        href: `/components/${item.id}`,
        title: item.name,
        body: item.description,
        meta: item.primitives.slice(0, 4).join(" · "),
      }));
    return <GroupIndex lede="Metrics components built from the primitives." items={items} />;
  },
});
