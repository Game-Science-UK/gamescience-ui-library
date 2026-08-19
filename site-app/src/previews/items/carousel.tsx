import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Panel,
} from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <Carousel className="mx-10">
      <CarouselContent>
        {["Source A", "Source B", "Source C"].map((label) => (
          <CarouselItem key={label}>
            <Panel>
              <p className="gs-label">{label}</p>
              <p className="gs-body mt-2">Evidence available to your table.</p>
            </Panel>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
} satisfies Preview;
