// components/layouts/GuestLayout.jsx
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const GuestLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 dark:text-white"
          >
            StockTrack
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-800 dark:text-white hover:text-blue-500"
            >
              About
            </Link>
            <div className="ml-auto space-x-4">
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Login
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" className="block text-gray-800 dark:text-white">
              Home
            </Link>
            <Link to="/about" className="block text-gray-800 dark:text-white">
              About
            </Link>
            <Link to="/register" className="block text-blue-600">
              Register
            </Link>
            <Link to="/login" className="block text-blue-600">
              Login
            </Link>
          </div>
        )}
      </header>

      <main className="p-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default GuestLayout;
