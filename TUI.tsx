import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SKILLS, ACHIEVEMENTS, EXPERIENCE, INTERESTS } from "./constants";

const DATA = {
  name: "Ojasw Kant",
  email: "ojaswkant@gmail.com",
  github: "github.com/ojaswk27",
  linkedin: "linkedin.com/in/ojasw-kant-169aa032a",
};

const COMMANDS: Record<string, () => { t: string; v: string }[]> = {
  help: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                    AVAILABLE COMMANDS                      ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    { t: "cyan", v: "  about        →  who am I?" },
    { t: "cyan", v: "  skills       →  my tech stack" },
    { t: "cyan", v: "  experience   →  work history" },
    { t: "cyan", v: "  achievements →  awards & highlights" },
    { t: "cyan", v: "  interests    →  what I'm into" },
    { t: "cyan", v: "  contact      →  get in touch" },
    { t: "cyan", v: "  whoami       →  quick identity check" },
    { t: "cyan", v: "  fetch        →  system & browser info" },
    { t: "cyan", v: "  clear        →  clear the terminal" },
    { t: "cyan", v: "  exit         →  go back to main site" },
    { t: "spacer", v: "" },
    { t: "dim", v: "  tip: use ↑ ↓ to browse history" },
  ],

  about: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                        ABOUT ME                          ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    { t: "output", v: "  Hey! I'm Ojasw Kant — a 2nd-year CS undergrad" },
    { t: "output", v: "  passionate about the intersection of software and hardware." },
    { t: "spacer", v: "" },
    { t: "output", v: "  I build autonomous systems, drone platforms, and ML pipelines." },
    { t: "output", v: "  When I'm not flying drones, I'm obsessing over computer vision," },
    { t: "output", v: "  reinforcement learning, and systems programming." },
    { t: "spacer", v: "" },
    { t: "success", v: "  ◆  Minor: Mathematics (ML track)" },
    { t: "success", v: "  ◆  School: Shiv Nadar Institute of Eminence | Class of 2028" },
  ],

  skills: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                       SKILLS                            ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    ...SKILLS.map((skill) => ({ t: "cyan", v: `  ▸ ${skill.name}` })),
  ],

  experience: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                     EXPERIENCE                         ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    ...EXPERIENCE.flatMap((exp, i) => [
      { t: "success", v: `  ◆ ${exp.role}` },
      { t: "cyan", v: `    @ ${exp.company}` },
      { t: "dim", v: `    ${exp.duration}` },
      { t: "output", v: `    ${exp.descriptionPoints[0]}` },
      { t: "spacer", v: "" },
    ]),
  ],

  achievements: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                    ACHIEVEMENTS                        ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    ...ACHIEVEMENTS.flatMap((ach) => [
      { t: "success", v: `  ★ ${ach.title}` },
      { t: "dim", v: `    ${ach.event} · ${ach.date}` },
      { t: "spacer", v: "" },
    ]),
  ],

  interests: () => [
    { t: "section-header", v: "╔════════════════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                     INTERESTS                         ║" },
    { t: "section-header", v: "╚════════════════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    ...INTERESTS.map((interest) => ({ t: "output", v: `  ◇ ${interest}` })),
  ],

  contact: () => [
    { t: "section-header", v: "╔══════════════════════════════════════════════════╗" },
    { t: "section-header", v: "║                    CONTACT                       ║" },
    { t: "section-header", v: "╚══════════════════════════════════════════════════╝" },
    { t: "spacer", v: "" },
    { t: "cyan", v: "  ✉  email     →  " + DATA.email },
    { t: "cyan", v: "  ⌘  github    →  " + DATA.github },
    { t: "cyan", v: "  🔗  linkedin  →  " + DATA.linkedin },
    { t: "spacer", v: "" },
    { t: "dim", v: "  open to internships & research collabs :)" },
  ],

  whoami: () => [
    { t: "output", v: `  ${DATA.name}` },
    { t: "dim", v: `  CS undergrad @ Shiv Nadar Institute of Eminence` },
    { t: "dim", v: `  Class of 2028 · Minor in Mathematics (ML track)` },
  ],

  clear: () => {
    return [];
  },
};

