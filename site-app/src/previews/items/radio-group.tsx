import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import type { Preview } from "@site/previews";

const OPTIONS = [
  { value: "contain", label: "Contain and monitor" },
  { value: "escalate", label: "Escalate to the board" },
  { value: "disclose", label: "Disclose publicly" },
];

export default {
  render: () => (
    <RadioGroup defaultValue="contain" className="space-y-2">
      {OPTIONS.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
} satisfies Preview;
