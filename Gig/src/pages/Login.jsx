import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import Teamwork from "../assets/Teamwork.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Allow admin email or Gmail accounts only
    const isAdminEmail = form.email === "admin@firstgig.com";
    const isGmail = form.email.endsWith("@gmail.com");

    if (!isGmail && !isAdminEmail) {
      alert("Only Gmail accounts are allowed.");
      return;
    }



    try {
      const response = await axios.post(
        `${API_URL}/login`,
        form
      );

      // ✅ Save token correctly
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // Save role for easy access

      alert("Login successful");

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg === "User not found") {
        alert("User not found. Please register.");
      } else if (msg === "Invalid credentials") {
        alert("Invalid credentials. Please check your password.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url(${Teamwork})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to continue your freelance journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-zinc-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
