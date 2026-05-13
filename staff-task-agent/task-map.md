# Task Map

Use this map to route founder prompts to the right files quickly.

## Brand And Metadata

- `src/config/site.ts`
  - App name
  - Domain
  - Support email
  - SEO keywords
  - Social links
- `src/lib/env.ts`
  - Env parsing and defaults
- `src/lib/metadata.ts`
  - Reusable metadata helper
- `src/app/layout.tsx`
  - Global metadata, providers, header, footer
- `src/app/manifest.ts`
  - Web app manifest
- `src/app/robots.ts`
  - Robots output
- `src/app/sitemap.ts`
  - Sitemap output

## Landing Page

- `src/app/(marketing)/page.tsx`
  - Landing page route
- `src/config/landing.ts`
  - **Primary file for landing content**
- `src/components/marketing/landing-block-renderer.tsx`
  - Block routing
- `src/components/marketing/hero-section.tsx`
  - Hero block UI
- `src/components/marketing/feature-grid-section.tsx`
  - Feature grid UI
- `src/components/marketing/how-it-works-section.tsx`
  - How it works UI
- `src/components/marketing/pricing-section.tsx`
  - Pricing preview UI
- `src/components/marketing/faq-section.tsx`
  - FAQ UI
- `src/components/marketing/cta-section.tsx`
  - Final CTA UI

## Pricing And Billing

- `src/config/pricing.ts`
  - Plan names, prices, feature bullets, Polar product ID mapping
- `src/components/billing/billing-plans.tsx`
  - Dashboard billing UI
- `src/lib/billing/polar.ts`
  - Polar checkout client
- `src/app/api/billing/checkout/route.ts`
  - Checkout API route
- `src/app/api/webhooks/polar/route.ts`
  - Polar webhook handler
- `.env.example`
  - Required billing keys

## Auth

- `src/app/(auth)/signin/page.tsx`
  - Sign-in and sign-up screen
- `src/contexts/auth-context.tsx`
  - Auth state provider
- `src/components/auth/auth-button.tsx`
  - Header auth action
- `src/lib/firebase/auth.ts`
  - Client auth helpers
- `src/lib/firebase/client.ts`
  - Firebase client initialization
- `src/lib/firebase/admin.ts`
  - Firebase Admin initialization
- `src/app/actions/auth.ts`
  - Server action after signup

## Blog

- `src/app/(marketing)/blog/page.tsx`
  - Blog index route
- `src/app/(marketing)/blog/[slug]/page.tsx`
  - Blog post route
- `src/config/blog.ts`
  - Blog defaults
- `src/lib/blog.ts`
  - Blog formatting helpers
- `src/lib/blog-posts.ts`
  - Firestore blog reads
- `src/components/blog/`
  - Blog card, list, markdown renderer
- `scripts/seed-hello-world-blog.mjs`
  - Starter Firestore seed script

## Legal Pages

- `src/config/legal.ts`
  - Privacy policy and terms content
- `src/app/(marketing)/policy/page.tsx`
  - Privacy route
- `src/app/(marketing)/tos/page.tsx`
  - Terms route
- `src/components/legal/legal-page.tsx`
  - Reusable legal page renderer

## CMS-Ready Content

- `src/config/collections.ts`
  - Local fallback collection content
- `src/lib/cms/client.ts`
  - Hosted CMS fetch helper
- `src/lib/cms/content.ts`
  - Local fallback and hosted CMS merge path
- `src/lib/cms/validation.ts`
  - CMS data validation
- `src/app/(marketing)/[collection]/page.tsx`
  - Collection index route
- `src/app/(marketing)/[collection]/[slug]/page.tsx`
  - Collection detail route
- `src/components/cms/collection-field.tsx`
  - Field renderer

## Layout And UI

- `src/components/layout/site-header.tsx`
  - Header
- `src/components/layout/site-footer.tsx`
  - Footer
- `src/components/layout/container.tsx`
  - Layout container
- `src/components/ui/`
  - Reusable UI primitives
- `src/app/globals.css`
  - Tailwind and DaisyUI theme

## Email

- `src/config/email.ts`
  - Email copy and template config
- `src/lib/email/brevo.ts`
  - Brevo provider call
- `src/lib/email/transactional.ts`
  - Signup and waitlist email orchestration
- `.env.example`
  - Required Brevo keys

## Waitlist

- `src/components/marketing/waitlist-form.tsx`
  - Waitlist UI
- `src/app/actions/waitlist.ts`
  - Waitlist server action
- `firestore.rules`
  - Firestore permissions

## Dashboard

- `src/app/(app)/dashboard/page.tsx`
  - Starter dashboard shell
- `src/app/(app)/billing/success/page.tsx`
  - Billing success page

## Public Assets

- `public/icon.svg`
- `public/icon.png`
- `public/og-image.png`

Replace these when changing brand identity.
