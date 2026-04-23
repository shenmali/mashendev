# Mashen.dev Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static, trilingual Astro portfolio for `mashen.dev` with a strong Matrix-inspired visual identity, real CV-based content, and GitHub-to-Cloudflare Pages delivery.

**Architecture:** Use Astro with a static build and a catch-all route that resolves locale plus page key from the URL. Keep all copy in typed repository content modules, render pages through focused Astro components, and use CSS-first Matrix styling so the site stays fast, cheap, and easy to maintain.

**Tech Stack:** Astro, TypeScript, plain CSS, Vitest, Playwright, Cloudflare Pages, GitHub

---

## File Structure

### Project and Tooling

- Create: `package.json` — scripts and dependencies for Astro, tests, and local preview
- Create: `astro.config.mjs` — Astro config with static output
- Create: `tsconfig.json` — TypeScript configuration
- Create: `playwright.config.ts` — browser smoke test runner
- Create: `src/env.d.ts` — Astro types
- Modify: `.gitignore` — include Node and build artifacts

### Core App Code

- Create: `src/lib/i18n.ts` — locale constants and locale guards
- Create: `src/lib/routes.ts` — locale-aware route parsing and static path generation
- Create: `src/lib/seo.ts` — page metadata helper
- Create: `src/content/site.ts` — typed content for `en`, `tr`, and `nl`
- Create: `src/layouts/BaseLayout.astro` — metadata, page shell, background treatment
- Create: `src/components/SiteHeader.astro` — navigation and locale switcher
- Create: `src/components/MatrixBackdrop.astro` — decorative Matrix background layer
- Create: `src/components/HeroSection.astro` — home hero
- Create: `src/components/SectionBlock.astro` — reusable section wrapper
- Create: `src/components/ProjectCard.astro` — project summary card
- Create: `src/components/ExperienceTimeline.astro` — experience list UI
- Create: `src/components/ContactLinks.astro` — mail, GitHub, LinkedIn, Medium links
- Create: `src/components/pages/HomePage.astro` — home page sections
- Create: `src/components/pages/AboutPage.astro` — about content and experience
- Create: `src/components/pages/ProjectsPage.astro` — projects grid
- Create: `src/components/pages/ContactPage.astro` — contact and availability block
- Create: `src/pages/[...slug].astro` — locale-aware static route
- Create: `src/styles/global.css` — global styles, theme tokens, effects, responsive layout

### Tests and Docs

- Create: `src/lib/i18n.test.ts` — unit tests for locale and path helpers
- Create: `src/lib/routes.test.ts` — unit tests for slug parsing and path generation
- Create: `src/content/site.test.ts` — unit tests for locale coverage and content shape
- Create: `tests/e2e/site.spec.ts` — smoke tests for page rendering, locale routes, and metadata
- Create: `README.md` — local run instructions and Cloudflare Pages setup notes

## Task 1: Bootstrap Astro and Testing Tooling

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `playwright.config.ts`
- Create: `src/env.d.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Run the empty-project build command and confirm it fails**

Run: `npm run build`
Expected: FAIL with `Missing script: "build"`

- [ ] **Step 2: Scaffold Astro and install test tooling**

Run:

```bash
npm create astro@latest . -- --template basics --install --git false
npm install -D vitest @playwright/test
```

Expected: Astro starter files are created and `node_modules/` exists.

- [ ] **Step 3: Replace the generated scripts and config with the project baseline**

`package.json`

```json
{
  "name": "mashen-dev",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test:unit": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

`astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://mashen.dev'
});
```

`playwright.config.ts`

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321'
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI
  }
});
```

`.gitignore`

```gitignore
.superpowers/
node_modules/
dist/
playwright-report/
test-results/
```

- [ ] **Step 4: Run the Astro build and confirm the scaffold compiles**

Run: `npm run build`
Expected: PASS with Astro reporting a completed static build into `dist/`

- [ ] **Step 5: Commit the bootstrap**

Run:

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json playwright.config.ts src/env.d.ts .gitignore
git commit -m "chore: bootstrap Astro portfolio workspace"
```

## Task 2: Add Locale, Route, and Content Foundations

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/lib/routes.ts`
- Create: `src/content/site.ts`
- Test: `src/lib/i18n.test.ts`
- Test: `src/lib/routes.test.ts`
- Test: `src/content/site.test.ts`

- [ ] **Step 1: Write failing unit tests for locale helpers, route parsing, and locale coverage**

`src/lib/i18n.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { defaultLocale, isLocale, locales, pageKeys } from './i18n';

