import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import NewNoteClientPage from "../new/page";

const pushMock = vi.fn();
const insertMock = vi.fn().mockResolvedValue({});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: insertMock,
    })),
  })),
}));

describe("NewNoteClientPage (component)", () => {
  it("renders form and submits new note", async () => {
    await act(async () => {
      render(<NewNoteClientPage />);
    });

    expect(screen.getByText("New Note (Client)")).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText("Write your note...");
    const saveButton = screen.getByRole("button", { name: /Save/i });

    await act(async () => {
      fireEvent.change(textarea, { target: { value: "My new note" } });
      fireEvent.click(saveButton);
    });

    expect(insertMock).toHaveBeenCalledWith({ title: "My new note" });
    expect(pushMock).toHaveBeenCalledWith("/notes/client");
  });
});
