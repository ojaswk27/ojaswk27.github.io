import React, { useState, useEffect } from "react";
import type { Project, Experience, Achievement, Skill } from "./types";
import { PROJECTS, EXPERIENCE, ACHIEVEMENTS, SKILLS } from "./constants";

// --- HELPER & UI COMPONENTS ---

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-lg transition-all duration-300 hover:border-orange-400/60 hover:bg-gray-800/50 ${className}`}
  >
    {children}
  </div>
);

const Section: React.FC<{
  children: React.ReactNode;
  id: string;
  title: string;
  fullHeight?: boolean;
}> = ({ children, id, title, fullHeight = false }) => (
  <section
    id={id}
    className={`py-16 sm:py-24 px-4 md:px-8 max-w-5xl mx-auto ${fullHeight ? "min-h-screen flex flex-col justify-center" : ""}`}
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-100 relative">
      <span className="relative z-10">{title}</span>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></span>
    </h2>
    {children}
  </section>
);

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

const HomePage = () => (
  <section
    id="home"
    className="min-h-screen flex flex-col items-center justify-center text-center px-4"
  >
    <div className="max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-400 pb-2">
        Ojasw Kant
      </h1>
      <p className="text-xl md:text-2xl text-orange-400 mt-2 mb-6">
        Student in Computer Science & Mathematics
      </p>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Passionate about crafting pratical solutions to complex real-world
        problems, from developing intelligent systems to exploring the beauty of
        math applications.
      </p>
      <div className="flex justify-center gap-6 mt-8">
        <a
          href="https://github.com/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://linkedin.com/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:placeholder@example.com"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          <MailIcon />
        </a>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <Section id="about" title="About Me" fullHeight>
    <GlassCard className="p-8">
      <p className="text-gray-300 leading-relaxed text-center md:text-left">
        As a dedicated Computer Science major aiming for a minor in Mathematics
        at Shiv Nadar University, I am driven by the intersection of logic,
        creativity, and technology. My coursework in advanced algorithms,
        machine learning, and discrete mathematics has provided me with a strong
        theoretical foundation, which I love to apply to practical, real-world
        projects. Whether it's building a performant application or an
        autonomous system, I am often seen seeking new challenges that push the
        boundaries of my knowledge. I thrive in collaborative environments and
        am eager to contribute my skills to a forward-thinking team.
      </p>
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
              <h3 className="text-xl font-bold text-orange-400">{exp.role}</h3>
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
        <GlassCard key={index} className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-orange-400">
              {project.title}
            </h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
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
                className="bg-orange-900/50 text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full"
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
          <h3 className="text-lg font-bold text-orange-400">{ach.title}</h3>
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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 text-center">
        {SKILLS.map((skill, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="text-5xl">{skill.icon}</div>
            <p className="font-semibold text-gray-200">{skill.name}</p>
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

const Header = ({ activeSection }: { activeSection: string }) => (
  <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
    <GlassCard className="p-2">
      <nav className="flex items-center justify-center sm:justify-between">
        <a
          href="#home"
          className="hidden sm:block text-lg font-bold ml-4 hover:text-orange-400 transition-colors"
        >
          OJ
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const linkLower = link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${linkLower}`}
                  className={`text-sm sm:text-base px-3 py-2 rounded-lg transition-all duration-300 ${activeSection === linkLower ? "bg-gray-700 text-orange-400" : "hover:bg-gray-700/50"}`}
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

const Footer = () => (
  <footer className="text-center py-8 px-4">
    <div className="flex justify-center gap-6 mb-4">
      <a
        href="https://github.com/placeholder"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://linkedin.com/placeholder"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <LinkedInIcon />
      </a>
      <a
        href="mailto:placeholder@example.com"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <MailIcon />
      </a>
    </div>
    <p className="text-gray-500">Designed & Built by Ojasw Kant</p>
  </footer>
);

// --- BLOB COMPONENT WITH MOUSE REPULSION ---

const MagneticBlob: React.FC<{
  className: string;
  style?: React.CSSProperties;
  mouseX: number;
  mouseY: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
}> = ({ className, style, mouseX, mouseY, position, size }) => {
  const [blobRef, setBlobRef] = useState<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!blobRef) return;

    const rect = blobRef.getBoundingClientRect();
    const blobCenterX = rect.left + rect.width / 2;
    const blobCenterY = rect.top + rect.height / 2 + window.scrollY; // Account for scroll

    const distanceX = mouseX - blobCenterX;
    const distanceY = mouseY - blobCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Repulsion effect - stronger when mouse is closer
    const maxDistance = 300; // Maximum distance for effect
    const strength = 50; // Maximum repulsion strength in pixels

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * strength;
      const angle = Math.atan2(distanceY, distanceX);

      // Apply repulsion in opposite direction
      const newX = -Math.cos(angle) * force;
      const newY = -Math.sin(angle) * force;

      setOffset({ x: newX, y: newY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY, blobRef]);

  return (
    <div
      ref={setBlobRef}
      className={className}
      style={{
        ...style,
        ...position,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.5s ease-out",
      }}
    />
  );
};

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

  // Mouse tracking for magnetic repulsion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Account for scroll position since blobs are now absolute positioned
      setMousePosition({
        x: e.clientX,
        y: e.clientY + window.scrollY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blob configurations - spread evenly across the page height
  const blobs = [
    {
      position: { top: "5%", left: "10%" },
      size: 288,
      className:
        "w-72 h-72 bg-orange-700 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob",
    },
    {
      position: { top: "15%", right: "15%" },
      size: 288,
      className:
        "w-72 h-72 bg-gray-700 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000",
    },
    {
      position: { top: "25%", left: "60%" },
      size: 384,
      className:
        "w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-blob-slow animation-delay-1000",
    },
    {
      position: { top: "35%", left: "20%" },
      size: 256,
      className:
        "w-64 h-64 bg-gray-600 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-3000",
    },
    {
      position: { top: "45%", right: "25%" },
      size: 320,
      className:
        "w-80 h-80 bg-orange-800 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-blob-slow animation-delay-5000",
    },
    {
      position: { top: "55%", left: "40%" },
      size: 640,
      className:
        "w-[40rem] h-[40rem] bg-orange-700 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob-slow -translate-x-1/2 -translate-y-1/2",
    },
    {
      position: { top: "65%", right: "10%" },
      size: 288,
      className:
        "w-72 h-72 bg-gray-800 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-2500",
    },
    {
      position: { top: "75%", left: "30%" },
      size: 224,
      className:
        "w-56 h-56 bg-orange-400 rounded-full mix-blend-screen filter blur-lg opacity-15 animate-blob animation-delay-3500",
    },
    {
      position: { top: "85%", right: "40%" },
      size: 288,
      className:
        "w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000",
    },
    {
      position: { top: "95%", left: "50%" },
      size: 320,
      className:
        "w-80 h-80 bg-gray-700 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-blob-slow animation-delay-1500",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-gray-200 font-sans">
      {/* Background Blobs Container - Spans full document height */}
      <div
        className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none"
        style={{
          bottom: 0,
          height: "auto",
          minHeight: "100%",
          zIndex: 0,
        }}
      >
        {blobs.map((blob, index) => (
          <MagneticBlob
            key={index}
            className={`absolute ${blob.className}`}
            position={blob.position}
            size={blob.size}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
        ))}
      </div>

      <style>{`
        html, body {
          overflow-x: hidden;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.15); }
          66% { transform: translate(-30px, 40px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-blob-slow { animation: blob-slow 12s infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
      `}</style>

      <div className="relative z-10">
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
