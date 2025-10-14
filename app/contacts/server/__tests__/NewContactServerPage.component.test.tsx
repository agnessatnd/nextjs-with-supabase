/** @jsxImportSource react */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NewContactPage from "../new/page";

describe("NewContactPage (component)", () => {
  it("renders form elements correctly", () => {
    render(<NewContactPage />);
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
