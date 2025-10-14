/** @jsxImportSource react */
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditContactClientPage from "../edit/[id]/page";

const updateMock = vi.fn(() => ({ eq: vi.fn() }));
const singleMock = vi.fn().mockResolvedValue({
  data: { name: "Jane Doe", email: "jane@example.com", phone: "555" },
});
const selectMock = vi.fn(() => ({
  eq: vi.fn().mockReturnThis(),
  single: singleMock,
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

describe("EditContactClientPage (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates contact and redirects when name is valid", async () => {
    const { findByDisplayValue, getByText } = render(
      <EditContactClientPage params={{ id: "1" }} />
    );

    const nameInput = await findByDisplayValue("Jane Doe");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.click(getByText("Update"));

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/contacts/client");
    });
  });

  it("does not update if name is empty", async () => {
    const { findByDisplayValue, getByText } = render(
      <EditContactClientPage params={{ id: "1" }} />
    );

    const nameInput = await findByDisplayValue("Jane Doe");
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.click(getByText("Update"));

    await waitFor(() => {
      expect(updateMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
