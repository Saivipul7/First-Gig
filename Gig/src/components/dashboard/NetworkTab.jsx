const NetworkTab = ({ connections, user, onMessage }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Network</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {connections.map((conn) => {
                    const isSender = conn.sender?._id === user._id;
                    const other = isSender ? conn.receiver : conn.sender;
                    if (!other) return null;
                    return (
                        <div key={conn._id} className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-400">
                                    {other.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{other.name}</h4>
                                    <p className="text-sm text-zinc-500 capitalize">{other.role}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                {conn.status === "accepted" ? (
                                    <button
                                        onClick={() => onMessage(other._id)}
                                        className="w-full bg-white text-black py-2 rounded font-bold text-sm hover:bg-gray-200"
                                    >
                                        Message
                                    </button>
                                ) : (
                                    <div className="text-center text-sm text-zinc-500 italic">Request Pending</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NetworkTab;
