# AI-Powered Aerospace Design Assistant: Automated Design Generation for Any Flying Vehicle

An AI assistant that designs flying vehicles automatically from natural language requirements. You give it requirements like *"I need a drone that flies for 30 minutes with 2kg payload"* or *"design a small rocket to reach 1km altitude"*, and it figures out what type of vehicle you need, searches through research papers to find the right formulas and design methods, does all the math calculations, and gives you a complete design with component specifications.

It uses **LangGraph** to manage the whole process: first classifying the vehicle type (drone, plane, helicopter, rocket, satellite, etc.), then searching for relevant papers, extracting important formulas, calling calculation tools to do the math, checking if the design works, and outputting everything in a structured format with citations to the papers it used.

---

## Technical Architecture

### LLM Integration
- **Model**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- **API**: Anthropic Messages API with structured JSON output, system prompts, and low temperature (0) for consistency

### Vector Database
- **Engine**: ChromaDB
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2`
- **Collections**: 30+ aerospace research papers from arXiv and NASA, organised by vehicle type

### State Management
- **Framework**: Pydantic BaseModel with enum-based vehicle types and strict validation
- **LangGraph**: Directed graph with nodes for each design stage and routing logic for different vehicle types

### Calculation Tools
Modular, physics-based tools per vehicle type — drones, fixed-wing, helicopters, rockets, satellites, gliders — all using real aerospace formulas with unit-aware calculations.

---

## LangGraph Workflow

```
User Input → LLM Supervisor (classify vehicle, extract requirements)
           → Parse Requirements
           → LLM Parameter Completer (intelligently fill missing params)
           → Search Documents (RAG retrieval)
           → Extract Formulas (pull equations from papers)
           → LLM Data Validator (verify scale appropriateness)
           → Perform Calculations (vehicle-specific tools)
           → Validate Design (check requirements met)
           → Synthesize Output (generate report with citations)
```

---

## Key Engineering Challenges Solved

### Intelligent Parameter Completion
Users rarely specify all required parameters. Using hardcoded defaults (e.g. 200 km/h for all aircraft) led to absurd designs — a 4 kg drone sizing at 2000 kg MTOW because it used manned aircraft defaults. The LLM now reasons about vehicle type and scale to fill missing parameters appropriately.

### LLM Data Validation Layer
The RAG system retrieved formulas from papers about manned aircraft and applied them to small drones without scale adjustments. A validation layer now reviews all retrieved data in context of the actual design requirements, detects scale mismatches, and corrects them with reasoning.

### Context-Aware Aircraft Sub-Classification
A 4 kg UAV and a Cessna both used the same weight estimation formulas initially. Enhanced fixed-wing tools now sub-classify vehicles (uav\_small, uav\_tactical, light\_sport, single\_engine\_ga, etc.) and apply the appropriate sizing parameters for each category.

### Enum/String Type Safety in LangGraph
LangGraph returns state as dicts with enum values serialised as strings, causing `AttributeError` when code expected enum objects. Resolved with a `dict_to_design_state()` helper and a safe accessor pattern throughout the codebase.

---

## Example Output

```
Input: "fixed wing drone with 4 hours flight time and 4kg payload"

LLM Classification: uav_tactical
LLM Parameter Completion:
  - Cruise Speed: 80 km/h (appropriate for long-endurance fixed-wing UAV)
  - Range: 320 km (calculated from endurance × speed)
  - Altitude: 1000 m
  - Propulsion: electric

Design Result:
  wing_span_m:       3.65
  wing_area_m2:      1.11
  aspect_ratio:      12.00
  total_weight_kg:   18.2
  empty_weight_kg:   9.8
  battery_weight_kg: 4.4
  power_required_w:  340.5
  stall_speed_ms:    12.3
  cruise_speed_ms:   22.2
  range_km:          320
```

---

## Conclusion

The key achievement is building an intelligent agent that doesn't just retrieve information but *reasons* about it — understanding scale, context, and engineering relationships to generate appropriate designs.

The most challenging aspect was handling the "impedance mismatch" between research literature (often focused on large aircraft) and user requests (often for small UAVs). The solution — multiple LLM reasoning layers — showcases how modern language models can act as intelligent mediators that understand both domain knowledge and practical constraints.

**Key Takeaway**: LLMs excel not just at information retrieval but at *intelligent adaptation* — taking knowledge from one context and appropriately applying it to another through reasoning, not just pattern matching.
