# SaaS Template — AGENTS.md

This file is the working contract for any AI agent or engineer modifying this repository.
Read it before changing code, copy, structure, or dependencies.

## Purpose

This repository has a dual mission that must be held simultaneously:

1. **It is the product.** The live marketing site (landing page, blog, legal pages) is used to sell and promote this SaaS template to developers and indie builders.
2. **It is the template.** The exact codebase that powers the marketing site is what buyers receive. The product demonstrates itself.

The stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- DaisyUI

## Dual Mission — The Core Principle

**This repo sells itself by being itself.**

The marketing site is not a separate site built to sell the template — it *is* the template running in production. Every landing page section, blog post, legal page, and dashboard shell serves two audiences at once:

- **Potential buyers** who visit the live site to evaluate the template.
- **Template users** who clone the repo and see how each piece is built.

This means every design decision, code pattern, and piece of copy must work for both audiences. Avoid leaking product-specific logic that would confuse a template user who clones the repo; equally, avoid leaving the site so empty that it fails to convert visitors.

## Separation of Concerns

There are two kinds of content in this repo:

- **Infrastructure content** — code structure, config patterns, platform scaffolding. This must stay generic and reusable. Template users should be able to replace it with their own brand.
- **Marketing content** — landing page copy, blog posts, feature descriptions that promote the template itself. This is intentionally about the template product. It lives in `src/config/` or `src/content/`, not scattered across components.

The rule: **marketing copy goes in config/content, infrastructure stays generic in components and lib.**

## Config-Driven Architecture

The template follows a strict config-driven pattern:

- **`src/config/site.ts`** — app name, domain, support email, social links, company info
- **`src/config/landing.ts`** — all landing page content (hero, features, how it works, testimonials, FAQ, CTA)
- **`src/config/pricing.ts`** — pricing tiers and product IDs
- **`src/config/legal.ts`** — privacy policy and terms of service content
- **`src/config/navigation.ts`** — header and footer navigation links
- **`src/config/blog.ts`** — blog configuration

Components in `src/components/` are **dumb presentational components** that receive all copy from config. They contain zero hard-coded marketing copy.

When adding new landing sections or modifying existing ones, always:
1. Add the content to the appropriate config file
2. Update the component to read from config
3. Never hard-code copy directly in JSX

## What This Repo Should Become

- centralized `siteConfig` driving metadata, SEO, and branding
- reusable auth scaffolding (Firebase Auth or swappable)
- reusable billing scaffolding (Polar or swappable)
- config-backed SEO metadata, sitemap, and robots
- config-backed legal pages (Privacy Policy, Terms of Service)
- reusable landing-page section components populated from config
- blog system that works for both promoting the template and as a starter blog feature
- dashboard shell demonstrating app route structure
- full documentation so buyers know what to change first

## Who the Audience Is

The template's target buyers are:

- indie hackers and solo founders who want to launch fast
- developers who don't want to rebuild auth, billing, SEO, and legal from scratch
- builders who want a production-quality Next.js codebase, not a toy demo

Marketing copy, blog posts, and landing page sections should speak to them directly.

## Current Codebase Shape

Current source files:

- `src/app/layout.tsx`
- `src/app/(marketing)/page.tsx`
- `src/app/(marketing)/policy/page.tsx`
- `src/app/(marketing)/tos/page.tsx`
- `src/app/(app)/dashboard/page.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/`
- `src/config/`
- `src/lib/`

Current state:

- generic homepage shell with reusable sections
- waitlist email collection in hero and CTA sections with Firestore storage
- placeholder legal pages
- starter dashboard shell under route groups
- DaisyUI-based styling
- no auth, billing, or AI implementation

## Non-Negotiable Rules

1. Do not hard-code any real product name, domain, support email, pricing, Firebase project ID, Polar product ID, API key, webhook secret, or analytics ID in source.
2. Do not add product-specific copy directly into shared primitives if it could belong in config or content modules.
3. Do not reintroduce code from the previous image-resizer project.
4. Keep secrets server-side only.
5. Prefer generic names in starter code: `siteConfig`, `pricingPlans`, `authProvider`, `billingProvider`, `featureFlags`.
6. Keep DaisyUI as the default component layer unless explicitly changed by the project owner.
7. Use functional React components and hooks only.
8. Keep the starter publishable: avoid local-only assumptions, personal paths, or machine-specific setup in docs or code.

