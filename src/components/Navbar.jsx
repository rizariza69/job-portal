import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";
export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isManagePage = /^\/admin\/manage\/\d+/.test(location.pathname);
  if (isManagePage) {
    return (
      <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-black font-bold hover:text-[#01959F] border border-[#E0E0E0]  text-[14px] px-2 py-1 rounded-md"
          >
            Job List
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <div className="bg-[#C2C2C2] w-[154px] flex items-center justify-center gap-1 text-black font-bold border border-[#E0E0E0]  text-[14px] px-2 py-1 rounded-md">
            Manage Job
          </div>
        </div>
        <div
          className={`relative flex items-center ${
            user.role === "applicant" ? "mr-32" : ""
          }`}
          ref={dropdownRef}
        >
          {user.role === "applicant" && (
            <div className="h-6 border-l border-gray-300 mr-3" />
          )}

          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <UserCircleIcon className="w-7 h-7 text-gray-700" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-[9999]">
              <p className="text-gray-700 text-sm px-4 py-2 border-b">
                {user.username}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      {user?.role === "admin" ? (
        <Link
          to="/admin/jobs"
          className="font-bold text-xl hover:text-blue-700 transition-colors"
        >
          Job List
        </Link>
      ) : (
        <div className="flex items-center"></div>
      )}

      {user && (
        <div
          className={`relative flex items-center ${
            user.role === "applicant" ? "mr-32" : ""
          }`}
          ref={dropdownRef}
        >
          {user.role === "applicant" && (
            <div className="h-6 border-l border-gray-300 mr-3" />
          )}

          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <UserCircleIcon className="w-7 h-7 text-gray-700" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-[9999]">
              <p className="text-gray-700 text-sm px-4 py-2 border-b">
                {user.username}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
