import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container/Container";
import { Section } from "./Section/Section";

describe("layout primitives", () => {
  it("keeps container content centred and accepts class overrides", () => {
    render(<Container className="test-container">Content</Container>);

    expect(screen.getByText("Content")).toHaveClass("mx-auto", "max-w-6xl", "test-container");
  });

  it("exposes its anchor for in-page navigation", () => {
    render(<Section anchorId="contact">Contact content</Section>);

    expect(screen.getByText("Contact content").closest("section")).toHaveAttribute("id", "contact");
  });
});
