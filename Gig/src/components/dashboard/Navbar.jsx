import { Search } from "lucide-react";
import NotificationDropdown from "../modals/NotificationDropdown";

const Navbar = ({
    user,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    handleSearch,
    pendingRequests,
    isNotificationsOpen,
    setIsNotificationsOpen,
    onAcceptConnection,
    onEditProfile,
}) => {
    return (
        <nav className="border-b border-white/10 sticky top-0 bg-black/50 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10 w-full">

                {/* LOGO & SEARCH */}
                <div className="flex items-center gap-8 flex-1">
                    <h1
                        className="text-2xl font-bold tracking-tight text-white cursor-pointer"
                        onClick={() => setActiveTab("dashboard")}
                    >
                        FirstGig
                    </h1>
                    <div className="relative w-full max-w-md hidden md:block">
                        <input
                            className="w-full bg-zinc-900/80 border border-white/10 rounded-[4px] py-2.5 pl-4 pr-10 text-gray-200 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all placeholder:text-zinc-500"
                            placeholder="What service are you looking for today?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0 top-0 h-full w-10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* RIGHT ICONS */}
                <div className="flex items-center gap-6 text-gray-400 font-medium">
                    <button
                        className={`hover:text-white transition-colors ${activeTab === "jobs" ? "text-white font-bold" : ""}`}
                        onClick={() => setActiveTab("jobs")}
                    >
                        Explore
                    </button>
                    <button
                        className={`hover:text-white transition-colors ${activeTab === "network" ? "text-white font-bold" : ""}`}
                        onClick={() => setActiveTab("network")}
                    >
                        My Network
                    </button>
                    <button
                        className={`hover:text-white transition-colors ${activeTab === "messages" ? "text-white font-bold" : ""}`}
                        onClick={() => setActiveTab("messages")}
                    >
                        Messages
                    </button>

                    {/* NOTIFICATIONS */}
                    <NotificationDropdown
                        pendingRequests={pendingRequests}
                        isOpen={isNotificationsOpen}
                        onToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        onAccept={onAcceptConnection}
                    />

                    {/* PROFILE AVATAR */}
                    <div
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-zinc-700 to-black text-white flex items-center justify-center font-bold cursor-pointer hover:shadow-lg transition-all border border-zinc-600"
                        onClick={onEditProfile}
                        title="Edit Profile"
                    >
                        {user.name[0]}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
