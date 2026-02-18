import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch gigs
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gigs");
        const data = await res.json();
        setGigs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGigs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome to FirstGig 🚀
        </h2>
        <p className="text-gray-500 mt-2">
          Browse gigs and start building your freelance career.
        </p>
      </div>

      {/* Gigs Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Available Gigs
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {gigs.length === 0 ? (
            <p>No gigs available</p>
          ) : (
            gigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-lg font-bold mb-2">
                  {gig.title}
                </h4>

                <p className="text-gray-600 text-sm mb-3">
                  {gig.description}
                </p>

                <p className="text-blue-600 font-semibold">
                  ₹ {gig.budget}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
