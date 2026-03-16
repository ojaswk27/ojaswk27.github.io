# Project: Hephaestus

Hephaestus (HackData) is a performance profiling tool that finds and fixes slow spots in code automatically. You give it source code, and it profiles the compiled binary, identifies bottlenecks, then uses an LLM to suggest and apply optimisations in a loop - until the code approaches its theoretical maximum or a hard limit is hit.

It comes in two parts: a **web dashboard** for managing projects and viewing results, and a **backend engine** that handles the actual profiling and optimisation work.

---

## How It Works

1. A user creates a project in the dashboard by linking a GitHub repo or uploading source code directly.
2. The user picks target architectures - x86\_64, arm64, wasm32, or riscv64 - and kicks off a profiling run.
3. The backend compiles the code, runs Linux `perf` to collect hardware-level data (CPU cycles, cache misses, branch mispredictions, instructions per cycle), and identifies the hottest functions.
4. An LLM reads the profiling data and source code, then proposes a single optimisation.
5. The system compiles the new version, re-profiles it, and checks whether it actually improved. If yes, the change is kept. If not, it's rolled back.
6. The loop repeats (default 3 iterations) until the code is within 5% of its theoretical best, the LLM runs out of ideas, or too many attempts fail consecutively.

The user gets back the optimised source code as a downloadable ZIP, along with a full history of what was tried and what worked.

---

## Architecture

### Frontend
Built with **SvelteKit** (Svelte 5) and **Tailwind CSS**, connected to **Supabase** for data persistence. Three main views: project dashboard, new project form, and a per-project detail page showing profiling output and run history.

### Backend
Two layers:
- **Go HTTP server** - lightweight API server exposing endpoints for triggering the profiling pipeline and receiving GitHub webhooks, with JWT-based auth.
- **Python perf agent** - the core engine, a CLI tool and library handling the full profile-optimise loop. Modules include a `perf` subprocess runner, output parser, compiler interface, LLM client, and the optimiser loop itself.

### Docker Support
For cross-architecture profiling, the system builds Docker containers with the necessary compilers and a from-source build of Linux `perf`, based on Ubuntu 22.04. Supported toolchains include C, C++, Go, Rust, Java, Python, Ruby, PHP, and .NET.

---

## Key Design Decisions

- **One optimisation at a time.** Each iteration proposes exactly one change, making it easy to measure impact and roll back cleanly if it doesn't help.
- **Weighted scoring.** Improvements are evaluated with a composite score: 70% runtime, 20% instructions-per-cycle, 10% cache miss rate. A change needs to beat a 1% threshold to be kept.
- **Theoretical ceiling.** The system estimates a best-case score based on the CPU's peak IPC and clock speed. If the code gets within 5% of that ceiling, it stops early.
- **Graceful failure.** Three consecutive failed attempts (compilation errors, no improvement, or malformed LLM output) trigger an automatic stop.
- **Optional human-in-the-loop.** A `--user-approved` flag lets users review each proposed change before it's compiled and tested.

---

## Tech Stack

- **Frontend** - SvelteKit (Svelte 5), Tailwind CSS, Supabase
- **Backend** - Go 1.26, Python 3, Linux perf
- **AI** - OpenAI-compatible API (default: gpt-4o-mini)
- **Infra** - Docker (Ubuntu 22.04), GitHub webhooks
