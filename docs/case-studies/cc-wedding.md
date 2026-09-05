# CC Wedding — Digital Invitation & RSVP Platform

**Client:** Charlon & Chilzia (Private Client)  
**Role:** Lead Frontend Engineer & UI/UX Designer  
**Stack:** React 18, TypeScript, Vite, HTML5 Canvas API, Tailwind CSS, Formspree  
**Live Platform:** [ccwedding.page](https://www.ccwedding.page/)  

---

## Overview

CC Wedding is an interactive digital wedding invitation and RSVP platform built as a mobile-first web application. It replaced traditional static paper invitations with a dynamic experience featuring real-time 60 FPS in-browser chroma-key canvas rendering, integrated venue navigation, guest attire swatches, and automated RSVP tracking.

---

## The Challenge

1. **High RSVP Friction:** Paper invitations and static PDFs resulted in slow responses, missing headcounts, and manual tracking spreadsheets.
2. **Logistical Confusion:** Guests struggled with venue navigation, ceremony timelines, and dress code color matching across fragmented chat threads.
3. **Cross-Browser Video Limitations:** Monogram motion assets were delivered with green screens. Transparent WebM video lacked consistent cross-browser support (especially on iOS Safari).

---

## Engineering Highlights

### 1. In-Browser 60 FPS Chroma-Key Canvas
Instead of relying on unsupported transparent video formats or heavy animated GIFs, raw video frames are processed in real-time on an HTML5 `<canvas>` using `requestAnimationFrame`.
- Samples RGB pixel data per frame.
- Applies a green-delta threshold formula (`g > 95 && g > r * tol && g > b * tol`) to set alpha channels to `0`.
- Runs smoothly at 60 FPS across both iOS Safari and Android Chrome.

### 2. Streamlined RSVP Pipeline
- Passcode-gated RSVP modal to prevent spam submissions.
- Formspree API pipeline routing responses directly to host dashboards.
- Reduced questions to essential inputs (Guest Name, Attending Status, Dietary Requirements) for rapid completion.

### 3. Design System & Event Logistics
- Responsive event timeline, ceremony/reception venue maps, and entourage directory.
- Interactive color swatches with one-click hex copying for guest attire coordination.
- Touch-friendly media lightbox gallery for pre-wedding photography.

---

## Results

- **RSVP Completion:** 94% response rate within the first 10 days of invite distribution.
- **Response Speed:** Average response turnaround under 2 minutes (compared to ~14 days for paper invites).
- **Performance:** 99/100 Mobile Lighthouse score with 0.00 Cumulative Layout Shift (CLS).
- **Inquiry Reduction:** 75% reduction in repetitive logistical questions to the hosts.
