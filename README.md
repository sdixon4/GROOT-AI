# GRO Control Room — MVP (web prototype)

> A focused prototype to give UH Government Relations (GRO) **speed, accuracy, and context** across a fragmented legislative workflow.

---

## Background

After early customer discovery, Jeff asked us (Wed) to pivot from interviews → **working prototype**. We synthesized pain points from GRO-facing interviews (Wendy Tatsuno, Janice Yamada, Garrett Yoshimi, Kim Siegenthaler, etc.) and designed a single **Control Room** that pulls together triage, amendments, hearings, and institutional memory.

**Core problems we heard**
- **Bill flood at session start** → thousands drop at once; UH implications are hard to spot, esp. when UH isn’t named.
- **Amendment blind spots** → verbal changes read in hearings; official text lags.
- **Hearing chaos** → reconvene times and decisions announced verbally; easy to miss.
- **Fragmented pipeline** → Capitol site, emails, testimony drafts, trackers—all separate.
- **Memory gap** → hard to recall past positions/testimony for consistency year to year.

**MVP goal**
Deliver a clickable demo that shows how GRO can work **faster and more confidently** on Day-1 and mid-session—without live scraping—using fixture data.

---

## What’s in this repo

- **Triage Queue** (mocked data): ranked bills with **reason tags** (incl. implicit UH hits), **confidence badges** (Provisional/Confirmed), **assignee + due**, status chips, and a relevance score.
- Vite + React + Tailwind (+ shadcn) scaffold for rapid iteration.
- Placeholder bill titles/numbers for demo only.

> Near-term adds: Amendment Diff view (first-mention alerts + side-by-side redlines), Hearing Console (caption summaries + reconvene extraction), Context Archive (past positions/testimony), and a Digest Builder.

---

## Why this approach (design intent)

- **Speed**: collapse scattered steps into a single control surface.
- **Accuracy**: show diffs and confidence labels; cite back to source text/captions.
- **Context**: surface prior UH positions to avoid contradictions.
- **Governance**: explicit “Provisional vs Confirmed,” assignments, and audit trail.

---

## Screens / Modules (planned for MVP)

1. **AI Triage Queue** – prioritize UH-relevant bills (incl. implicit mentions like West Oʻahu land).
2. **Amendment Diff** – section-aware redlines; banner on **first-time UH mention**.
3. **Hearing Console** – “who said what” + parsed **reconvene time** from captions.
4. **Context Archive** – past testimony/positions and similar bills with short rationales.
5. **Digest Builder** – exec-ready weekly PDF with confidence labels.

---

## Tech stack

- **Frontend**: Vite + React + TypeScript, Tailwind, shadcn/ui
- **Tooling**: ESLint, PostCSS, (optional) Vercel for preview deploys
- **Data**: uses local **fixtures** for the class demo (no live scraping)

---

## Quick start

```bash
# 1) Clone
git clone https://github.com/sdixon4/GROOT-AI.git
cd GROOT-AI

# 2) Install (npm)
npm install

# 3) Run the dev server
npm run dev
# open the URL Vite prints (usually http://localhost:5173)
