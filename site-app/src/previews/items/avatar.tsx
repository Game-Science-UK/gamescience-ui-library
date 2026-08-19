import { Avatar, AvatarFallback } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  render: () => (
    <div className="flex items-center gap-3">
      {["AM", "JD", "WL"].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
} satisfies Preview;
