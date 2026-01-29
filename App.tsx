import React, { useState, useEffect, useRef } from "react";
import type { Project, Experience, Achievement, Skill } from "./types";
import { PROJECTS, EXPERIENCE, ACHIEVEMENTS, SKILLS } from "./constants";

// --- HELPER & UI COMPONENTS ---

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef); // Stop observing once visible
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(cardRef);
    return () => observer.disconnect();
  }, [cardRef]);

  return (
    <div
      ref={setCardRef}
      className={`bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg transition-all duration-200 hover:border-gray-100/60 hover:bg-gray-800/50 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Section: React.FC<{
  children: React.ReactNode;
  id: string;
  title: string;
  fullHeight?: boolean;
}> = ({ children, id, title, fullHeight = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sectionRef, setSectionRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef); // Stop observing once visible
        }
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(sectionRef);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={setSectionRef}
      id={id}
      className={`py-16 sm:py-24 px-4 md:px-8 max-w-5xl mx-auto ${fullHeight ? "min-h-screen flex flex-col justify-center" : ""}`}
    >
      <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-100 relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}>
        <span className="relative z-10">{title}</span>
        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-white rounded-full transition-all duration-700 ${
          isVisible ? 'w-24' : 'w-0'
        }`}></span>
      </h2>
      {children}
    </section>
  );
};

// --- ICON COMPONENTS ---

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
  </svg>
);
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// --- PAGE COMPONENTS ---

