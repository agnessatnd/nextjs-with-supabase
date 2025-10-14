import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase/server", () => {
  const mockInsert = vi.fn();
  const mockFrom = vi.fn(() => ({ insert: mockInsert }));
  const mockCreateClient = vi.fn(() => ({ from: mockFrom }));
  return { createClient: mockCreateClient };
});

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import NewTodoPage from "../new/page";

beforeEach(() => vi.clearAllMocks());

describe("NewTodoPage (unit)", () => {
  it("inserts a new todo and redirects", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const { redirect } = await import("next/navigation");

    const supabase = await createClient();
    const formData = new FormData();
    formData.append("title", "Test new TODO");

    const component = await NewTodoPage();
    const action = component.props.action;
    await action(formData);

    expect(supabase.from).toHaveBeenCalledWith("todos");
    expect(redirect).toHaveBeenCalledWith("/todo");
  });
});