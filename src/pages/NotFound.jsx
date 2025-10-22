import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        to="/login"
        className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Login
      </Link>
    </div>
  );
}
