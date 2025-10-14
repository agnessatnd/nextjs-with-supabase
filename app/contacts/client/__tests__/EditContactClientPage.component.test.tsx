/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditContactClientPage from "../edit/[id]/page";

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { name: "John", email: "john@example.com", phone: "555" },
        }),
      })),
      update: vi.fn(),
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("EditContactClientPage (component)", () => {
  it("renders fetched contact fields", async () => {
    render(<EditContactClientPage params={{ id: "1" }} />);

    expect(await screen.findByDisplayValue("John")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("555")).toBeInTheDocument();
  });
});
