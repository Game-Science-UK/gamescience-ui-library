import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <InputOTP maxLength={4} defaultValue="4KZ">
      <InputOTPGroup>
        {[0, 1, 2, 3].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
} satisfies Preview;
