import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

import Home from "./pages/Guest/Home";
import About from "./pages/Guest/About";
import RegisterForm from "./pages/Auth/Register";
import LoginForm from "./pages/Auth/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Stocks from "./pages/Admin/Stocks";
import Report from "./pages/Admin/Report";
import Users from "./pages/Admin/Users";

import GuestLayout from "./layouts/GuestLayout";
import UserLayout from "./layouts/UserLayout";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen w-full bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <Router>
        <Routes>
          {/* Guest Routes */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* User Routes (Protected) */}

          <Route
            element={
              <RoleBasedRoutes allowedRoles={["user", "admin"]}>
                <UserLayout />
              </RoleBasedRoutes>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/report" element={<Report />} />
          </Route>

          {/* Admin Only Route */}
          <Route
            element={
              <RoleBasedRoutes allowedRoles={["admin"]}>
                <UserLayout />
              </RoleBasedRoutes>
            }
          >
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
