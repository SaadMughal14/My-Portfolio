
import React, { useState, useEffect, useRef } from 'react';
import LetterGlitch from './components/LetterGlitch';
import { PROJECTS, EXPERIENCE, SKILLS } from './constants';

const LINKEDIN_URL = "https://linkedin.com/in/saad-mughal-460971180";

const LinkedInIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={`${className} fill-current`}
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.98 0 1.775-.773 1.775-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
  </svg>
);

const DemoModal: React.FC<{ url: string; title: string; projectId: string; onClose: () => void }> = ({ url, title, projectId, onClose }) => {
  const isFullAccess = projectId === 'operator-cs';
  const isOutreach = projectId === 'project-outreach';
  
  const [isInteracted, setIsInteracted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOutreach) return;

    const handleBlur = () => {
      if (document.activeElement === iframeRef.current) {
        // Instant lock after first interaction
        setIsInteracted(true);
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isOutreach]);

  useEffect(() => {
    const shouldLockKeyboard = !isFullAccess && (!isOutreach || isInteracted);
    if (!shouldLockKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isFullAccess, isOutreach, isInteracted]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12 py-4 md:py-12">
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-md cursor-crosshair" 
        onClick={onClose} 
      />
      
      <div className="relative w-full h-full max-w-7xl bg-black border border-white/40 rounded-xl flex flex-col overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-500">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/20 bg-[#0a0a0a] gap-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isInteracted && !isFullAccess ? 'bg-red-600' : 'bg-green-500'} animate-pulse`} />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <div className="h-4 w-px bg-white/40 mx-1" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#a3ff00] font-bold">
                PROTOTYPE_VIEWER // {title}
              </span>
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white font-bold">
                ACTIVE_MODE: {isFullAccess ? 'FULL_ACCESS' : isInteracted ? 'RESTRICTED' : 'UNINITIALIZED'}
              </span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-[#a3ff00] hover:text-black border border-white/20 px-3 py-1.5 text-white font-mono text-[9px] uppercase tracking-widest transition-all rounded whitespace-nowrap self-end md:self-center font-bold"
          >
            EXIT_TERMINAL [X]
          </button>
        </div>

        <div className="relative flex-grow bg-black overflow-hidden group">
          {/* Default lock for standard restricted projects */}
          {!isFullAccess && !isOutreach && (
            <div className="absolute inset-0 z-30 pointer-events-none animate-in fade-in duration-700">
              <div className="absolute inset-0 pointer-events-auto cursor-not-allowed flex items-center justify-center group/shield">
                <div className="opacity-0 group-hover/shield:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-4 bg-black/90 p-8 rounded-2xl backdrop-blur-sm border border-[#a3ff00]/40">
                   <div className="w-12 h-12 border-2 border-[#a3ff00]/60 rounded-full flex items-center justify-center">
                     <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                   </div>
                   <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#a3ff00] px-6 py-3 border-2 border-[#a3ff00]/40 rounded-md font-bold">
                     SECURE_CONTENT_LOCKED
                   </span>
                </div>
              </div>
            </div>
          )}

          {/* Specialized Sidebar-Enabled Lock for Project Outreach - Matches other projects visual style */}
          {isOutreach && isInteracted && (
            <div className="absolute inset-0 z-30 flex pointer-events-none animate-in fade-in duration-300">
              {/* Sidebar passthrough: Interactive area */}
              <div className="w-[80px] md:w-[280px] h-full" />
              {/* Content lock: Blocked area with matching visual style */}
              <div className="flex-grow h-full pointer-events-auto cursor-not-allowed group/outreach">
                 <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/outreach:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-4 bg-black/90 p-8 rounded-2xl border border-[#a3ff00]/40 shadow-2xl">
                       <div className="w-12 h-12 border-2 border-[#a3ff00]/60 rounded-full flex items-center justify-center">
                         <div className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
                       </div>
                       <div className="flex flex-col items-center gap-3">
                         <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#a3ff00] px-6 py-3 border-2 border-[#a3ff00]/40 rounded-md font-bold">
                           SECURE_CONTENT_LOCKED
                         </span>
                         <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#a3ff00]/50 font-black">
                           SIDEBAR_NAV_ONLY
                         </span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          <iframe 
            ref={iframeRef}
            src={url}
            className="w-full h-full border-none"
            title={title}
            sandbox={`allow-scripts allow-same-origin ${isFullAccess || isOutreach ? 'allow-forms allow-modals' : ''}`} 
            loading="lazy"
          />

          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
        </div>
        
        <div className="px-4 md:px-6 py-2 md:py-3 border-t border-white/20 bg-[#050505] flex justify-between items-center font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em]">
            <span className="text-white font-bold hidden sm:inline">
              {isFullAccess ? 'Full Interaction Protocol Active' : isInteracted ? 'Restricted Mode: Use sidebar for navigation' : 'Awaiting primary input...'}
            </span>
            <span className="text-[#a3ff00] font-black tracking-widest">
              REF: SAAD_ENG_MOD_{projectId.toUpperCase().replace('-', '_')}
            </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<{url: string, title: string, projectId: string} | null>(null);

  useEffect(() => {
    if (activeDemo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeDemo]);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter_Tight'] selection:bg-[#a3ff00] selection:text-black overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LetterGlitch 
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          />
        </div>
        
        <div className="relative z-10 max-w-full md:max-w-7xl flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[13rem] font-black uppercase tracking-[-0.07em] leading-[0.8] mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 select-none drop-shadow-2xl text-white">
            SAAD<br/>MUGHAL
          </h1>
          
          <h2 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] text-[#a3ff00] font-black animate-pulse mb-8 md:mb-12">
            AI ENGINEER | FULL-STACK | LLM SPECIALIST
          </h2>

          <div className="flex flex-col items-center gap-6 md:gap-8 font-mono text-[10px] md:text-[14px] uppercase tracking-[0.4em] text-white font-bold">
            <span className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a3ff00] animate-ping" />
              isaadimughal@gmail.com
            </span>
            
            <span>📍 REMOTE (GLOBAL)</span>

            <button 
              onClick={scrollToWork} 
              className="bg-[#a3ff00] text-black px-10 py-4 rounded-full font-black tracking-[0.3em] hover:bg-white transition-all active:scale-95 text-[10px] md:text-[13px] shadow-[0_0_40px_rgba(163,255,0,0.3)]"
            >
              DEPLOYED_SYSTEMS ↓
            </button>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-black border-y border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-20">
            <div className="lg:col-span-1">
              <h3 className="font-mono text-[#a3ff00] text-sm uppercase tracking-[0.4em] font-black border-l-4 border-[#a3ff00] pl-6">System_Manifest</h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-2xl sm:text-3xl md:text-5xl leading-[1.1] font-black uppercase tracking-tighter text-white">
                BUILDING THE <span className="text-[#a3ff00]">AI-DRIVEN INDUSTRIAL INTERFACE</span>. BRIDGING AGENTIC LLMS WITH HIGH-PRECISION CONTROL SYSTEMS.
              </p>
              <p className="text-lg md:text-2xl text-white mt-8 md:mt-12 leading-relaxed font-bold max-w-5xl">
                From automating hyper-personalized lead generation pipelines to architecting digital twin HMIs for pharmaceutical sterile clean rooms, I specialize in engineering software that acts with autonomy and solves high-value business bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT ARCHIVE (Projects) */}
      <section id="work" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-20 md:mb-40">
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white">Selected<br/>Builds</h2>
          <div className="h-px flex-grow bg-white/40 relative w-full">
             <div className="absolute right-0 -top-6 font-mono text-[9px] md:text-[11px] text-white uppercase tracking-[0.2em] font-black hidden sm:block">Archive_Access_Restricted</div>
          </div>
        </div>

        <div className="space-y-32 md:space-y-64">
          {PROJECTS.map((p) => (
            <div key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 group relative">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-40">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="font-mono text-[#a3ff00] text-[10px] md:text-[13px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Build_{p.id}</span>
                    <span className="h-px w-6 md:w-8 bg-white" />
                    <span className="font-mono text-white text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold">{p.version}</span>
                  </div>
                  <h4 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-none group-hover:text-[#a3ff00] transition-colors text-white">{p.title}</h4>
                  <p className="font-mono text-[10px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#a3ff00] font-black mb-8 md:mb-12">{p.subtitle}</p>
                  
                  <div className="bg-white/10 border-2 border-white/20 p-6 md:p-10 rounded-2xl md:rounded-3xl mb-8 md:mb-12 backdrop-blur-sm shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#a3ff00]" />
                      <p className="font-mono text-[10px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#a3ff00] font-black">Stack_Analysis</p>
                    </div>
                    <p className="text-xs md:text-base font-black text-white leading-relaxed tracking-wide uppercase">{p.tech}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    {p.link && (
                      <button 
                        onClick={() => setActiveDemo({ url: p.link!, title: p.title, projectId: p.id })}
                        className="group relative inline-flex items-center gap-4 md:gap-6 bg-white text-black px-6 md:px-10 py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.4em] hover:bg-[#a3ff00] transition-all justify-center overflow-hidden flex-1"
                      >
                        <span className="relative z-10">Initialize Demo</span>
                        <div className="absolute inset-0 bg-[#a3ff00] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </button>
                    )}
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 md:px-10 py-4 md:py-6 border-2 border-white/40 text-white font-black uppercase text-[10px] md:text-xs tracking-[0.4em] rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-all flex-1">
                      Discuss Build
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-8 md:space-y-12">
                {p.description.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-4 md:gap-8 group/item">
                    <div className="mt-1 md:mt-2 text-[#a3ff00] font-black text-2xl md:text-3xl group-hover/item:translate-x-1 transition-transform">→</div>
                    <p className="text-lg sm:text-xl md:text-3xl text-white leading-[1.2] font-bold tracking-tight group-hover/item:text-[#a3ff00] transition-colors">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS MATRIX */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-black border-y border-white/20 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="font-mono text-[#a3ff00] text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] font-black mb-16 md:mb-32 text-center">Protocol_Skills_Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="group border-t-2 border-white/20 pt-8 md:pt-12 hover:border-[#a3ff00] transition-colors">
                <h4 className="font-mono text-[10px] md:text-[13px] text-white uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 font-black group-hover:text-[#a3ff00] transition-colors">{category}</h4>
                <p className="text-lg md:text-2xl font-black text-white leading-tight uppercase tracking-tight">{items}</p>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block font-mono text-[9px] text-white/60 hover:text-[#a3ff00] tracking-widest uppercase font-black transition-colors">
                  REQUEST_CONSULTATION
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
          <div className="lg:col-span-5">
            <h3 className="font-mono text-[#a3ff00] text-sm uppercase tracking-[0.4em] font-black mb-12 md:mb-20 border-l-4 border-[#a3ff00] pl-6">Deployment_Logs</h3>
            <div className="space-y-16 md:space-y-24">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-12 top-0 bottom-0 w-1 bg-[#a3ff00]/20 group-hover:bg-[#a3ff00] transition-colors hidden sm:block" />
                  <p className="text-[10px] md:text-[12px] font-mono text-white uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 font-black">{exp.period}</p>
                  <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">{exp.company}</p>
                  <p className="text-[10px] md:text-sm font-black text-[#a3ff00] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 md:mb-8">{exp.title}</p>
                  <ul className="space-y-3 md:space-y-4">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="text-xs md:text-base text-white font-bold leading-relaxed uppercase tracking-wide">• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-[#0a0a0a] p-8 md:p-20 rounded-3xl md:rounded-[3rem] border-2 border-white/20 shadow-inner flex flex-col items-center md:items-start relative overflow-hidden">
            <h3 className="font-mono text-[#a3ff00] text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black mb-10 text-center md:text-left">Executive_Summary</h3>
            <p className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic text-white mb-12 md:text-left text-center">
              "Architecting autonomous pipelines to eliminate human bottlenecks."
            </p>
            <div className="text-lg sm:text-xl md:text-3xl text-white leading-relaxed font-black space-y-8 md:space-y-10 uppercase tracking-tight">
              <p>Specialized in deep integration of AI reasoning with real-world business logic. I build systems that don't just 'assist' but 'operate'.</p>
              <p>Expertise spans from high-throughput SCADA systems for pharmaceuticals to multi-agent content distribution engines.</p>
            </div>
            
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-12 group flex items-center gap-6 bg-[#a3ff00] text-black px-10 py-6 rounded-2xl font-black uppercase text-sm tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_40px_rgba(163,255,0,0.3)]">
              LinkedIn
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 mt-16 md:mt-32 pt-12 md:pt-20 border-t-2 border-white/20 w-full">
              <div>
                <h5 className="font-mono text-[10px] md:text-[12px] uppercase text-[#a3ff00] tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 font-black">Education</h5>
                <p className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white">B.Sc. Software Engineering</p>
                <p className="font-mono text-[10px] md:text-[12px] text-white mt-2 uppercase tracking-widest font-bold">Class of 2023 // High Compliance</p>
              </div>
              <div>
                <h5 className="font-mono text-[10px] md:text-[12px] uppercase text-[#a3ff00] tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 font-black">Infrastructure</h5>
                <div className="space-y-2 font-black uppercase tracking-tighter text-sm md:text-xl text-white">
                  <p>Stack: TS / React / Node</p>
                  <p>Intel: Google Gemini AI</p>
                  <p>Edge: Vercel / Supabase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 md:py-24 border-t-2 border-white/20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 font-mono text-[11px] md:text-[14px] uppercase tracking-[0.5em] md:tracking-[0.7em] text-white font-black items-center">
            <a href="mailto:isaadimughal@gmail.com" className="hover:text-[#a3ff00] transition-colors border-b-2 border-white hover:border-[#a3ff00]">EMAIL_DIRECT</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#a3ff00] transition-colors border-b-2 border-white hover:border-[#a3ff00]">
              <LinkedInIcon /> LINKEDIN
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[11px] md:text-[13px] font-mono text-white uppercase tracking-[0.6em] md:tracking-[1em] font-black">
              &copy; 2025 SAAD MUGHAL // ALL_RIGHTS_RESERVED
            </p>
            <p className="mt-2 text-[9px] font-mono text-[#a3ff00] uppercase tracking-[0.4em] font-bold">SYSLOG_REV: ARCHIVE_01_PROD</p>
          </div>
        </div>
      </footer>

      {/* SECURE DEMO MODAL */}
      {activeDemo && (
        <DemoModal 
          url={activeDemo.url} 
          title={activeDemo.title} 
          projectId={activeDemo.projectId}
          onClose={() => setActiveDemo(null)} 
        />
      )}
    </div>
  );
};

export default App;
