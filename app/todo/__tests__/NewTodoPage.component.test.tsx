import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import NewTodoPage from "../new/page";

describe("NewTodoPage (component)", () => {
  it("renders form elements correctly", async () => {
    await act(async () => {
      render(await NewTodoPage());
    });

    expect(screen.getByText("New TODO")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter TODO...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });
});
