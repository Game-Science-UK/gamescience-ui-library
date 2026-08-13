import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/game/rating";
import { cn } from "@/lib/cn";

export interface DebriefSection {
  id: string;
  title: string;
  prompt?: string;
  response?: string;
  onResponseChange?: (value: string) => void;
}

export interface DebriefProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  ratingValue?: number;
  ratingMax?: number;
  ratingLabel?: string;
  onRatingChange?: (value: number) => void;
  sections?: DebriefSection[];
  defaultOpen?: string;
}

const DEFAULT_SECTIONS: DebriefSection[] = [
  { id: "what", title: "What", prompt: "What happened during the session?" },
  { id: "so-what", title: "So What", prompt: "Why does it matter?" },
  { id: "now-what", title: "Now What", prompt: "What will you do differently next time?" },
];

/**
 * Facilitated reflection using the What / So What / Now What structure.
 * Response state and submission stay application-owned.
 */
function Debrief({
  title = "Debrief",
  ratingValue,
  ratingMax,
  ratingLabel = "Overall reflection",
  onRatingChange,
  sections = DEFAULT_SECTIONS,
  defaultOpen = "what",
  className,
  ...props
}: DebriefProps) {
  return (
    <div className={cn("gs-debrief w-full max-w-content space-y-4", className)} {...props}>
      <header className="space-y-1">
        <h2 className="gs-title text-foreground">{title}</h2>
        {ratingValue !== undefined || onRatingChange !== undefined ? (
          <Rating
            value={ratingValue}
            max={ratingMax}
            onChange={onRatingChange}
            readOnly={!onRatingChange}
            label={ratingLabel}
          />
        ) : null}
      </header>

      <Accordion type="single" collapsible defaultValue={defaultOpen}>
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="gs-title text-[length:var(--type-scale-label)]">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {section.prompt ? (
                  <p className="gs-body text-muted-foreground">{section.prompt}</p>
                ) : null}
                <Textarea
                  value={section.response}
                  placeholder={section.prompt ?? "Write your reflection"}
                  onChange={(event) => section.onResponseChange?.(event.target.value)}
                  aria-label={`${section.title} reflection`}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

Debrief.displayName = "Debrief";

export { Debrief };
