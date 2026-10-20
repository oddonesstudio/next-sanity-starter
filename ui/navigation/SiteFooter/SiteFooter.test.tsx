import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders navigation groups and their linked children", () => {
    render(
      <SiteFooter items={[{ label: "Company", children: [{ label: "About", href: "/about" }] }]} />,
    );

    expect(screen.getByRole("heading", { name: "Company" })).toBeVisible();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });
});
