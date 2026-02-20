import JobCard from "../cards/JobCard";
import FreelancerCard from "../cards/FreelancerCard";

const SearchResults = ({ selectedCategory, freelancers, jobs, connectUser, user }) => {
    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-bold text-white">
                Results for <span className="text-zinc-400">"{selectedCategory}"</span>
            </h2>

            {/* FREELANCERS SECTION */}
            <div>
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Freelancers</h3>
                {freelancers.length === 0 ? (
                    <div className="text-zinc-500 italic">No freelancers found in this category.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {freelancers.map((f) => (
                            <FreelancerCard key={f._id} freelancer={f} connectUser={connectUser} />
                        ))}
                    </div>
                )}
            </div>

            {/* GIGS SECTION */}
            <div>
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Available Gigs</h3>
                {jobs.length === 0 ? (
                    <div className="text-zinc-500 italic">No gigs found in this category.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} connectUser={connectUser} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
