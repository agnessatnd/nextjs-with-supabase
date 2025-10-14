import { describe, it, expect, vi, beforeEach } from "vitest";
import { createContact } from "../new/page";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("NewContactPage (unit)", () => {
  const insertMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createClient as any).mockResolvedValue({
      from: vi.fn(() => ({
        insert: insertMock,
      })),
    });
  });

  it("creates a new contact and redirects", async () => {
    const formData = new FormData();
    formData.set("name", "Alice");
    formData.set("email", "a@a.com");
    formData.set("phone", "123");

    await createContact(formData);

    expect(insertMock).toHaveBeenCalledWith({
      name: "Alice",
      email: "a@a.com",
      phone: "123",
    });
    expect(redirect).toHaveBeenCalledWith("/contacts/server");
  });
});
