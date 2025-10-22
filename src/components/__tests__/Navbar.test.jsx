import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("Navbar Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders admin Navbar correctly", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "AdminUser", role: "admin" })
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Job List")).toBeInTheDocument();
  });

  test("renders applicant Navbar with divider", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "Applicant", role: "applicant" })
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("toggles dropdown on avatar click", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "UserA", role: "admin" })
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const avatarBtn = screen.getByRole("button");
    fireEvent.click(avatarBtn);

    expect(screen.getByText("UserA")).toBeInTheDocument();

    fireEvent.click(avatarBtn);
    expect(screen.queryByText("UserA")).not.toBeInTheDocument();
  });

  test("logout button clears localStorage and navigates to /login", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "UserA", role: "admin" })
    );

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const avatarBtn = screen.getByRole("button");
    fireEvent.click(avatarBtn);

    const logoutBtn = screen.getByText("Logout");
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem("user")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
