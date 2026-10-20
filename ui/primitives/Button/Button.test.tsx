import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("forwards interaction and variant metadata to a native button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button variant="destructive" size="lg" onClick={onClick}>
        Delete project
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete project" });
    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute("data-variant", "destructive");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("can render an accessible link through asChild", () => {
    render(
      <Button asChild>
        <a href="/start">Get started</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute("href", "/start");
  });
});
