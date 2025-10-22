import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../NotFound";

describe("NotFound Page", () => {
  test("renders 404 title and message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // ✅ Periksa teks utama
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText(/Halaman yang kamu cari tidak ditemukan/i)
    ).toBeInTheDocument();
  });

  test("renders link to login page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /kembali ke login/i });

    // ✅ Pastikan link-nya ada dan atributnya benar
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
    expect(link).toHaveTextContent(/kembali ke login/i);
  });

  test("has correct styling classes", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const wrapper = screen.getByText("404").closest("div");

    // ✅ Pastikan class Tailwind dasar ada
    expect(wrapper).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });
});
