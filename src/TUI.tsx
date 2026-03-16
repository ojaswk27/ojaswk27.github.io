import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SKILLS, ACHIEVEMENTS, EXPERIENCE, INTERESTS, PROJECTS } from "./constants";

// ─── Data ──────────────────────────────────────────────────────────

const DATA = {
  name: "Ojasw Kant",
  email: "ojaswkant@gmail.com",
  github: "github.com/ojaswk27",
  linkedin: "linkedin.com/in/ojasw-kant-169aa032a",
};

// ─── Types ─────────────────────────────────────────────────────────

type Line = { t: string; v: string };

// ─── Boot lines ────────────────────────────────────────────────────

const BOOT_LINES: readonly Line[] = Object.freeze([
  { t: "spacer",  v: "" },
  { t: "success", v: "  ██╗  ██╗███████╗██╗     ██╗      ██████╗ ██╗" },
  { t: "success", v: "  ██║  ██║██╔════╝██║     ██║     ██╔═══██╗██║" },
  { t: "success", v: "  ███████║█████╗  ██║     ██║     ██║   ██║██║" },
  { t: "success", v: "  ██╔══██║██╔══╝  ██║     ██║     ██║   ██║╚═╝" },
  { t: "success", v: "  ██║  ██║███████╗███████╗███████╗╚██████╔╝██╗" },
  { t: "success", v: "  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝" },
  { t: "spacer",  v: "" },
  { t: "success", v: "  portfolio.sh v1.0.0  —  interactive mode" },
  { t: "dim",     v: "  ──────────────────────────────────────────" },
  { t: "spacer",  v: "" },
  { t: "output",  v: `  I'm ${DATA.name}, and this is my terminal portfolio.` },
  { t: "spacer",  v: "" },
  { t: "cyan",    v: "  Type 'help' to see what you can explore." },
  { t: "dim",     v: "  Type 'about', 'projects', 'skills', 'contact'..." },
  { t: "spacer",  v: "" },
]);

