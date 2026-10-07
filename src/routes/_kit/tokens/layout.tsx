import { createFileRoute } from "@tanstack/react-router";
import { ReturnTo } from "@/components/ReturnTo";
import { LayoutTokens } from "@/components/TokenSections";
import { validateKitSearch } from "@/components/kit-path";

export const Route = createFileRoute("/_kit/tokens/layout")({
  validateSearch: validateKitSearch,
  component: function Page() {
    return (
      <>
        <ReturnTo />
        <LayoutTokens />
      </>
    );
  },
});
