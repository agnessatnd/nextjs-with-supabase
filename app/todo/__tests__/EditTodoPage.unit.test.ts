import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/server", () => {
  const mockEq = vi.fn().mockReturnThis();
  const mockSelect = vi.fn(() => ({
    eq: mockEq,
    single: vi.fn().mockResolvedValueOnce({
      data: { id: "1", title: "Old Title" },
    }),
  }));
  const mockFrom = vi.fn(() => ({ select: mockSelect, update: vi.fn(() => ({ eq: vi.fn() })) }));
  const mockCreateClient = vi.fn(() => ({ from: mockFrom }));
  return { createClient: mockCreateClient };
});

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import EditTodoPage from "../edit/[id]/page";

beforeEach(() => vi.clearAllMocks());

describe("EditTodoPage (unit)", () => {
  it("fetches existing todo and updates correctly", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const { redirect } = await import("next/navigation");

    const page = await EditTodoPage({ params: { id: "1" } });
    expect(await page).toBeTruthy();

    const formData = new FormData();
    formData.append("title", "Updated Title");

    const supabase = await createClient();
    const updateAction = page.props.action;
    await updateAction(formData);

    expect(supabase.from).toHaveBeenCalledWith("todos");
    expect(redirect).toHaveBeenCalledWith("/todo");
  });
});