describe('i18n', () => {
  it('defines the supported locales and default locale', () => {
    expect(locales).toEqual(['en', 'tr', 'nl']);
    expect(defaultLocale).toBe('en');
    expect(pageKeys).toEqual(['home', 'about', 'projects', 'contact']);
  });

  it('accepts only supported locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('tr')).toBe(true);
    expect(isLocale('nl')).toBe(true);
    expect(isLocale('de')).toBe(false);
  });
});
```

`src/lib/routes.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { buildLocalizedPath, resolveRouteFromSlug } from './routes';

describe('routes', () => {
  it('builds default-locale paths without a prefix', () => {
    expect(buildLocalizedPath('en', 'home')).toBe('/');
    expect(buildLocalizedPath('en', 'about')).toBe('/about');
  });

  it('builds prefixed paths for Turkish and Dutch', () => {
    expect(buildLocalizedPath('tr', 'home')).toBe('/tr');
    expect(buildLocalizedPath('nl', 'projects')).toBe('/nl/projects');
  });

  it('resolves slug arrays into locale and page keys', () => {
    expect(resolveRouteFromSlug(undefined)).toEqual({ locale: 'en', page: 'home' });
    expect(resolveRouteFromSlug(['projects'])).toEqual({ locale: 'en', page: 'projects' });
    expect(resolveRouteFromSlug(['tr', 'about'])).toEqual({ locale: 'tr', page: 'about' });
  });
});
```

`src/content/site.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { pageKeys } from '../lib/i18n';
import { siteContent } from './site';

