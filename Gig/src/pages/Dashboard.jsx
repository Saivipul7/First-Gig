import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import DashboardLayout from "../components/dashboard/DashboardLayout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [connections, setConnections] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatUserId, setChatUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Post job form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  // Modal state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Edit profile state
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editSkills, setEditSkills] = useState("");

  const token = localStorage.getItem("token");

  /* ===== LOAD DATA ===== */
  const loadData = async () => {
    try {
      const jobsRes = await axios.get(`${API_URL}/gigs`);
      setJobs(jobsRes.data || []);

      const connRes = await axios.get(`${API_URL}/my-connections`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnections(connRes.data || []);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
        setEditName(res.data.name);
        setEditTitle(res.data.profession || "");
        setEditBio(res.data.bio || "");
        setEditSkills(res.data.skills?.join(", ") || "");
        loadData();
      });
  }, []);

  /* ===== ACTIONS ===== */
  const postJob = async () => {
    if (!title || !description || !budget || !category) {
      alert("Please fill in all fields including category.");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/gigs`,
        { title, description, budget, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle(""); setDescription(""); setBudget(""); setCategory("");
      setIsPostModalOpen(false);
      loadData();
      alert("Job Posted Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post job");
    }
  };

  const connectUser = async (receiverId) => {
    try {
      await axios.post(
        `${API_URL}/connect`,
        { receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Connection Request Sent!");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request");
    }
  };

  const acceptConnection = async (id) => {
    try {
      await axios.patch(`${API_URL}/connect/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
      setIsNotificationsOpen(false);
    } catch (error) {
      alert("Failed to accept");
    }
  };

  const loadMessages = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatUserId(id);
      setMessages(res.data);
      setActiveTab("messages");
      setIsNotificationsOpen(false);
    } catch (error) {
      alert("Failed to load messages");
    }
  };

  const sendMessage = async () => {
    if (!newMessage) return;
    try {
      await axios.post(
        `${API_URL}/message`,
        { receiverId: chatUserId, text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
      loadMessages(chatUserId);
    } catch (error) {
      alert("Failed to send message");
    }
  };

  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat);
    setActiveTab("search_results");
    try {
      const freelancerRes = await axios.get(
        `${API_URL}/freelancers?category=${encodeURIComponent(cat)}`
      );
      setFreelancers(freelancerRes.data);
      const jobsRes = await axios.get(
        `${API_URL}/gigs?category=${encodeURIComponent(cat)}`
      );
      setJobs(jobsRes.data);
    } catch (error) {
      console.error("Error fetching category data", error);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!searchTerm.trim()) return;
      setActiveTab("search_results");
      setSelectedCategory(`Search: ${searchTerm}`);
      try {
        const freelancerRes = await axios.get(
          `${API_URL}/freelancers?search=${encodeURIComponent(searchTerm)}`
        );
        setFreelancers(freelancerRes.data);
        setJobs([]);
      } catch (error) {
        console.error("Search error", error);
      }
    }
  };

  const updateProfile = async () => {
    try {
      const updatedData = {
        name: editName,
        profession: editTitle,
        bio: editBio,
        skills: editSkills.split(",").map((s) => s.trim()),
      };
      await axios.patch(`${API_URL}/me`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...updatedData });
      setIsEditProfileOpen(false);
      alert("Profile Updated!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );

  return (
    <DashboardLayout
      user={user}
      jobs={jobs}
      connections={connections}
      freelancers={freelancers}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedCategory={selectedCategory}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
      handleCategoryClick={handleCategoryClick}
      isPostModalOpen={isPostModalOpen}
      setIsPostModalOpen={setIsPostModalOpen}
      isNotificationsOpen={isNotificationsOpen}
      setIsNotificationsOpen={setIsNotificationsOpen}
      isEditProfileOpen={isEditProfileOpen}
      setIsEditProfileOpen={setIsEditProfileOpen}
      title={title} setTitle={setTitle}
      description={description} setDescription={setDescription}
      budget={budget} setBudget={setBudget}
      category={category} setCategory={setCategory}
      postJob={postJob}
      editName={editName} setEditName={setEditName}
      editTitle={editTitle} setEditTitle={setEditTitle}
      editBio={editBio} setEditBio={setEditBio}
      editSkills={editSkills} setEditSkills={setEditSkills}
      updateProfile={updateProfile}
      connectUser={connectUser}
      acceptConnection={acceptConnection}
      loadMessages={loadMessages}
      sendMessage={sendMessage}
      chatUserId={chatUserId}
      messages={messages}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
    />
  );
}

export default Dashboard;
