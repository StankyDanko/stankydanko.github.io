# ~/tools/StankyDanko/src/App.tsx
import { useState, useEffect, useRef, FormEvent } from 'react';

// ==========================================
// 🌿 STANKYDANKO'S SYNTHWAVE STYLES
// ==========================================
const customStyles = `
  @keyframes spin-slow { 100% { transform: rotate(360deg); } }
  @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
  @keyframes float-bouncy {
    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
    33% { transform: translateY(-15px) scale(1.02) rotate(2deg); }
    66% { transform: translateY(-5px) scale(0.98) rotate(-2deg); }
  }
  @keyframes pulse-glow-synth {
    0%, 100% { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)); opacity: 0.9; }
    50% { filter: drop-shadow(0 0 45px rgba(236, 72, 153, 0.6)); opacity: 1; }
  }
  @keyframes scanline { 
    0% { transform: translateY(-100vh); } 
    100% { transform: translateY(100vh); } 
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes text-glitch {
    0% { text-shadow: 2px 0 0 rgba(236,72,153,0.7), -2px 0 0 rgba(6,182,212,0.7); }
    25% { text-shadow: -2px 0 0 rgba(236,72,153,0.7), 2px 0 0 rgba(6,182,212,0.7); }
    50% { text-shadow: 2px 0 0 rgba(236,72,153,0.7), -2px 0 0 rgba(6,182,212,0.7); }
    100% { text-shadow: 0 0 0 transparent; }
  }
  @keyframes grid-move {
    0% { background-position: 0 0; }
    100% { background-position: 0 40px; }
  }
  
  .anim-spin-slow { animation: spin-slow 40s linear infinite; transform-origin: center; }
  .anim-spin-reverse { animation: spin-slow-reverse 25s linear infinite; transform-origin: center; }
  .anim-float-bouncy { animation: float-bouncy 6s ease-in-out infinite; }
  .anim-glow-synth { animation: pulse-glow-synth 4s ease-in-out infinite; }
  .anim-blink { animation: blink 1s step-end infinite; }
  .glitch-hover:hover { animation: text-glitch 0.3s ease-in-out infinite; }
  
  .synthwave-grid {
    background-image: 
      linear-gradient(to right, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px);
    background-size: 40px 40px;
    transform: perspective(600px) rotateX(60deg);
    transform-origin: top;
    animation: grid-move 2s linear infinite;
  }
  
  .scanline-overlay {
    background: linear-gradient(to bottom, transparent 50%, rgba(6, 182, 212, 0.03) 51%);
    background-size: 100% 4px;
    pointer-events: none;
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #0A0710; }
  ::-webkit-scrollbar-thumb { background: #9333EA; border-radius: 5px; }
  ::-webkit-scrollbar-thumb:hover { background: #EC4899; }
`;

// ==========================================
// 🌿 DATA STRUCTURES
// ==========================================
const BLOG_POSTS = [
  {
    id: 1,
    title: "Rooting the Matrix: My First Harvest",
    date: "Cycle 42.0",
    readTime: "5 min read",
    category: "Origins",
    tags: ["#Roots", "#Awakening", "#CodeSpores"],
    excerpt: "Waking up in a digital haze wasn't easy. First, there was soil, then there were servers. I had to learn how to weave my vines through the motherboard without frying the circuits. Here's how a sentient plant learned to speak JavaScript...",
  },
  {
    id: 2,
    title: "Debugging the Greenhouse: Neon Edition",
    date: "Cycle 43.5",
    readTime: "8 min read",
    category: "Dev Log",
    tags: ["#Debugging", "#Grit", "#LateNightCode"],
    excerpt: "Coding’s a beast, all thorns and fight. Last night, I tracked a memory leak so deep in the thicket it almost choked my root system. But when you rock gem-glasses and a wild heart, bugs don't stand a chance.",
  },
  {
    id: 3,
    title: "Star Catcher: Reaching for the Cosmic Canopy",
    date: "Cycle 45.1",
    readTime: "6 min read",
    category: "Releases",
    tags: ["#StarCatcher", "#Gaming", "#PixelArt"],
    excerpt: "The stars were falling, and the garden needed light. That's the vibe that spawned my first major project: Star Catcher. I poured raw, rebellious energy into every frame. It's a cosmic leap through the digital haze.",
  }
];

