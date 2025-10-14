/** @jsxImportSource react */
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactsClientPage from "../page";

const selectMock = vi.fn(() => ({
  order: vi.fn().mockResolvedValue({
    data: [
      { id: 1, name: "Alice", email: "a@x.com", phone: "111" },
      { id: 2, name: "Bob", email: "b@x.com", phone: "222" },
    ],
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: selectMock,
    })),
  })),
}));

describe("ContactsClientPage (unit)", () => {
  it("renders list of contacts from Supabase", async () => {
    const { findByText } = render(<ContactsClientPage />);

    await waitFor(async () => {
      expect(await findByText("Alice")).toBeInTheDocument();
      expect(await findByText("Bob")).toBeInTheDocument();
    });
  });
});
