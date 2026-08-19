import { Button, Toaster } from "@/components/ui";
import { toast } from "sonner";
import type { Preview } from "@site/previews";

export default {
  syncsDocument: true,
  viewport: "full",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button intent="outline" onClick={() => toast("Answer committed")}>
        Show toast
      </Button>
      <Button intent="outline" onClick={() => toast.error("Connection lost")}>
        Show error
      </Button>
      <Toaster />
    </div>
  ),
} satisfies Preview;
