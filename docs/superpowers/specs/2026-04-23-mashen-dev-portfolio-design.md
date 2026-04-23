# Mashen.dev Portfolio Site Design

## Context

This project starts from an empty directory and targets a personal portfolio site for `mashen.dev`.
The domain is registered at Name.com and Cloudflare is already active for DNS and Pages hosting.
The site should be low-cost, easy to maintain, and deploy automatically from GitHub to Cloudflare Pages.

The portfolio must present M. Ali Sen as an AI/ML engineer with practical product delivery experience across generative AI, localization, multimodal systems, and game-related tooling. The site should feel professional first, but with a strong Matrix-inspired identity.

## Goals

- Ship a fast, static portfolio site on Cloudflare Pages.
- Support three languages: Turkish, English, and Dutch.
- Present a balanced message across personal brand, technical depth, and selected work.
- Use real content derived from the provided CV and additional Unico Studio scope notes.
- Establish a visual identity that is dark, technical, and unmistakably Matrix-inspired without harming readability.
- Keep the initial version simple to update through code and Git.

## Non-Goals

- No CMS in v1.
- No blog in v1.
- No backend, database, or admin panel.
- No server-side form handling in v1.
- No heavy 3D or video-driven hero experience in v1.
- No attempt to mirror a full game portal product; references such as Poki or CrazyGames are content inspiration, not product scope.

## Product Direction

The recommended direction is a structured, professional portfolio with a strong Matrix character.
The experience should open with a striking first impression, then quickly settle into a clear and credible presentation of work, skills, and contact information.

The visual language should feel cinematic and technical, but the information architecture should remain conventional enough for recruiters, collaborators, and potential clients to scan it easily.

## Information Architecture

The site will contain four top-level pages:

1. `Home`
2. `About`
3. `Projects`
4. `Contact`

### Home

The home page is the primary conversion surface. It should include:

- A hero section with a concise positioning statement
- A short introduction to core focus areas
- A selected projects section
- A compact capabilities or specialties section
- A short experience preview
- A strong contact call-to-action

### About

The about page expands the narrative behind the CV:

- Academic background
- AI/ML focus areas
- Product and engineering mindset
- Research and experimentation orientation
- Short summary of how design, development, and AI work intersect in the portfolio

### Projects

The projects page presents selected work as cards or case-study previews. Each project entry should include:

- Project title
- One-sentence summary
- Role or contribution type
- Technology or domain tags
- Short impact or outcome framing

### Contact

The contact page should be simple and conversion-focused:

- Email
- LinkedIn
- GitHub
- Medium
- Optional phone number if desired later
- Short availability statement

## Language Model

The site supports three languages:

- `TR`
- `EN`
- `NL`

The language selector is global and available across all pages.
Changing language should update the page copy without changing the overall structure or visual hierarchy.

English should be the default language because it serves the broadest external audience.

Version 1 content will be maintained as structured in-repo content objects rather than a CMS. The translation model should support:

- Shared route structure across languages
- Per-page copy dictionaries
- Reusable labels for navigation, buttons, headings, and metadata

## Visual System

### Tone

The visual tone is:

- Dark
- Technical
- Premium
- Strongly Matrix-inspired

The site must not drift into parody, novelty, or game menu styling. It needs to stay credible as a professional portfolio.

### Color

The palette should center on:

- Near-black base backgrounds
- Matrix green as the primary accent
- Dark emerald or green-black support tones
- Cool neutral grays for secondary UI structure
- High-contrast light text for readability

Green should be used deliberately for emphasis, not on every element.

### Typography

Typography should combine:

- A modern sans-serif for primary headings and body text
- A restrained monospace treatment for labels, micro-details, or technical accents

The typography should signal engineering and systems thinking without making the site feel like a terminal emulator.

### Motion and Effects

Matrix-inspired effects are welcome, but they must remain controlled:

- Hero may carry the strongest digital-rain, scanline, grid, or glow treatment
- Inner pages should reduce effect intensity
- Decorative motion must not degrade text contrast or performance
- Effects should be CSS-first where possible

The guiding rule is: strong atmosphere at first glance, clean legibility after a few seconds of reading.

## Content Strategy

The site should not reproduce the CV verbatim. Instead, it should translate the CV into a portfolio narrative with tighter messaging and stronger prioritization.

### Hero Positioning

