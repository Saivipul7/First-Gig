import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Users, Globe, Award } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">

            {/* NAVBAR */}
            <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-6">
                <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Home</span>
                </Link>
                <h1 className="text-xl font-bold">FirstGig 🚀</h1>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

                <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    Empowering the Next Generation of Freelancers.
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    FirstGig is more than just a marketplace; it's a launchpad. We bridge the gap between ambitious startups and emerging talent, creating opportunities that matter.
                </p>
            </section>



            {/* MISSION SECTION */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                            We believe that everyone deserves a shot at their dream career. Traditional freelance platforms can be crowded and intimidating for newcomers. FirstGig changes that.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Zero barrier to entry for new talent.",
                                "Fair pricing and transparent projects.",
                                "Community-driven support system.",
                                "Focus on skill growth and portfolio building."
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-300">
                                    <CheckCircle size={20} className="text-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                            <Users className="text-blue-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Community First</h3>
                            <p className="text-sm text-zinc-500">Built by freelancers, for freelancers.</p>
                        </div>
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors mt-8">
                            <Globe className="text-purple-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                            <p className="text-sm text-zinc-500">Connect with clients worldwide.</p>
                        </div>
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                            <Award className="text-green-500 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
                            <p className="text-sm text-zinc-500">Verified skills and safe payments.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
                    <p className="text-zinc-400 mb-8">
                        Join thousands of others who are building their future on FirstGig.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                Join Now
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-white/10 transition-colors">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-sm">
                &copy; {new Date().getFullYear()} FirstGig. All rights reserved.
            </footer>

        </div>
    );
};

export default About;
