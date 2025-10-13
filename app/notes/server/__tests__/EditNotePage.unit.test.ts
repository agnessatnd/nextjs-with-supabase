import React from "react";
(globalThis as unknown as { React: typeof React }).React = React;

import { describe, it, expect, vi } from "vitest";

const mockEq = vi.fn().mockResolvedValue({});
const mockUpdate = vi.fn(() => ({ eq: mockEq }));
const mockSelect = vi.fn(() => ({
  eq: vi.fn().mockReturnThis(),
  single: vi.fn().mockResolvedValue({ data: { id: 1, title: "Old title" } }),
}));
const mockFrom = vi.fn(() => ({ select: mockSelect, update: mockUpdate }));

const mockCreateClient = vi.fn(() => ({
  from: mockFrom,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("EditNotePage unit logic", () => {
  it("updates note correctly and redirects", async () => {
    const { updateNote } = await import("../edit/[id]/page");
    const { redirect } = await import("next/navigation");

    const form = {
      get: vi.fn().mockReturnValue("Edited title"),
    } as unknown as FormData;

    await updateNote(form, "1");

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalledWith("notes");
    expect(mockUpdate).toHaveBeenCalledWith({ title: "Edited title" });
    expect(mockEq).toHaveBeenCalledWith("id", "1");
    expect(redirect).toHaveBeenCalledWith("/notes/server");
  });
});
