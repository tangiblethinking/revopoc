import { createFileRoute } from "@tanstack/react-router";
import { ReturnTo } from "@/components/ReturnTo";
import { TypeTokens } from "@/components/TokenSections";
import { validateKitSearch } from "@/components/kit-path";

export const Route = createFileRoute("/_kit/tokens/type")({
  validateSearch: validateKitSearch,
  component: function Page() {
    return (
      <>
        <ReturnTo />
        <TypeTokens />
      </>
    );
  },
});
