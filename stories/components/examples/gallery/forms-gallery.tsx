import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

/** Compact form-controls composition for Examples/Forms docs. */
export function FormsGallery() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="grid gap-1">
        <Label htmlFor="gallery-name">Name</Label>
        <Input id="gallery-name" placeholder="Participant name" />
      </div>
      <Textarea placeholder="Notes" />
      <div className="flex items-center gap-2">
        <Checkbox id="gallery-ready" />
        <Label htmlFor="gallery-ready">Ready</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="gallery-notify" />
        <Label htmlFor="gallery-notify">Notify</Label>
      </div>
      <RadioGroup defaultValue="a" className="flex gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="gallery-a" />
          <Label htmlFor="gallery-a">Option A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="gallery-b" />
          <Label htmlFor="gallery-b">Option B</Label>
        </div>
      </RadioGroup>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="north">North</SelectItem>
          <SelectItem value="south">South</SelectItem>
        </SelectContent>
      </Select>
      <Slider defaultValue={[42]} max={100} step={1} />
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSeparator />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <Button>Submit</Button>
    </div>
  );
}
