import { describe, it, expect, vi } from "vitest";
import { POST } from "../delete/[id]/route";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("DeleteContact (unit)", () => {
  it("deletes a contact successfully", async () => {
    const deleteMock = vi.fn(() => ({
      eq: vi.fn().mockResolvedValue({ error: null }),
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createClient as any).mockResolvedValue({
      from: vi.fn(() => ({
        delete: deleteMock,
      })),
    });

    const request = new NextRequest("http://localhost:3000/contacts/server/delete/1");
    const response = await POST(request, { params: Promise.resolve({ id: "1" }) });

    expect(response.status).toBe(307);
  });

  it("returns error response when deletion fails", async () => {
    const deleteMock = vi.fn(() => ({
      eq: vi.fn().mockResolvedValue({ error: { message: "Failed" } }),
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createClient as any).mockResolvedValue({
      from: vi.fn(() => ({
        delete: deleteMock,
      })),
    });

    const request = new NextRequest("http://localhost:3000/contacts/server/delete/99");
    const response = await POST(request, { params: Promise.resolve({ id: "99" }) });

    expect(response.status).toBe(400);
  });
});
