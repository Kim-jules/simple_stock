// components/layouts/UserLayout.jsx
import { Outlet, Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiLayers,
  FiBarChart2,
  FiUsers,
  FiMoon,
  FiSun,
  FiSearch,
} from "react-icons/fi";
import { useAuth } from "../contexts/authContext";
import { useTheme } from "../contexts/ThemeContext";

const UserLayout = () => {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const tabs = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Products", icon: <FiBox />, path: "/products" },
    { name: "Stocks", icon: <FiLayers />, path: "/stocks" },
    { name: "Report", icon: <FiBarChart2 />, path: "/report" },
  ];

  if (user?.role === "admin") {
    tabs.push({ name: "Users", icon: <FiUsers />, path: "/users" });
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col justify-between">
        <div>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">
              {user?.role === "admin" ? "Admin Panel" : "User Panel"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome, {user?.name ?? "Guest"}
            </p>
          </div>
          <nav className="mt-4 flex flex-col gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.path}
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-sm font-medium">{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
          >
            {dark ? <FiSun /> : <FiMoon />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="relative w-1/2 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user?.name}</span>
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
