import React, { useState, useEffect, useRef } from 'react';
import LetterGlitch from './components/LetterGlitch';
import SplashCursor from './components/SplashCursor';
import { PROJECTS, EXPERIENCE, SKILLS } from './constants';

const LINKEDIN_URL = "https://linkedin.com/in/saad-mughal-460971180";
const EMAIL_ADDRESS = "isaadimughal@gmail.com";

/**
 * Advanced decoding protocol:
 * 1. Perform Base64 decoding
 * 2. Reverse the string back to actual URL
 */
const decodeLink = (encoded?: string) => {
  if (!encoded) return '';
  try {
    const b64 = atob(encoded);
    return b64.split('').reverse().join('');
  } catch (e) {
    console.error("Link decoding error.", e);
    return '';
  }
};

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Track interactions specifically for Outreach logic
  const [interactionCount, setInteractionCount] = useState(0);

  /**
   * Lockdown Logic:
   * - If 'operator-cs' (full access), effectivelyLocked is always false.
   * - If 'project-outreach', effectivelyLocked is false ONLY for the first click (count 0).
   * - For all other projects, effectivelyLocked is always true.
   */
  const effectivelyLocked = !isFullAccess && (!isOutreach || interactionCount > 0);

  // Robust iframe interaction detection via focus monitoring
  useEffect(() => {
    // We only need to monitor focus for Outreach if it hasn't been locked yet
    if (!isOutreach || interactionCount > 0) return;

    const handleFocusCheck = () => {
      // If the active element in the parent window is our iframe, the user has clicked/interacted with it
      if (document.activeElement === iframeRef.current) {
        setInteractionCount(1);
      }
    };

    // Listen for window blur (often triggered when an iframe is clicked)
    window.addEventListener('blur', handleFocusCheck);
    
    // Fallback polling for browsers where blur doesn't fire as expected for iframe clicks
    const checkInterval = setInterval(handleFocusCheck, 150);

    return () => {
      window.removeEventListener('blur', handleFocusCheck);
      clearInterval(checkInterval);
    };
  }, [isOutreach, interactionCount]);

  const handleManualInteractionCheck = () => {
    if (isOutreach && interactionCount === 0) {
      setInteractionCount(1);
    }
  };

  useEffect(() => {
    if (isFullAccess) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block keyboard input only if the system is currently in restricted mode
      if (effectivelyLocked) {
        if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isFullAccess, effectivelyLocked]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12 py-4 md:py-12"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-md cursor-crosshair" 
        onClick={onClose} 
      />
      
      <div className="relative w-full h-full max-w-7xl bg-black border border-white/40 rounded-xl flex flex-col overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-500">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/20 bg-[#0a0a0a] gap-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${effectivelyLocked ? 'bg-red-600' : 'bg-green-500'} animate-pulse`} />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <div className="h-4 w-px bg-white/40 mx-1" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#a3ff00] font-bold">
                PROTOTYPE_VIEWER // {title}
              </span>
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white font-bold">
                MODE: {isFullAccess ? 'FULL_ACCESS' : (effectivelyLocked ? 'RESTRICTED' : 'ONE_TOUCH_ACTIVE')}
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

        <div 
          className="relative flex-grow bg-black overflow-hidden group"
          onMouseDownCapture={handleManualInteractionCheck}
          onTouchStartCapture={handleManualInteractionCheck}
        >
          {/* SECURE OVERLAY SHIELD */}
          {!isFullAccess && (
            <div className={`absolute inset-0 z-30 transition-all duration-500 ${effectivelyLocked ? 'pointer-events-auto cursor-not-allowed opacity-100' : 'pointer-events-none opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-center group/shield transition-all duration-500 group-hover/shield:bg-black/30 group-hover/shield:backdrop-blur-[2px]">
                <div className="opacity-0 group-hover/shield:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-4 bg-black/95 p-10 rounded-3xl backdrop-blur-md border border-[#a3ff00]/40 shadow-[0_0_80px_rgba(163,255,0,0.15)]">
                   <div className="w-16 h-16 border-2 border-[#a3ff00]/40 rounded-full flex items-center justify-center mb-2">
                     <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                   </div>
                   <div className="flex flex-col items-center text-center">
                     <span className="font-mono text-[10px] md:text-[13px] uppercase tracking-[0.6em] text-[#a3ff00] font-black">
                       SECURE_CONTENT_LOCKED
                     </span>
                     <span className="font-mono text-[16px] md:text-[20px] text-[#a3ff00]/20 my-2 font-light select-none tracking-widest">//</span>
                     <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white font-bold bg-[#a3ff00]/10 px-5 py-2 rounded-lg border border-[#a3ff00]/20">
                       HIRE_ME_TO_DECRYPT 🔓😏
                     </span>
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
            sandbox={`allow-scripts allow-same-origin ${isFullAccess ? 'allow-forms allow-modals' : ''}`} 
            loading="lazy"
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
          />

          {/* SCANLINE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10" />
        </div>
        
        <div className="px-4 md:px-6 py-2 md:py-3 border-t border-white/20 bg-[#050505] flex justify-between items-center font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em]">
            <span className="text-white font-bold hidden sm:inline">
              {(isFullAccess || !effectivelyLocked) ? 'Protocol: Single-Handover Active' : 'Restricted: Secure Logic Shell Active'}
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
  const [emailOpen, setEmailOpen] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blockInspect = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u') ||
        (e.metaKey && e.altKey && e.key.toLowerCase() === 'i')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', blockInspect, true);
    window.addEventListener('contextmenu', disableContextMenu, true);

    return () => {
      window.removeEventListener('keydown', blockInspect, true);
      window.removeEventListener('contextmenu', disableContextMenu, true);
    };
  }, []);

  useEffect(() => {
    if (activeDemo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeDemo]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailRef.current && !emailRef.current.contains(event.target as Node)) {
        setEmailOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    alert("Email copied to system clipboard.");
    setEmailOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Inter_Tight'] selection:bg-[#a3ff00] selection:text-black overflow-x-hidden">
      {/* CURSOR EFFECT - ONLY ACTIVE WHEN NO MODAL IS OPEN */}
      {!activeDemo && <SplashCursor />}

      {/* HERO SECTION */}
      <section className="relative h-[100svh] min-h-[500px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LetterGlitch 
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          />
        </div>
        
        <div className="relative z-10 max-w-full md:max-w-7xl flex flex-col items-center origin-center transition-all duration-700
          scale-[0.75] sm:scale-90 lg:scale-100">
          <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] sm:text-[clamp(5rem,14vw,7.5rem)] lg:text-[clamp(7rem,14vw,10rem)] font-black uppercase tracking-[-0.07em] leading-[0.8] mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 select-none drop-shadow-2xl text-white">
            SAAD<br/>MUGHAL
          </h1>
          
          <h2 className="text-[clamp(8px,2.2vw,11px)] sm:text-[clamp(10px,2.5vw,14px)] md:text-lg lg:text-xl font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#a3ff00] font-black animate-pulse mb-6 md:mb-10">
            AI ENGINEER | FULL-STACK | LLM SPECIALIST
          </h2>

          <div className="flex flex-col items-center gap-4 md:gap-8 font-mono text-[clamp(9px,1.8vw,11px)] md:text-[14px] uppercase tracking-[0.4em] text-white font-bold">
            <div className="relative group/email-root" ref={emailRef}>
              <button 
                onClick={() => setEmailOpen(!emailOpen)}
                className="flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
                aria-label="Toggle contact options"
              >
                <span className="text-lg md:text-2xl text-[#a3ff00] drop-shadow-[0_0_8px_rgba(163,255,0,0.5)]">✉</span>
                <span className="lowercase font-mono tracking-tight text-sm md:text-lg lg:text-xl font-bold border-b-2 border-dashed border-[#a3ff00]/40 group-hover:border-[#a3ff00] text-white/90 group-hover:text-white transition-all">
                  {EMAIL_ADDRESS}
                </span>
                <span className={`text-[8px] md:text-[10px] transition-transform duration-500 ${emailOpen ? 'rotate-180' : 'rotate-0'} text-[#a3ff00]/60`}>▼</span>
              </button>

              {emailOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[260px] md:w-[320px] bg-[#050505] border-2 border-[#a3ff00]/40 rounded-xl p-3 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,1),0_0_30px_rgba(163,255,0,0.15)] z-[100] animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex flex-col gap-2">
                    <a 
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-[#a3ff00] hover:text-black rounded-lg transition-all group/opt border border-white/5"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Send Direct Email</span>
                      <span className="text-sm">↗</span>
                    </a>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-[#a3ff00] hover:text-black rounded-lg transition-all group/opt border border-white/5"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Copy Address</span>
                      <span className="text-sm">📋</span>
                    </button>
                  </div>
                  <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050505] border-l-2 border-t-2 border-[#a3ff00]/40 rotate-45" />
                </div>
              )}
            </div>
            
            <span className="flex items-center gap-3">
              <span className="text-lg md:text-2xl">📍</span>
              <span className="text-[10px] md:text-sm lg:text-base">REMOTE (GLOBAL)</span>
            </span>

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
      <section className="py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-24 bg-black border-y border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-20">
            <div className="lg:col-span-1">
              <h3 className="font-mono text-[#a3ff00] text-xs md:text-sm uppercase tracking-[0.4em] font-black border-l-4 border-[#a3ff00] pl-6">System_Manifest</h3>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] font-black uppercase tracking-tighter text-white">
                BUILDING THE <span className="text-[#a3ff00]">AI-DRIVEN INDUSTRIAL INTERFACE</span>. BRIDGING AGENTIC LLMS WITH HIGH-PRECISION CONTROL SYSTEMS.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white mt-6 md:mt-10 leading-relaxed font-bold max-w-5xl">
                From automating hyper-personalized lead generation pipelines to architecting digital twin HMIs for pharmaceutical sterile clean rooms, I specialize in engineering software that acts with autonomy and solves high-value business bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT ARCHIVE (Projects) */}
      <section id="work" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mb-12 md:mb-24">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-none text-white">Selected<br/>Builds</h2>
          <div className="h-px flex-grow bg-white/40 relative w-full">
             <div className="absolute right-0 -top-6 font-mono text-[8px] md:text-[11px] text-white uppercase tracking-[0.2em] font-black hidden sm:block">Archive_Access_Restricted</div>
          </div>
        </div>

        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden border-y border-white/10 py-5 mb-16 md:mb-24 bg-white/[0.03] backdrop-blur-[2px]">
          <div className="animate-marquee font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#a3ff00] font-black whitespace-nowrap">
            <span className="px-4">IN ORDER TO SEE THE FULL SYSTEMS IN THEIR PROPER UI SWITCH TO DESKTOP VIEW OR LAPTOP FOR THE BEST EXPERIENCE //&nbsp;</span>
            <span className="px-4">IN ORDER TO SEE THE FULL SYSTEMS IN THEIR PROPER UI SWITCH TO DESKTOP VIEW OR LAPTOP FOR THE BEST EXPERIENCE //&nbsp;</span>
          </div>
        </div>

        <div className="space-y-24 md:space-y-36 lg:space-y-48">
          {PROJECTS.map((p) => (
            <div key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 group relative">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                    <span className="font-mono text-[#a3ff00] text-[9px] md:text-[13px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Build_{p.id}</span>
                    <span className="h-px w-6 md:w-8 bg-white" />
                    <span className="font-mono text-white text-[8px] md:text-[11px] uppercase tracking-[0.2em] font-bold">{p.version}</span>
                  </div>
                  <h4 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none group-hover:text-[#a3ff00] transition-colors text-white">{p.title}</h4>
                  <p className="font-mono text-[9px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#a3ff00] font-black mb-6 md:mb-12">{p.subtitle}</p>
                  
                  <div className="bg-white/10 border-2 border-white/20 p-5 md:p-8 rounded-xl md:rounded-3xl mb-6 md:mb-10 backdrop-blur-sm shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#a3ff00]" />
                      <p className="font-mono text-[10px] md:text-[13px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#a3ff00] font-black">Stack_Analysis</p>
                    </div>
                    <p className="text-[10px] md:text-sm xl:text-base font-black text-white leading-relaxed tracking-wide uppercase">{p.tech}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                    {p.link && (
                      <button 
                        onClick={() => {
                          const actualUrl = decodeLink(p.link);
                          if (actualUrl) setActiveDemo({ url: actualUrl, title: p.title, projectId: p.id });
                        }}
                        className="group relative inline-flex items-center gap-4 md:gap-6 bg-white text-black px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.4em] hover:bg-[#a3ff00] transition-all justify-center overflow-hidden flex-1"
                      >
                        <span className="relative z-10">Initialize Demo</span>
                        <div className="absolute inset-0 bg-[#a3ff00] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </button>
                    )}
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-5 border-2 border-white/40 text-white font-black uppercase text-[10px] md:text-xs tracking-wide rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-all flex-1">
                      Discuss Build
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6 md:space-y-10">
                {p.description.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-4 md:gap-8 group/item">
                    <div className="mt-1 md:mt-2 text-[#a3ff00] font-black text-2xl md:text-3xl group-hover/item:translate-x-1 transition-transform">→</div>
                    <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-white leading-[1.2] font-bold tracking-tight group-hover/item:text-[#a3ff00] transition-colors">
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
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-black border-y border-white/20 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <h3 className="font-mono text-[#a3ff00] text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] font-black mb-12 md:mb-24 text-center">Protocol_Skills_Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="group border-t-2 border-white/20 pt-8 md:pt-10 hover:border-[#a3ff00] transition-colors">
                <h4 className="font-mono text-[10px] md:text-[12px] text-white uppercase tracking-[0.4em] mb-4 font-black group-hover:text-[#a3ff00] transition-colors">{category}</h4>
                <p className="text-lg md:text-xl xl:text-2xl font-black text-white leading-tight uppercase tracking-tight">{items}</p>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block font-mono text-[9px] text-white/60 hover:text-[#a3ff00] tracking-widest uppercase font-black transition-colors">
                  REQUEST_CONSULTATION
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / EXECUTIVE SUMMARY */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 xl:gap-24">
          <div className="xl:col-span-5 order-2 xl:order-1">
            <h3 className="font-mono text-[#a3ff00] text-sm uppercase tracking-[0.4em] font-black mb-10 md:mb-16 border-l-4 border-[#a3ff00] pl-6">Deployment_Logs</h3>
            <div className="space-y-12 md:space-y-20">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-12 top-0 bottom-0 w-1 bg-[#a3ff00]/20 group-hover:bg-[#a3ff00] transition-colors hidden sm:block" />
                  <p className="text-[10px] md:text-[11px] font-mono text-white uppercase tracking-[0.3em] mb-4 font-black">{exp.period}</p>
                  <p className="text-2xl md:text-3xl xl:text-4xl font-black uppercase tracking-tighter text-white mb-2">{exp.company}</p>
                  <p className="text-[10px] md:text-xs font-black text-[#a3ff00] uppercase tracking-[0.2em] mb-6 font-bold">{exp.title}</p>
                  <ul className="space-y-3">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="text-xs md:text-sm xl:text-base text-white font-bold leading-relaxed uppercase tracking-wide">• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="xl:col-span-7 bg-[#0a0a0a] p-8 sm:p-12 lg:p-14 xl:p-16 rounded-3xl border-2 border-white/20 shadow-inner flex flex-col items-center xl:items-start relative overflow-hidden order-1 xl:order-2">
            <h3 className="font-mono text-[#a3ff00] text-[10px] uppercase tracking-[0.5em] font-black mb-8 text-center xl:text-left">Executive_Summary</h3>
            <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic text-white mb-10 xl:text-left text-center">
              "Architecting autonomous pipelines to eliminate human bottlenecks."
            </p>
            <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-black space-y-8 uppercase tracking-tight">
              <p>Specialized in deep integration of AI reasoning with real-world business logic. I build systems that don't just 'assist' but 'operate'.</p>
            </div>
            
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-10 group flex items-center gap-6 bg-[#a3ff00] text-black px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_40px_rgba(163,255,0,0.3)]">
              LinkedIn
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 md:mt-24 pt-12 border-t-2 border-white/20 w-full">
              <div>
                <h5 className="font-mono text-[10px] uppercase text-[#a3ff00] tracking-[0.4em] mb-4 font-black">Education</h5>
                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">B.Sc. Software Engineering</p>
                <p className="font-mono text-[10px] text-white mt-2 uppercase tracking-widest font-bold">Class of 2023 // High Compliance</p>
              </div>
              <div>
                <h5 className="font-mono text-[10px] uppercase text-[#a3ff00] tracking-[0.4em] mb-4 font-black">Infrastructure</h5>
                <div className="space-y-1 font-black uppercase tracking-tighter text-sm md:text-base text-white">
                  <p>Stack: TS / React / Node</p>
                  <p>Intel: Google Gemini AI</p>
                  <p>Edge: Vercel / Supabase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 md:py-20 border-t-2 border-white/20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16">
          <div className="flex flex-row gap-6 md:gap-12 font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white font-black items-center">
            <a href="mailto:isaadimughal@gmail.com" className="hover:text-[#a3ff00] transition-colors border-b-2 border-white/40 hover:border-[#a3ff00] py-1">EMAIL_DIRECT</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#a3ff00] transition-colors border-b-2 border-white/40 hover:border-[#a3ff00] py-1">
              <LinkedInIcon /> LINKEDIN
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[10px] md:text-[11px] font-mono text-white/80 uppercase tracking-[0.3em] font-bold">
              &copy; 2025 SAAD MUGHAL // ALL_RIGHTS_RESERVED
            </p>
            <p className="mt-1 text-[8px] font-mono text-[#a3ff00]/60 uppercase tracking-[0.2em] font-bold">SYSLOG_REV: ARCHIVE_01_PROD</p>
          </div>
        </div>
      </footer>

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