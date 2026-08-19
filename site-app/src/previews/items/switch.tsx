import { Label, Switch } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="anon">Anonymous voting</Label>
        <Switch id="anon" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="timer">Show timer on display</Label>
        <Switch id="timer" />
      </div>
    </div>
  ),
} satisfies Preview;
