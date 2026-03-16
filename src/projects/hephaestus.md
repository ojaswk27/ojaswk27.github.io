# Project: Hephaestus

Hephaestus is an iterative, hardware-aware code performance optimiser that uses **Linux perf** and **Docker** to push programs toward their theoretical maximum throughput on any target machine — from resource-constrained edge devices to cloud VPS instances.

## How It Works

The system runs your code inside an isolated Docker container and continuously profiles it using Linux `perf`, collecting hardware-level counters (cache misses, branch mispredictions, cycles, instructions, etc.). It then analyses the profiling data, applies targeted optimisations, and re-runs the benchmark — repeating the loop until execution performance converges at a theoretical ceiling or a user-configured hard limit is reached.

## Hardware-Aware Optimisation

A key feature of Hephaestus is that it optimises **for a specific Docker configuration**, not just generic hardware. This means you can supply a configuration modelling a Raspberry Pi (limited RAM, ARM CPU), a Jetson Nano, or any other edge computing target, and Hephaestus will tailor its optimisation strategy to the exact constraints of that environment.

This makes it particularly powerful for **edge compute** use cases where squeezing performance out of limited hardware is critical.

## Multi-Target Support

Hephaestus also supports optimising for **multiple cloud VPS or compute instances** simultaneously, allowing you to profile and tune code for different deployment environments in a single run.

---

> **Full write-up and results coming soon.**