describe('site content', () => {
  it('provides content for every locale and page key', () => {
    for (const locale of ['en', 'tr', 'nl'] as const) {
      expect(siteContent[locale].nav.home).toBeTruthy();
      for (const pageKey of pageKeys) {
        expect(siteContent[locale].meta[pageKey].title).toBeTruthy();
      }
    }
  });
});
```

- [ ] **Step 2: Run unit tests and confirm they fail because the modules do not exist yet**

Run: `npm run test:unit`
Expected: FAIL with module resolution errors for `./i18n`, `./routes`, and `./site`

- [ ] **Step 3: Implement the locale, route, and minimal content model**

`src/lib/i18n.ts`

```ts
export const locales = ['en', 'tr', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export const pageKeys = ['home', 'about', 'projects', 'contact'] as const;
export type PageKey = (typeof pageKeys)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

`src/lib/routes.ts`

```ts
import { defaultLocale, isLocale, locales, pageKeys, type Locale, type PageKey } from './i18n';

type RouteInfo = {
  locale: Locale;
  page: PageKey;
};

export function buildLocalizedPath(locale: Locale, page: PageKey): string {
  const suffix = page === 'home' ? '' : `/${page}`;

  if (locale === defaultLocale) {
    return suffix || '/';
  }

  return `/${locale}${suffix}`;
}

export function resolveRouteFromSlug(slug?: string | string[]): RouteInfo {
  const parts = Array.isArray(slug) ? slug : slug ? slug.split('/') : [];

  if (parts.length === 0) {
    return { locale: defaultLocale, page: 'home' };
  }

  const [first, second] = parts;

  if (isLocale(first)) {
    return {
      locale: first,
      page: (second ?? 'home') as PageKey
    };
  }

  return {
    locale: defaultLocale,
    page: first as PageKey
  };
}

export function buildStaticPaths() {
  const paths = [];

  for (const locale of locales) {
    for (const page of pageKeys) {
      const path = buildLocalizedPath(locale, page);
      const slug = path === '/' ? undefined : path.slice(1).split('/');
      paths.push({ params: { slug } });
    }
  }

  return paths;
}
```

`src/content/site.ts`

```ts
import type { Locale, PageKey } from '../lib/i18n';

type MetaEntry = {
  title: string;
  description: string;
};

type LocaleContent = {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  meta: Record<PageKey, MetaEntry>;
};

export const siteContent: Record<Locale, LocaleContent> = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', contact: 'Contact' },
    meta: {
      home: { title: 'M. Ali Sen | AI/ML Engineer', description: 'AI/ML engineer portfolio with generative AI, localization, and game production work.' },
      about: { title: 'About | M. Ali Sen', description: 'Background, education, and engineering approach of M. Ali Sen.' },
      projects: { title: 'Projects | M. Ali Sen', description: 'Selected AI/ML, localization, and product-oriented projects by M. Ali Sen.' },
      contact: { title: 'Contact | M. Ali Sen', description: 'How to contact M. Ali Sen for collaborations and opportunities.' }
    }
  },
  tr: {
    nav: { home: 'Ana Sayfa', about: 'Hakkimda', projects: 'Projeler', contact: 'Iletisim' },
    meta: {
      home: { title: 'M. Ali Sen | AI/ML Muhendisi', description: 'Uretken AI, lokalizasyon ve oyun uretimi calismalarini sunan portfolio sitesi.' },
      about: { title: 'Hakkimda | M. Ali Sen', description: 'M. Ali Senin egitim gecmisi ve muhendislik yaklasimi.' },
      projects: { title: 'Projeler | M. Ali Sen', description: 'AI/ML, lokalizasyon ve urun odakli projelerden secmeler.' },
      contact: { title: 'Iletisim | M. Ali Sen', description: 'M. Ali Sen ile iletisime gecmek icin baglanti bilgileri.' }
    }
  },
  nl: {
    nav: { home: 'Home', about: 'Over', projects: 'Projecten', contact: 'Contact' },
    meta: {
      home: { title: 'M. Ali Sen | AI/ML Engineer', description: 'Portfolio met generatieve AI, lokalisatie en gameproductie.' },
      about: { title: 'Over | M. Ali Sen', description: 'Achtergrond, opleiding en technische aanpak van M. Ali Sen.' },
      projects: { title: 'Projecten | M. Ali Sen', description: 'Geselecteerde AI/ML-, lokalisatie- en productprojecten.' },
      contact: { title: 'Contact | M. Ali Sen', description: 'Contactgegevens voor samenwerking en kansen.' }
    }
  }
};
```

- [ ] **Step 4: Run unit tests and confirm the foundation passes**

Run: `npm run test:unit`
Expected: PASS with `3 passed`

- [ ] **Step 5: Commit the typed locale and content foundation**

Run:

```bash
git add src/lib/i18n.ts src/lib/routes.ts src/content/site.ts src/lib/i18n.test.ts src/lib/routes.test.ts src/content/site.test.ts
git commit -m "feat: add trilingual routing and content foundation"
```

## Task 3: Build the Shared Shell and Locale-Aware Route

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/MatrixBackdrop.astro`
- Create: `src/pages/[...slug].astro`
- Create: `src/styles/global.css`
- Modify: `src/content/site.ts`
- Test: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Write a failing browser smoke test for navigation and locale switching**

`tests/e2e/site.spec.ts`

```ts
import { expect, test } from '@playwright/test';

test('default home route renders global navigation and locale links', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  await expect(page.getByRole('link', { name: 'TR' })).toHaveAttribute('href', '/tr');
  await expect(page.getByRole('link', { name: 'NL' })).toHaveAttribute('href', '/nl');
});
```

- [ ] **Step 2: Run the browser smoke test and confirm it fails on the scaffolded starter page**

Run: `npm run test:e2e`
Expected: FAIL because the scaffold does not render the expected header or locale links

- [ ] **Step 3: Implement the shared shell, route resolver, and starter page rendering**

`src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import MatrixBackdrop from '../components/MatrixBackdrop.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <MatrixBackdrop />
    <slot />
  </body>
</html>
```

`src/components/SiteHeader.astro`

```astro
---
import { locales, type Locale, type PageKey } from '../lib/i18n';
import { buildLocalizedPath } from '../lib/routes';

interface Props {
  locale: Locale;
  page: PageKey;
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
}

const { locale, page, nav } = Astro.props;
---

<header class="site-header">
  <a class="brand" href={buildLocalizedPath(locale, 'home')}>mashen.dev</a>
  <nav aria-label="Primary">
    <a href={buildLocalizedPath(locale, 'about')}>{nav.about}</a>
    <a href={buildLocalizedPath(locale, 'projects')}>{nav.projects}</a>
    <a href={buildLocalizedPath(locale, 'contact')}>{nav.contact}</a>
  </nav>
  <nav aria-label="Languages" class="locale-nav">
    {locales.map((entry) => (
      <a
        href={buildLocalizedPath(entry, page)}
        aria-current={entry === locale ? 'page' : undefined}
      >
        {entry.toUpperCase()}
      </a>
    ))}
  </nav>
</header>
```

`src/components/MatrixBackdrop.astro`

```astro
<div class="matrix-backdrop" aria-hidden="true">
  <div class="matrix-backdrop__grid"></div>
  <div class="matrix-backdrop__rain"></div>
