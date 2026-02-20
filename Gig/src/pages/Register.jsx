import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import Teamwork from "../assets/Teamwork.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
    profession: "",
    skills: "",
    experience: "",
    bio: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const dataToSend = {
        ...form,
        skills:
          form.role === "freelancer"
            ? form.skills.split(",").map((skill) => skill.trim())
            : []
      };

      const response = await axios.post(
        `${API_URL}/register`,
        dataToSend
      );

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center text-white items-center justify-center p-10 relative"
        style={{ backgroundImage: `url(${Teamwork})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            FirstGig 🚀
          </h1>
          <p className="text-lg opacity-90">
            Join as a freelancer or hire fresh talent.
            Build your career from your first gig.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-6">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative z-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
            />

            {/* 🔥 Freelancer Fields */}
            {form.role === "freelancer" && (
              <>
                <select
                  name="category"
                  value={form.category || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 bg-white outline-none"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {[
                    "Graphics & Design",
                    "Programming & Tech",
                    "Digital Marketing",
                    "Video & Animation",
                    "Writing & Translation",
                    "Music & Audio",
                    "Business",
                    "Data"
                  ].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <input
                  type="text"
                  name="profession"
                  placeholder="Your Profession (Editor, Designer...)"
                  value={form.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
                />

                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (comma separated)"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
                />

                <input
                  type="text"
                  name="experience"
                  placeholder="Experience (e.g. 2 years)"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
                />

                <textarea
                  name="bio"
                  placeholder="Short Bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none"
                />
              </>
            )}

            {/* 🔥 Role Dropdown at Bottom */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 bg-white outline-none"
            >
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>

            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition"
            >
              Register
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-zinc-600 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
