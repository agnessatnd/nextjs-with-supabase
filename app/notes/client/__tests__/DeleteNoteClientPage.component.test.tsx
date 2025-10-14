import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import DeleteNoteClientPage from "../delete/[id]/page";

const pushMock = vi.fn();
const deleteMock = vi.fn(() => ({
  eq: vi.fn().mockResolvedValue({}),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: deleteMock,
    })),
  })),
}));

describe("DeleteNoteClientPage (component)", () => {
  it("renders loading message and triggers delete", async () => {
    await act(async () => {
      render(<DeleteNoteClientPage params={{ id: "1" }} />);
    });

    expect(screen.getByText("Deleting note...")).toBeInTheDocument();
    expect(deleteMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/notes/client");
  });
});