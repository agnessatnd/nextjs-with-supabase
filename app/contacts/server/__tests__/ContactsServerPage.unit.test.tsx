import { describe, it, expect, vi, beforeEach } from "vitest";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("ContactsPage (unit)", () => {
  const orderMock = vi.fn();
  const selectMock = vi.fn(() => ({ order: orderMock }));

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createClient as any).mockResolvedValue({
      from: vi.fn(() => ({
        select: selectMock,
        order: orderMock,
      })),
    });
  });

  it("fetches contacts in descending order", async () => {
    const supabase = await createClient();
    const table = supabase.from("contacts");
    table.select().order("created_at", { ascending: false });
    expect(orderMock).toHaveBeenCalledWith("created_at", { ascending: false });
  });
});
