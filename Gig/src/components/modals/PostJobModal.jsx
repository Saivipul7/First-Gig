import { X } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
    "Graphics & Design",
    "Programming & Tech",
    "Digital Marketing",
    "Video & Animation",
    "Writing & Translation",
    "Music & Audio",
    "Business",
    "Data",
];

const PostJobModal = ({
    isOpen,
    onClose,
    title,
    setTitle,
    description,
    setDescription,
    budget,
    setBudget,
    category,
    setCategory,
    onPost,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg p-8 shadow-2xl relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-white">Create a Project Brief</h2>
                <div className="space-y-4">
                    <input
                        placeholder="Project Title"
                        className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full bg-black border border-zinc-700 p-3 rounded h-32 text-white focus:outline-none focus:border-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Budget (₹)"
                        type="number"
                        className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-white"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <select
                        className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-white"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Select Category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <button
                        onClick={onPost}
                        className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200"
                    >
                        Post Project
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PostJobModal;
