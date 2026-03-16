# NIDAR 2025 — Autonomous Multi-Drone Search and Rescue System

NIDAR is a fully autonomous multi-drone system designed for search and rescue operations in disaster management scenarios. The system integrates real-time computer vision, custom multi-object tracking, and inter-drone communication to locate and track survivors across large areas without human intervention.

---

## Computer Vision

### Model Selection and Training

To find the best balance between accuracy and inference speed on constrained edge hardware, I trained and benchmarked multiple detection architectures on a custom-compiled SAR dataset:

- **YOLOv8n / YOLOv8s / YOLOv8m** — evaluated the nano and small variants for maximum throughput, and the medium variant as a performance ceiling reference
- **YOLOv9c / YOLOv9e** — tested YOLOv9's programmable gradient information architecture against YOLOv8 baselines on the same dataset

Each model was trained from scratch on our dataset and fine-tuned from pretrained COCO weights, with evaluation across mAP@0.5, mAP@0.5:0.95, inference latency, and memory footprint on-device.

### Inference Optimisation

The selected model was exported to **ONNX** and optimised for deployment on the **Jetson Orin Nano**, including:

- TensorRT-backed ONNX runtime for GPU-accelerated inference
- Precision tuning (FP16) to fit within edge GPU memory constraints
- Batching and preprocessing pipeline tuned to sustain real-time throughput under thermal throttling conditions

### Multi-Object Tracking

I built a custom multi-object tracking solution on top of the detection pipeline, designed for the specific challenges of aerial SAR footage:

- Handles occlusion and re-entry of targets into frame
- Maintains trajectory continuity and re-identification across frames
- Filters spurious detections using motion consistency constraints

---

## Autonomy and Communication

The system uses a distributed autonomy architecture where each drone operates independently while coordinating via **SiK radios** for telemetry relay and swarm coordination. This included designing communication protocols for mission state synchronisation, waypoint sharing, and failure handoff between drones.

---

## Hardware and Fabrication

### Structural Design and Analysis

I designed and performed structural analysis on multiple components intended for **3D printing** and **CNC cutting**, including mounts, payload bays, and frame reinforcements. Analysis covered load distribution, stress concentrations at joints, and weight optimisation to stay within flight envelope constraints.

### Composites

Worked extensively with **carbon fibre composites** — laying up, cutting, and finishing structural parts. This involved learning composite fabrication techniques hands-on, including layup orientation, resin application, and post-cure finishing, alongside understanding when composites offer meaningful weight and stiffness advantages over printed or machined alternatives.

---

## Key Outcomes

- Benchmarked five YOLO variants and selected the optimal model for edge deployment based on empirical latency and accuracy data
- Achieved real-time detection and tracking on the Jetson Orin Nano within power and thermal limits
- Delivered a functional autonomous SAR system with multi-drone coordination over SiK radio
- Gained substantial hands-on experience in aerospace fabrication — 3D printing, CNC, and carbon fibre composites
