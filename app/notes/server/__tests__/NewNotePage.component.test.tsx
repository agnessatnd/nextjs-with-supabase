import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import NewNotePage from "../new/page";

describe("NewNotePage component", () => {
  it("renders correctly with textarea and Save button", async () => {
    await act(async () => {
      const element = await NewNotePage();
      render(element);
    });

    expect(screen.getByText("New Note")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});