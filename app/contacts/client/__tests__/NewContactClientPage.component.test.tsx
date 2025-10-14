/** @jsxImportSource react */
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NewContactClientPage from "../new/page";

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(),
    })),
  })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("NewContactClientPage (component)", () => {
  it("renders input fields and button", () => {
    render(<NewContactClientPage />);

    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("updates input values on typing", () => {
    render(<NewContactClientPage />);

    const name = screen.getByPlaceholderText("Full name") as HTMLInputElement;
    fireEvent.change(name, { target: { value: "Test User" } });
    expect(name.value).toBe("Test User");
  });
});
