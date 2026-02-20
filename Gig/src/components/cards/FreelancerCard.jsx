const FreelancerCard = ({ freelancer, connectUser }) => {
    const f = freelancer;
    return (
        <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    {f.name[0]}
                </div>
                <div>
                    <h4 className="font-bold text-white text-lg">{f.name}</h4>
                    <p className="text-zinc-400 text-sm">{f.profession}</p>
                </div>
            </div>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{f.bio || "No bio available."}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {f.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">{skill}</span>
                ))}
            </div>
            <button
                onClick={() => connectUser(f._id)}
                className="w-full bg-white text-black py-2 rounded font-bold hover:bg-gray-200 transition-colors"
            >
                Connect
            </button>
        </div>
    );
};

export default FreelancerCard;
