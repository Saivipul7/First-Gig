import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
import DashboardHome from "./DashboardHome";
import JobsTab from "./JobsTab";
import NetworkTab from "./NetworkTab";
import MessagesTab from "./MessagesTab";
import SearchResults from "./SearchResults";
import PostJobModal from "../modals/PostJobModal";
import EditProfileModal from "../modals/EditProfileModal";

const DashboardLayout = ({
    // User & data
    user,
    jobs,
    connections,
    freelancers,
    // Tab state
    activeTab,
    setActiveTab,
    selectedCategory,
    // Search
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleCategoryClick,
    // Modals
    isPostModalOpen,
    setIsPostModalOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isEditProfileOpen,
    setIsEditProfileOpen,
    // Post job form
    title, setTitle,
    description, setDescription,
    budget, setBudget,
    category, setCategory,
    postJob,
    // Edit profile form
    editName, setEditName,
    editTitle, setEditTitle,
    editBio, setEditBio,
    editSkills, setEditSkills,
    updateProfile,
    // Actions
    connectUser,
    acceptConnection,
    loadMessages,
    sendMessage,
    // Messages state
    chatUserId,
    messages,
    newMessage,
    setNewMessage,
}) => {
    const pendingRequests = connections.filter(
        (c) => c.status === "pending" && c.receiver?._id === user._id
    );

    return (
        <div className="min-h-screen font-sans text-gray-100 bg-black selection:bg-zinc-700 selection:text-white relative overflow-x-hidden">
            {/* SPOTLIGHT BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black opacity-80 pointer-events-none z-0"></div>

            {/* NAVBAR */}
            <Navbar
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                pendingRequests={pendingRequests}
                isNotificationsOpen={isNotificationsOpen}
                setIsNotificationsOpen={setIsNotificationsOpen}
                onAcceptConnection={acceptConnection}
                onEditProfile={() => setIsEditProfileOpen(true)}
            />

            {/* CATEGORY BAR */}
            <CategoryBar selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
                {activeTab === "dashboard" && (
                    <DashboardHome
                        user={user}
                        jobs={jobs}
                        connectUser={connectUser}
                        onPostJob={() => setIsPostModalOpen(true)}
                        onExplore={() => setActiveTab("jobs")}
                    />
                )}

                {activeTab === "jobs" && (
                    <JobsTab jobs={jobs} connectUser={connectUser} user={user} />
                )}

                {activeTab === "network" && (
                    <NetworkTab connections={connections} user={user} onMessage={loadMessages} />
                )}

                {activeTab === "messages" && (
                    <MessagesTab
                        connections={connections}
                        user={user}
                        chatUserId={chatUserId}
                        messages={messages}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        onLoadMessages={loadMessages}
                        onSendMessage={sendMessage}
                    />
                )}

                {activeTab === "search_results" && (
                    <SearchResults
                        selectedCategory={selectedCategory}
                        freelancers={freelancers}
                        jobs={jobs}
                        connectUser={connectUser}
                        user={user}
                    />
                )}
            </main>

            {/* MODALS */}
            <AnimatePresence>
                {isPostModalOpen && (
                    <PostJobModal
                        isOpen={isPostModalOpen}
                        onClose={() => setIsPostModalOpen(false)}
                        title={title} setTitle={setTitle}
                        description={description} setDescription={setDescription}
                        budget={budget} setBudget={setBudget}
                        category={category} setCategory={setCategory}
                        onPost={postJob}
                    />
                )}

                {isEditProfileOpen && (
                    <EditProfileModal
                        isOpen={isEditProfileOpen}
                        onClose={() => setIsEditProfileOpen(false)}
                        editName={editName} setEditName={setEditName}
                        editTitle={editTitle} setEditTitle={setEditTitle}
                        editBio={editBio} setEditBio={setEditBio}
                        editSkills={editSkills} setEditSkills={setEditSkills}
                        onSave={updateProfile}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardLayout;
