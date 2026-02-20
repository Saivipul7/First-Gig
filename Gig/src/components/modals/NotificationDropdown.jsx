import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationDropdown = ({ pendingRequests, isOpen, onToggle, onAccept }) => {
    return (
        <div className="relative">
            <button onClick={onToggle} className="relative hover:text-white">
                <Bell size={20} />
                {pendingRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-80 bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800 py-2 z-50"
                    >
                        <div className="px-4 py-2 border-b border-white/5 font-bold text-sm text-white">
                            Notifications
                        </div>
                        {pendingRequests.length === 0 ? (
                            <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                                No new notifications
                            </div>
                        ) : (
                            pendingRequests.map((req) => (
                                <div
                                    key={req._id}
                                    className="px-4 py-3 hover:bg-white/5 flex gap-3 items-start border-b border-white/5 last:border-0 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-xs">
                                        {req.sender.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold text-white">{req.sender.name}</span> wants to connect.
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => onAccept(req._id)}
                                                className="px-3 py-1 bg-white text-black text-xs rounded font-bold hover:bg-gray-200"
                                            >
                                                Accept
                                            </button>
                                            <button className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs rounded font-bold hover:bg-zinc-800 hover:text-white">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;
