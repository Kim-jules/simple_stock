import { useState } from "react";
import {
  FiHome,
  FiBox,
  FiLayers,
  FiUsers,
  FiBarChart2,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/authContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const commonTabs = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Products", icon: <FiBox />, path: "/products" },
    { name: "Stocks", icon: <FiLayers />, path: "/stocks" },
    { name: "Report", icon: <FiBarChart2 />, path: "/report" },
  ];

  const adminTabs = [
    ...commonTabs,
    { name: "Users", icon: <FiUsers />, path: "/users" },
  ];

  const navItems = user?.role === "admin" ? adminTabs : commonTabs;

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          w-64
          transform transition-transform duration-300 ease-in-out
          z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        {/* Top Navbar in Sidebar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {/* Profile Pic */}
          <img
            src={user?.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* Username and Search */}
          <div className="flex-1 flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-white truncate">
              {user?.name || "User"}
            </span>
            <div className="relative mt-2">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="flex flex-col">
            {navItems.map(({ name, icon, path }) => (
              <li key={name}>
                <a
                  href={path}
                  className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout & Theme Toggle */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
          <button
            onClick={logout}
            className="w-full py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {dark ? <FiSun /> : <FiMoon />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
