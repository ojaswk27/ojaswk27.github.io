import React from 'react';
import type { Project, Experience, Achievement, Skill } from './types';

// SVG Icons for Skills
const PythonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M13.5 9l3 3-3 3M10.5 15l-3-3 3-3"/><path d="M14.5 5.5c-3.13.43-5.22 3.47-4.25 7s4.22 6.51 7.25 6s4.22-3.47 3.25-7c-.52-1.87-2-3.64-3.75-4.5M9.5 18.5c3.13-.43 5.22-3.47 4.25-7s-4.22-6.51-7.25-6-4.22 3.47-3.25 7c.52 1.87 2 3.64 3.75 4.5"/></svg>
);
const JavaScriptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M16 18a4 4 0 0 0-8 0"/><path d="M12 2v14"/><path d="M12 22h.01"/><path d="M20 22h.01"/><path d="M4 22h.01"/></svg>
);
const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
);
const NodeJsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M12 2.1c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z"/><path d="M12 12l4-4-2-4-2 4-2-4-2 4 4 4z"/><path d="M12 12l-4 4 2 4 2-4 2 4 2-4-4-4z"/></svg>
);
const CppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M10 9A3 3 0 0 1 10 3a3 3 0 0 1 3 3v18"/><path d="M10 9h4"/><path d="M18 9h4"/><path d="M18 15h4"/><path d="M14 21v-6"/><path d="M14 9v6"/></svg>
);
const SQLIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
);
const GitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M18 20a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-2a2 2 0 0 0-2-2z"/><path d="M20 18a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-2a2 2 0 0 0-2-2z"/><path d="M4 12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4z"/><circle cx="12" cy="12" r="2"/></svg>
);
const DockerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V12H8v-2h2V8.5C10 6.57 11.57 5 13.5 5H16v2h-1.5c-.83 0-1.5.67-1.5 1.5V10h3l-.5 2h-2.5v9.8c4.56-0.93 8-4.96 8-9.8z"/></svg>
);


export const PROJECTS: Project[] = [
  {
    title: "Project Alpha: AI Chess Engine",
    description: "A sophisticated chess engine using alpha-beta pruning and a neural network for board evaluation. Developed a custom GUI to visualize the AI's decision-making process.",
    tags: ["Python", "PyTorch", "Minimax", "GUI"],
    link: "https://github.com/placeholder"
  },
  {
    title: "Project Beta: Financial Data Visualization",
    description: "A web-based dashboard for visualizing real-time stock market data. Integrated with multiple financial APIs and used D3.js for complex, interactive charts.",
    tags: ["React", "TypeScript", "D3.js", "Node.js", "API"],
    link: "https://github.com/placeholder"
  },
  {
    title: "Project Gamma: Distributed Systems Simulator",
    description: "A simulator for visualizing and testing consensus algorithms like Paxos and Raft. This project was key to my understanding of distributed computing principles.",
    tags: ["Go", "Distributed Systems", "Algorithms"],
  },
  {
    title: "Project Delta: Mathematical Modeling of Fluid Dynamics",
    description: "An academic project exploring numerical methods to solve Navier-Stokes equations for specific scenarios, combining my passion for CS and applied mathematics.",
    tags: ["MATLAB", "Numerical Analysis", "Physics"],
    link: "https://github.com/placeholder"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Innovate Tech Inc.",
    duration: "Summer 2023",
    descriptionPoints: [
      "Developed and shipped a new real-time collaboration feature for the company's flagship product, increasing user engagement by 15%.",
      "Wrote comprehensive unit and integration tests, improving code coverage of the core module from 75% to 92%.",
      "Collaborated with a cross-functional team of 10 engineers, designers, and product managers in an agile environment.",
      "Optimized database queries which reduced average API response time by 200ms."
    ]
  },
    {
    role: "Undergraduate Teaching Assistant",
    company: "State University - CS Department",
    duration: "Fall 2022 - Spring 2023",
    descriptionPoints: [
      "Assisted in teaching 'Data Structures & Algorithms' to a class of over 100 students.",
      "Held weekly office hours to provide one-on-one tutoring and clarify complex concepts.",
      "Graded assignments and exams, providing constructive feedback to help students improve.",
      "Led review sessions before midterms and finals, contributing to a 10% increase in average class scores."
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "1st Place Winner",
    event: "State University Annual Hackathon 2023",
    date: "April 2023"
  },
  {
    title: "ACM-ICPC Regional Finalist",
    event: "North America Programming Contest",
    date: "November 2022"
  },
  {
    title: "Dean's List for Academic Excellence",
    event: "State University",
    date: "2021-2023"
  },
  {
    title: "Top Submission in Math Modeling Contest",
    event: "COMAP MCM/ICM",
    date: "February 2022"
  }
];


export const SKILLS: Skill[] = [
  { name: "Python", icon: <PythonIcon /> },
  { name: "JavaScript / TS", icon: <JavaScriptIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Node.js", icon: <NodeJsIcon /> },
  { name: "C++", icon: <CppIcon /> },
  { name: "SQL", icon: <SQLIcon /> },
  { name: "Git", icon: <GitIcon /> },
  { name: "Docker", icon: <DockerIcon /> }
];