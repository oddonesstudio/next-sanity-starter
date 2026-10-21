import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "./Hero";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: This is a minimal next/image test double.
    <img alt={alt} src={src} />
  ),
}));

describe("Hero", () => {
  it("renders its CMS content, primary CTA, and image", () => {
    render(
      <Hero
        headline="Build something"
        headlineHighlight="better"
        supportingText={"A short introduction.\nWith a second line."}
        primaryCTA={{ label: "Get started", href: "/start" }}
        image={{ src: "/hero-image.jpg", alt: "A colourful abstract composition" }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Build something better" })).toBeVisible();
    expect(screen.getByText(/A short introduction/)).toHaveClass("whitespace-pre-line");
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute("href", "/start");
    expect(screen.getByRole("img", { name: "A colourful abstract composition" })).toHaveAttribute(
      "src",
      "/hero-image.jpg",
    );
  });

  it("omits optional content when it is not provided", () => {
    render(<Hero headline="A focused headline" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
