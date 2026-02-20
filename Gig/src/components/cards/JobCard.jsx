import { Briefcase, Heart } from "lucide-react";

const JobCard = ({ job, connectUser, user }) => {
    if (!job.createdBy) return null;
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-lg overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-1">
            {/* Placeholder Image */}
            <div className="h-40 bg-zinc-800 relative group-hover:bg-zinc-700 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                    <Briefcase size={32} opacity={0.5} />
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-zinc-800 rounded-full text-xs flex items-center justify-center font-bold text-zinc-400">
                        {job.createdBy.name[0]}
                    </div>
                    <span className="font-bold text-sm text-gray-200">{job.createdBy.name}</span>
                    <span className="text-zinc-600 text-xs ml-auto">Level 2</span>
                </div>
                <h3 className="line-clamp-2 text-gray-300 font-medium mb-2 group-hover:text-white transition-colors cursor-pointer h-12">
                    {job.title}
                </h3>
                <div className="flex items-center text-white text-sm gap-1 mb-4">
                    <span>★</span><span className="font-bold text-white">5.0</span><span className="text-zinc-500">(21)</span>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <Heart size={16} className="text-zinc-500 cursor-pointer hover:text-red-500" />
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wide">STARTING AT <span className="text-lg text-white normal-case ml-1">₹{job.budget}</span></div>
                </div>

                {user._id !== job.createdBy._id && (
                    <button onClick={() => connectUser(job.createdBy._id)} className="w-full mt-4 bg-transparent border border-zinc-700 text-zinc-400 py-2 rounded font-bold hover:bg-white hover:text-black transition-colors">
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
};

export default JobCard;
