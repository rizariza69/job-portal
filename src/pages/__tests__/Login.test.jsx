// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Login from "../Login";
// import { MemoryRouter } from "react-router-dom";

// const mockNavigate = jest.fn();
// jest.mock("react-router-dom", async () => {
//   const actual = await jest.importActual("react-router-dom");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         users: [
//           { username: "admin", password: "1234", role: "admin" },
//           { username: "user", password: "abcd", role: "applicant" },
//         ],
//       }),
//   })
// );

// const mockSetItem = jest.fn();
// Object.defineProperty(window, "localStorage", {
//   value: { setItem: mockSetItem },
// });

// describe("Login Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders login title", () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );
//     expect(screen.getByText(/login/i)).toBeInTheDocument();
//   });

//   test("shows error when fields are empty and login clicked", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     expect(
//       await screen.findByText(/please fill in all fields/i)
//     ).toBeInTheDocument();
//   });

//   test("shows 'Invalid credentials' for wrong input", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(fetch).toHaveBeenCalled());

//     fireEvent.change(screen.getByPlaceholderText(/username/i), {
//       target: { value: "wronguser" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "wrongpass" },
//     });

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
//   });

//   test("navigates to /admin/jobs when admin login success", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(fetch).toHaveBeenCalled());

//     fireEvent.change(screen.getByPlaceholderText(/username/i), {
//       target: { value: "admin" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "1234" },
//     });

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     await waitFor(() => {
//       expect(mockSetItem).toHaveBeenCalled();
//       expect(mockNavigate).toHaveBeenCalledWith("/admin/jobs");
//     });
//   });

//   test("navigates to /jobs when normal user login success", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(fetch).toHaveBeenCalled());

//     fireEvent.change(screen.getByPlaceholderText(/username/i), {
//       target: { value: "user" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "abcd" },
//     });

//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     await waitFor(() => {
//       expect(mockSetItem).toHaveBeenCalled();
//       expect(mockNavigate).toHaveBeenCalledWith("/jobs");
//     });
//   });
// });

// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Login from "../Login"; // sesuaikan path-nya

// const mockNavigate = jest.fn();

// jest.mock("react-router-dom", () => {
//   const actual = jest.requireActual("react-router-dom"); // ✅ ini yang benar
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// describe("Login Page", () => {
//   test("renders login form", () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//   });

//   test("handles login button click", () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     const button = screen.getByRole("button", { name: /login/i });
//     fireEvent.click(button);

//     // contoh verifikasi
//     expect(mockNavigate).toHaveBeenCalled();
//   });
// });
/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        users: [
          { username: "admin", password: "1234", role: "admin" },
          { username: "user", password: "abcd", role: "applicant" },
        ],
      }),
  })
);

const mockSetItem = jest.fn();
Object.defineProperty(window, "localStorage", {
  value: { setItem: mockSetItem },
  writable: true,
});

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows invalid credentials for wrong user", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("navigates to /admin/jobs when admin login success", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/admin/jobs");
    });
  });

  test("navigates to /jobs when normal user login success", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "abcd" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/jobs");
    });
  });
});