## Architecture Guidance

When extending this starter, prefer this direction:

- `src/config/`
  - site metadata
  - branding
  - pricing
  - feature flags
  - legal content inputs
- `src/lib/`
  - environment parsing
  - shared utility functions
- `src/platform/`
  - auth
  - billing
  - analytics
  - storage
- `src/components/`
  - generic UI sections
  - reusable layout pieces

Do not scatter brand or provider logic across unrelated components.

## Copywriting Rules

Two tiers of copy exist in this repo:

**Marketing copy** (lives in `src/config/` or `src/content/`) — this is intentionally promotional and speaks directly to developers and indie builders evaluating the template. It can make concrete value claims about what the template provides.

**Infrastructure copy** (lives in components and lib) — this must remain generic and swappable so template buyers can replace it with their own brand.

Marketing copy in config is allowed to say:

- "Ship your SaaS in days, not months"
- "Everything you need to launch: auth, billing, SEO, legal"
- concrete feature claims about what the template includes

Infrastructure copy must avoid:

- niche product claims baked into component source
- hard-coded conversion copy inside shared primitives
- fake testimonials, metrics, or growth claims
- copy that only makes sense for one specific business

## Styling Rules

- Keep Tailwind + DaisyUI in place.
- Prefer DaisyUI classes and primitives where appropriate.
- Avoid overfitting visuals to one product niche.
- Use a clean, professional default look that can be rebranded later.
- Do not add decorative assets that imply a specific product category.

## Asset Rules

- Keep assets generic.
- No screenshots, demo images, or icons tied to an old product.
- If adding starter assets, they must be neutral and reusable.

## Documentation Rules

When changing the starter:

- update `README.md` if setup, structure, or intended usage changes
- update this `AGENTS.md` if agent constraints or architecture expectations change
- document any new required environment variables
- document any new platform module entrypoints

## Blog Seeding Workflow

When setting up starter blog content in Firestore, use:

- `scripts/seed-hello-world-blog.mjs`

Expected Firestore target:

- collection: `posts`
- document id: `hello-world`

Credential usage guidance:

- Prefer `GOOGLE_APPLICATION_CREDENTIALS` locally, pointing to a JSON key outside the repo.
- Never commit service-account JSON files, key contents, or project secrets to source control.

## Verification Expectations

After meaningful code changes, validate as appropriate:

- `pnpm build`
- check for unresolved imports
- check for old product strings with `rg`
- verify that new docs still describe the repo accurately

Useful residue check:

- Search the repo for old product names, hard-coded production domains, and legacy project strings before publishing.

## Good Changes

Examples of changes that fit this starter:

- adding landing page copy to `src/config/` that promotes the template
- writing blog posts about building SaaS products (promotes the template)
- adding generic auth scaffolding
- adding reusable billing adapters
- generating `robots` and `sitemap` from config
- real legal page content (Privacy Policy, Terms of Service) in `src/config/legal.ts`
- improving the demo dashboard to showcase more template features

## Bad Changes

Examples of changes that do not fit this starter:

- hard-coding marketing copy directly inside component JSX instead of config
- wiring a real Firebase project ID directly into code
- restoring a niche workflow (image resizer, etc.) as the default app
- embedding personal support emails or production domains in source
- adding screenshots or demo assets from previous products
- writing blog content unrelated to the template's target audience

## Synchronization Principles

To ensure customers can update their projects without losing their work:

1. **Protect User Config**: Never move user-specific configuration (branding, colors, credentials) out of `src/config/` or `.env`.
2. **Boilerplate Isolation**: Keep "plumbing" code (auth logic, billing adapters, CMS connectors) in `src/lib/` or `src/platform/` to minimize merge conflicts when these are updated in the template.
3. **Template Sync**: Use `.templatesyncignore` to mark files that the automated sync should ignore.

## Decision Standard

Ask two questions for any change:

1. **Does it make the template better as a product?** — would it convince a developer to buy this template?
2. **Does it keep the codebase reusable?** — can a buyer swap in their own brand without rewriting component internals?

If both answers are yes, the change is correct. If only (1) is yes, the copy/config belongs in `src/config/` not in component source. If neither is yes, the change probably does not belong here.
