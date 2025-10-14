/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeleteContactClientPage from "../delete/[id]/page";

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({}),
      })),
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("DeleteContactClientPage (component)", () => {
  it("shows deleting message", () => {
    render(<DeleteContactClientPage params={{ id: "1" }} />);
    expect(screen.getByText("Deleting contact...")).toBeInTheDocument();
  });
});
