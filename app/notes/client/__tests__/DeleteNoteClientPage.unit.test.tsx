/** @jsxImportSource react */
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeleteNoteClientPage from "../delete/[id]/page";

const deleteMock = vi.fn(() => ({
  eq: vi.fn().mockResolvedValue({}),
}));
const pushMock = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: deleteMock,
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("DeleteNoteClientPage (unit)", () => {
  it("calls Supabase delete and redirects", async () => {
    render(<DeleteNoteClientPage params={{ id: "10" }} />);

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/notes/client");
    });
  });
});
