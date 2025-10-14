import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn().mockResolvedValueOnce({
          data: [
            { id: 1, title: "Todo 1" },
            { id: 2, title: "Todo 2" },
          ],
        }),
      })),
    })),
  })),
}));

import TodoPage from "../page";

describe("TodoPage (component)", () => {
  it("renders TODO list with Edit and Delete buttons", async () => {
    render(await TodoPage());

    expect(screen.getByText("My TODOs")).toBeInTheDocument();

    const addLink = screen.getByRole("link", { name: /Add TODO/i });
    expect(addLink).toHaveAttribute("href", "/todo/new");

    const todo1 = screen.getByText("Todo 1");
    const todo2 = screen.getByText("Todo 2");
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();

    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems.length).toBe(2);

    todoItems.forEach((item, index) => {
      const utils = within(item);

      const editLink = utils.getByRole("link", { name: /Edit/i });
      expect(editLink).toHaveAttribute("href", `/todo/edit/${index + 1}`);

      const deleteButton = utils.getByRole("button", { name: /Delete/i });
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAttribute("type", "submit");
    });
  });
});
