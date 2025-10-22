import React from "react";
import { render, screen } from "@testing-library/react";
import ApplySuccess from "../../Applicant/ApplySuccess";

jest.mock("../../../assets/success.png", () => "mock-success.png");

describe("ApplySuccess Page", () => {
  test("renders success image with correct alt text", () => {
    render(<ApplySuccess />);
    const img = screen.getByAltText("Success");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "mock-success.png");
  });

  test("renders title text", () => {
    render(<ApplySuccess />);
    const title = screen.getByText(/your application was sent/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-2xl", "font-semibold");
  });

  test("renders description paragraph", () => {
    render(<ApplySuccess />);
    const paragraph = screen.getByText(/congratulations!/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-[#404040]");
  });

  test("renders correct layout classes on main container", () => {
    render(<ApplySuccess />);
    const container = screen.getByAltText("Success").closest("div");
    expect(container).toHaveClass(
      "min-h-screen",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "bg-white"
    );
  });
});
