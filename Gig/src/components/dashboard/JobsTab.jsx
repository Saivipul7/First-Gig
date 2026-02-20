import JobCard from "../cards/JobCard";

const JobsTab = ({ jobs, connectUser, user }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} connectUser={connectUser} user={user} />
            ))}
        </div>
    );
};

export default JobsTab;
