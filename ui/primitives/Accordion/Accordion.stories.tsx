import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from ".";

const meta = {
  title: "Primitives/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { type: "single" },
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-xl"
      defaultValue="what-is-included"
    >
      <AccordionItem value="what-is-included">
        <AccordionTrigger>What is included?</AccordionTrigger>
        <AccordionContent>
          Reusable, accessible UI primitives ready to make your own.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="can-i-customise">
        <AccordionTrigger>Can I customise it?</AccordionTrigger>
        <AccordionContent>
          Absolutely — tailor the styling and content to your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
