import React, { useState, useEffect, useRef } from "react";
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
        Computer Science Major and Mathematics Minor
      </p>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Passionate about crafting pratical solutions to complex real-world
        problems, from developing intelligent systems to exploring the beauty of
        math applications.
      </p>
      <div className="flex justify-center gap-6 mt-8">
        <a
          href="https://github.com/Cyceon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/ojasw-kant-169aa032a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:ojaswkant@gmail.com"
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {SKILLS.map((skill, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="text-4xl">{skill.icon}</div>
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

const Header = ({ currentPage }: { currentPage: string }) => (
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
                  className={`text-sm sm:text-base px-3 py-2 rounded-lg transition-all duration-300 ${currentPage === linkLower ? "bg-gray-700 text-orange-400" : "hover:bg-gray-700/50"}`}
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
        href="https://github.com/Cyceon"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/ojasw-kant-169aa032a/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <LinkedInIcon />
      </a>
      <a
        href="mailto:ojaswkant@gmail.com"
        className="text-gray-400 hover:text-orange-400 transition-colors"
      >
        <MailIcon />
      </a>
    </div>
    <p className="text-gray-500">Designed & Built by Ojasw Kant</p>
  </footer>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "-40% 0px -40% 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-900 text-gray-200 font-sans"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-700 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-700 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
	        0% { transform: translate(0px, 0px) scale(1); }
	        33% { transform: translate(30px, -50px) scale(1.1); }
	        66% { transform: translate(-20px, 20px) scale(0.9); }
	        100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <div className="relative z-10">
        <Header currentPage={activeSection} />
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
