import React from "react";
import { render, screen } from "@testing-library/react";
import ManageJob from "../../Admin/ManageJob";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../../assets/empty-state2.png", () => "mock-empty-state2.png");

describe("ManageJob Page", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test("renders empty state when no applicants", () => {
    const mockJob = {
      id: 1,
      title: "Frontend Developer",
      applicants: [],
    };

    localStorage.setItem("jobs", JSON.stringify([mockJob]));
    require("react-router-dom").useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ManageJob />
      </MemoryRouter>
    );

    expect(screen.getByAltText("No candidates")).toBeInTheDocument();
    expect(screen.getByText("No candidates found")).toBeInTheDocument();
    expect(screen.getByText(/Share your job vacancies/i)).toBeInTheDocument();
  });

  test("renders applicants when job found with candidates", () => {
    const mockJob = {
      id: 2,
      title: "Backend Engineer",
      applicants: [
        {
          fullName: "John Doe",
          email: "john@example.com",
          phone: "+628123456789",
          dob: "1995-05-20",
          domicile: "Jakarta",
          gender: "He/him (Male)",
          linkedin: "https://linkedin.com/in/johndoe",
        },
      ],
    };

    localStorage.setItem("jobs", JSON.stringify([mockJob]));
    require("react-router-dom").useParams.mockReturnValue({ id: "2" });

    render(
      <MemoryRouter>
        <ManageJob />
      </MemoryRouter>
    );

    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("08123456789")).toBeInTheDocument(); // +62 → 0 conversion
    expect(screen.getByText("Jakarta")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("20 Mei 1995")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/johndoe");
  });
});