// ─── Commands ──────────────────────────────────────────────────────

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { t: "section-header", v: "── AVAILABLE COMMANDS ─────────────────────────────" },
    { t: "spacer", v: "" },
    { t: "cyan", v: "  about        →  who am I?" },
    { t: "cyan", v: "  projects     →  things I've built" },
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
    { t: "section-header", v: "── WINDOW CONTROLS ────────────────────────────────" },
    { t: "spacer", v: "" },
    { t: "err",     v: "  ● red     →  close pane  (last pane exits to portfolio)" },
    { t: "warn",    v: "  ● yellow  →  refresh pane" },
    { t: "success", v: "  ● green   →  open new pane  (max 4)" },
    { t: "spacer", v: "" },
    { t: "dim", v: "  tip: use ↑ ↓ to browse history | tab to autocomplete" },
  ],

  about: () => [
    { t: "section-header", v: "── ABOUT ME ───────────────────────────────────────" },
    { t: "spacer", v: "" },
    { t: "output", v: "  I am a second-year B.Tech Computer Science student with a focus" },
    { t: "output", v: "  on the intersection of software and hardware systems." },
    { t: "spacer", v: "" },
    { t: "output", v: "  My work spans autonomous systems, computer vision, and ML pipelines," },
    { t: "output", v: "  with practical experience in drone platforms, embedded hardware," },
    { t: "output", v: "  and reinforcement learning applications." },
    { t: "spacer", v: "" },
    { t: "success", v: "  ◆  Minor: Mathematics" },
    { t: "success", v: "  ◆  Shiv Nadar Institute of Eminence | Class of 2028" },
  ],

  projects: () => [
    { t: "section-header", v: "── PROJECTS ───────────────────────────────────────" },
    { t: "spacer", v: "" },
    ...PROJECTS.flatMap((p) => [
      { t: "success", v: `  ◆ ${p.title}` },
      { t: "output",  v: `    ${p.description}` },
      { t: "dim",     v: `    stack: ${p.tags.join(" · ")}` },
      { t: "spacer",  v: "" },
    ]),
  ],

  skills: () => [
    { t: "section-header", v: "── SKILLS ─────────────────────────────────────────" },
    { t: "spacer", v: "" },
    ...SKILLS.map((skill) => ({ t: "cyan", v: `  ▸ ${skill.name}` })),
  ],

  experience: () => [
    { t: "section-header", v: "── EXPERIENCE ─────────────────────────────────────" },
    { t: "spacer", v: "" },
    ...EXPERIENCE.flatMap((exp) => [
      { t: "success", v: `  ◆ ${exp.role}` },
      { t: "cyan",    v: `    @ ${exp.company}` },
      { t: "dim",     v: `    ${exp.duration}` },
      { t: "output",  v: `    ${exp.descriptionPoints[0]}` },
      { t: "spacer",  v: "" },
    ]),
  ],

  achievements: () => [
    { t: "section-header", v: "── ACHIEVEMENTS ───────────────────────────────────" },
    { t: "spacer", v: "" },
    ...ACHIEVEMENTS.flatMap((ach) => [
      { t: "success", v: `  ★ ${ach.title}` },
      { t: "dim",     v: `    ${ach.event} · ${ach.date}` },
      { t: "spacer",  v: "" },
    ]),
  ],

  interests: () => [
    { t: "section-header", v: "── INTERESTS ──────────────────────────────────────" },
    { t: "spacer", v: "" },
    ...INTERESTS.map((interest) => ({ t: "output", v: `  ◇ ${interest}` })),
  ],

  contact: () => [
    { t: "section-header", v: "── CONTACT ────────────────────────────────────────" },
    { t: "spacer", v: "" },
    { t: "cyan", v: "  email     →  " + DATA.email },
    { t: "cyan", v: "  github    →  " + DATA.github },
    { t: "cyan", v: "  linkedin  →  " + DATA.linkedin },
    { t: "spacer", v: "" },
    { t: "dim", v: "  open to internships & research collabs :)" },
  ],

  whoami: () => [
    { t: "output", v: `  ${DATA.name}` },
    { t: "dim",    v: "  CS undergrad @ Shiv Nadar Institute of Eminence" },
    { t: "dim",    v: "  Class of 2028 · Minor in Mathematics" },
  ],

  fetch: () => {
    const ua = navigator.userAgent;
    const browser =
      ua.includes("Chrome") && !ua.includes("Edg") ? "Chrome" :
      ua.includes("Firefox") ? "Firefox" :
      ua.includes("Safari") && !ua.includes("Chrome") ? "Safari" :
      ua.includes("Edg") ? "Edge" : "Unknown";
    const os =
      ua.includes("Windows") ? "Windows" :
      ua.includes("Mac") ? "macOS" :
      ua.includes("Linux") ? "Linux" :
      ua.includes("Android") ? "Android" :
      ua.includes("iPhone") || ua.includes("iPad") ? "iOS" : "Unknown";
    const now  = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const res  = `${window.screen.width}×${window.screen.height}`;
    const tz   = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return [
      { t: "section-header", v: "── FETCH ──────────────────────────────────────────" },
      { t: "spacer",  v: "" },
      { t: "success", v: `  os         ${os}` },
      { t: "success", v: `  browser    ${browser}` },
      { t: "success", v: `  resolution ${res}` },
      { t: "success", v: `  timezone   ${tz}` },
      { t: "success", v: `  date       ${date}` },
      { t: "success", v: `  time       ${time}` },
    ];
  },

  clear: () => [],
};

const CMD_KEYS = Object.keys(COMMANDS);

// ─── Grid layout helper ────────────────────────────────────────────

function getGridStyle(count: number): React.CSSProperties {
  switch (count) {
    case 1: return { gridTemplateColumns: "1fr",      gridTemplateRows: "1fr" };
    case 2: return { gridTemplateColumns: "1fr 1fr",  gridTemplateRows: "1fr" };
    case 3: return { gridTemplateColumns: "1fr 1fr",  gridTemplateRows: "1fr 1fr" };
    case 4: return { gridTemplateColumns: "1fr 1fr",  gridTemplateRows: "1fr 1fr" };
    default: return {};
  }
}

function getItemStyle(index: number, count: number): React.CSSProperties {
  // 3-pane: last item spans full width on second row
  if (count === 3 && index === 2) return { gridColumn: "1 / -1" };
  return {};
}

// ─── TerminalPane ──────────────────────────────────────────────────

interface TerminalPaneProps {
  paneId:     number;
  paneNumber: number;
  isActive:   boolean;
  paneCount:  number;
  isEntering: boolean;
  isExiting:  boolean;
  onFocus:    () => void;
  onClose:    () => void;
  onNew:      () => void;
}

const ANIM_DURATION = 260;

