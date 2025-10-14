/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditContactPage from "../edit/[id]/page";

const mockEq = vi.fn().mockReturnThis();
const mockSingle = vi.fn();
const mockSelect = vi.fn(() => ({
  eq: mockEq,
  single: mockSingle,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle,
    })),
  })),
}));

describe("EditContactPage (component)", () => {
  it("renders edit form with contact data", async () => {
    mockSingle.mockResolvedValueOnce({
      data: { id: 1, name: "Bob", email: "b@b.com", phone: "555" },
    });

    render(await EditContactPage({ params: { id: "1" } }));
    expect(screen.getByDisplayValue("Bob")).toBeInTheDocument();
    expect(screen.getByDisplayValue("b@b.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("555")).toBeInTheDocument();
  });
});
