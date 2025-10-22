import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/mock/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => setError("Failed to load users.json"));
  }, []);

  const handleLogin = () => {
    if (!form.username || !form.password) {
      setTouched({ username: true, password: true });
      setError("Please fill in all fields");
      return;
    }

    const match = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (match) {
      localStorage.setItem("user", JSON.stringify(match));
      navigate(match.role === "admin" ? "/admin/jobs" : "/jobs");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (touched[field]) setError("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className={`w-full border rounded-md p-2.5 focus:ring-1 focus:outline-none transition-all ${
              !form.username && touched.username
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary focus:ring-primary"
            }`}
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => setTouched({ ...touched, username: true })}
          />
          {!form.username && touched.username && (
            <p className="text-red-500 text-xs mt-1">
              This field cannot be empty
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded-md p-2.5 focus:ring-1 focus:outline-none transition-all ${
              !form.password && touched.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary focus:ring-primary"
            }`}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
          {!form.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">
              This field cannot be empty
            </p>
          )}
        </div>
        {error && !(!form.username || !form.password) && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-[#018088] text-white font-semibold py-2.5 rounded-md transition-all duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