The hero should synthesize the strongest threads from the CV:

- AI/ML engineering
- Generative AI systems
- Multimodal workflows
- Practical product development

The headline and subheadline should balance technical credibility with approachability.

### About Narrative

The about page should condense and sharpen the following themes:

- Associate degree in Web Design and Coding
- BSc in Computer Engineering from Yildiz Technical University
- Ongoing MSc in Computer Engineering
- Ongoing research and experimentation in generative models, LLMs, VLMs, RAG, and multimodal systems
- Broad engineering range spanning software, data, automation, and product-facing AI

### Experience Timeline

The experience section should include:

- E-Commint
- UPOD.dev
- Nomination Italy Turkey
- Freelance or contracted AI/ML engineering work
- Unico Studio

Each entry should focus on meaningful scope and outcomes, not generic job-description wording.

### Unico Studio Positioning

Unico Studio should be presented through concrete work streams:

- Localization of games
- Art generation workflows for style-consistent game assets
- End-to-end web game generation using AI-assisted coding and rapid iteration
- AI-assisted audio and video generation for games
- AI code review workflows
- Design and production thinking for web game portfolio or directory experiences similar to Poki or CrazyGames

These items can appear both under experience and as selected project themes where confidentiality allows.

### Selected Projects

Initial project candidates include:

- Karaca / E-Commint work
- TUBITAK 122E666 remote sensing project
- NLP chatbot project
- VolerGift / Nomination Turkey e-commerce work
- Generative AI and workflow-building work
- Selected Unico Studio-compatible portfolio items

The portfolio should prefer fewer, better-explained projects over a long undifferentiated list.

### Skills and Capabilities

Skills should be grouped rather than listed as a raw inventory. Suggested groups:

- AI/ML and Generative AI
- Software Engineering
- Data and Forecasting
- Tools and Production Workflows

## Technical Architecture

### Framework

The site should use `Astro`.

Reasons:

- Static output fits the low-cost hosting goal
- Good performance and SEO defaults
- Clean fit for multi-page content-driven sites
- Easier future expansion into blog or richer project content if needed

### Rendering Model

Version 1 should be fully static.
No SSR is required.
All content is generated at build time.

### Component Model

The site should use a small, maintainable component system:

- Shared layout
- Navigation and language switcher
- Hero section
- Project card grid
- Timeline or experience list
- Contact action block

The styling system should be centralized enough to keep the Matrix identity coherent across pages.

### Content Storage

Content should live in version-controlled structured files or modules inside the repository.
This keeps the first version simple, fast, and cheap to maintain.

## Deployment Flow

Deployment flow:

1. Work locally
2. Push to GitHub
3. Cloudflare Pages builds automatically
4. `mashen.dev` serves the latest deploy

Cloudflare Pages should be configured for the GitHub repository with automatic production deploys from the main branch.

## SEO and Quality Baseline

Version 1 should include:

- Per-page titles and descriptions
- Social metadata
- Sensible heading hierarchy
- Accessible contrast and keyboard navigation
- Responsive layout across mobile and desktop
- Reasonable performance discipline, especially in the hero section

## Version 1 Scope Summary

Version 1 includes:

- Four pages: Home, About, Projects, Contact
- Three languages: TR, EN, NL
- Real CV-derived content plus approved Unico Studio content themes
- Matrix-inspired visual identity
- Responsive design
- Static deployment on Cloudflare Pages
- GitHub-driven update flow

Version 1 excludes:

- Blog
- CMS
- Backend contact processing
- Database-backed content
- Heavy immersive runtime effects

## Risks and Guardrails

### Risk: Theme overwhelms the portfolio

Guardrail:
Keep the strongest Matrix effects in the hero and reduce them elsewhere.

### Risk: Content reads like a CV dump

Guardrail:
Rewrite content as portfolio copy, not bullet-copy from the resume.

### Risk: Three-language scope introduces delay

Guardrail:
Use a shared page structure and consistent translation keys from the start.

### Risk: Too many projects dilute quality

Guardrail:
Prioritize a smaller curated set with stronger summaries and better visual framing.

## Implementation Intent

After this design is approved, the next step is to write a concrete implementation plan covering:

- Project scaffolding
- Content modeling
- Page-by-page build order
- Styling system
- Language switching
- Cloudflare Pages deployment setup
