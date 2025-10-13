import { describe, it, expect, vi } from "vitest";

const mockFrom = vi.fn(() => ({
  insert: vi.fn().mockResolvedValue({ data: [{ id: 1, title: "My new note" }] }),
}));

const mockCreateClient = vi.fn(() => ({
  from: mockFrom,
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

describe("NewNotePage", () => {
  it("creates a new note and redirects to /notes", async () => {
    const { createNote } = await import("../new/page");
    const { redirect } = await import("next/navigation");

    const form = {
      get: vi.fn().mockReturnValue("My new note"),
    } as unknown as FormData;

    await createNote(form);

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(redirect).toHaveBeenCalledWith("/notes");
  });
});

