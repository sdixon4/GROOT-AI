# GRO Control Room — MVP (mockups + prototype code)

**Why this exists**  
Jeff asked us yesterday (Wednesday) to shift from discovery → prototype. This repo holds the first pass of a **Control Room** UI so we can co-design a realistic workflow (triage → diff → hearing → context → digest).

**What’s here**
- A **Triage Queue** screen (mocked data) showing filters, reason tags, confidence badges, assignee/due, and a relevance score.  
- Vite + React + Tailwind (+ shadcn) setup so we can iterate fast.  
- Placeholder bill titles/numbers for demo only.

---

## Quick start

```bash
# 1) Clone
git clone <REPO_URL>
cd <PROJECT_FOLDER>

# 2) Install (npm by default)
npm install

# 3) Run the dev server
npm run dev

# 4) Open the URL Vite prints (usually http://localhost:5173)
