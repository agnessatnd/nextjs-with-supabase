import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/server", () => {
  const mockOrder = vi.fn().mockResolvedValueOnce({
    data: [{ id: 1, title: "Test TODO" }],
  });
  const mockSelect = vi.fn(() => ({ order: mockOrder }));
  const mockFrom = vi.fn(() => ({ select: mockSelect }));
  const mockCreateClient = vi.fn(() => ({ from: mockFrom }));

  return { createClient: mockCreateClient };
});

import TodoPage from "../page";

beforeEach(() => vi.clearAllMocks());

describe("TodoPage (unit)", () => {
  it("fetches todos from Supabase ordered by created_at desc", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;

    await TodoPage();

    expect(mockFrom).toHaveBeenCalledWith("todos");
  });
});
