# Measure Tracking Administration Menu - Static Mockup

A read-only mockup of the University of Hawaii Government Relations Office Measure Tracking System landing page.

## Tech Stack

- **HTML5** - Semantic markup for accessibility
- **Bootstrap 5.3** - Responsive grid and components (via CDN)
- **CSS3** - Custom styles for UH-specific branding

## Purpose

This is a **static UI facsimile** created for stakeholder review. It closely matches the layout, typography, and spacing of the existing system to ensure instant recognition. All links are non-functional placeholders.

## Features

✅ Fully responsive (mobile-first design)  
✅ Accessible (semantic HTML, ARIA labels, keyboard navigation)  
✅ No JavaScript frameworks - pure HTML + Bootstrap  
✅ Lighthouse accessibility score ≥ 90  
✅ Generic styling (no UH logos or trademarks)

## Structure

```
public/mts-mockup/
├── index.html          # Main mockup page
├── styles.css          # Custom styles
├── assets/
│   └── capitol-bg.jpg  # Background image placeholder
└── README.md           # This file
```

## How to Run Locally

### Option 1: Open Directly
Simply open `index.html` in any modern web browser.

### Option 2: Local Server
For testing with proper CORS handling:

```bash
# Using Python 3
cd public/mts-mockup
python -m http.server 8000

# Or using Node.js (http-server)
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### Option 3: Via Deployed Preview
Access via the project's deployed URL at: `/mts-mockup/`

## Content Notes

- Uses exact terminology from the original system
- All counts and dates are realistic placeholders
- Links point to `#` (non-functional)
- Username "ellisa4" is a placeholder
- Background image is a generic Capitol-style photo

## Accessibility Features

- Semantic HTML5 elements (`<nav>`, `<main>`, `<table>`)
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on forms and navigation
- Keyboard-accessible focus states
- Sufficient color contrast (WCAG AA compliant)
- Responsive tables with horizontal scrolling
- Form labels properly associated with inputs

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

This mockup intentionally omits:
- Live data integration
- JavaScript interactivity
- Backend authentication
- Database connections
- UH-specific branding assets

These will be added in the production implementation phase.

## Credits

**Created by:** Shelby Dixon (sdixon4)  
**For:** University of Hawaii Government Relations Office  
**Purpose:** Stakeholder review and UI validation  
**Version:** 1.0.0  
**Date:** October 2025

---

**Note:** This is a demonstration mockup only. Do not use for production legislative tracking.
