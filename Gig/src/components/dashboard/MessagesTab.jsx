import { Send } from "lucide-react";

const MessagesTab = ({ connections, user, chatUserId, messages, newMessage, setNewMessage, onLoadMessages, onSendMessage }) => {
    return (
        <div className="bg-zinc-900/50 border border-white/5 rounded-lg h-[600px] flex backdrop-blur-sm">
            {/* Sidebar List */}
            <div className="w-64 border-r border-white/5 p-4 hidden md:block">
                <h3 className="font-bold mb-4 text-white">Inbox</h3>
                <div className="space-y-2">
                    {connections
                        .filter((c) => c.status === "accepted")
                        .map((c) => {
                            const other = c.sender?._id === user._id ? c.receiver : c.sender;
                            return (
                                <div
                                    key={c._id}
                                    onClick={() => onLoadMessages(other._id)}
                                    className="p-3 hover:bg-white/5 rounded cursor-pointer flex items-center gap-3 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                                    <div className="font-semibold text-sm text-gray-300">{other.name}</div>
                                </div>
                            );
                        })}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {chatUserId ? (
                    <>
                        <div className="p-4 border-b border-white/5 font-bold text-white">Conversation</div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((m) => (
                                <div key={m._id} className={`flex ${m.sender === user._id ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${m.sender === user._id ? "bg-zinc-200 text-black" : "bg-zinc-800 text-gray-200"
                                            }`}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-white/5 flex gap-2">
                            <input
                                className="flex-1 bg-zinc-900 border border-zinc-700 rounded p-2 focus:outline-none focus:border-white text-white placeholder:text-zinc-600"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
                            />
                            <button onClick={onSendMessage} className="bg-white text-black p-2 rounded hover:bg-gray-200">
                                <Send size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-600">Select a conversation</div>
                )}
            </div>
        </div>
    );
};

export default MessagesTab;
