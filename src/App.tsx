import React, { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { Project, Experience, Achievement, Skill } from "./types";
import {
  PROJECTS,
  EXPERIENCE,
  ACHIEVEMENTS,
  SKILLS,
  INTERESTS,
} from "./constants";
import ProjectPage from "./ProjectPage";
import TUI from "./TUI";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- HELPER & UI COMPONENTS ---

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style = {} }) => (
  <div
    className={`backdrop-blur-lg border rounded-lg shadow-lg transition-all duration-200 ${className}`}
    style={{
      backgroundColor: "rgba(20, 20, 20, 0.3)",
      borderColor: "rgba(80, 80, 80, 0.3)",
      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.02)",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(160, 160, 160, 0.5)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(180, 180, 180, 0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(80, 80, 80, 0.3)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 255, 255, 0.02)";
    }}
  >
    {children}
  </div>
);

// --- ICON COMPONENTS ---

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="14"
    height="14"
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

// --- ANIMATED WAVE BACKGROUND ---

// --- PROJECT CARD WITH HOVER POPOVER ---

const ProjectCard: React.FC<{
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ project, isOpen, onToggle }) => {
  const hasDetails =
    project.duration ||
    project.role ||
    (project.learnings && project.learnings.length > 0);
  const slug = project.slug ?? toSlug(project.title);

  return (
    <div
      className="project-card border rounded transition-colors cursor-pointer"
      style={{
        borderColor: isOpen
          ? "rgba(107, 114, 128, 0.7)"
          : "rgba(55, 65, 81, 0.5)",
      }}
      onClick={onToggle}
    >
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-bold text-white">{project.title}</h4>
          <div className="flex gap-2">
            {project.link && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.link, "_blank", "noopener,noreferrer");
                }}
                className="cursor-pointer"
                style={{ color: "#f97316" }}
                title="Main Repository"
              >
                <ExternalLinkIcon />
              </span>
            )}
            {project.cliLink && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.cliLink, "_blank", "noopener,noreferrer");
                }}
                className="cursor-pointer"
                style={{ color: "#f97316" }}
                title="CLI Version"
              >
                <ExternalLinkIcon />
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="bg-gray-700/50 text-gray-400 text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {hasDetails && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 280ms ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              className="px-3 pb-3"
              style={{ borderTop: "1px solid rgba(55, 65, 81, 0.5)" }}
            >
              <div className="pt-3 space-y-2">
                {project.duration && (
                  <div>
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      Timeline
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {project.duration}
                    </p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      My Role
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {project.role}
                    </p>
                  </div>
                )}
                {project.learnings && project.learnings.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      What I Learnt
                    </span>
                    <ul className="text-xs text-gray-400 mt-0.5 ml-3 list-disc space-y-0.5">
                      {project.learnings.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link
                  to={`/${slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block text-xs font-semibold text-gray-300 hover:text-white uppercase tracking-wide pt-1"
                >
                  Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PROJECT GRID (manages which popover is open) ---

const ProjectGrid: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [delayedCloseIndex, setDelayedCloseIndex] = useState<number | null>(
    null,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback((index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    setOpenIndex((prev) => {
      if (prev === index) {
        // same card — close it immediately
        return null;
      }
      if (prev !== null) {
        // different card — keep old one open briefly so new opens first
        setDelayedCloseIndex(prev);
        closeTimer.current = setTimeout(() => setDelayedCloseIndex(null), 120);
      }
      return index;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openIndex === null) return;
      if (!(e.target as Element).closest(".project-card")) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIndex]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
      style={{ position: "relative" }}
    >
      {PROJECTS.map((project: Project, index: number) => (
        <ProjectCard
          key={index}
          project={project}
          isOpen={openIndex === index || delayedCloseIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

const WaveBackground = () => (
  <div
    className="pointer-events-none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        minWidth: "100vw",
      }}
    >
      <defs>
        {/* Pure Monochrome Black/White/Gray Gradients - No Color */}
        <linearGradient
          id="wave-gradient-1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#505050", stopOpacity: 0.12 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#303030", stopOpacity: 0.06 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-2"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#404040", stopOpacity: 0.1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#202020", stopOpacity: 0.05 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-3"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#808080", stopOpacity: 0.08 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#606060", stopOpacity: 0.04 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-4"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#a0a0a0", stopOpacity: 0.06 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#707070", stopOpacity: 0.03 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-5"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#404040", stopOpacity: 0.08 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#505050", stopOpacity: 0.03 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-6"
          x1="25%"
          y1="0%"
          x2="75%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#1a1a1a", stopOpacity: 0.1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#2a2a2a", stopOpacity: 0.04 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-7"
          x1="75%"
          y1="0%"
          x2="25%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#606060", stopOpacity: 0.07 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#404040", stopOpacity: 0.03 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-8"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#909090", stopOpacity: 0.05 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#b0b0b0", stopOpacity: 0.02 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-9"
          x1="100%"
          y1="50%"
          x2="0%"
          y2="50%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#2a2a2a", stopOpacity: 0.08 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#404040", stopOpacity: 0.03 }}
          />
        </linearGradient>
        <linearGradient
          id="wave-gradient-10"
          x1="50%"
          y1="100%"
          x2="50%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "#505050", stopOpacity: 0.06 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#808080", stopOpacity: 0.02 }}
          />
        </linearGradient>
      </defs>

      {/* Wave 1 - Top layer */}
      <path
        fill="url(#wave-gradient-1)"
        d="M0,100 Q480,0 960,100 T1920,100 V0 H0 Z"
      >
        <animate
          attributeName="d"
          dur="80s"
          repeatCount="indefinite"
          values="
            M0,100 Q480,0 960,100 T1920,100 V0 H0 Z;
            M0,100 Q480,200 960,100 T1920,100 V0 H0 Z;
            M0,100 Q480,0 960,100 T1920,100 V0 H0 Z"
        />
      </path>

      {/* Wave 2 */}
      <path
        fill="url(#wave-gradient-2)"
        d="M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z"
      >
        <animate
          attributeName="d"
          dur="100s"
          repeatCount="indefinite"
          values="
            M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z;
            M0,150 Q640,260 1280,150 T2560,150 V0 H0 Z;
            M0,150 Q640,40 1280,150 T2560,150 V0 H0 Z"
        />
      </path>

      {/* Wave 3 */}
      <path
        fill="url(#wave-gradient-3)"
        d="M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z"
      >
        <animate
          attributeName="d"
          dur="120s"
          repeatCount="indefinite"
          values="
            M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z;
            M0,210 Q800,340 1600,210 T3200,210 V0 H0 Z;
            M0,210 Q800,80 1600,210 T3200,210 V0 H0 Z"
        />
      </path>

      {/* Wave 4 */}
      <path
        fill="url(#wave-gradient-4)"
        d="M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z"
      >
        <animate
          attributeName="d"
          dur="140s"
          repeatCount="indefinite"
          values="
            M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z;
            M0,280 Q960,430 1920,280 T3840,280 V0 H0 Z;
            M0,280 Q960,130 1920,280 T3840,280 V0 H0 Z"
        />
      </path>

      {/* Wave 5 */}
      <path
        fill="url(#wave-gradient-5)"
        d="M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z"
      >
        <animate
          attributeName="d"
          dur="160s"
          repeatCount="indefinite"
          values="
            M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z;
            M0,360 Q1120,520 2240,360 T4480,360 V0 H0 Z;
            M0,360 Q1120,200 2240,360 T4480,360 V0 H0 Z"
        />
      </path>

      {/* Wave 6 - Bottom waves start */}
      <path
        fill="url(#wave-gradient-6)"
        d="M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z"
      >
        <animate
          attributeName="d"
          dur="150s"
          repeatCount="indefinite"
          values="
            M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z;
            M0,720 Q1120,880 2240,720 T4480,720 V1080 H0 Z;
            M0,720 Q1120,560 2240,720 T4480,720 V1080 H0 Z"
        />
      </path>

      {/* Wave 7 */}
      <path
        fill="url(#wave-gradient-7)"
        d="M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z"
      >
        <animate
          attributeName="d"
          dur="130s"
          repeatCount="indefinite"
          values="
            M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z;
            M0,800 Q960,950 1920,800 T3840,800 V1080 H0 Z;
            M0,800 Q960,650 1920,800 T3840,800 V1080 H0 Z"
        />
      </path>

      {/* Wave 8 */}
      <path
        fill="url(#wave-gradient-8)"
        d="M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z"
      >
        <animate
          attributeName="d"
          dur="110s"
          repeatCount="indefinite"
          values="
            M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z;
            M0,870 Q800,1020 1600,870 T3200,870 V1080 H0 Z;
            M0,870 Q800,720 1600,870 T3200,870 V1080 H0 Z"
        />
      </path>

      {/* Wave 9 */}
      <path
        fill="url(#wave-gradient-9)"
        d="M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z"
      >
        <animate
          attributeName="d"
          dur="95s"
          repeatCount="indefinite"
          values="
            M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z;
            M0,930 Q640,1060 1280,930 T2560,930 V1080 H0 Z;
            M0,930 Q640,800 1280,930 T2560,930 V1080 H0 Z"
        />
      </path>

      {/* Wave 10 - Bottom layer */}
      <path
        fill="url(#wave-gradient-10)"
        d="M0,980 Q480,850 960,980 T1920,980 V1080 H0 Z"
      >
        <animate
          attributeName="d"
          dur="85s"
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
  const [displayText, setDisplayText] = useState("");
  const fullText = "Computer Science & Engineering Student";
  const words = fullText.split(" ");

  useEffect(() => {
    const charDelay = 150;
    const autocompleteDelay = 100;

    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let currentDisplay = "";

    const typeNextChar = () => {
      if (currentWordIndex >= words.length) return;

      const currentWord = words[currentWordIndex];
      const charsToType = Math.min(3, currentWord.length);

      if (currentCharIndex < charsToType) {
        currentDisplay += currentWord[currentCharIndex];
        setDisplayText(currentDisplay);
        currentCharIndex++;
        setTimeout(typeNextChar, charDelay);
      } else if (currentCharIndex < currentWord.length) {
        currentDisplay += currentWord.slice(currentCharIndex);
        if (currentWordIndex < words.length - 1) {
          currentDisplay += " ";
        }
        setDisplayText(currentDisplay);

        currentWordIndex++;
        currentCharIndex = 0;
        setTimeout(typeNextChar, autocompleteDelay);
      } else {
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
    <div
      className="relative min-h-screen w-full text-gray-200 font-sans"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Animated Wave Background */}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <WaveBackground />
      </div>

      <style>{`
        html, body {
          overflow-x: hidden;
          scrollbar-gutter: stable;
        }

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

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>

      {/* Main Content - Single Page Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
              Ojasw Kant
            </h1>
            <p
              className="text-lg md:text-xl font-share-tech mb-4"
              style={{ color: "#f97316" }}
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <a
                href="https://github.com/ojaswk27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/ojasw-kant-169aa032a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <LinkedInIcon />
              </a>
              <a
                href="mailto:ojaswkant@gmail.com"
                className="text-gray-400 hover:text-white"
              >
                <MailIcon />
              </a>
            </div>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              I focus on software and ML systems for autonomous applications,
              with experience building data pipelines, computer vision models,
              and embedded hardware integrations.
            </p>
          </div>

          {/* Grid Layout */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start"
            style={{ position: "relative", zIndex: 2 }}
          >
            {/* Left Column */}
            <div className="flex flex-col gap-4 lg:h-full">
              {/* Education */}
              <GlassCard className="p-4 flex-shrink-0">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-200">
                      B.Tech in Computer Science
                    </p>
                    <p className="text-xs text-gray-400">
                      Shiv Nadar Institute of Eminence
                    </p>
                    <p className="text-xs text-gray-400">
                      2024–2028 • Minor in Mathematics
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-200">
                      Senior Secondary (Class XII)
                    </p>
                    <p className="text-xs text-gray-400">Birla Vidya Niketan</p>
                    <p className="text-xs text-gray-400">
                      PCM + Computer Science
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Skills */}
              <GlassCard className="p-4 flex-shrink-0">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700/30 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard className="p-4 flex-grow">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Achievements
                </h3>
                <div className="space-y-3">
                  {ACHIEVEMENTS.map((ach, index) => (
                    <div key={index}>
                      <p className="text-sm font-semibold text-white">
                        {ach.title}
                      </p>
                      <p className="text-xs text-gray-400">{ach.event}</p>
                      <p className="text-xs text-gray-500">{ach.date}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Middle & Right Columns */}
            <div className="flex flex-col gap-4 lg:col-span-2 lg:h-full">
              {/* Experience */}
              <GlassCard className="p-4 flex-shrink-0">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Experience
                </h3>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-gray-400">{exp.company}</p>
                        </div>
                        <p className="text-xs text-gray-500">{exp.duration}</p>
                      </div>
                      <ul className="text-xs text-gray-300 space-y-1 ml-4 list-disc">
                        {exp.descriptionPoints.slice(0, 2).map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Projects */}
              <GlassCard
                className="p-4 flex-grow"
                style={{
                  overflow: "visible",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Projects
                </h3>
                <ProjectGrid />
              </GlassCard>
            </div>
          </div>

          {/* Interests Section */}
          <div className="mt-4" style={{ position: "relative", zIndex: 1 }}>
            <GlassCard className="p-4">
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Interests
              </h3>
              <p className="text-xs text-gray-300 mb-3 italic">
                Very interested in the junction of software and hardware
                applications, it is really cool to me.
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gray-700/30 text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>Designed & Built by Ojasw Kant</p>
          </div>

          {/* Subtle TUI corner icon - desktop only */}
          <a
            href="/tui"
            className="fixed bottom-4 right-4 opacity-20 hover:opacity-60 transition-opacity duration-300 hidden lg:block"
            title="Terminal Version"
          >
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
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tui" element={<TUI />} />
        <Route path="/TUI" element={<TUI />} />
        <Route path="/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
