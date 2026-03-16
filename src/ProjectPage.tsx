import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PROJECTS } from "./constants";

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();

  const project = PROJECTS.find(
    (p) => (p.slug ?? toSlug(p.title)) === slug
  );

  if (!project) {
    return (
      <div
        className="relative min-h-screen w-full text-gray-200 font-sans flex items-center justify-center"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Project not found.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <BackIcon />
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full text-gray-200 font-sans"
      style={{ backgroundColor: "#000000" }}
    >
      <style>{`
        html, body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 6px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
          background-clip: padding-box;
        }
        * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent; }
      `}</style>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"
        >
          <BackIcon />
          Back to portfolio
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm mb-8"
          >
            View on GitHub
            <ExternalLinkIcon />
          </a>
        )}

        <hr className="border-gray-700/50 mb-8" />

        {/* Short description */}
        <p className="text-gray-300 text-base leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Full description */}
        {project.fullDescription && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
              About
            </h2>
            <div className="markdown-content">
              <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Tech details */}
        {project.techDetails && project.techDetails.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
              Technical Details
            </h2>
            <ul className="space-y-2">
              {project.techDetails.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-orange-400 mt-0.5">›</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="rounded-lg border border-gray-700/50 w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
