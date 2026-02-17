import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen">

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-4 text-white bg-black/40 backdrop-blur-md">

        {/* Logo */}
        <h1 className="text-xl font-bold">FirstGig 🚀</h1>

        {/* Search Bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search skills (e.g. React, Design)"
            className="px-4 py-1 rounded-lg text-black focus:outline-none"
          />
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>

          <Link to="/login" className="hover:text-gray-300 transition">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 px-4 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-6">

        <h1 className="text-5xl font-bold mb-6">
          Launch Your First Freelance Career 🚀
        </h1>

        <p className="mb-8 max-w-xl text-lg">
          Connect with your first client and build your freelance journey today.
        </p>

        <Link to="/register">
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Home;
