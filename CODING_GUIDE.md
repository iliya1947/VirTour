# CODING GUIDE

## Stack

Frontend:

* Next.js App Router
* TypeScript
* TailwindCSS

Backend:

* FastAPI (later)

---

# Build Constraints

MUST:

* work on Vercel
* use next.config.mjs only
* avoid unstable Next.js features

DO NOT:

* use next.config.ts

---

# Styling

Preferred:

* Tailwind utility classes
* reusable UI components

Avoid:

* massive inline styles
* duplicated class groups

---

# State Management

For MVP:

* React state only

DO NOT:

* add Redux/Zustand unless explicitly requested

---

# Data

For MVP:

* static JSON files

Later:

* API integration

---

# Animations

Use:

* subtle transitions
* hover animations
* loading fades

Avoid:

* excessive motion
* distracting effects

---

# Accessibility

Required:

* semantic HTML
* keyboard navigation
* readable contrast

---

# SEO

Each listing page MUST:

* generate metadata
* include OpenGraph tags

---

# File Structure

Prefer:

* small reusable components
* isolated logic

Avoid:

* giant page.tsx files

---

# IMPORTANT

Before generating UI:
ask internally:

"Does this look like a premium marketplace?"

If not:
improve the UI before finalizing.
