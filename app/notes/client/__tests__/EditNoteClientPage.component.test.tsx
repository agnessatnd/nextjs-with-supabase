import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import EditNoteClientPage from "../edit/[id]/page";

const pushMock = vi.fn();
const updateMock = vi.fn().mockResolvedValue({});
const selectMock = vi.fn(() => ({
  eq: vi.fn(() => ({
    single: vi.fn().mockResolvedValue({
      data: { title: "Old title" },
    }),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: selectMock,
      update: vi.fn(() => ({
        eq: updateMock,
      })),
    })),
  })),
}));

describe("EditNoteClientPage (component)", () => {
  it("renders fetched note and updates it", async () => {
    await act(async () => {
      render(<EditNoteClientPage params={{ id: "1" }} />);
    });

    expect(screen.getByText("Edit Note (Client)")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old title")).toBeInTheDocument();

    const textarea = screen.getByDisplayValue("Old title");
    await act(async () => {
      fireEvent.change(textarea, { target: { value: "Updated title" } });
      fireEvent.submit(screen.getByRole("button", { name: /Update/i }));
    });

    expect(updateMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/notes/client");
  });
});