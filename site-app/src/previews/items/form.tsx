import { Button, Input, Label, Panel, Textarea } from "@/components/ui";
import type { Preview } from "@site/previews";

/**
 * `form` ships the react-hook-form bindings. This shows the composed shape
 * rather than a live form, so the preview stays stateless and printable.
 */
export default {
  viewport: "full",
  render: () => (
    <Panel>
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="recommendation">Recommendation</Label>
          <Input id="recommendation" placeholder="One sentence" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rationale">Rationale</Label>
          <Textarea id="rationale" rows={3} placeholder="Why did your table choose this?" />
          <p className="gs-micro">Shared with the facilitator at the debrief.</p>
        </div>
        <Button intent="primary" type="submit">
          Submit
        </Button>
      </form>
    </Panel>
  ),
} satisfies Preview;
