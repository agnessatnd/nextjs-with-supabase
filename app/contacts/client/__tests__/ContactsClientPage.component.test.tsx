/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactsClientPage from "../page";

const selectMock = vi.fn(() => ({
  order: vi.fn().mockResolvedValue({
    data: [{ id: 1, name: "Alice", email: "a@x.com", phone: "111" }],
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: selectMock,
    })),
  })),
}));

describe("ContactsClientPage (component)", () => {
  it("renders Add Contact button and heading", async () => {
    render(<ContactsClientPage />);
    expect(screen.getByText("Contacts (Client)")).toBeInTheDocument();
    expect(screen.getByText("Add Contact")).toBeInTheDocument();
  });

  it("renders fetched contacts", async () => {
    render(<ContactsClientPage />);
    expect(await screen.findByText("Alice")).toBeInTheDocument();
  });
});
