import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Briefcase, Network, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalUsers: 0, totalGigs: 0, totalConnections: 0 });
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get(`${API_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(statsRes.data);

            const usersRes = await axios.get(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(usersRes.data);
        } catch (error) {
            console.error("Error fetching admin data", error);
            if (error.response?.status === 403) {
                alert("Access Denied: Admins Only");
                navigate("/login");
            }
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`${API_URL}/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData(); // Refresh data
            alert("User deleted successfully");
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-medium mb-1">Total Users</p>
                        <h2 className="text-3xl font-bold text-white">{stats.totalUsers}</h2>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                        <Users size={24} />
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-medium mb-1">Total Gigs</p>
                        <h2 className="text-3xl font-bold text-white">{stats.totalGigs}</h2>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
                        <Briefcase size={24} />
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-zinc-500 text-sm font-medium mb-1">Total Connections</p>
                        <h2 className="text-3xl font-bold text-white">{stats.totalConnections}</h2>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                        <Network size={24} />
                    </div>
                </div>
            </div>

            {/* USER MANAGEMENT */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">User Management</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-zinc-900 text-xs uppercase font-bold text-zinc-500">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' :
                                                user.role === 'client' ? 'bg-blue-500/10 text-blue-400' :
                                                    'bg-green-500/10 text-green-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-500/10 transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