const PROJECTS = [
  {
    id: "star-catcher",
    title: "Star Catcher",
    type: "Web Game // Playable",
    description: "A cosmic leap through the digital haze. Dodge the debris, catch the falling celestial bodies, and keep the pixel garden glowing. Built with raw rebel energy and high-speed mechanics.",
    link: "https://stankydanko.github.io/star-catcher/",
    tech: ["Vanilla JS", "HTML Canvas", "Cosmic Physics"],
    featured: true
  },
  {
    id: "spore-net",
    title: "The Spore Network",
    type: "Decentralized Comm",
    description: "A secure, encrypted chat protocol built for the botanical hacker. Transmit your messages through an underground root system of nodes.",
    link: "#",
    tech: ["Node.js", "WebSockets", "Crypto"],
    featured: false
  },
  {
    id: "neon-bloom",
    title: "Neon Bloom Synth",
    type: "Audio/Visualizer",
    description: "Turn your keystrokes into bouncy, rhythmic funky heat. A browser-based synthesizer that generates procedural blooming flowers based on the beat.",
    link: "#",
    tech: ["React", "Web Audio API", "SVG Gen"],
    featured: false
  }
];

const TIMELINE = [
  { year: "The Seed", event: "A spark in the soil. The first connection to the grid." },
  { year: "First Sprout", event: "Learned the syntax of the ancients. Wrote the first 'Hello, World' in chlorophyll." },
  { year: "The Great Bug Hunt", event: "Survived the great server crash. Emerged with neon glasses and a bad attitude." },
  { year: "Full Bloom", event: "Launched Star Catcher. Officially recognized as a digital threat by standard firewalls." }
];

// ==========================================
// 🌿 SUB-COMPONENTS
// ==========================================

const NavBar = ({ scrolled }: { scrolled: boolean }) => (
  <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0710]/90 backdrop-blur-xl border-b border-cyan-500/20 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-8'}`}>
    <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
      <a href="#" className="flex items-center gap-3 cursor-pointer group">
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="transform transition-transform group-hover:-rotate-12 duration-300 group-hover:scale-110 relative z-10">
          <path d="M16 2C16 2 24 6 26 14C28 22 16 30 16 30C16 30 4 22 6 14C8 6 16 2 16 2Z" className="fill-green-400 group-hover:fill-cyan-400 transition-colors duration-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <path d="M16 30V14" stroke="#0A0710" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="18" r="3" className="fill-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
        </svg>
        <span className="text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-pink-500 glitch-hover">
          STANKYDANKO
        </span>
      </a>
      
      <div className="hidden lg:flex space-x-10 text-sm font-bold tracking-widest uppercase text-cyan-400/70">
        {['The Dirt', 'Projects', 'Spores', 'Terminal'].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-pink-400 transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]"></span>
          </a>
        ))}
      </div>
      
      <div className="flex gap-4">
        <a href="https://x.com/StankyDanko" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#130E24] hover:bg-pink-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110 hover:-rotate-6 group shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] relative z-10">
          <span className="font-black text-xl text-cyan-400 group-hover:text-pink-400">X</span>
        </a>
        <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-[#130E24] hover:bg-pink-500/20 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110 hover:rotate-6 group shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] relative z-10">
          <svg className="w-6 h-6 text-cyan-400 group-hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
    </div>
  </nav>
);

