/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';


import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Smartphone,
  Code2,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Github,
  Instagram,
  Zap,
  Radio,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import {
  NAV_LINKS,
  VIDEO_SRC,
  PROJECTS,
  SKILLS,
  MOMENTS,
  INSTA_PROFILE_IMG
} from './data';


const LogoMark = () => (
  <svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
    <rect x="16" y="3" width="12" height="20" rx="3" fill="white" />
    <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
  </svg>
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeMoment, setActiveMoment] = useState(0);
  const [activeNav, setActiveNav] = useState('Projects');


  const videoBgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect 1: Video Scrubbing Logic


  useEffect(() => {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (!video) return;

    // Warm up the video decoder - this helps with smoother scrubbing
    video.play().then(() => {
      video.pause();
    }).catch(() => {
      // Autoplay policy might block this, which is fine
    });

    let scrubbingTween: gsap.core.Tween | null = null;

    const initScrub = () => {
      if (!video.duration || isNaN(video.duration)) return;

      if (scrubbingTween) {
        if (scrubbingTween.scrollTrigger) scrubbingTween.scrollTrigger.kill();
        scrubbingTween.kill();
      }

      // Using a very small scrub value (0.1) for near-instant response
      // while still maintaining a tiny bit of smoothness to prevent jitter.
      // This makes the "calculation" feel continuous.
      scrubbingTween = gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
          // Force frequent updates
          onUpdate: (self) => {
            // Optional: log progress for debugging
            // console.log("Scrubbing progress:", self.progress);
          }
        }
      });

      console.log("Continuous video scrubbing initialized. Duration:", video.duration);
    };

    video.addEventListener('loadedmetadata', initScrub);
    video.addEventListener('durationchange', initScrub);

    if (video.readyState >= 1) {
      initScrub();
    }

    const timeout = setTimeout(() => {
      if (video.duration && !scrubbingTween) initScrub();
    }, 1000);

    return () => {
      video.removeEventListener('loadedmetadata', initScrub);
      video.removeEventListener('durationchange', initScrub);
      clearTimeout(timeout);
      if (scrubbingTween) {
        if (scrubbingTween.scrollTrigger) scrubbingTween.scrollTrigger.kill();
        scrubbingTween.kill();
      }
    };
  }, []);





  // Effect 3: Parallax mouse tracking
  useEffect(() => {
    const strength = 15;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = ((e.clientX - cx) / cx) * strength;
      mouseRef.current.y = ((e.clientY - cy) / cy) * strength;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId: number;
    const update = () => {
      mouseRef.current.currentX += (mouseRef.current.x - mouseRef.current.currentX) * 0.04;
      mouseRef.current.currentY += (mouseRef.current.y - mouseRef.current.currentY) * 0.04;

      if (videoBgRef.current) {
        gsap.set(videoBgRef.current, {
          x: mouseRef.current.currentX,
          y: mouseRef.current.currentY,
          rotateX: -mouseRef.current.currentY * 0.1,
          rotateY: mouseRef.current.currentX * 0.1,
        });
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Effect 4: Nav Bubble Logic
  useEffect(() => {
    const sections = NAV_LINKS.map(link => link.href.replace('#', ''));

    sections.forEach(sectionId => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            const linkName = NAV_LINKS.find(l => l.href === `#${sectionId}`)?.name;
            if (linkName) setActiveNav(linkName);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!navContainerRef.current || !bubbleRef.current || !navRef.current) return;

    const activeLink = navContainerRef.current.querySelector(`[data-nav="${activeNav}"]`) as HTMLElement;
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      const x = linkRect.left - navRect.left;
      const y = linkRect.top - navRect.top;

      gsap.to(bubbleRef.current, {
        x: x,
        y: y,
        width: linkRect.width,
        height: linkRect.height,
        duration: 0.6,
        ease: "power4.out"
      });
    }
  }, [activeNav]);



  return (
    <div className="bg-black text-white font-body selection:bg-white selection:text-black">
      {/* Background Video */}
      <div ref={videoBgRef} className="fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center opacity-100 will-change-transform bg-black">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover will-change-transform"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        />

      </div>



      {/* Nav */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] whitespace-nowrap">
        <div ref={navRef} className="liquid-glass flex items-center gap-8 rounded-full px-6 py-3 relative">
          <div
            ref={bubbleRef}
            className="absolute top-0 left-0 bg-white/15 backdrop-blur-3xl border border-white/30 rounded-full z-0 h-full shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          />

          <LogoMark />
          <div ref={navContainerRef} className="hidden md:flex items-center gap-6 relative z-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-nav={link.name}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 px-4 py-2 rounded-full ${activeNav === link.name ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Section 1: Hero */}
        <section className="h-screen flex flex-col items-center justify-center relative px-6">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="text-white/40 uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-8 block text-center">Odisha, India</span>
            <h1 className="hero-title mb-12">Malayansu Bisi</h1>
            <div className="max-w-xl mx-auto text-center space-y-6 liquid-glass p-8 sm:p-12 rounded-[2.5rem]">
              <p className="text-lg sm:text-xl font-light text-white/70 leading-relaxed">
                High School Student, <span className="text-white font-normal italic">Tech Builder</span> & Aspiring Educator.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="bg-white text-black text-[10px] uppercase tracking-widest font-bold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-white/20">
                  View Projects
                </button>
                <button className="liquid-glass text-white text-[10px] uppercase tracking-widest font-bold px-10 py-4 rounded-full border border-white/10 hover:bg-white/5 active:scale-95 transition-all">
                  Read Journey
                </button>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20"
          >
            <div className="w-[1px] h-12 bg-white"></div>
          </motion.div>
        </section>

        {/* Section: About & Bio */}
        <section id="about" className="min-h-screen py-32 px-6 sm:px-12 flex items-center">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden liquid-glass">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                  alt="Workspace"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white text-black p-10 rounded-[2.5rem] hidden sm:block max-w-[240px]">
                <p className="text-xs uppercase tracking-widest font-bold mb-4 opacity-40">Identity</p>
                <p className="text-sm font-medium italic leading-relaxed">
                  "I am a builder at heart. Clean Python code or wiring ESP32s."
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-4 block">About Me</span>
              <h2 className="text-5xl sm:text-7xl font-heading italic leading-none mb-10">Coder. Tinkerer. <br /> Visionary.</h2>
              <div className="space-y-6 text-lg font-light text-white/60 leading-relaxed max-w-xl liquid-glass p-8 sm:p-12 rounded-[2.5rem]">
                <p>
                  Based in Odisha, I specialize in blending the physical and digital worlds. Whether it's editing cinematic videos or automating home tasks with microcontrollers, I thrive on the process of creation from scratch.
                </p>
                <p>
                  Photography is my second language. I capture moments that speak where words fail—from golden sunsets to the quiet beauty of nature. My goal is to create modern, custom <span className="text-white italic">Glassmorphism</span> interfaces that empower users to control their environment seamlessly.
                </p>
                <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest block mb-2 text-white/30">Location</span>
                    <span className="text-sm font-medium">Odisha, India</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest block mb-2 text-white/30">Interests</span>
                    <span className="text-sm font-medium">IoT, Hardware, UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Instagram Moments */}
        <section id="moments" className="py-32 px-6 sm:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto liquid-glass p-8 sm:p-16 rounded-[3.5rem]">
            <div className="mb-20">
              <span className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-4 block">Visual Stories</span>
              <h2 className="text-5xl sm:text-7xl font-heading italic">Instagram Highlights</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-[600px]">
              {MOMENTS.map((moment, i) => (
                <motion.div
                  key={moment.id}
                  layout
                  onClick={() => setActiveMoment(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${activeMoment === i ? 'flex-[4]' : 'flex-[1] grayscale hover:grayscale-0'
                    }`}
                >
                  <img
                    src={moment.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={moment.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <AnimatePresence>
                    {activeMoment === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/90 to-transparent"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-[2px]">
                              <img src={INSTA_PROFILE_IMG} className="w-full h-full rounded-full object-cover" />
                            </div>
                          </div>
                          <span className="text-xs font-bold tracking-tight">{moment.title}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-light text-white/80 leading-relaxed max-w-[70%]">
                            {moment.description}
                          </p>
                          <a
                            href={moment.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="liquid-glass p-3 rounded-full hover:bg-white/20 transition-all active:scale-90"
                            title="View on Instagram"
                          >
                            <ExternalLink className="w-4 h-4 text-white/70" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-white/5 text-center max-w-2xl mx-auto">
              <p className="text-xl font-heading italic text-white/60 mb-4">
                "Capturing moments isn't just a process; it's my way of seeing the world."
              </p>
              <p className="text-sm font-light text-white/40 leading-relaxed uppercase tracking-[0.1em]">
                I document life's fleeting perspectives as a hobby, blending visual storytelling with my technical journey.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Projects Carousel */}
        <section id="projects" className="min-h-screen py-32 px-6 sm:px-12 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-4 block">Featured Work</span>
                <h2 className="text-5xl sm:text-7xl font-heading italic lowercase leading-none">Engineering <br /> Intuition</h2>
              </div>
              <p className="max-w-xs text-sm font-light text-white/50 leading-relaxed">
                Hardware DIY, IoT, and software development with a vision to inspire future computer scientists.
              </p>
            </div>

            <div className="relative group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 aspect-[4/3] rounded-[2rem] overflow-hidden liquid-glass relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProject}
                      src={PROJECTS[activeProject].image}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                    <div className="flex gap-2">
                      {PROJECTS[activeProject].tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  <div className="flex items-center gap-4 text-white/30 mb-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm">
                      {PROJECTS[activeProject].icon}
                    </div>
                    <span className="text-xs uppercase tracking-widest">{activeProject + 1} / {PROJECTS.length}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="liquid-glass p-10 rounded-[2.5rem]"
                    >
                      <h3 className="text-4xl font-heading mb-4">{PROJECTS[activeProject].title}</h3>
                      <p className="text-white/70 font-light leading-relaxed">
                        {PROJECTS[activeProject].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveProject((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
                      className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setActiveProject((prev) => (prev + 1) % PROJECTS.length)}
                      className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="flex-1 h-[1px] bg-white/10 ml-4">
                      <motion.div
                        initial={false}
                        animate={{ width: `${((activeProject + 1) / PROJECTS.length) * 100}%` }}
                        className="h-full bg-white transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Skills Grid */}
        <section id="skills" className="min-h-screen py-32 px-6 sm:px-12 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 liquid-glass-strong p-12 rounded-[3rem] inline-block mx-auto w-full max-w-2xl">
              <span className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-4 block">Capabilities</span>
              <h2 className="text-5xl sm:text-7xl font-heading italic">Modular Toolkit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="liquid-glass-strong p-8 rounded-[2rem] hover:scale-[1.02] transition-transform duration-500 group"
                >
                  <div className="text-white/20 mb-6 group-hover:text-white transition-colors duration-500">
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-heading mb-6 border-b border-white/10 pb-4">{skill.title}</h4>
                  <ul className="space-y-3">
                    {skill.items.map(item => (
                      <li key={item} className="text-sm font-light text-white/40 flex items-center gap-2 group-hover:text-white/70 transition-colors">
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Education & Footer */}
        <section id="education" className="min-h-screen py-32 px-6 sm:px-12 flex flex-col">
          <div className="max-w-4xl mx-auto flex-1 flex flex-col justify-center text-center">
            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-8 mx-auto">
              <GraduationCap className="w-4 h-4 text-white/50" />
              <span className="text-[10px] uppercase tracking-widest">Academic Background</span>
            </div>
            <h2 className="text-5xl sm:text-8xl font-heading italic mb-12">Building for for <br /> Future Generations</h2>
            <div className="liquid-glass-strong p-12 rounded-[3rem] text-left">
              <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                <div className="text-6xl font-dirtyline text-white/5 shrink-0">2026</div>
                <div>
                  <h4 className="text-2xl font-heading mb-4">Senior Secondary (Class 12) | 82.2%</h4>
                  <p className="text-white/50 font-light max-w-xl">
                    A Senior Secondary student focusing on Physics, Mathematics, and Computer Science. Achievement of 82.2% in my board examinations reflects my commitment to academic excellence. I use this strong academic foundation to power complex algorithm logic and electromagnetic induction exploration in my projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-auto pt-32 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-end border-t border-white/5">
            <div>
              <LogoMark />
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/30">© 2026 Malayansu Bisi</p>
            </div>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/malayansu" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/typicalyy_me" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
            <div className="text-right">
              <p className="text-xs font-light text-white/40 mb-2 italic">Based in</p>
              <p className="text-lg font-heading italic">Odisha, India</p>
            </div>
          </footer>
        </section>
      </main>

      {/* Progress Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
        {NAV_LINKS.map((link, i) => (
          <a key={link.name} href={link.href} className="group flex items-center justify-end gap-4 overflow-hidden">
            <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">{link.name}</span>
            <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white group-hover:h-8 transition-all duration-500"></div>
          </a>
        ))}
      </div>
    </div>
  );
}

