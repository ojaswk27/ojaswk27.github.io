import React from "react";
import type { Project, Experience, Achievement, Skill } from "./types";

import aiAerospaceMd from "./projects/ai-aerospace-design-assistant.md?raw";
import nidarMd from "./projects/nidar-2025.md?raw";
import cvTrashMd from "./projects/cv-trash-detection.md?raw";
import videoRagMd from "./projects/hackdata-2026-video-rag.md?raw";
import hephaestusMd from "./projects/hephaestus.md?raw";
import printguardMd from "./projects/printguard.md?raw";

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
      "I developed an AI assistant that translates natural language requirements into preliminary aerospace vehicle designs with computed specifications and source citations. It implements retrieval-augmented generation over 30+ arXiv and NASA papers using a vehicle-type vector index, with LLM-based auto-fill and validation to enforce realistic design constraints.",
    tags: ["Python", "RAG", "LLM", "Aerospace", "ML"],
    link: "https://github.com/ojaswk27",
    slug: "ai-aerospace-design-assistant",
    fullDescription: aiAerospaceMd,
    techDetails: [
      "LangGraph-based multi-node pipeline: LLM Supervisor → Requirement Parser → Parameter Completer → RAG Search → Formula Extractor → Data Validator → Calculation Agent → Validator → Synthesizer",
      "RAG over 30+ arXiv and NASA papers using ChromaDB with sentence-transformers/all-MiniLM-L6-v2 embeddings, filtered by vehicle type for precision retrieval",
      "LLM-powered parameter completion fills unspecified inputs (speed, altitude, range) using vehicle-class reasoning - preventing manned-aircraft defaults from being applied to small UAVs",
      "LLM data validation layer detects and corrects scale mismatches between retrieved research data and the actual design target before calculations are run",
      "Context-aware sub-classification for fixed-wing vehicles (uav_small through transport) selects appropriate MTOW multipliers, drag coefficients, and propulsion models per category",
      "Modular physics-based calculation tools per vehicle type (drones, fixed-wing, helicopters, rockets, satellites, gliders) using real aerospace formulas with unit-aware conversions",
    ],
    images: [],
    duration: "Monsoon 2025",
    role: "Sole developer - end-to-end implementation including LangGraph architecture, RAG pipeline, LLM integration, calculation tools, and validation layers",
    learnings: [
      "Built a full RAG pipeline from scratch - chunking and embedding research papers, setting up ChromaDB, and tuning retrieval to return domain-relevant results",
      "Learnt LangChain and LangGraph for orchestrating multi-step LLM workflows, including state management, node routing, and conditional graph edges",
      "Used LangSmith for tracing and debugging LLM calls across the pipeline, which was invaluable for identifying where hallucinations and scale mismatches were introduced",
    ],
  },
  {
    title: "NIDAR 2025 - Autonomous Multi-Drone SAR System",
    description:
      "We developed a fully autonomous multi-drone search and rescue system for disaster management scenarios. My responsibilities included computer vision model training, inference optimisation, and deployment pipelines, alongside autonomy architecture design, CAD analysis, and physical fabrication and assembly.",
    tags: ["Computer Vision", "Autonomous Systems", "Python", "CAD", "Drones"],
    slug: "nidar-2025",
    fullDescription: nidarMd,
    techDetails: [
      "Deployed and optimised CV inference on the Jetson Orin Nano using industry-standard ONNX runtime with TensorRT execution provider and FP16 precision for real-time edge performance",
      "Trained and benchmarked five YOLO variants (YOLOv8n, YOLOv8s, YOLOv8m, YOLOv9c, YOLOv9e) on a custom SAR dataset, selecting the optimal model based on mAP, latency, and memory footprint on-device",
      "Built a custom multi-object tracker inspired by ByteTrack, retaining low-confidence detections in a secondary association pass to reduce identity switches and track loss in cluttered aerial scenes",
      "Training dataset compiled by combining HERIDAL - a dedicated aerial human detection dataset - with several smaller domain-specific datasets to improve generalisation across varied terrain and lighting conditions",
    ],
    images: [],
    duration: "June 2025 - January 2026",
    role: "Multirole - CV/AI (model training, inference optimisation, edge deployment), structural design and analysis (CAD, FEM, fabrication), and autonomy design (systems architecture, inter-drone communication)",
    learnings: [
      "Gained hands-on experience optimising CV inference for the Jetson Orin Nano - including TensorRT export, precision tuning, and working within the constraints of edge GPU memory and thermal limits",
      "Trained and fine-tuned a computer vision model on a custom-compiled dataset assembled specifically for SAR scenarios",
      "Built a custom multi-object tracking solution from scratch, handling occlusion, re-identification, and trajectory continuity across drone frames",
      "Designed autonomous systems architecture and inter-drone communication using SiK radios, including telemetry relay and coordination protocols",
    ],
  },
  {
    title: "Smart S.N.U. Hackathon - CV Trash Detection",
    description:
      "I built a computer vision system for urban waste detection that dynamically routes garbage collection vehicles based on estimated trash volume and real-time truck location. It employs semantic segmentation with a custom volumetric approximation method. The project qualified for the Smart India Hackathon (SIH).",
    tags: ["Computer Vision", "Semantic Segmentation", "Python", "ML"],
    link: "https://github.com/rohitjg13/MORNIS",
    slug: "cv-trash-detection",
    fullDescription: cvTrashMd,
    techDetails: [
      "Custom-trained image segmentation models for urban waste detection",
      "Semantic segmentation pipeline with volumetric approximation for trash density estimation",
      "Real-time inference integrated with dynamic vehicle routing logic",
    ],
    images: [],
    duration: "Summer 2025",
    role: "CV Model Training and Inference",
    learnings: [
      "Trained and evaluated custom segmentation models on domain-specific datasets, navigating class imbalance and annotation quality tradeoffs",
      "Developed practical understanding of segmentation architectures and the full training pipeline from data preparation to deployment",
    ],
  },
  {
    title: "Hackdata 2026 - Multimodal Video RAG",
    description:
      "We are building a multimodal retrieval-augmented generation system for video understanding, utilising Qwen3-VL for video-grounded reasoning over time-chunked clips and frames. The media pipeline segments content into 30–60s chunks, generates multimodal embeddings, and indexes them in Chroma/Qdrant, targeting 60–120 fps throughput - up to 100x faster than manual review.",
    tags: ["VLM", "RAG", "Video Processing", "Python", "Qwen3"],
    slug: "hackdata-2026-video-rag",
    fullDescription: videoRagMd,
    techDetails: [],
    images: [],
    duration: "March 2026 - Present",
    role: "WIP",
    learnings: [],
  },
  {
    title: "Project: Hephaestus",
    description:
      "An iterative code performance optimiser with a SvelteKit dashboard and a Go + Python backend. It profiles binaries with Linux perf, uses an LLM to propose and test optimisations one at a time, and loops until the code approaches its theoretical maximum or a hard limit is hit.",
    tags: [
      "Go",
      "Python",
      "SvelteKit",
      "Docker",
      "Linux perf",
      "Performance Optimization",
    ],
    link: "https://github.com/manan025/dust-hackdata",
    cliLink: "https://github.com/ojaswk27/Hephaestus-CLI",
    slug: "hephaestus",
    fullDescription: hephaestusMd,
    techDetails: [
      "Go HTTP server exposes the profiling pipeline API and GitHub webhook integration with JWT auth; Python perf agent handles the full profile-optimise loop as both a CLI tool and library",
      "Linux perf collects hardware-level counters (CPU cycles, cache misses, branch mispredictions, IPC) inside Docker containers built with from-source perf and toolchains for C, C++, Go, Rust, Java, Python, and more",
      "LLM proposes exactly one optimisation per iteration; the system compiles, re-profiles, and keeps or rolls back the change based on a weighted score - 70% runtime, 20% IPC, 10% cache miss rate",
      "Supports cross-architecture profiling targets: x86_64, arm64, wasm32, and riscv64 via Docker containers",
      "Stops automatically when code reaches within 5% of the CPU's theoretical peak (estimated from max IPC and clock speed), or after three consecutive failed attempts",
      "SvelteKit (Svelte 5) frontend with Supabase for persistence; users can link a GitHub repo or upload source directly and download the optimised result as a ZIP",
    ],
    images: [],
    duration: "March 14 - March 15, 2026",
    role: "LLM integration - built the LLM-powered optimisation suggestion layer and related infrastructure for interpreting perf output and generating code changes",
    learnings: [
      "Learnt how to manage and orchestrate multiple Docker containers simultaneously, including resource constraint configuration for simulating edge hardware targets",
      "Understood how to interpret Linux perf hardware counters (cache misses, branch mispredictions, IPC) and translate them into actionable optimisation strategies",
      "Designed LLM prompts that reason over perf metrics and propose concrete code changes, and built the iterative loop that applies changes, re-profiles, and decides whether to continue or stop",
    ],
  },
  {
    title: "Project: PrintGuard",
    description:
      "A Raspberry Pi 5 monitor for Bambu Lab FDM printers that uses the Obico YOLOv4-tiny ONNX model and OpenCV heuristics to detect print failures in real time, then automatically pauses or stops the printer via local MQTT.",
    tags: [
      "Python",
      "Computer Vision",
      "ONNX",
      "YOLOv4",
      "OpenCV",
      "Raspberry Pi",
      "MQTT",
      "IoT",
    ],
    link: "https://github.com/ojaswk27/dust2",
    slug: "printguard",
    fullDescription: printguardMd,
    techDetails: [
      "Runs the Obico (The Spaghetti Detective) YOLOv4-tiny ONNX model for spaghetti and detachment detection, combined with OpenCV heuristics for layer shift (Sobel), bed adhesion loss (variance), and extrusion issues (brightness)",
      "Captures frames from a Raspberry Pi Camera Module 3 or USB webcam at a configurable FPS, requiring N consecutive positive frames before triggering a printer action to suppress false positives",
      "Communicates with Bambu Lab printers over local MQTT (port 8883, TLS) using the OpenBambuAPI protocol to issue pause or stop commands",
      "Configurable via YAML with a gitignored local override file; supports dry-run mode and single-image CLI testing",
      "Supports fine-tuning custom ONNX weights (YOLOv4-tiny or YOLOv8n) on your own labelled failure frames to extend detection beyond the base Obico model",
    ],
    images: [],
    duration: "March 14 - March 15, 2026",
    role: "CV & Edge Computing - implemented the computer vision detection pipeline, OpenCV heuristics, and deployment on Raspberry Pi 5",
    learnings: [
      "Reverse engineered the Bambu Lab camera stream protocol to extract frames for real-time inference on the Pi",
      "Learnt how to run ONNX models efficiently on edge hardware and combine model output with hand-tuned OpenCV heuristics for failure modes the base model doesn't cover",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Assistant Secretary",
    company: "Aeronautics and Aerospace Society, SNIoE",
    duration: "Summer 2025 - Present",
    descriptionPoints: [
      "Lead aerospace-focused technical projects and research initiatives within the society",
      "Organise workshops and seminars on aerospace engineering topics for student members",
      "Coordinate between students, faculty, and industry professionals for project guidance",
      "Manage team operations and logistics for inter-collegiate aerospace competitions",
    ],
  },
  {
    role: "Active Member",
    company: "American Society of Mechanical Engineers (ASME), SNIoE",
    duration: "Fall 2024 - Present",
    descriptionPoints: [
      "Secured 3rd place at the ASME India IAM3D national challenge",
      "Applied additive manufacturing techniques and mechanical design principles to competition deliverables",
      "Contributed to design optimisation workflows using FEM analysis and CAD modelling",
      "Engaged in technical discourse on advanced manufacturing methodologies",
    ],
  },
  {
    role: "Member",
    company: "Atal Tinkering Lab, Birla Vidya Niketan",
    duration: "2023",
    descriptionPoints: [
      "Participated in hands-on prototyping and robotics development projects",
      "Conducted electronics assembly and embedded systems integration",
      "Applied structured problem-solving approaches to engineering innovation challenges",
      "Built foundational competencies in hardware-software co-design",
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
  {
    title: "3rd Place - Hackdata 2026",
    event: "Hackdata Hackathon - organised by SNU, funded by HP",
    date: "March 14–15, 2026",
  },
];

export const SKILLS: Skill[] = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "C/C++", icon: <CppIcon /> },
  { name: "Rust", icon: <CppIcon /> },
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

export const INTERESTS = [
  "Autonomous Systems",
  "Aerospace Engineering",
  "Computer Vision",
  "Hardware-Software Integration",
  "Robotics",
  "Machine Learning",
  "Embedded Systems",
  "3D Printing & Fabrication",
  "Drone Technology",
  "Real-time Systems",
];
