/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactsPage from "../page";

const mockOrder = vi.fn();
const mockSelect = vi.fn(() => ({ order: mockOrder }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: mockSelect,
      order: mockOrder,
    })),
  })),
}));

describe("ContactsPage (component)", () => {
  it("renders heading and Add Contact button", async () => {
    mockOrder.mockResolvedValueOnce({ data: [] });
    render(await ContactsPage());
    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Add Contact")).toBeInTheDocument();
  });

  it("renders contacts list", async () => {
    mockOrder.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Alice", email: "a@a.com", phone: "111" },
        { id: 2, name: "Bob", email: null, phone: null },
      ],
    });
    render(await ContactsPage());
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
  });
});
