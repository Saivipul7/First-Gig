import { Briefcase, Users } from "lucide-react";
import JobCard from "../cards/JobCard";

const DashboardHome = ({ user, jobs, connectUser, onPostJob, onExplore }) => {
    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Welcome back, {user.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* CARD 1: POST BRIEF */}
                    {user.role === "client" && (
                        <div
                            className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 backdrop-blur-sm rounded-xl p-8 text-white relative overflow-hidden group cursor-pointer hover:border-zinc-600 transition-all"
                            onClick={onPostJob}
                        >
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Post a project brief</h3>
                                <p className="text-zinc-400 text-sm mb-6">Get tailored offers for your needs.</p>
                                <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded text-sm font-semibold transition-colors">
                                    Post Now
                                </button>
                            </div>
                            <Briefcase className="absolute -bottom-4 -right-4 w-32 h-32 text-zinc-800 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    )}

                    {/* CARD 2: PROFILE PROGRESS */}
                    <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:bg-zinc-900/80 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-zinc-400 text-xs tracking-wider uppercase">Profile Progress</h3>
                            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                        </div>
                        <p className="text-2xl font-bold mb-2 text-white">35%</p>
                        <p className="text-zinc-500 text-sm mb-4">Complete your profile to get more tailored suggestions.</p>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-white h-full w-[35%] shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
                        </div>
                    </div>

                    {/* CARD 3: GROW NETWORK */}
                    <div className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center hover:bg-zinc-900/80 transition-colors">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white mb-4">
                            <Users size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-1">Grow your network</h3>
                        <p className="text-zinc-500 text-sm">Connect with freelancers to build your team.</p>
                        <button onClick={onExplore} className="mt-4 text-white font-bold text-sm hover:text-zinc-300">
                            Explore Talent
                        </button>
                    </div>
                </div>
            </div>

            {/* RECENT JOBS SECTION */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-xl font-bold text-white">Recommended For You</h3>
                    <button onClick={onExplore} className="text-zinc-400 font-bold text-sm hover:text-white">
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jobs.slice(0, 4).map((job) => (
                        <JobCard key={job._id} job={job} connectUser={connectUser} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
