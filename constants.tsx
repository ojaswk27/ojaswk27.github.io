import React from "react";
import type { Project, Experience, Achievement, Skill } from "./types";

// SVG Icons for Skills
const PythonIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M13.5 9l3 3-3 3M10.5 15l-3-3 3-3" />
    <path d="M14.5 5.5c-3.13.43-5.22 3.47-4.25 7s4.22 6.51 7.25 6s4.22-3.47 3.25-7c-.52-1.87-2-3.64-3.75-4.5M9.5 18.5c3.13-.43 5.22-3.47 4.25-7s-4.22-6.51-7.25-6-4.22 3.47-3.25 7c.52 1.87 2 3.64 3.75 4.5" />
  </svg>
);
const JavaScriptIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M16 18a4 4 0 0 0-8 0" />
    <path d="M12 2v14" />
    <path d="M12 22h.01" />
    <path d="M20 22h.01" />
    <path d="M4 22h.01" />
  </svg>
);
const ReactIcon = () => (
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
    className="text-orange-400"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const NodeJsIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M12 2.1c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z" />
    <path d="M12 12l4-4-2-4-2 4-2-4-2 4 4 4z" />
    <path d="M12 12l-4 4 2 4 2-4 2 4 2-4-4-4z" />
  </svg>
);
const CppIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M10 9A3 3 0 0 1 10 3a3 3 0 0 1 3 3v18" />
    <path d="M10 9h4" />
    <path d="M18 9h4" />
    <path d="M18 15h4" />
    <path d="M14 21v-6" />
    <path d="M14 9v6" />
  </svg>
);
const SQLIcon = () => (
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
    className="text-orange-400"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
);
const GitIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M18 20a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-2a2 2 0 0 0-2-2z" />
    <path d="M20 18a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-2a2 2 0 0 0-2-2z" />
    <path d="M4 12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4z" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const DockerIcon = () => (
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
    className="text-orange-400"
  >
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V12H8v-2h2V8.5C10 6.57 11.57 5 13.5 5H16v2h-1.5c-.83 0-1.5.67-1.5 1.5V10h3l-.5 2h-2.5v9.8c4.56-0.93 8-4.96 8-9.8z" />
  </svg>
);

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered Aerospace Design Assistant",
    description:
      "Built an AI assistant that turns text requirements into preliminary aircraft/rocket/satellite designs with computed specs + citations. Uses RAG over 30+ arXiv/NASA papers with embeddings and vehicle-type vector index. Includes LLM-based auto-fill and validation checks to prevent unrealistic sizing.",
    tags: ["Python", "RAG", "LLM", "Aerospace", "ML"],
    link: "https://github.com/ojaswk27",
  },
  {
    title: "NIDAR 2025 - Autonomous Multi-Drone SAR System",
    description:
      "Developed a fully autonomous multi-drone Search And Rescue system for disaster management. Handled computer vision model training, post-processing and optimization for deployment. Implemented autonomy architecture and performed CAD analysis, fabrication and assembly.",
    tags: ["Computer Vision", "Autonomous Systems", "Python", "CAD", "Drones"],
  },
  {
    title: "Smart S.N.U. Hackathon - CV Trash Detection",
    description:
      "Built a computer vision based trash detection system that routes nearby garbage trucks to locations based on trash volume and current truck location. Implemented semantic segmentation with custom method to approximate trash volume. Qualified for SIH (Smart India Hackathon).",
    tags: ["Computer Vision", "Semantic Segmentation", "Python", "ML"],
    link: "https://github.com/rohitjg13/MORNIS",
  },
  {
    title: "Hackdata 2026 - Multimodal Video RAG",
    description:
      "Using Qwen3-VL for video-grounded VLM reasoning with time-chunked clips/frames in a multimodal RAG search system. Built a media pipeline that chunks content (30-60s), generates multimodal embeddings, indexes in Chroma/Qdrant. Achieves 60-120 fps processing, 10-100x faster than manual review.",
    tags: ["VLM", "RAG", "Video Processing", "Python", "Qwen3"],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Assistant Secretary",
    company: "Aeronautics and Aerospace Society, SNIoE",
    duration: "Summer 2025 - Present",
    descriptionPoints: [
      "Leading aerospace-focused projects and initiatives within the society",
      "Organizing technical workshops and seminars on aerospace engineering",
      "Coordinating with faculty and industry professionals for student guidance",
      "Managing team operations and event planning for aerospace competitions",
    ],
  },
  {
    role: "Active Member",
    company: "American Society of Mechanical Engineers (ASME), SNIoE",
    duration: "Fall 2024 - Present",
    descriptionPoints: [
      "Secured 3rd place in ASME India IAM3D challenge among national competitors",
      "Applied innovative mechanical solutions and additive manufacturing knowledge",
      "Collaborated on design optimization using FEM and CAD tools",
      "Participated in technical discussions on advanced manufacturing techniques",
    ],
  },
  {
    role: "Member",
    company: "Atal Tinkering Lab, Birla Vidya Niketan",
    duration: "2023",
    descriptionPoints: [
      "Engaged in hands-on prototyping and robotics projects",
      "Worked on electronics assembly and embedded systems",
      "Developed problem-solving skills through innovation challenges",
      "Built foundation in hardware-software integration",
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "3rd Place - IAM3D Challenge",
    event: "ASME India National Competition",
    date: "April 2025",
  },
  {
    title: "Dean's List - Academic Excellence",
    event: "Shiv Nadar Institute of Eminence",
    date: "Summer 2024",
  },
  {
    title: "SIH Qualifier",
    event: "Smart India Hackathon - Smart S.N.U. Hackathon",
    date: "2025",
  },
  {
    title: "NIDAR 2025 Participant",
    event: "Autonomous Drone Competition",
    date: "2025",
  },
];

export const SKILLS: Skill[] = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "C/C++", icon: <CppIcon /> },
  { name: "Java", icon: <JavaScriptIcon /> },
  { name: "JavaScript / TS", icon: <JavaScriptIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Machine Learning", icon: <NodeJsIcon /> },
  { name: "Computer Vision", icon: <DockerIcon /> },
  { name: "DSA", icon: <GitIcon /> },
  {
    name: "CAD",
    icon: (
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
        className="text-orange-400"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h10v10H7z" />
        <path d="M7 7l10 10" />
      </svg>
    ),
  },
  {
    name: "FEM",
    icon: (
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
        className="text-orange-400"
      >
        <polygon points="12,2 22,8 17,22 7,22 2,8" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <line x1="7" y1="22" x2="17" y2="22" />
      </svg>
    ),
  },
  {
    name: "CFD",
    icon: (
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
        className="text-orange-400"
      >
        <path d="M3 12c2-4 8-4 10 0s8 4 8 0" />
        <path d="M3 16c2-4 8-4 10 0s8 4 8 0" />
        <path d="M3 8c2-4 8-4 10 0s8 4 8 0" />
      </svg>
    ),
  },
  {
    name: "3D Printing",
    icon: (
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
        className="text-orange-400"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];