const TerminalPane = React.memo(function TerminalPane({
  paneId, paneNumber, isActive, paneCount,
  isEntering, isExiting,
  onFocus, onClose, onNew,
}: TerminalPaneProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const [lines,   setLines]   = useState<Line[]>([...BOOT_LINES]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  const appendLine = useCallback((text: string, cls = "output") => {
    setLines((prev) => [...prev, { t: cls, v: text }]);
  }, []);

  const printLines = useCallback((newLines: Line[]) => {
    newLines.forEach((l, i) => {
      setTimeout(() => setLines((prev) => [...prev, l]), i * 25);
    });
  }, []);

  const handleCommand = useCallback((raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    if (trimmed === "exit")  { window.location.href = "/"; return; }
    if (trimmed === "clear") { setLines([]); return; }
    if (COMMANDS[trimmed]) {
      const result = COMMANDS[trimmed]();
      if (result.length > 0) { appendLine("", "spacer"); printLines(result); }
    } else if (trimmed !== "") {
      appendLine(`  command not found: ${trimmed}  (try 'help')`, "err");
    }
  }, [appendLine, printLines]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const raw = inputRef.current?.value ?? "";
      inputRef.current!.value = "";
      setHistIdx(-1);
      appendLine(`guest@portfolio [${paneNumber}]:~$ ${raw}`, "prompt");
      if (!raw.trim()) return;
      setHistory((prev) => [raw, ...prev]);
      handleCommand(raw);
      setTimeout(() => {
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }, 100);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((idx) => {
        if (idx < history.length - 1) {
          const next = idx + 1;
          inputRef.current!.value = history[next];
          return next;
        }
        return idx;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((idx) => {
        if (idx > 0) {
          const next = idx - 1;
          inputRef.current!.value = history[next];
          return next;
        }
        inputRef.current!.value = "";
        return -1;
      });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = inputRef.current?.value.trim().toLowerCase() ?? "";
      const match = CMD_KEYS.find((c) => c.startsWith(partial));
      if (match) inputRef.current!.value = match;
    }
  }, [appendLine, handleCommand, history, paneNumber]);

  const canAddPane = paneCount < 4;

  // Only animate opacity + scale on the pane shell — grid handles sizing
  const animating = isEntering || isExiting;

  return (
    <div
      onClick={onFocus}
      style={{
        width: "100%",
        height: "100%",
        display:        "flex",
        flexDirection:  "column",
        background:     "#111412",
        border:         `1px solid ${isActive ? "#1e2a22" : "#141a16"}`,
        borderRadius:   "8px",
        overflow:       "hidden",
        opacity:        animating ? 0 : 1,
        transform:      animating ? "scale(0.94)" : "scale(1)",
        transition:     `opacity ${ANIM_DURATION}ms ease, transform ${ANIM_DURATION}ms cubic-bezier(0.22,1,0.36,1), filter 0.3s ease`,
        willChange:     "opacity, transform",
        filter:         isActive ? "none" : "saturate(0.2) brightness(0.5)",
        cursor:         isActive ? "default" : "pointer",
      }}
    >
      {/* Titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderBottom: "1px solid #1e2a22", flexShrink: 0 }}>
        <div onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close pane"
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", cursor: "pointer", flexShrink: 0 }} />
        <div onClick={(e) => { e.stopPropagation(); setLines([...BOOT_LINES]); setHistory([]); setHistIdx(-1); }} title="Refresh pane"
          style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", cursor: "pointer", flexShrink: 0 }} />
        <div onClick={(e) => { e.stopPropagation(); if (canAddPane) onNew(); }} title={canAddPane ? "New pane" : "Max 4 panes"}
          style={{ width: 12, height: 12, borderRadius: "50%", background: canAddPane ? "#28c840" : "#1a4a22", cursor: canAddPane ? "pointer" : "not-allowed", flexShrink: 0 }} />
        <span style={{ marginLeft: "auto", color: "#4a5c50", fontSize: "11px", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
          guest@portfolio [{paneNumber}] ~ bash
        </span>
      </div>

      {/* Output */}
      <div ref={outputRef} style={{ flex: 1, overflowY: "auto", padding: "14px 14px 6px", scrollBehavior: "smooth" }}>
        {lines.map((line, i) => (
          <div key={i} className={`line ${line.t}`} style={{ fontSize: "13px" }}>
            {line.v}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", alignItems: "center", padding: "8px 14px 14px", borderTop: "1px solid #1e2a22", flexShrink: 0 }}>
        <span style={{ color: "#00e5ff", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", whiteSpace: "nowrap", userSelect: "none" }}>
          guest@portfolio<span style={{ color: "#4a5c50" }}>:</span><span style={{ color: "#f5a623" }}>~</span><span style={{ color: "#4a5c50" }}>$</span>
        </span>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#e8f0eb", fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px", caretColor: "#39ff84", marginLeft: "6px",
          }}
        />
      </div>
    </div>
  );
});

// ─── TUIRoot ───────────────────────────────────────────────────────

let nextId = 1;

interface PaneEntry {
  id:       number;
  entering: boolean;
  exiting:  boolean;
}

export default function TUI() {
  const navigate = useNavigate();
  const [panes, setPanes]         = useState<PaneEntry[]>([{ id: nextId++, entering: false, exiting: false }]);
  const [activePaneId, setActive] = useState<number>(panes[0].id);

  const liveIds   = useMemo(() => panes.filter((p) => !p.exiting).map((p) => p.id), [panes]);
  const liveCount = liveIds.length;

  const addPane = useCallback(() => {
    if (liveIds.length >= 4) return;
    const id = nextId++;
    setPanes((prev) => [...prev, { id, entering: true, exiting: false }]);
    setActive(id);
    // One frame: let browser paint the entering state (opacity 0, scale 0.94)
    // then flip to settled so the transition fires
    setTimeout(() => {
      setPanes((prev) => prev.map((p) => p.id === id ? { ...p, entering: false } : p));
    }, 16);
  }, [liveIds]);

  const closePane = useCallback((id: number) => {
    if (liveIds.length === 1) { navigate("/"); return; }
    setPanes((prev) => prev.map((p) => p.id === id ? { ...p, exiting: true } : p));
    setActive((active) => {
      if (active !== id) return active;
      const remaining = liveIds.filter((lid) => lid !== id);
      return remaining[remaining.length - 1];
    });
    setTimeout(() => {
      setPanes((prev) => prev.filter((p) => p.id !== id));
    }, ANIM_DURATION + 20);
  }, [liveIds, navigate]);

  // Grid transitions smoothly because CSS grid interpolates column/row sizes natively
  const gridStyle = useMemo(() => getGridStyle(liveCount), [liveCount]);

  return (
    <div style={{
      background: "#0d0f0e",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .line { white-space: pre-wrap; word-break: break-word; margin-bottom: 2px; }
        .line.prompt  { color: #39ff84; }
        .line.output  { color: #e8f0eb; }
        .line.dim     { color: #4a5c50; }
        .line.success { color: #39ff84; }
        .line.warn    { color: #f5a623; }
        .line.err     { color: #ff4c4c; }
        .line.cyan    { color: #00e5ff; }
        .line.section-header { color: #39ff84; font-weight: 700; margin-top: 6px; letter-spacing: 0.04em; }
        .line.spacer  { margin-bottom: 6px; }

        div::-webkit-scrollbar { width: 3px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #1a7a3e; border-radius: 2px; }

        body::after {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
          pointer-events: none;
          z-index: 9999;
        }

        #tui-grid {
          display: grid;
          gap: 6px;
          width: calc(100vw - 40px);
          height: calc(100vh - 40px);
          transition: grid-template-columns 260ms cubic-bezier(0.22,1,0.36,1),
                      grid-template-rows    260ms cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      <div
        id="tui-grid"
        style={gridStyle}
      >
        {panes.map((pane, index) => {
          const liveIndex = liveIds.indexOf(pane.id);
          const displayIndex = liveIndex >= 0 ? liveIndex : index;

          return (
            <div
              key={pane.id}
              style={{
                minHeight: 0,
                minWidth: 0,
                ...getItemStyle(displayIndex, liveCount),
                // Hide exiting panes from grid flow without removing them yet
                ...(pane.exiting ? { position: "absolute", pointerEvents: "none", width: 0, height: 0, overflow: "hidden" } : {}),
              }}
            >
              <TerminalPane
                paneId={pane.id}
                paneNumber={liveIndex >= 0 ? liveIndex + 1 : 0}
                isActive={activePaneId === pane.id}
                paneCount={liveCount}
                isEntering={pane.entering}
                isExiting={pane.exiting}
                onFocus={() => setActive(pane.id)}
                onClose={() => closePane(pane.id)}
                onNew={addPane}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
