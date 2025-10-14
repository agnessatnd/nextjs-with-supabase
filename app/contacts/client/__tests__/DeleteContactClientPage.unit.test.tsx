/** @jsxImportSource react */
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DeleteContactClientPage from "../delete/[id]/page";

const deleteMock = vi.fn(() => ({ eq: vi.fn() }));
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

describe("DeleteContactClientPage (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls delete and redirects", async () => {
    render(<DeleteContactClientPage params={{ id: "1" }} />);

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/contacts/client");
    });
  });
});
