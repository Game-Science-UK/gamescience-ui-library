import { cn } from "@/lib/cn";

export interface RoomCodeDisplayProps {
  code: string;
  label?: string;
  className?: string;
}

function RoomCodeDisplay({ code, label = "Join with code", className }: RoomCodeDisplayProps) {
  return (
    <div className={cn("text-center", className)}>
      <p className="gs-label text-muted-foreground">{label}</p>
      <p
        className="gs-mono mt-2 font-mono tracking-[0.4em] text-foreground"
        aria-label={`Room code ${code.split("").join(" ")}`}
      >
        {code}
      </p>
    </div>
  );
}

RoomCodeDisplay.displayName = "RoomCodeDisplay";

export { RoomCodeDisplay };
