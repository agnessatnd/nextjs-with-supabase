import { describe, it, expect, vi, beforeEach, MockInstance } from "vitest";
import { updateContact } from "../edit/[id]/page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("EditContactPage (unit)", () => {
  const eqMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (createClient as unknown as MockInstance).mockResolvedValue({
      from: vi.fn(() => ({
        update: vi.fn(() => ({
          eq: eqMock,
        })),
      })),
    });
  });

  it("updates contact and redirects", async () => {
    const formData = new FormData();
    formData.set("name", "Bob");
    formData.set("email", "b@b.com");
    formData.set("phone", "555");

    await updateContact(formData, "1");

    expect(eqMock).toHaveBeenCalledWith("id", "1");
    expect(redirect).toHaveBeenCalledWith("/contacts/server");
  });
});