</div>
```

`src/pages/[...slug].astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SiteHeader from '../components/SiteHeader.astro';
import { siteContent } from '../content/site';
import { buildStaticPaths, resolveRouteFromSlug } from '../lib/routes';

export function getStaticPaths() {
  return buildStaticPaths();
}

const route = resolveRouteFromSlug(Astro.params.slug);
const localeContent = siteContent[route.locale];
---

<BaseLayout
  title={localeContent.meta[route.page].title}
  description={localeContent.meta[route.page].description}
>
  <SiteHeader locale={route.locale} page={route.page} nav={localeContent.nav} />
  <main class="page-shell">
    <section class="starter-panel">
      <p class="eyebrow">M. Ali Sen</p>
      <h1>{localeContent.meta.home.title}</h1>
      <p>{localeContent.meta.home.description}</p>
    </section>
  </main>
</BaseLayout>
```

`src/styles/global.css`

```css
:root {
  color-scheme: dark;
  --bg: #020402;
  --panel: rgba(6, 16, 10, 0.82);
  --text: #f3f7f4;
  --muted: #9eb1a4;
  --accent: #39ff88;
  --line: rgba(57, 255, 136, 0.18);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
}

.site-header,
.page-shell {
  position: relative;
  z-index: 1;
}

.site-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 2rem;
}

.brand,
.site-header a {
  color: inherit;
  text-decoration: none;
}

.page-shell {
  padding: 4rem 2rem 6rem;
}

.starter-panel {
  max-width: 56rem;
  padding: 2rem;
  border: 1px solid var(--line);
  background: var(--panel);
}

.eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  color: var(--accent);
  text-transform: uppercase;
}
```

- [ ] **Step 4: Run browser smoke tests and confirm the shell passes**

Run: `npm run test:e2e`
Expected: PASS with `1 passed`

- [ ] **Step 5: Commit the shell and locale-aware page route**

Run:

```bash
git add src/layouts/BaseLayout.astro src/components/SiteHeader.astro src/components/MatrixBackdrop.astro src/pages/[...slug].astro src/styles/global.css tests/e2e/site.spec.ts
git commit -m "feat: add shared portfolio shell and locale routing"
```

## Task 4: Build the Home Page with Real Copy and Matrix Hero

**Files:**
- Create: `src/components/HeroSection.astro`
- Create: `src/components/SectionBlock.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/pages/HomePage.astro`
- Modify: `src/content/site.ts`
- Modify: `src/pages/[...slug].astro`
- Modify: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Extend the browser smoke test to assert real hero copy and home sections**

Append to `tests/e2e/site.spec.ts`

```ts
test('home page shows hero, selected projects, and specialties', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /Generative AI, localization, and game production systems/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Capabilities' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
});
```

- [ ] **Step 2: Run the smoke test and confirm it fails on the starter content**

Run: `npm run test:e2e`
Expected: FAIL because the hero heading and sections are not rendered yet

- [ ] **Step 3: Implement the home page content and components**

`src/components/HeroSection.astro`

```astro
---
interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

const { eyebrow, title, intro, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref } = Astro.props;
---

<section class="hero-section">
  <p class="eyebrow">{eyebrow}</p>
  <h1>{title}</h1>
  <p class="hero-intro">{intro}</p>
  <div class="hero-actions">
    <a class="button button--primary" href={primaryCtaHref}>{primaryCtaLabel}</a>
    <a class="button button--ghost" href={secondaryCtaHref}>{secondaryCtaLabel}</a>
  </div>
</section>
```

`src/components/SectionBlock.astro`

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<section class="section-block">
  <h2>{title}</h2>
  <slot />
</section>
```

`src/components/ProjectCard.astro`

```astro
---
interface Props {
  title: string;
  summary: string;
  tags: string[];
}

const { title, summary, tags } = Astro.props;
---

<article class="project-card">
  <h3>{title}</h3>
  <p>{summary}</p>
  <ul class="tag-list">
    {tags.map((tag) => <li>{tag}</li>)}
  </ul>
</article>
```

`src/components/pages/HomePage.astro`

