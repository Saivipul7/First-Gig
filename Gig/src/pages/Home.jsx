import { Link } from "react-router-dom";
import { CheckCircle, Users, Globe, Award } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen">

        {/* NAVBAR */}
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-4 text-white bg-black/40 backdrop-blur-md">

          {/* Logo */}
          <h1 className="text-xl font-bold">FirstGig 🚀</h1>

          {/* Nav Links */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/about" className="hover:text-gray-300 transition">
              About
            </Link>

            <Link to="/login" className="hover:text-gray-300 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-zinc-100 text-black px-4 py-1 rounded-lg hover:bg-zinc-200 transition font-bold"
            >
              Signup
            </Link>
          </div>
        </nav>

        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-6">

          <h1 className="text-5xl font-bold mb-6">
            Launch Your First Freelance Career 🚀
          </h1>

          <p className="mb-8 max-w-xl text-lg text-zinc-300">
            Connect with your first client and build your freelance journey today.
          </p>

          <Link to="/register">
            <button className="bg-zinc-100 text-black px-6 py-3 rounded-lg hover:bg-zinc-200 transition font-bold">
              Get Started
            </button>
          </Link>

        </div>
      </div>

      {/* SKILL SHOWCASE SECTION */}
      <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative flex flex-col justify-center px-6 py-20 overflow-hidden">

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20 -mt-32"></div>

        <div className="w-full relative z-10">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-500">
                <img src="https://ui-avatars.com/api/?name=Tharun+Speaks&background=random" alt="Avatar" />
              </div>
              <span className="text-zinc-400 text-sm font-medium">FirstGig presents</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-16">
            <p className="text-zinc-500 font-serif italic text-2xl mb-2">not just a</p>
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 tracking-tighter uppercase relative inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Freelance Market
              <span className="absolute -top-10 -right-10 text-8xl text-zinc-500/10 pointer-events-none">🚀</span>
            </h2>
          </div>

          {/* Scrolling Cards Marquee */}
          <div className="w-full overflow-hidden">
            <div className="relative flex overflow-x-hidden group">
              <div className="py-4 animate-marquee whitespace-nowrap flex gap-8">
                {[
                  { title: "Video Editing", img: "https://images.unsplash.com/photo-1574717432729-24e54433d7fc?auto=format&fit=crop&q=80&w=400" },
                  { title: "Web Design", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
                  { title: "Motion Graphics", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
                  { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
                  { title: "SEO", img: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80&w=400" },
                  { title: "Video Editing", img: "https://images.unsplash.com/photo-1574717432729-24e54433d7fc?auto=format&fit=crop&q=80&w=400" },
                  { title: "Web Design", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
                  { title: "Motion Graphics", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
                  { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
                  { title: "SEO", img: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80&w=400" }
                ].map((item, i) => (
                  <div key={i} className="min-w-[300px] md:min-w-[400px] h-[250px] relative rounded-xl overflow-hidden group cursor-pointer border border-zinc-500/20 hover:border-zinc-400 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <div className="h-1 w-12 bg-zinc-500 mb-4 rounded-full"></div>
                      <h3 className="text-3xl font-bold text-zinc-300 group-hover:text-white transition-colors">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex gap-8">
                {[
                  { title: "Video Editing", img: "https://images.unsplash.com/photo-1574717432729-24e54433d7fc?auto=format&fit=crop&q=80&w=400" },
                  { title: "Web Design", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
                  { title: "Motion Graphics", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
                  { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
                  { title: "SEO", img: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80&w=400" },
                  { title: "Video Editing", img: "https://images.unsplash.com/photo-1574717432729-24e54433d7fc?auto=format&fit=crop&q=80&w=400" },
                  { title: "Web Design", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=400" },
                  { title: "Motion Graphics", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
                  { title: "Digital Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
                  { title: "SEO", img: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80&w=400" }
                ].map((item, i) => (
                  <div key={`dup-${i}`} className="min-w-[300px] md:min-w-[400px] h-[250px] relative rounded-xl overflow-hidden group cursor-pointer border border-zinc-500/20 hover:border-zinc-400 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <div className="h-1 w-12 bg-zinc-500 mb-4 rounded-full"></div>
                      <h3 className="text-3xl font-bold text-zinc-300 group-hover:text-white transition-colors">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Text & CTA */}
          <div className="text-center mt-12 bg-transparent relative z-20">
            <p className="text-zinc-500 max-w-lg mx-auto mb-8 text-lg">
              The ultimate platform to kickstart your freelance journey.
            </p>
            <Link to="/register">
              <button className="bg-zinc-100 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Join now
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= ABOUT SECTION (3rd Scroll) ================= */}
      <div id="about" className="min-h-screen bg-black text-white relative py-24">

        {/* HERO SECTION */}
        <section className="relative px-6 max-w-5xl mx-auto text-center mb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-600/10 rounded-full blur-[120px] -z-10"></div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Empowering the Next Generation of Freelancers.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            FirstGig is more than just a marketplace; it's a launchpad. We bridge the gap between ambitious startups and emerging talent, creating opportunities that matter.
          </p>
        </section>


        {/* MISSION SECTION */}
        <section className="px-6 max-w-6xl mx-auto">
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
                    <CheckCircle size={20} className="text-zinc-100" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                <Users className="text-zinc-100 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Community First</h3>
                <p className="text-sm text-zinc-500">Built by freelancers, for freelancers.</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors mt-8">
                <Globe className="text-zinc-100 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                <p className="text-sm text-zinc-500">Connect with clients worldwide.</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                <Award className="text-zinc-100 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
                <p className="text-sm text-zinc-500">Verified skills and safe payments.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
