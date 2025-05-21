import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkStyle = ({ isActive }) =>
    `block text-sm font-medium py-2 px-4 ${
      isActive
        ? "text-blue-600"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          StockTrack
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 pb-4">
          <nav className="flex flex-col gap-1">
            <NavLink to="/" className={navLinkStyle} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkStyle} onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkStyle}
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/login"
              className="text-sm text-blue-600 font-medium hover:underline"
              onClick={toggleMenu}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition text-center"
              onClick={toggleMenu}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
