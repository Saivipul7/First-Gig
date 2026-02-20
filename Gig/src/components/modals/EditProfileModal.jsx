import { X } from "lucide-react";
import { motion } from "framer-motion";

const EditProfileModal = ({
    isOpen,
    onClose,
    editName,
    setEditName,
    editTitle,
    setEditTitle,
    editBio,
    setEditBio,
    editSkills,
    setEditSkills,
    onSave,
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
                <h2 className="text-2xl font-bold mb-6 text-white">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-zinc-400 text-sm mb-1">Full Name</label>
                        <input
                            className="w-full bg-black border border-zinc-700 p-2.5 rounded focus:border-white focus:outline-none text-white"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-400 text-sm mb-1">Professional Title</label>
                        <input
                            className="w-full bg-black border border-zinc-700 p-2.5 rounded focus:border-white focus:outline-none text-white"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-400 text-sm mb-1">Bio</label>
                        <textarea
                            className="w-full bg-black border border-zinc-700 p-2.5 rounded focus:border-white focus:outline-none h-24 resize-none text-white"
                            value={editBio}
                            onChange={(e) => setEditBio(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-400 text-sm mb-1">Skills (comma separated)</label>
                        <input
                            className="w-full bg-black border border-zinc-700 p-2.5 rounded focus:border-white focus:outline-none text-white"
                            value={editSkills}
                            onChange={(e) => setEditSkills(e.target.value)}
                            placeholder="React, Node.js, Design..."
                        />
                    </div>
                    <button
                        onClick={onSave}
                        className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 mt-2"
                    >
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditProfileModal;
