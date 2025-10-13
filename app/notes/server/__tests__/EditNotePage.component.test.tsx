import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => {
  const mockSelect = vi.fn(() => ({
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: { id: 1, title: "Mocked note" },
    }),
  }));
  const mockFrom = vi.fn(() => ({ select: mockSelect }));
  const mockCreateClient = vi.fn(() => ({ from: mockFrom }));
  return { createClient: mockCreateClient };
});

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import EditNotePage from "../edit/[id]/page";

describe("EditNotePage component", () => {
  it("renders correctly with textarea and Update button", async () => {
    await act(async () => {
      const params = { id: "1" };
      const element = await EditNotePage({ params });
      render(element);
    });

    expect(screen.getByText("Edit Note")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update/i })
    ).toBeInTheDocument();
  });
});