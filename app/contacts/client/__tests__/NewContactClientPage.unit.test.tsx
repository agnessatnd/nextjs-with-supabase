/** @jsxImportSource react */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NewContactClientPage from "../new/page";

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

describe("NewContactClientPage (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls Supabase insert and redirects on valid name", async () => {
    const { getByPlaceholderText, getByText } = render(<NewContactClientPage />);

    fireEvent.change(getByPlaceholderText("Full name"), {
      target: { value: "John Doe" },
    });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(insertMock).toHaveBeenCalledWith({ name: "John Doe", email: "", phone: "" });
      expect(pushMock).toHaveBeenCalledWith("/contacts/client");
    });
  });

  it("does not call Supabase insert if name is empty", async () => {
    const { getByText } = render(<NewContactClientPage />);
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(insertMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
