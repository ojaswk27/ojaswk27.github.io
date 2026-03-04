# Hackdata 2026 - Multimodal Video RAG

## Overview
Using Qwen3-VL for video-grounded VLM reasoning with time-chunked clips/frames in a multimodal RAG search system.

## Motivation
Video content is hard to search. This project enables natural language queries over video content.

## Approach
- Built media pipeline that chunks content (30-60s)
- Generated multimodal embeddings for frames
- Indexed in Chroma/Qdrant vector database
- Integrated Qwen3-VL for visual reasoning

## Results
- Achieved 60-120 fps processing
- 10-100x faster than manual review
- Accurate video-grounded question answering

## What I Learned
- Video processing and chunking strategies
- Multimodal embeddings (text + images)
- Vector database indexing at scale
- Vision-language models integration
