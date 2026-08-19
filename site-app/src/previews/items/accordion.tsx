import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import type { Preview } from "@site/previews";

export default {
  viewport: "full",
  render: () => (
    <Accordion type="single" collapsible defaultValue="one">
      <AccordionItem value="one">
        <AccordionTrigger>What happens if we disagree?</AccordionTrigger>
        <AccordionContent>The facilitator records a split decision and moves on.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Can we change our answer?</AccordionTrigger>
        <AccordionContent>Not once the round closes.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Preview;
