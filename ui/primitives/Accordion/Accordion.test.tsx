import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

describe("Accordion", () => {
  it("reveals and hides a collapsible item", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="details">
          <AccordionTrigger>Project details</AccordionTrigger>
          <AccordionContent>Everything you need to know.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "Project details" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Everything you need to know.")).toBeVisible();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });
});
