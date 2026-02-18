import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    try {
      const dataToSend = {
        ...form,
        skills:
          form.role === "freelancer"
            ? form.skills.split(",").map((skill) => skill.trim())
            : []
      };

      const response = await axios.post(
        "http://localhost:5000/api/register",
        dataToSend
      );

      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">
        <div>
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
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔥 Freelancer Fields */}
            {form.role === "freelancer" && (
              <>
                <input
                  type="text"
                  name="profession"
                  placeholder="Your Profession (Editor, Designer...)"
                  value={form.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (comma separated)"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="experience"
                  placeholder="Experience (e.g. 2 years)"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  name="bio"
                  placeholder="Short Bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}

            {/* 🔥 Role Dropdown at Bottom */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
