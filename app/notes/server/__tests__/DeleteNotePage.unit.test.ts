import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

vi.mock("next/server", () => {
  const mockJson = vi.fn();
  const mockRedirect = vi.fn();

  return {
    NextRequest: vi.fn(),
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

describe("DeleteNote route logic", () => {
  it("deletes a note and redirects to /notes/server", async () => {
    const { NextResponse } = await import("next/server");
    const { createClient } = await import("@/lib/supabase/server");

    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;
    const mockDelete = vi.fn(() => ({
      eq: vi.fn().mockResolvedValueOnce({ error: null }),
    }));
    mockFrom.mockReturnValueOnce({ delete: mockDelete });

    const request = new NextRequest("http://localhost/notes/delete/1");
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (request as any).url = "http://localhost/notes/delete/1";

    const context = { params: Promise.resolve({ id: "1" }) };

    await POST(request, context);

    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it("returns error response when Supabase fails", async () => {
    const { NextResponse } = await import("next/server");
    const { createClient } = await import("@/lib/supabase/server");

    const supabase = await createClient();
    const mockFrom = supabase.from as ReturnType<typeof vi.fn>;
    const mockDelete = vi.fn(() => ({
      eq: vi.fn().mockResolvedValueOnce({
        error: { message: "Deletion failed" },
      }),
    }));
    mockFrom.mockReturnValueOnce({ delete: mockDelete });

    const request = new NextRequest("http://localhost/notes/delete/2");
    const context = { params: Promise.resolve({ id: "2" }) };

    await POST(request, context);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { success: false, error: "Deletion failed" },
      { status: 400 }
    );
  });
});
