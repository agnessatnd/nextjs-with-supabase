import { describe, it, expect, vi } from "vitest";

const mockOrder = vi.fn().mockResolvedValue({
  data: [
    { id: 1, title: "First note" },
    { id: 2, title: "Second note" },
  ],
});

const mockSelect = vi.fn(() => ({
  order: mockOrder,
}));

const mockFrom = vi.fn(() => ({
  select: mockSelect,
}));

const mockCreateClient = vi.fn(() => ({
  from: mockFrom,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

describe("NotesPage", () => {
  it("fetches and returns notes from Supabase", async () => {
    const { default: NotesPage } = await import("../page");
    const { renderToString } = await import("react-dom/server");

    const result = await NotesPage();
    const html = renderToString(result);

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(mockSelect).toHaveBeenCalled();
    expect(mockOrder).toHaveBeenCalledWith("created_at", { ascending: false });

    expect(html).toContain("Notes");
    expect(html).toContain("First note");
    expect(html).toContain("Second note");
  });
});
