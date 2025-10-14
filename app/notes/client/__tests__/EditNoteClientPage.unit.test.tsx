/** @jsxImportSource react */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditNoteClientPage from "../edit/[id]/page";

const selectMock = vi.fn(() => ({
  eq: vi.fn().mockReturnValue({
    single: vi.fn().mockResolvedValue({
      data: { title: "Existing note" },
      error: null,
    }),
  }),
}));

const updateMock = vi.fn(() => ({
  eq: vi.fn().mockResolvedValue({}),
}));

const pushMock = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: selectMock,
      update: updateMock,
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("EditNoteClientPage (unit)", () => {
  it("updates note and redirects when title is valid", async () => {
    const { findByRole } = render(<EditNoteClientPage params={{ id: "5" }} />);

    const input = await findByRole("textbox");
    const button = await findByRole("button", { name: /update/i });

    fireEvent.change(input, { target: { value: "Updated title" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/notes/client");
    });
  });

  it("does not update note if title is empty", async () => {
    const { findByRole } = render(<EditNoteClientPage params={{ id: "5" }} />);
    const input = await findByRole("textbox");
    const button = await findByRole("button", { name: /update/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
