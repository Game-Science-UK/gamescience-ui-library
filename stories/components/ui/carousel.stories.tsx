import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { StoryFrame } from "../../_utils/story-frame";

const slides = ["Briefing", "Vote", "Debrief"];

const meta = {
  title: "Components/UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <StoryFrame>
      <div className="mx-auto max-w-sm px-12">
        <Carousel>
          <CarouselContent>
            {slides.map((stage) => (
              <CarouselItem key={stage}>
                <div className="flex aspect-video items-center justify-center rounded-control border bg-muted text-sm font-medium">
                  {stage} stage
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </StoryFrame>
  ),
};