```astro
---
import HeroSection from '../HeroSection.astro';
import ProjectCard from '../ProjectCard.astro';
import SectionBlock from '../SectionBlock.astro';

interface Props {
  content: any;
}

const { content } = Astro.props;
---

<HeroSection
  eyebrow={content.home.eyebrow}
  title={content.home.title}
  intro={content.home.intro}
  primaryCtaLabel={content.home.primaryCtaLabel}
  primaryCtaHref={content.home.primaryCtaHref}
  secondaryCtaLabel={content.home.secondaryCtaLabel}
  secondaryCtaHref={content.home.secondaryCtaHref}
/>

<SectionBlock title={content.home.selectedWorkTitle}>
  <div class="project-grid">
    {content.home.selectedProjects.map((project: any) => (
      <ProjectCard title={project.title} summary={project.summary} tags={project.tags} />
    ))}
  </div>
</SectionBlock>

<SectionBlock title={content.home.capabilitiesTitle}>
  <ul class="capability-list">
    {content.home.capabilities.map((entry: string) => <li>{entry}</li>)}
  </ul>
</SectionBlock>
```

Add this shape to `src/content/site.ts`

```ts
type ProjectSummary = {
  title: string;
  summary: string;
  tags: string[];
};

type HomeContent = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  selectedWorkTitle: string;
  capabilitiesTitle: string;
  capabilities: string[];
  selectedProjects: ProjectSummary[];
};
```

Populate `home` for each locale with real copy. Use this English source:

```ts
home: {
  eyebrow: 'AI/ML Engineer',
  title: 'Generative AI, localization, and game production systems',
  intro: 'I design and ship practical AI workflows across multilingual game localization, style-consistent asset generation, AI-assisted game creation, and code review automation.',
  primaryCtaLabel: 'Get in touch',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: 'View projects',
  secondaryCtaHref: '/projects',
  selectedWorkTitle: 'Selected Work',
  capabilitiesTitle: 'Capabilities',
  capabilities: [
    'Game localization workflows',
    'Consistent game asset generation pipelines',
    'AI-assisted web game generation and iteration',
    'AI code review and QA automation'
  ],
  selectedProjects: [
    {
      title: 'Unico Studio AI Production Workflows',
      summary: 'Built pipelines for localization, asset generation, AI code review, and web game production support.',
      tags: ['Generative AI', 'Localization', 'Games']
    },
    {
      title: 'Karaca Commerce Delivery',
      summary: 'Contributed to SAP Commerce Cloud implementations for market-specific e-commerce experiences.',
      tags: ['Java', 'SAP Commerce', 'Angular']
    },
    {
      title: 'TUBITAK 122E666',
      summary: 'Worked on automatic change detection in remote sensing imagery using AI and image analysis methods.',
      tags: ['Computer Vision', 'Research', 'Python']
    }
  ]
}
```

Use direct translations for `tr` and `nl` in the same structure before wiring the page.

Update `src/pages/[...slug].astro` to render `HomePage` when `route.page === 'home'`.

- [ ] **Step 4: Run browser smoke tests and confirm the home page passes**

Run: `npm run test:e2e`
Expected: PASS with both smoke tests green

- [ ] **Step 5: Commit the real home page**

Run:

```bash
git add src/components/HeroSection.astro src/components/SectionBlock.astro src/components/ProjectCard.astro src/components/pages/HomePage.astro src/content/site.ts src/pages/[...slug].astro tests/e2e/site.spec.ts
git commit -m "feat: add real home page content and hero"
```

## Task 5: Build the About Page and Experience Timeline

