import patterns from "@/catalog/patterns.json";
import primitives from "@/catalog/primitives.json";
import { featureById } from "@/features/catalog";
import { productComponents } from "@/product/catalog";

const KIT_PATH = /^\/(features|components|primitives|patterns)\/([A-Za-z0-9-]+)$/;

export type KitSearch = { from?: string };

/** Display name when `path` is a real kit detail route. Anything else is ignored. */
export function kitPathTitle(path: string): string | null {
  const match = KIT_PATH.exec(path);
  if (!match) return null;
  const [, kind, id] = match;
  if (kind === "features") return featureById(id)?.name ?? null;
  if (kind === "components") return productComponents.find((item) => item.id === id)?.name ?? null;
  if (kind === "primitives") return primitives.find((item) => item.id === id)?.name ?? null;
  if (kind === "patterns") return patterns.find((item) => item.id === id)?.title ?? null;
  return null;
}

export function validateKitSearch(search: Record<string, unknown>): KitSearch {
  const from = typeof search.from === "string" ? search.from : undefined;
  if (!from || !kitPathTitle(from)) return {};
  return { from };
}
