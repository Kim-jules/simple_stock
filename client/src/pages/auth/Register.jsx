import { useState } from "react";
import { useAuth } from "../../contexts/authContext";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      setSuccess("User created successfully.");
      setFormData({ username: "", email: "", role: "user", password: "" });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <div className="msg">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </div>
      <div className="container flex flex-col bg-slate-50">
        <div className="header">
          <h2 className="text-2xl font-bold">Register</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} method="post" className="flex flex-col">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email"
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user" defaultValue={"user"}>
                user
              </option>
              <option value="admin">admin</option>
            </select>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