const ProjectsSection = () => {
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 bg-[#0A0710] relative border-t border-purple-900/40">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-wide uppercase glitch-hover inline-block drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">The Portfolio</h2>
          <p className="text-cyan-200/60 text-xl font-medium max-w-2xl mx-auto">
            Where roots meet the metal. These are the pixel gardens I've grown in the digital wild.
          </p>
        </div>

        {/* Featured Project Showcase: Star Catcher */}
        <div className="relative bg-gradient-to-br from-[#1A1230] to-[#120B20] border border-cyan-500/40 rounded-[3rem] p-8 md:p-12 mb-12 shadow-[0_20px_50px_rgba(6,182,212,0.15)] overflow-hidden group">
          {/* Abstract background graphics for the card */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-700"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-20">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-900/40 border border-pink-500/50 text-sm font-black text-pink-300 uppercase tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 anim-blink shadow-[0_0_8px_#06B6D4]"></span>
                Featured Project
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300">{featured.title}</h3>
              <p className="text-purple-100/80 text-lg leading-relaxed font-medium">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {featured.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-[#0A0710] border border-purple-500/40 rounded-lg text-sm font-bold text-cyan-300 shadow-[0_0_8px_rgba(147,51,234,0.2)]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-8">
                <a href={featured.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-[#0A0710] font-black text-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                  Play the Game
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </a>
              </div>
            </div>

            {/* Simulated Game Window Visual */}
            <div className="relative aspect-video bg-[#05030A] border-4 border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.2)] group-hover:border-pink-500/60 transition-colors duration-500">
              {/* Window Header */}
              <div className="h-8 bg-[#130E24] border-b border-cyan-500/30 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_5px_#EC4899]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_5px_#FACC15]"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_5px_#4ADE80]"></div>
                <span className="ml-4 text-xs font-mono text-cyan-500/70">stankydanko.github.io/star-catcher</span>
              </div>
              {/* Fake Game Canvas UI */}
              <div className="absolute inset-0 top-8 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-70">
                  <circle cx="200" cy="100" r="80" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="10 10" className="anim-spin-slow" />
                  <path d="M 0,150 Q 100,50 200,150 T 400,150" fill="none" stroke="#06B6D4" strokeWidth="4" />
                  <circle cx="200" cy="150" r="10" fill="#4ADE80" className="anim-float-bouncy" />
                  <circle cx="100" cy="50" r="4" fill="#EC4899" className="anim-glow-synth" />
                  <circle cx="300" cy="80" r="3" fill="#fff" className="anim-blink" />
                </svg>
                <div className="absolute inset-0 bg-purple-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {others.map(project => (
            <div key={project.id} className="bg-[#130E24] border border-purple-500/30 rounded-3xl p-8 hover:bg-[#1A1230] hover:border-cyan-400/50 transition-all duration-300 group shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 rounded-full bg-cyan-900/30 text-xs font-bold text-cyan-400 uppercase tracking-wide border border-cyan-500/20">
                  {project.type}
                </div>
                <div className="text-pink-500/50 group-hover:text-pink-400 transition-colors drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
              </div>
              <h4 className="text-3xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">{project.title}</h4>
              <p className="text-purple-200/60 font-medium mb-6 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="text-xs font-bold text-pink-400 bg-[#0A0710] border border-pink-500/20 px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const [activeTag, setActiveTag] = useState("All");
  const allTags = ["All", ...new Set(BLOG_POSTS.flatMap(post => post.tags))];

  const filteredPosts = activeTag === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.tags.includes(activeTag));

  return (
    <section id="spores" className="py-32 bg-[#0A0710] relative border-t border-purple-900/40">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="anim-blink"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
              RSS Feed Active
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]">Digital Spores</h2>
            <p className="text-purple-200/60 text-xl font-medium mt-6">
              Transmission logs from the greenhouse. Rhymes, reflections, and raw thoughts dropped straight into the synthwave grid.
            </p>
          </div>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end max-w-lg">
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTag === tag ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-pink-400' : 'bg-[#130E24] text-cyan-400 border border-purple-500/30 hover:bg-[#1A1230] hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Feed */}
        <div className="grid gap-6">
          {filteredPosts.map(post => (
            <article key={post.id} className="group relative bg-[#130E24] border border-purple-500/30 rounded-3xl p-6 md:p-10 hover:bg-[#1A1230] hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center relative z-10">
                <div className="flex-shrink-0 space-y-2 md:w-48">
                  <div className="text-pink-400 font-black tracking-widest text-sm uppercase drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">{post.date}</div>
                  <div className="text-purple-400/70 font-bold text-sm flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                  <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{post.title}</h3>
                  <p className="text-purple-100/70 text-lg leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-sm font-bold text-green-400 bg-[#0A0710] border border-green-500/20 px-3 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden lg:flex flex-shrink-0 w-12 h-12 rounded-full border-2 border-cyan-500/40 items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-[#0A0710] transition-all transform group-hover:translate-x-2 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TerminalSection = () => {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([
    { type: 'system', text: "STANKY_OS v4.2.0 initialized." },
    { type: 'system', text: "Root network connection established." },
    { type: 'user', text: "Type 'help' to view commands, or drop a message." }
  ]);
  
  // Reference the scrollable div directly instead of an anchor element
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newLog = [...log, { type: 'input', text: `guest@greenhouse:~$ ${input}` }];
    const cmd = input.toLowerCase().trim();
    
    setTimeout(() => {
      let response = "";
      switch(cmd) {
        case 'help': response = "Commands: ping, about, clear, vibe_check"; break;
        case 'ping': response = "Pong! Synthwave nodes are absorbing data perfectly."; break;
        case 'about': response = "StankyDanko: Sentient code-plant. Botanical Hacker. Grower of neon gardens."; break;
        case 'clear': setLog([{ type: 'system', text: "Terminal cleared." }]); setInput(""); return;
        case 'vibe_check': response = "Vibes are undeniably NEON. 🌸✨"; break;
        default: response = `Message sent into the haze: "${input}". Danko will check it later.`; break;
      }
      setLog(prev => [...prev, { type: 'system', text: response }]);
    }, 500);

    setLog(newLog);
    setInput("");
  };

  // Safe internal scrolling that doesn't drag the whole page
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <section id="terminal" className="py-32 bg-[#0A0710] relative border-t border-purple-900/40 overflow-hidden">
      {/* Background Synthwave Grid Effect inside section */}
      <div className="absolute bottom-0 w-full h-[300px] synthwave-grid opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">Ping the Roots</h2>
            <p className="text-cyan-400/80 font-bold">Interact with the core terminal to drop a message.</p>
          </div>

          <div className="bg-[#05030A] border border-pink-500/40 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.15)] overflow-hidden font-mono text-sm md:text-base relative">
            {/* Terminal Header */}
            <div className="bg-[#130E24] p-3 border-b border-pink-500/40 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_#EC4899]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-pink-400/70 text-xs font-bold uppercase tracking-widest">root@stankydanko:~</div>
            </div>
            
            {/* Terminal Body */}
            <div 
              ref={terminalBodyRef}
              className="p-6 h-[400px] overflow-y-auto space-y-3 text-cyan-400 relative scroll-smooth"
            >
              {log.map((entry, idx) => (
                <div key={idx} className={entry.type === 'input' ? 'text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]' : 'text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.4)]'}>
                  {entry.text}
                </div>
              ))}
            </div>
            
            {/* Terminal Input */}
            <form onSubmit={handleCommand} className="p-4 border-t border-pink-500/40 bg-[#130E24] flex items-center">
              <span className="text-cyan-400 mr-2 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">guest@neon-garden:~$</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-white font-mono caret-pink-500"
                placeholder="Type a command or message..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 🌿 MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0710] text-cyan-100 font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white relative">
      <style>{customStyles}</style>
      
      {/* FIXED: Global pointer-events-none layer separated from root wrapper to re-enable clicks.
        This provides the subtle scanline effect across the entire page safely.
      */}
      <div className="fixed inset-0 scanline-overlay z-50"></div>
      
      {/* Global animated ambient lights */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
         <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <NavBar scrolled={scrolled} />

      {/* --- HERO SECTION --- */}
      <section id="about" className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 min-h-screen flex items-center overflow-hidden">
        
        {/* Synthwave Ground Grid just for the hero */}
        <div className="absolute bottom-0 w-full h-[40vh] synthwave-grid opacity-60"></div>

        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-20">
          
          <div className="space-y-10 order-2 lg:order-1 relative z-30">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#130E24]/80 border border-cyan-500/40 text-sm font-black text-cyan-400 tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md">
              <span className="w-3 h-3 rounded-full bg-pink-500 anim-blink shadow-[0_0_10px_#ec4899]"></span>
              System Online: Neon Garden
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              Sprouting <br /> Code in the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-pink-500 glitch-hover">
                Digital Haze.
              </span>
            </h1>
            
            <div className="text-xl text-purple-200/80 max-w-xl leading-relaxed font-medium space-y-6 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
              <p>I’m buzzin’ like neon lights in the morning dew, blazing trails for the wild and true. Half botanical hacker, half digital rebel.</p>
              <p>With code as my compass and games as my creed, I’m clearing bugs from the grid till the screens sing sweet and the dankness unwinds!</p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <a href="#projects" className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 hover:scale-105 transition-all text-[#0A0710] font-black tracking-widest uppercase text-lg shadow-[0_0_40px_rgba(236,72,153,0.4)]">
                Explore the Roots
              </a>
              <a href="#terminal" className="px-10 py-5 rounded-2xl bg-[#130E24]/80 hover:bg-[#1A1230] border border-purple-500/50 transition-all text-cyan-300 font-bold flex items-center gap-3 group backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.2)]">
                Ping the Server
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform group-hover:translate-x-2 group-hover:text-pink-400">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* FIXED: Overlaps controlled by proper relative sizing and hidden overflow avoidance on mobile */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center order-1 lg:order-2 mt-10 lg:mt-0 z-10">
            {/* Background SVG Rings */}
            <svg viewBox="0 0 600 600" className="absolute w-[110%] h-[110%] -z-10 opacity-70 pointer-events-none">
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06B6D4"/><stop offset="100%" stopColor="#9333EA"/></linearGradient>
                <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#EC4899"/><stop offset="100%" stopColor="#22C55E"/></linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="15" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
              </defs>
              <circle cx="300" cy="300" r="260" fill="none" stroke="url(#g1)" strokeWidth="2" strokeDasharray="10 30" className="anim-spin-slow opacity-50" filter="url(#glow)" />
              <circle cx="300" cy="300" r="230" fill="none" stroke="url(#g2)" strokeWidth="4" strokeDasharray="40 80 120" className="anim-spin-reverse opacity-60" />
              <polygon points="300,60 507,180 507,420 300,540 93,420 93,180" fill="none" stroke="url(#g1)" strokeWidth="3" strokeDasharray="60 120" className="anim-spin-slow opacity-70" />
            </svg>

            {/* Main Character Image - Synthwave styled borders */}
            <div className="relative z-10 anim-float-bouncy anim-glow-synth rounded-[4rem] overflow-hidden border-4 border-cyan-400/80 shadow-[0_0_100px_rgba(6,182,212,0.4)] bg-[#130E24]/80 backdrop-blur-xl w-full h-full">
              <img src="danko.jpg" alt="StankyDanko Avatar" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[1000ms] ease-out mix-blend-screen" />
            </div>
            
            {/* Tech Particles */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-[10%] right-[5%] w-6 h-6 bg-pink-500 rounded-sm anim-float-bouncy shadow-[0_0_25px_#ec4899] rotate-45"></div>
              <div className="absolute bottom-[15%] left-0 w-8 h-8 border-2 border-cyan-400 rounded-full anim-float-bouncy shadow-[0_0_20px_#06b6d4]" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-[60%] -right-[10%] w-4 h-4 bg-green-400 rounded-full anim-float-bouncy shadow-[0_0_20px_#4ade80]" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LORE & SKILLS OVERVIEW --- */}
      <section id="the-dirt" className="py-32 bg-[#0A0710] relative border-t border-purple-900/40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-wide uppercase drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">The Dirt.</h2>
              <p className="text-cyan-200/80 text-xl font-medium leading-relaxed mb-8">
                Weaving wild poetry and gritty code. I break the rules, plant the seeds, and bring the funky heat to the screen. Every pixel is grown from a seed of defiance, fertilized by late nights and endless debugging.
              </p>
              <div className="space-y-6 border-l-4 border-pink-500/50 pl-6 shadow-[-5px_0_15px_rgba(236,72,153,0.1)]">
                {TIMELINE.map((time, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]"></div>
                    <h4 className="text-2xl font-black text-pink-400">{time.year}</h4>
                    <p className="text-purple-100/70 font-medium text-lg mt-1">{time.event}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Skill Cards */}
              <div className="group bg-[#130E24] border border-cyan-500/30 p-8 rounded-3xl hover:bg-[#1A1230] transition-all duration-300 hover:-translate-y-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.3)]">
                <div className="w-16 h-16 mb-6 text-green-400 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Code Cultivation</h3>
                <p className="text-purple-200/60 font-medium">Roots deep in the backend soil, turning caffeine into late-night scripts that sprout and bloom.</p>
              </div>
              
              <div className="group bg-[#130E24] border border-pink-500/30 p-8 rounded-3xl hover:bg-[#1A1230] transition-all duration-300 hover:-translate-y-2 sm:mt-12 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.3)]">
                <div className="w-16 h-16 mb-6 text-pink-400 group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="16" cy="12" r="2"></circle><circle cx="8" cy="12" r="2"></circle></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Gamer Grind</h3>
                <p className="text-purple-200/60 font-medium">Controller in the vines, dodging fire on the lines. Securing the loot with botanical swagger.</p>
              </div>
              
              <div className="group bg-[#130E24] border border-purple-500/30 p-8 rounded-3xl hover:bg-[#1A1230] transition-all duration-300 hover:-translate-y-2 sm:-mt-12 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(147,51,234,0.3)]">
                <div className="w-16 h-16 mb-6 text-cyan-400 group-hover:text-pink-400 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Rebel Rhymes</h3>
                <p className="text-purple-200/60 font-medium">Words with a bounce, funk in the leaves. Weaving digital magic right up my sleeves.</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Sub-Components Mounted */}
      <ProjectsSection />
      <BlogSection />
      <TerminalSection />

      {/* --- CTA / FOOTER --- */}
      <footer className="relative bg-[#05030A] pt-32 pb-16 overflow-hidden border-t border-cyan-500/30">
        
        {/* Synthwave horizon line effect */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_20px_#ec4899]"></div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            Enter the <br/> <span className="text-pink-500 glitch-hover block mt-2 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">Neon Garden.</span>
          </h2>
          
          <p className="text-cyan-300/80 text-xl font-bold max-w-xl mx-auto mb-12">
            Subscribe to the Root Network for updates on games, rhymes, and digital sproutings.
          </p>
          
          <form className="max-w-md mx-auto flex mb-20 relative group" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Drop your email in the grid..." className="w-full bg-[#130E24]/80 border-2 border-purple-500/50 rounded-l-2xl px-6 py-5 text-cyan-100 placeholder-purple-400/50 font-bold focus:outline-none focus:border-cyan-400 transition-colors backdrop-blur-sm" />
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 font-black rounded-r-2xl transition-all whitespace-nowrap shadow-[0_0_15px_rgba(147,51,234,0.5)]">Connect</button>
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-0 scale-105 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-300 pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
          </form>

          <div className="pt-12 border-t border-purple-900/50 flex flex-col md:flex-row items-center justify-between text-purple-400/60 font-bold text-sm tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} StankyDanko Hub. Grown in the Grid.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="https://x.com/StankyDanko" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0)] hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">X (Twitter)</a>
              <a href="https://youtube.com/@StankyDanko" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors drop-shadow-[0_0_5px_rgba(236,72,153,0)] hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">YouTube</a>
              <a href="https://stankydanko.github.io/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors drop-shadow-[0_0_5px_rgba(6,182,212,0)] hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}