/** @jsxImportSource react */
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NotesClientPage from "../page";

const selectMock = vi.fn(() => ({
  order: vi.fn().mockResolvedValue({ data: [{ id: 1, title: "Test note" }] }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: selectMock,
    })),
  })),
}));

describe("NotesClientPage (unit)", () => {
  it("fetches notes from Supabase", async () => {
    render(<NotesClientPage />);

    await waitFor(() => {
      expect(selectMock).toHaveBeenCalled();
    });
  });
});
