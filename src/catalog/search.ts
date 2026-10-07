import pages from "./pages.json";
import primitives from "./primitives.json";
import patterns from "./patterns.json";
import { features } from "@/features/catalog";
import { productComponents } from "@/product/catalog";

export type Hit = {
  kind: "Token" | "Primitive" | "Component" | "Feature" | "Pattern" | "Page";
  title: string;
  hint: string;
  href: string;
};

const index: Hit[] = [
  { kind: "Token", title: "Color", hint: "Primary, neutral, status", href: "/tokens/colors" },
  { kind: "Token", title: "Type", hint: "Inter scale, largest to smallest", href: "/tokens/type" },
  { kind: "Token", title: "Layout", hint: "Radius, spacing, shadow", href: "/tokens/layout" },
  { kind: "Token", title: "States", hint: "Hover, pressed, focus, disabled", href: "/tokens/states" },
  ...primitives.map((item) => ({
    kind: "Primitive" as const,
    title: item.name,
    hint: item.description,
    href: `/primitives/${item.id}`,
  })),
  ...productComponents.map((item) => ({
    kind: "Component" as const,
    title: item.name,
    hint: `${item.group}. ${item.description}`,
    href: `/components/${item.id}`,
  })),
  ...features.map((item) => ({
    kind: "Feature" as const,
    title: item.name,
    hint: item.task,
    href: `/features/${item.id}`,
  })),
  ...patterns.map((item) => ({
    kind: "Pattern" as const,
    title: item.title,
    hint: item.summary,
    href: `/patterns/${item.id}`,
  })),
  ...pages.map((item) => ({
    kind: "Page" as const,
    title: item.title.replace(" | Plexus Pulse", ""),
    hint: item.opened,
    href: `/pages/${item.slug}`,
  })),
];

export function searchCatalog(query: string): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((hit) => `${hit.title} ${hit.hint} ${hit.kind}`.toLowerCase().includes(q)).slice(0, 12);
}
