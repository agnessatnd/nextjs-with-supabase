import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValueOnce({
            data: { id: "1", title: "Existing TODO" },
          }),
        })),
      })),
    })),
  })),
}));

import EditTodoPage from "../edit/[id]/page";

describe("EditTodoPage (component)", () => {
  it("renders edit form with existing title", async () => {
    await act(async () => {
      render(await EditTodoPage({ params: { id: "1" } }));
    });

    expect(screen.getByText("Edit TODO")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing TODO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
  });
});
