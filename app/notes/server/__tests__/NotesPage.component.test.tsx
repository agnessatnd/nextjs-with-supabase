import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [
          { id: 1, title: "First note" },
          { id: 2, title: "Second note" },
        ],
      }),
    })),
  })),
}));

import NotesPage from "../page";

describe("NotesPage component", () => {
  it("renders correctly with fetched notes and buttons", async () => {
    await act(async () => {
      const element = await NotesPage();
      render(element);
    });

    expect(screen.getByText("Notes")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /add note/i })).toBeInTheDocument();

    expect(screen.getByText("First note")).toBeInTheDocument();
    expect(screen.getByText("Second note")).toBeInTheDocument();

    const editLinks = screen.getAllByRole("link", { name: /edit/i });
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    expect(editLinks.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });
});
