/** @jsxImportSource react */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NewNoteClientPage from "../new/page";

const insertMock = vi.fn();
const pushMock = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: insertMock,
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("NewNoteClientPage (unit)", () => {
  it("calls Supabase insert and redirects on valid title", async () => {
    const { getByRole } = render(<NewNoteClientPage />);

    const input = getByRole("textbox");
    const button = getByRole("button", { name: /save/i });

    fireEvent.change(input, { target: { value: "Test note" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(insertMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/notes/client");
    });
  });

  it("does not call Supabase insert if title is empty", async () => {
    const { getByRole } = render(<NewNoteClientPage />);
    const input = getByRole("textbox");
    const button = getByRole("button", { name: /save/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(insertMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
