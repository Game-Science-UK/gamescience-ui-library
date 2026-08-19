import { Spinner } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner />
      <span className="gs-body">Connecting to the session…</span>
    </div>
  ),
} satisfies Preview;