**Files:**
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/pages/AboutPage.astro`
- Modify: `src/content/site.ts`
- Modify: `src/pages/[...slug].astro`
- Modify: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Add a failing browser test for the about page**

Append to `tests/e2e/site.spec.ts`

```ts
test('about page shows academic background and experience timeline', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible();
  await expect(page.getByText(/Yildiz Technical University/i)).toBeVisible();
  await expect(page.getByText(/Unico Studio/i)).toBeVisible();
  await expect(page.getByText(/E-Commint/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the smoke test and confirm it fails because the about page is still a stub**

Run: `npm run test:e2e`
Expected: FAIL because `/about` does not render the expected heading or timeline entries

- [ ] **Step 3: Implement the about page and structured experience timeline**

`src/components/ExperienceTimeline.astro`

```astro
---
interface Props {
  items: Array<{
    period: string;
    title: string;
    company: string;
    summary: string;
  }>;
}

const { items } = Astro.props;
---

<ol class="timeline">
  {items.map((item) => (
    <li class="timeline-item">
      <p class="timeline-period">{item.period}</p>
      <h3>{item.title}</h3>
      <p class="timeline-company">{item.company}</p>
      <p>{item.summary}</p>
    </li>
  ))}
</ol>
```

`src/components/pages/AboutPage.astro`

```astro
---
import ExperienceTimeline from '../ExperienceTimeline.astro';
import SectionBlock from '../SectionBlock.astro';

interface Props {
  content: any;
}

const { content } = Astro.props;
---

<section class="inner-hero">
  <p class="eyebrow">{content.about.eyebrow}</p>
  <h1>{content.about.title}</h1>
  <p>{content.about.intro}</p>
</section>

<SectionBlock title={content.about.educationTitle}>
  <ul class="detail-list">
    {content.about.education.map((entry: string) => <li>{entry}</li>)}
  </ul>
</SectionBlock>

<SectionBlock title={content.about.experienceTitle}>
  <ExperienceTimeline items={content.about.experience} />
</SectionBlock>
```

Add this English source to `src/content/site.ts` and translate it to `tr` and `nl` with the same shape:

```ts
about: {
  eyebrow: 'Background',
  title: 'About',
  intro: 'I combine academic AI research with production-focused engineering across multilingual content, generative workflows, and product-oriented software delivery.',
  educationTitle: 'Education',
  experienceTitle: 'Experience',
  education: [
    'Associate degree in Web Design and Coding',
    'BSc in Computer Engineering, Yildiz Technical University',
    'MSc in Computer Engineering in progress, Yildiz Technical University'
  ],
  experience: [
    {
      period: '2025 - Present',
      title: 'AI/ML Engineer',
      company: 'Unico Studio',
      summary: 'Built localization, asset generation, web game generation, AI code review, and game-media workflows for production teams.'
    },
    {
      period: '2023 - Present',
      title: 'Freelance AI/ML Engineer',
      company: 'Contract Projects',
      summary: 'Delivered RAG chatbots, fine-tuned assistants, generative imaging workflows, and forecasting systems.'
    },
    {
      period: '2022 - 2024',
      title: 'Software Developer',
      company: 'E-Commint',
      summary: 'Worked on SAP Commerce Cloud implementations and market-specific commerce delivery for Karaca projects.'
    }
  ]
}
```

Update `src/pages/[...slug].astro` to render `AboutPage` for `route.page === 'about'`.

- [ ] **Step 4: Run browser smoke tests and confirm the about page passes**

Run: `npm run test:e2e`
Expected: PASS with the about test green alongside the existing home tests

- [ ] **Step 5: Commit the about page**

Run:

```bash
git add src/components/ExperienceTimeline.astro src/components/pages/AboutPage.astro src/content/site.ts src/pages/[...slug].astro tests/e2e/site.spec.ts
git commit -m "feat: add about page and experience timeline"
```

## Task 6: Build the Projects and Contact Pages

**Files:**
- Create: `src/components/ContactLinks.astro`
- Create: `src/components/pages/ProjectsPage.astro`
- Create: `src/components/pages/ContactPage.astro`
- Modify: `src/content/site.ts`
- Modify: `src/pages/[...slug].astro`
- Modify: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Add failing browser tests for the projects and contact pages**

Append to `tests/e2e/site.spec.ts`

```ts
test('projects page renders project cards', async ({ page }) => {
  await page.goto('/projects');

  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  await expect(page.getByText(/Unico Studio AI Production Workflows/i)).toBeVisible();
  await expect(page.getByText(/NLP Chatbot/i)).toBeVisible();
});

test('contact page renders direct contact actions', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.getByRole('link', { name: /muhalishen@gmail.com/i })).toHaveAttribute('href', 'mailto:muhalishen@gmail.com');
  await expect(page.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', /github/);
  await expect(page.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', /linkedin/);
});
```

- [ ] **Step 2: Run the browser smoke tests and confirm both routes fail**

Run: `npm run test:e2e`
Expected: FAIL on `/projects` and `/contact`

- [ ] **Step 3: Implement the projects and contact pages with real data**

`src/components/ContactLinks.astro`

```astro
---
interface Props {
  email: string;
  github: string;
  linkedin: string;
  medium: string;
}

const { email, github, linkedin, medium } = Astro.props;
---

<ul class="contact-links">
  <li><a href={`mailto:${email}`}>{email}</a></li>
  <li><a href={github} target="_blank" rel="noreferrer">GitHub</a></li>
  <li><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
  <li><a href={medium} target="_blank" rel="noreferrer">Medium</a></li>
</ul>
```

`src/components/pages/ProjectsPage.astro`

```astro
---
import ProjectCard from '../ProjectCard.astro';
import SectionBlock from '../SectionBlock.astro';

interface Props {
  content: any;
}

const { content } = Astro.props;
---

<section class="inner-hero">
  <p class="eyebrow">{content.projects.eyebrow}</p>
  <h1>{content.projects.title}</h1>
  <p>{content.projects.intro}</p>
</section>

<SectionBlock title={content.projects.gridTitle}>
  <div class="project-grid">
    {content.projects.items.map((project: any) => (
      <ProjectCard title={project.title} summary={project.summary} tags={project.tags} />
    ))}
  </div>
</SectionBlock>
```

`src/components/pages/ContactPage.astro`

```astro
---
import ContactLinks from '../ContactLinks.astro';

interface Props {
  content: any;
}

const { content } = Astro.props;
---

<section class="inner-hero">
  <p class="eyebrow">{content.contact.eyebrow}</p>
  <h1>{content.contact.title}</h1>
  <p>{content.contact.intro}</p>
  <ContactLinks
    email={content.contact.email}
    github={content.contact.github}
    linkedin={content.contact.linkedin}
    medium={content.contact.medium}
  />
</section>
```

Add these English content blocks to `src/content/site.ts` and provide translated `tr` and `nl` entries:

```ts
projects: {
  eyebrow: 'Selected Work',
  title: 'Projects',
  intro: 'A curated selection of AI/ML, commerce, and product-facing projects.',
  gridTitle: 'Project Highlights',
  items: [
    {
      title: 'Unico Studio AI Production Workflows',
      summary: 'Localization, asset generation, AI code review, web game generation, and media workflows for game production.',
      tags: ['AI/ML', 'Games', 'Localization']
    },
    {
      title: 'TUBITAK 122E666',
      summary: 'Automatic change detection for remote sensing imagery using image analysis and machine learning methods.',
      tags: ['Research', 'Computer Vision', 'Python']
    },
    {
      title: 'NLP Chatbot',
      summary: 'University-focused FAQ chatbot built with NLP preprocessing and recurrent neural network techniques.',
      tags: ['NLP', 'Python', 'LSTM']
    },
    {
      title: 'VolerGift Commerce Site',
      summary: 'Built and maintained an e-commerce presence connected to Nomination Italy Turkey workflows.',
      tags: ['Shopify', 'E-commerce', 'Product']
    }
  ]
},
contact: {
  eyebrow: 'Contact',
  title: 'Let’s build something practical',
  intro: 'I am available for AI/ML engineering, multilingual product workflows, and game-related automation projects.',
  email: 'muhalishen@gmail.com',
  github: 'https://github.com/shenmali',
  linkedin: 'https://www.linkedin.com/in/alimshen/',
  medium: 'https://medium.com/@malishen'
}
```

Update `src/pages/[...slug].astro` to render `ProjectsPage` and `ContactPage`.

- [ ] **Step 4: Run browser smoke tests and confirm all page routes pass**

Run: `npm run test:e2e`
Expected: PASS with green tests for home, about, projects, and contact

- [ ] **Step 5: Commit the projects and contact pages**

Run:

```bash
git add src/components/ContactLinks.astro src/components/pages/ProjectsPage.astro src/components/pages/ContactPage.astro src/content/site.ts src/pages/[...slug].astro tests/e2e/site.spec.ts
git commit -m "feat: add projects and contact pages"
```

## Task 7: Apply the Full Matrix Visual System and SEO Helper

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/MatrixBackdrop.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Add a failing test for metadata and localized page rendering**

Append to `tests/e2e/site.spec.ts`

```ts
test('localized Turkish route and metadata render correctly', async ({ page }) => {
  await page.goto('/tr/projects');

  await expect(page.getByRole('heading', { level: 1, name: 'Projeler' })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /projeler/i);
});
```

- [ ] **Step 2: Run the browser smoke tests and confirm the locale metadata test fails**

Run: `npm run test:e2e`
Expected: FAIL because the page title and description are still too thin and the localized route has not been polished

- [ ] **Step 3: Add the metadata helper and finish the Matrix styling**

`src/lib/seo.ts`

```ts
type SeoInput = {
  title: string;
  description: string;
};

export function buildSeo(input: SeoInput) {
  return {
    title: input.title,
    description: input.description,
    openGraphTitle: input.title,
    openGraphDescription: input.description
  };
}
```

Update `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import MatrixBackdrop from '../components/MatrixBackdrop.astro';
import { buildSeo } from '../lib/seo';

interface Props {
  title: string;
  description: string;
  locale: 'en' | 'tr' | 'nl';
}

const seo = buildSeo(Astro.props);
---

<!doctype html>
<html lang={Astro.props.locale}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta property="og:title" content={seo.openGraphTitle} />
    <meta property="og:description" content={seo.openGraphDescription} />
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    <MatrixBackdrop />
    <slot />
  </body>
</html>
```

Expand `src/styles/global.css` with the final design tokens and polish:

```css
.matrix-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.matrix-backdrop__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(57, 255, 136, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 255, 136, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at center, black, transparent 82%);
}

.matrix-backdrop__rain {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      180deg,
      rgba(57, 255, 136, 0.18) 0 2px,
      transparent 2px 26px
    );
  opacity: 0.18;
}

.hero-section {
  max-width: 60rem;
  padding: 7rem 0 3rem;
}

.hero-section h1,
.inner-hero h1 {
  margin: 0;
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  line-height: 1.02;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 1rem;
  border: 1px solid var(--line);
  text-decoration: none;
}

.button--primary {
  background: var(--accent);
  color: #041108;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}

@media (max-width: 720px) {
  .site-header {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .page-shell {
    padding: 2rem 1rem 4rem;
  }
}
```

Pass `locale={route.locale}` into `BaseLayout` from `src/pages/[...slug].astro`.

- [ ] **Step 4: Run browser smoke tests and confirm metadata and localized rendering pass**

Run: `npm run test:e2e`
Expected: PASS with the Turkish localized route test green

- [ ] **Step 5: Commit the finished Matrix presentation and SEO helper**

Run:

```bash
git add src/lib/seo.ts src/layouts/BaseLayout.astro src/components/MatrixBackdrop.astro src/styles/global.css src/pages/[...slug].astro tests/e2e/site.spec.ts
git commit -m "feat: finish matrix theme and SEO metadata"
```

## Task 8: Final Verification and Cloudflare Handoff

**Files:**
- Create: `README.md`
- Modify: `package.json`
- Test: `tests/e2e/site.spec.ts`

- [ ] **Step 1: Add a single verification script and run the full suite**

Update `package.json`

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "verify": "npm run test:unit && npm run build && npm run test:e2e"
  }
}
```

Run: `npm run verify`
Expected: PASS with unit tests, Astro build, and Playwright smoke all green

- [ ] **Step 2: Write the operator README with GitHub and Cloudflare setup**

`README.md`

```md
# mashen.dev

Static Astro portfolio for mashen.dev.

## Local development

- `npm install`
- `npm run dev`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run verify`

## Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

## GitHub flow

- Commit locally
- Push to `main`
- Cloudflare Pages deploys automatically
```

- [ ] **Step 3: Run the verification script again after the README and final script changes**

Run: `npm run verify`
Expected: PASS again with no regressions

- [ ] **Step 4: Document the final Cloudflare custom domain checks**

Run:

```bash
git status --short
```

Expected: Only `README.md` and `package.json` show staged or modified status for this task.

Add this final operator note to the implementation handoff:

```md
After the repository is pushed to GitHub and connected to Cloudflare Pages:

1. Confirm `mashen.dev` is attached as a custom domain.
2. Confirm HTTPS is active.
3. Open `/`, `/about`, `/projects`, `/contact`, `/tr`, and `/nl` in production.
```

- [ ] **Step 5: Commit the handoff and verification docs**

Run:

```bash
git add package.json README.md
git commit -m "chore: add verification and deployment handoff"
```

## Self-Review

### Spec Coverage

- Four pages: covered in Tasks 4, 5, and 6.
- Three languages: covered in Tasks 2, 3, and 7.
- Matrix visual identity: covered in Tasks 3 and 7.
- Real CV-derived content and Unico Studio framing: covered in Tasks 4, 5, and 6.
- Static Astro architecture and Cloudflare Pages delivery: covered in Tasks 1 and 8.
- SEO and accessibility baseline: covered in Task 7.

### Placeholder Scan

- No `TBD`, `TODO`, `lorem`, or deferred implementation markers are left in the plan.
- Every task lists explicit files, commands, and expected results.

### Type Consistency

- `Locale` is fixed to `en | tr | nl` and reused through content, routes, and layout props.
- `PageKey` is fixed to `home | about | projects | contact` and reused through routing and metadata.
- `siteContent` remains the single content source, expanded incrementally rather than split across incompatible shapes.