export default function TUI() {
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = React.useState<{ t: string; v: string }[]>([]);
  const [history, setHistory] = React.useState<string[]>([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [isCleared, setIsCleared] = React.useState(false);

  const bootLines = [
    { t: "spacer", v: "" },
    { t: "success", v: " ╭───────────────────────────────────────────────────────────────╮" },
    { t: "success", v: " │        portfolio.sh v1.0.0  -  interactive mode               │" },
    { t: "success", v: " ╰───────────────────────────────────────────────────────────────╯" },
    { t: "spacer", v: "" },
    { t: "output", v: `   Hi! I'm ${DATA.name}, and this is my terminal portfolio.` },
    { t: "spacer", v: "" },
    { t: "cyan", v: "   Type 'help' to see what you can explore." },
    { t: "dim", v: "   Type 'about', 'skills', 'contact'..." },
    { t: "spacer", v: "" },
  ];

  useEffect(() => {
    if (!isCleared) {
      setLines(bootLines);
    }
  }, [isCleared]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const appendLine = (text: string, cls = "output") => {
    setLines((prev) => [...prev, { t: cls, v: text }]);
  };

  const printLines = (newLines: { t: string; v: string }[], callback?: () => void) => {
    newLines.forEach((l, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, l]);
        if (i === newLines.length - 1 && callback) {
          callback();
        }
      }, i * 30);
    });
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === "exit") {
      window.location.href = "/";
      return;
    }

    if (trimmed === "clear") {
      setLines([]);
      setIsCleared(true);
      return;
    }

    if (COMMANDS[trimmed]) {
      const result = COMMANDS[trimmed]();
      if (result.length > 0) {
        appendLine("", "spacer");
        printLines(result);
      }
    } else if (trimmed !== "") {
      appendLine(`  command not found: ${trimmed}  (try 'help')`, "err");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const raw = inputRef.current?.value.trim() || "";
      inputRef.current!.value = "";
      setHistIdx(-1);

      appendLine(`guest@portfolio:~$ ${raw}`, "prompt");

      if (!raw) return;

      setHistory((prev) => [raw, ...prev]);
      handleCommand(raw);

      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }, 100);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        const newIdx = histIdx + 1;
        setHistIdx(newIdx);
        inputRef.current!.value = history[newIdx];
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        inputRef.current!.value = history[newIdx];
      } else {
        setHistIdx(-1);
        inputRef.current!.value = "";
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const partial = inputRef.current?.value.trim().toLowerCase() || "";
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(partial));
      if (match) {
        inputRef.current!.value = match;
      }
    }
  };

  return (
    <div
      style={{
        background: "#0d0f0e",
        color: "#e8f0eb",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: "14px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --bg: #0d0f0e;
          --surface: #111412;
          --green: #39ff84;
          --green-dim: #1a7a3e;
          --amber: #f5a623;
          --cyan: #00e5ff;
          --red: #ff4c4c;
          --white: #e8f0eb;
          --muted: #4a5c50;
          --border: #1e2a22;
        }

        #terminal-container {
          width: 100%;
          max-width: 800px;
          height: 90vh;
          max-height: 700px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        #titlebar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot-r { background: #ff5f57; }
        .dot-y { background: #febc2e; }
        .dot-g { background: #28c840; }
        #titlebar span {
          margin-left: auto;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        #output {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px 8px;
          scroll-behavior: smooth;
        }
        #output::-webkit-scrollbar { width: 4px; }
        #output::-webkit-scrollbar-track { background: transparent; }
        #output::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 2px; }

        .line { white-space: pre-wrap; word-break: break-word; margin-bottom: 2px; }
        .line.prompt { color: var(--green); }
        .line.cmd-echo { color: var(--white); }
        .line.output { color: var(--white); }
        .line.dim { color: var(--muted); }
        .line.success { color: var(--green); }
        .line.warn { color: var(--amber); }
        .line.err { color: var(--red); }
        .line.cyan { color: var(--cyan); }
        .line.section-header {
          color: var(--green);
          font-weight: 700;
          margin-top: 6px;
          letter-spacing: 0.06em;
          text-shadow: 0 0 10px rgba(57, 255, 132, 0.3);
        }
        .line.spacer { margin-bottom: 6px; }

        #input-row {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 10px 16px 18px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        #prompt-label {
          color: var(--green);
          white-space: nowrap;
          user-select: none;
        }
        #prompt-label .host { color: var(--cyan); }
        #prompt-label .sep { color: var(--muted); }
        #prompt-label .path { color: var(--amber); }

        #cmd-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--white);
          font-family: var(--font);
          font-size: 14px;
          caret-color: var(--green);
          margin-left: 6px;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { display: inline-block; width: 8px; height: 1em; background: var(--green); animation: blink 1s step-end infinite; vertical-align: text-bottom; }

        @keyframes fadein { from{opacity:0;transform:translateY(2px)} to{opacity:1;transform:none} }
        .line { animation: fadein 0.08s ease-out both; }

        body::after {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.04) 2px,
            rgba(0,0,0,0.04) 4px
          );
          pointer-events: none;
          z-index: 9999;
        }

        .terminal-link {
          color: #00e5ff;
          text-decoration: underline;
          cursor: pointer;
        }
        .terminal-link:hover {
          color: #39ff84;
        }
      `}</style>

      <div id="terminal-container">
        <div id="titlebar">
          <div className="dot dot-r" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }} title="Go to portfolio"></div>
          <div className="dot dot-y" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }} title="Refresh"></div>
          <div className="dot dot-g"></div>
          <span>guest@portfolio ~ bash</span>
        </div>

      <div id="output" ref={outputRef}>
        {lines.map((line, i) => (
          <div key={i} className={`line ${line.t}`}>
            {line.v}
          </div>
        ))}
      </div>

      <div id="input-row">
        <div id="prompt-label">
          <span className="host">guest@portfolio</span>
          <span className="sep">:</span>
          <span className="path">~</span>
          <span className="sep">$</span>
        </div>
        <input
          ref={inputRef}
          id="cmd-input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          autoFocus
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            color: "#4a5c50",
            fontSize: "12px",
            textDecoration: "none",
            padding: "6px 12px",
            border: "1px solid #1e2a22",
            borderRadius: "4px",
            background: "#111412",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#39ff84";
            e.currentTarget.style.borderColor = "#39ff84";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#4a5c50";
            e.currentTarget.style.borderColor = "#1e2a22";
          }}
        >
          ← exit
        </Link>
      </div>
      </div>
    </div>
  );
}
