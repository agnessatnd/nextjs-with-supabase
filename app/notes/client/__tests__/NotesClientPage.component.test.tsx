import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn().mockResolvedValue({
          data: [
            { id: 1, title: "Note 1" },
            { id: 2, title: "Note 2" },
          ],
        }),
      })),
    })),
  })),
}));

import NotesClientPage from "../page";

describe("NotesClientPage (component)", () => {
  it("renders notes list and links correctly", async () => {
    render(<NotesClientPage />);

    await waitFor(() => {
      expect(screen.getByText("Notes (Client)")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("link", { name: /Add Note/i })
    ).toHaveAttribute("href", "/notes/client/new");

    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();

    const editLinks = screen.getAllByRole("link", { name: /Edit/i });
    const deleteLinks = screen.getAllByRole("link", { name: /Delete/i });

    expect(editLinks.length).toBe(2);
    expect(deleteLinks.length).toBe(2);
  });
});