const HomePage = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Computer Science & Engineering Student";
  const words = fullText.split(' ');
  
  useEffect(() => {
    // 80 WPM = 80 words per minute = 80/60 = 1.33 words per second
    // Average word is 5 characters, so 5 * 1.33 = 6.67 chars/sec
    // 1000ms / 6.67 = ~150ms per character
    const charDelay = 150;
    const autocompleteDelay = 100; // Delay before autocompleting word
    
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let currentDisplay = "";
    
    const typeNextChar = () => {
      if (currentWordIndex >= words.length) return;
      
      const currentWord = words[currentWordIndex];
      const charsToType = Math.min(3, currentWord.length); // Type first 3 chars of each word
      
      if (currentCharIndex < charsToType) {
        // Type character by character
        currentDisplay += currentWord[currentCharIndex];
        setDisplayText(currentDisplay);
        currentCharIndex++;
        setTimeout(typeNextChar, charDelay);
      } else if (currentCharIndex < currentWord.length) {
        // Autocomplete rest of word
        currentDisplay += currentWord.slice(currentCharIndex);
        if (currentWordIndex < words.length - 1) {
          currentDisplay += " "; // Add space between words
        }
        setDisplayText(currentDisplay);
        
        // Move to next word
        currentWordIndex++;
        currentCharIndex = 0;
        setTimeout(typeNextChar, autocompleteDelay);
      } else {
        // Word is complete, move to next word
        currentDisplay += " ";
        setDisplayText(currentDisplay);
        currentWordIndex++;
        currentCharIndex = 0;
        setTimeout(typeNextChar, autocompleteDelay);
      }
    };
    
    typeNextChar();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-400 pb-2 animate-fade-in">
          Ojasw Kant
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mt-2 mb-6 h-8 font-share-tech">
          {displayText}<span className="animate-pulse">|</span>
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
          Focused on backend/software + ML systems for autonomous applications. Building data/ML pipelines and autonomous systems. Currently pursuing B.Tech in CSE with a Mathematics minor at Shiv Nadar Institute of Eminence.
        </p>
        <div className="flex justify-center gap-6 mt-8 animate-fade-in-delay-2">
          <a
            href="https://github.com/ojaswk27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-all duration-150 hover:scale-110"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/ojasw-kant-169aa032a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-all duration-150 hover:scale-110"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:ojaswkant@gmail.com"
            className="text-gray-300 hover:text-white transition-all duration-150 hover:scale-110"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => (
  <Section id="about" title="About Me" fullHeight>
    <GlassCard className="p-8">
      <p className="text-gray-300 leading-relaxed text-center md:text-left mb-8">
        Computer Science & Engineering undergraduate at Shiv Nadar Institute of Eminence (2024-28), pursuing a mathematics minor focused on ML courses. Passionate about building practical solutions for autonomous applications and data/ML pipelines.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-2">Education</h3>
          <p className="text-gray-200 font-semibold">B.Tech in Computer Science & Engineering</p>
          <p className="text-gray-300 text-sm">Shiv Nadar Institute of Eminence</p>
          <p className="text-gray-400 text-sm">2024-2028</p>
          <p className="text-gray-300 text-sm mt-2">Minor in Mathematics</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-2">Contact</h3>
          <p className="text-gray-300 text-sm">📧 ojaswkant@gmail.com</p>
          <p className="text-gray-300 text-sm mt-1">📱 +91 8826474924</p>
          <p className="text-gray-300 text-sm mt-1">📍 Delhi, India</p>
        </div>
      </div>
    </GlassCard>
  </Section>
);

const ExperiencePage = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-8">
      {EXPERIENCE.map((exp, index) => (
        <GlassCard key={index} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              <p className="font-semibold text-gray-200">{exp.company}</p>
            </div>
            <p className="text-sm text-gray-400 flex-shrink-0 ml-4">
              {exp.duration}
            </p>
          </div>
          <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
            {exp.descriptionPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  </Section>
);

const ProjectsPage = () => (
  <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-2 gap-8">
      {PROJECTS.map((project: Project, index: number) => (
        <GlassCard 
          key={index} 
          className="p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white transition-all duration-300">
              {project.title}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-150 hover:scale-110"
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
          <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700/50 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-150 hover:bg-gray-600/70 hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  </Section>
);

const AchievementsPage = () => (
  <Section id="achievements" title="Achievements">
    <div className="grid sm:grid-cols-2 gap-6">
      {ACHIEVEMENTS.map((ach, index) => (
        <GlassCard key={index} className="p-6">
          <h3 className="text-lg font-bold text-white">{ach.title}</h3>
          <p className="text-gray-300">{ach.event}</p>
          <p className="text-sm text-gray-400 mt-1">{ach.date}</p>
        </GlassCard>
      ))}
    </div>
  </Section>
);

const SkillsPage = () => (
  <Section id="skills" title="Skills" fullHeight>
    <GlassCard className="p-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {SKILLS.map((skill, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="text-4xl transition-all duration-150 group-hover:scale-125">
              {skill.icon}
            </div>
            <p className="font-semibold text-gray-200 transition-all duration-150 group-hover:text-white group-hover:scale-105">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  </Section>
);

// --- LAYOUT COMPONENTS ---

const NAV_LINKS = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Achievements",
  "Skills",
];

const Header = ({ activeSection }: { activeSection: string }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl transition-transform duration-150 ${
      scrolled ? 'scale-95' : 'scale-100'
    }`}>
      <GlassCard className="p-2">
        <nav className="flex items-center justify-center sm:justify-between overflow-x-auto">
          <a
            href="#home"
            className="hidden sm:block text-lg font-bold ml-4 hover:text-white transition-all duration-150 hover:scale-105 flex-shrink-0"
          >
            OJ
          </a>
          <ul className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {NAV_LINKS.map((link) => {
              const linkLower = link.toLowerCase();
              return (
                <li key={link}>
                  <a
                    href={`#${linkLower}`}
                    className={`text-sm sm:text-base px-3 py-2 rounded-lg transition-all duration-150 whitespace-nowrap ${
                      activeSection === linkLower 
                        ? "bg-gray-700 text-white scale-105" 
                        : "hover:bg-gray-700/50 hover:scale-105"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </GlassCard>
    </header>
  );
};

const Footer = () => (
  <footer className="text-center py-8 px-4">
    <div className="flex justify-center gap-6 mb-4">
      <a
        href="https://github.com/ojaswk27"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/ojasw-kant-169aa032a"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <LinkedInIcon />
      </a>
      <a
        href="mailto:ojaswkant@gmail.com"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <MailIcon />
      </a>
    </div>
    <p className="text-gray-500">Designed & Built by Ojasw Kant</p>
  </footer>
);

// --- ANIMATED WAVE BACKGROUND ---

const WaveBackground = () => (
  <div className="pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minWidth: '100vw'
      }}
    >
      <defs>
        {/* Slate & Steel Monochrome Gradients */}
        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.08 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#475569', stopOpacity: 0.12 }} />
          <stop offset="100%" style={{ stopColor: '#334155', stopOpacity: 0.06 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#94a3b8', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#64748b', stopOpacity: 0.05 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-4" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#cbd5e1', stopOpacity: 0.08 }} />
          <stop offset="100%" style={{ stopColor: '#94a3b8', stopOpacity: 0.04 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-5" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#475569', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#64748b', stopOpacity: 0.04 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-6" x1="25%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.12 }} />
          <stop offset="100%" style={{ stopColor: '#334155', stopOpacity: 0.05 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-7" x1="75%" y1="0%" x2="25%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.09 }} />
          <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.04 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-8" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#94a3b8', stopOpacity: 0.07 }} />
          <stop offset="100%" style={{ stopColor: '#cbd5e1', stopOpacity: 0.03 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-9" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.04 }} />
        </linearGradient>
        <linearGradient id="wave-gradient-10" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.08 }} />
          <stop offset="100%" style={{ stopColor: '#94a3b8', stopOpacity: 0.03 }} />
        </linearGradient>
      </defs>
      
      {/* Wave 1 - Top layer */}
      <path fill="url(#wave-gradient-1)" d="M0,100 Q480,0 960,100 T1920,100 V0 H0 Z">
        <animate 
          attributeName="d" 
          dur="16s" 
          repeatCount="indefinite"
          values="
            M0,100 Q480,0 960,100 T1920,100 V0 H0 Z;
            M0,100 Q480,200 960,100 T1920,100 V0 H0 Z;
            M0,100 Q480,0 960,100 T1920,100 V0 H0 Z"
        />
      </path>
      
      {/* Wave 2 */}
      <path fill="url(#wave-gradient-2)" d="M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z">
        <animate 
          attributeName="d" 
          dur="20s" 
          repeatCount="indefinite"
          values="
            M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z;
            M0,150 Q640,260 1280,150 T2560,150 V0 H0 Z;
            M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z"
        />
      </path>

      {/* Wave 3 */}
      <path fill="url(#wave-gradient-3)" d="M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z">
        <animate 
          attributeName="d" 
          dur="24s" 
          repeatCount="indefinite"
          values="
            M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z;
            M0,210 Q800,340 1600,210 T3200,210 V0 H0 Z;
            M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z"
        />
      </path>

      {/* Wave 4 */}
      <path fill="url(#wave-gradient-4)" d="M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z">
        <animate 
          attributeName="d" 
          dur="28s" 
          repeatCount="indefinite"
          values="
            M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z;
            M0,280 Q960,430 1920,280 T3840,280 V0 H0 Z;
            M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z"
        />
      </path>

      {/* Wave 5 */}
      <path fill="url(#wave-gradient-5)" d="M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z">
        <animate 
          attributeName="d" 
          dur="32s" 
          repeatCount="indefinite"
          values="
            M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z;
            M0,360 Q1120,520 2240,360 T4480,360 V0 H0 Z;
            M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z"
        />
      </path>

      {/* Wave 6 - Bottom waves start */}
      <path fill="url(#wave-gradient-6)" d="M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z">
        <animate 
          attributeName="d" 
          dur="30s" 
          repeatCount="indefinite"
          values="
            M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z;
            M0,720 Q1120,880 2240,720 T4480,720 V1080 H0 Z;
            M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z"
        />
      </path>

      {/* Wave 7 */}
      <path fill="url(#wave-gradient-7)" d="M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z">
        <animate 
          attributeName="d" 
          dur="26s" 
          repeatCount="indefinite"
          values="
            M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z;
            M0,800 Q960,950 1920,800 T3840,800 V1080 H0 Z;
            M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z"
        />
      </path>

      {/* Wave 8 */}
      <path fill="url(#wave-gradient-8)" d="M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z">
        <animate 
          attributeName="d" 
          dur="22s" 
          repeatCount="indefinite"
          values="
            M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z;
            M0,870 Q800,1020 1600,870 T3200,870 V1080 H0 Z;
            M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z"
        />
      </path>

      {/* Wave 9 */}
      <path fill="url(#wave-gradient-9)" d="M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z">
        <animate 
          attributeName="d" 
          dur="19s" 
          repeatCount="indefinite"
          values="
            M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z;
            M0,930 Q640,1060 1280,930 T2560,930 V1080 H0 Z;
            M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z"
        />
      </path>

      {/* Wave 10 - Bottom layer */}
      <path fill="url(#wave-gradient-10)" d="M0,980 Q480,850 960,980 T1920,980 V1080 H0 Z">
        <animate 
          attributeName="d" 
          dur="17s" 
          repeatCount="indefinite"
          values="
            M0,980 Q480,850 960,980 T1920,980 V1080 H0 Z;
            M0,980 Q480,1080 960,980 T1920,980 V1080 H0 Z;
            M0,980 Q480,850 960,980 T1920,980 V1080 H0 Z"
        />
      </path>
    </svg>
  </div>
);



// --- MAIN APP COMPONENT ---

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.toLowerCase()),
      );
      const scrollPosition = window.scrollY;

      let currentSection = "home";
      for (const section of sections) {
        if (section) {
          // 150px offset to trigger the highlight before the section is exactly at the top
          const sectionTop = section.offsetTop - 150;
          if (scrollPosition >= sectionTop) {
            currentSection = section.id;
          }
        }
      }

      // Special case for the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        const lastSection = NAV_LINKS[NAV_LINKS.length - 1].toLowerCase();
        currentSection = lastSection;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Removed mouse tracking and blob generation - now handled by CursorTrail component

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-gray-200 font-sans">
      {/* Animated Wave Background */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0" style={{ width: '100vw', height: '100vh' }}>
        <WaveBackground />
      </div>

      <style>{`
        html, body {
          overflow-x: hidden;
          scrollbar-gutter: stable;
        }
        
        /* Overlay scrollbar that doesn't take up space */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
          background-clip: padding-box;
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-fade-in-delay { animation: fadeIn 1s ease-out 0.3s backwards; }
        .animate-fade-in-delay-2 { animation: fadeIn 1s ease-out 0.6s backwards; }
      `}</style>

      <div className="relative" style={{ zIndex: 10 }}>
        <Header activeSection={activeSection} />
        <main>
          <HomePage />
          <AboutPage />
          <ExperiencePage />
          <ProjectsPage />
          <AchievementsPage />
          <SkillsPage />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
