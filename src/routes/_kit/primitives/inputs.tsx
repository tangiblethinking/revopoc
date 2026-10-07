import { createFileRoute } from "@tanstack/react-router";
import primitives from "@/catalog/primitives.json";
import { primitiveGroups } from "@/catalog/nav";
import { GroupIndex } from "@/components/GroupIndex";

export const Route = createFileRoute("/_kit/primitives/inputs")({
  component: function Page() {
    const ids = primitiveGroups.inputs;
    const items = primitives
      .filter((item) => ids.includes(item.id))
      .map((item) => ({
        href: `/primitives/${item.id}`,
        title: item.name,
        body: item.description,
        meta: `${item.variants.length} variants in the captures`,
      }));
    return <GroupIndex lede="Inputs primitives used in the captures." items={items} />;
  },
});
