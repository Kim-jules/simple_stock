import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

const Register = () => {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Simple validation rules
  const validate = () => {
    const errs = {};

    if (!formData.username.trim()) errs.username = "Username is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      errs.email = "Invalid email address";

    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!formData.role) errs.role = "Role is required";

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await register({
        username: formData.username,
        email: formData.email,
        role: formData.role,
        password: formData.password,
      });
      // Optionally reset form or redirect user here
    } catch (err) {
      // Assuming err.message available from backend or authContext
      alert("Registration failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Register
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Your username"
          />
          {errors.username && (
            <p className="mt-1 text-red-500 text-sm">{errors.username}</p>
          )}
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
          )}
        </label>

        {/* Role */}
        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">Role</span>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.role
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-red-500 text-sm">{errors.role}</p>
          )}
        </label>

        {/* Password */}
        <label className="block mb-6">
          <span className="text-gray-700 dark:text-gray-300">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="At least 6 characters"
          />
          {errors.password && (
            <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-semibold transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
