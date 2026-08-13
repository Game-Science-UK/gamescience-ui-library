import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Panel, PanelDescription, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { PhaseProgress, type PhaseProgressStep } from "@/components/game/phase-progress";
import { cn } from "@/lib/cn";

export interface BriefingSlide {
  id: string;
  title: string;
  body?: string;
}

export interface BriefingProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: BriefingSlide[];
  activeSlideId: string;
  eyebrow?: string;
  title?: string;
  progressLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  className?: string;
}

function slideStatus(index: number, activeIndex: number): PhaseProgressStep["status"] {
  if (index < activeIndex) return "complete";
  if (index === activeIndex) return "active";
  return "pending";
}

/**
 * Paced briefing / walkthrough. Owns only slide presentation and navigation; the
 * application decides when a slide is complete and when the briefing ends.
 */
function Briefing({
  slides,
  activeSlideId,
  eyebrow = "Briefing",
  title = "Briefing",
  progressLabel,
  onPrevious,
  onNext,
  onComplete,
  className,
  ...props
}: BriefingProps) {
  const activeIndex = Math.max(
    0,
    slides.findIndex((slide) => slide.id === activeSlideId),
  );
  const activeSlide = slides[activeIndex];
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= slides.length - 1;

  const steps: PhaseProgressStep[] = slides.map((slide, index) => ({
    id: slide.id,
    label: slide.title,
    status: slideStatus(index, activeIndex),
  }));

  return (
    <div
      data-active-slide={activeSlideId}
      className={cn("gs-briefing w-full max-w-content space-y-4", className)}
      {...props}
    >
      <PhaseProgress
        steps={steps}
        activeId={activeSlideId}
        label={progressLabel ?? `${title} — ${activeIndex + 1} of ${slides.length}`}
      />

      {activeSlide ? (
        <Panel elevation="raised" padding="lg">
          <PanelHeader>
            <p className="gs-label gs-eyebrow gs-eyebrow-dotted text-muted-foreground">{eyebrow}</p>
            <PanelTitle className="mt-2">{activeSlide.title}</PanelTitle>
            {activeSlide.body ? (
              <PanelDescription className="gs-body">{activeSlide.body}</PanelDescription>
            ) : null}
          </PanelHeader>
        </Panel>
      ) : null}

      <div className="rounded-panel border border-border bg-surface p-panel-sm">
        <ButtonGroup className="justify-between">
          <Button type="button" intent="outline" disabled={isFirst} onClick={onPrevious}>
            Previous
          </Button>
          {isLast ? (
            <Button type="button" intent="primary" emphasis="strong" onClick={onComplete}>
              Complete briefing
            </Button>
          ) : (
            <Button type="button" intent="primary" emphasis="strong" onClick={onNext}>
              Next
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}

Briefing.displayName = "Briefing";

export { Briefing };
