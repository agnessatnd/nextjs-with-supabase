import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("next/server", () => {
  const mockJson = vi.fn();
  const mockRedirect = vi.fn();

  class MockRequest {
    url: string;
    constructor(url: string) {
      this.url = url;
    }
  }

  return {
    NextRequest: MockRequest,
    NextResponse: { json: mockJson, redirect: mockRedirect },
  };
});

vi.mock("@/lib/supabase/server", () => {
  const mockEq = vi.fn();
  const mockDelete = vi.fn(() => ({ eq: mockEq }));
  const mockFrom = vi.fn(() => ({ delete: mockDelete }));
  const mockCreateClient = vi.fn(() => ({ from: mockFrom }));

  return { createClient: mockCreateClient };
});

import { POST } from "../delete/[id]/route";

beforeEach(() => vi.clearAllMocks());

describe("DeleteTodo API route", () => {
  it("deletes a todo and redirects to /todo", async () => {
    const { NextResponse } = await import("next/server");
    const { createClient } = await import("@/lib/supabase/server");

    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;

    mockFrom.mockReturnValueOnce({
      delete: vi.fn(() => ({
        eq: vi.fn().mockResolvedValueOnce({ error: null }),
      })),
    });

    const request = new NextRequest("http://localhost/todo/delete/1");
    const context = { params: Promise.resolve({ id: "1" }) };

    await POST(request, context);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/todo", request.url)
    );
  });

  it("returns error JSON response if deletion fails", async () => {
    const { NextResponse } = await import("next/server");
    const { createClient } = await import("@/lib/supabase/server");

    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;

    mockFrom.mockReturnValueOnce({
      delete: vi.fn(() => ({
        eq: vi.fn().mockResolvedValueOnce({
          error: { message: "Failed to delete todo" },
        }),
      })),
    });

    const request = new NextRequest("http://localhost/todo/delete/2");
    const context = { params: Promise.resolve({ id: "2" }) };

    await POST(request, context);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { success: false, error: "Failed to delete todo" },
      { status: 400 }
    );
  });

  it("calls Supabase .from('todos').delete().eq() correctly", async () => {
    const { createClient } = await import("@/lib/supabase/server");

    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;
    const mockDelete = vi.fn(() => ({
      eq: vi.fn().mockResolvedValueOnce({ error: null }),
    }));

    mockFrom.mockReturnValueOnce({ delete: mockDelete });

    const request = new NextRequest("http://localhost/todo/delete/3");
    const context = { params: Promise.resolve({ id: "3" }) };

    await POST(request, context);

    expect(mockFrom).toHaveBeenCalledWith("todos");
    expect(mockDelete).toHaveBeenCalled();
  });
});
