# Public SaaS Template

A public Next.js SaaS launch template with auth, billing, SEO, blog, legal pages, local fallback content, and a path to hosted CMS-managed landing blocks and custom collections.

## Agent-First Workflow

This template is designed for founders who prompt AI agents instead of reading every file manually.

1. **Start with `/staff-task-agent`.**
   Give your AI agent this instruction:
   ```text
   Read AGENTS.md and staff-task-agent/README.md first.
   Then inspect staff-task-agent/task-map.md.
   After that, help me with this task:

   [PASTE TASK HERE]
   ```

2. **Use the task map.**
   `/staff-task-agent/task-map.md` tells the agent which files control branding, landing copy, auth, billing, blog, legal pages, CMS content, email, and dashboard work.

3. **Use the prompt library.**
   `/staff-task-agent/prompt-library.md` gives copy-paste prompts for rebranding, landing page changes, billing setup, Firebase setup, new pages, and public release checks.

4. **Keep agents focused.**
   Ask for one outcome at a time, for example:
   - **Rebrand this template for my SaaS**
   - **Customize the landing page for my offer**
   - **Set up Polar billing**
   - **Prepare this repo for a public GitHub release**

## What Is Available Now

- **Free public source code:** clone the template and customize it for your SaaS.
- **CMS-ready structure:** landing blocks and collections already support local fallback content.
- **Waitlist-driven CMS:** hosted CMS access is not the first build priority. The waitlist validates demand before the CMS is expanded.

## Quick Start

1. **Clone and install**
   ```bash
   git clone <your-public-template-repo-url>
   cd saas-template
   pnpm install
   ```

2. **Configure your brand**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `NEXT_PUBLIC_APP_NAME` - your app name
   - `NEXT_PUBLIC_SUPPORT_EMAIL` - your support email
   - `NEXT_PUBLIC_APP_URL` - your domain (or keep localhost for dev)
   - `NEXT_PUBLIC_GITHUB_REPO_URL` - your public template repository URL

3. **Customize landing page blocks**
   Edit `src/config/landing.ts` to change:
   - ordered landing blocks
   - hero headline and CTA copy
   - feature proof
   - pricing ladder
   - FAQ items
   - final CTA

4. **Run locally**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Deploy**
   - Push to GitHub
   - Connect to Vercel
   - Add env vars in Vercel dashboard
   - Deploy!

**Optional:** Add Firebase, Polar, Brevo, and hosted CMS credentials by filling their env vars. The app works from local fallback content when CMS is not configured.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- DaisyUI 5
- Lucide React

## What This Repo Is

This repository is a public, CMS-ready SaaS product template.

It currently provides:

- block-rendered landing page content
- local fallback content for Lite users
- Firebase auth and Firestore scaffolding
- Polar billing scaffolding
- Brevo transactional email scaffolding
- SEO metadata, sitemap, robots, and structured data
- blog, legal pages, dashboard shell, and generic CMS collection routes

It intentionally keeps these boundaries:

- the public template owns SaaS app foundation code
- the hosted CMS will own editable content and structured collections when launched
- customers still build product-specific app logic in code
- the CMS does not generate custom SaaS business logic

## Project Goals

Use this starter so a SaaS product can be launched by:

1. cloning the repo
2. updating config, branding, env values, and assets
3. joining the hosted CMS waitlist when editable content is needed
4. building only the unique product feature
5. shipping without rebuilding auth, billing, SEO, and content plumbing

## Product Strategy

- **Publish first:** the source code is the lead magnet.
- **Capture demand:** the landing page and README point CMS interest to the waitlist.
- **Build second:** deeper CMS work should wait until signups prove demand.
- **Keep reusable:** marketing copy lives in config, while components stay generic.

## Repository Principles

- Keep the starter generic.
- Move business-specific decisions into config.
- Keep provider integrations modular.
- Do not hard-code production secrets or IDs.
- Do not let one future product redefine the starter for all others.

## Current Structure

```text
src/
  app/
    (app)/
      dashboard/page.tsx
    (marketing)/
      page.tsx
      policy/page.tsx
      tos/page.tsx
      [collection]/page.tsx
      [collection]/[slug]/page.tsx
    globals.css
    layout.tsx
    manifest.ts
    not-found.tsx
    robots.ts
    sitemap.ts
  components/
    cms/
    layout/
    legal/
    marketing/
    ui/
  config/
    features.ts
    legal.ts
    navigation.ts
    site.ts
  lib/
    cms/
    env.ts
    metadata.ts
    structured-data.ts
public/
  icon.svg
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Environment Variables

The starter ships with placeholder env keys in `.env.example`.

These are placeholders only. The template now reads them through **`src/lib/env.ts`** so app identity defaults stay centralized.

Core app identity keys:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_GITHUB_REPO_URL`
- `GOOGLE_SITE_VERIFICATION`

Firebase keys (optional):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `FIREBASE_STORAGE_BUCKET`

Hosted CMS keys (optional):

- `NEXT_PUBLIC_CMS_PROJECT_ID`
- `CMS_API_URL`
- `CMS_API_KEY`

When CMS keys are missing or CMS data is invalid, the template renders local fallback content from `src/config/landing.ts` and `src/config/collections.ts`.

## Billing with Polar

The starter now includes Polar billing scaffolding with:

- server-side checkout route at `src/app/api/billing/checkout/route.ts`
- verified webhook route at `src/app/api/webhooks/polar/route.ts`
- config-driven plans in `src/config/pricing.ts`
- dashboard checkout UI in `src/components/billing/billing-plans.tsx`

What you configure in Polar dashboard:

1. Create product entries for your plans.
2. Copy product IDs into local env.
3. Create a webhook endpoint pointing to `/api/webhooks/polar`.
4. Copy the webhook signing secret into local env.

Required billing env keys:

- `POLAR_ACCESS_TOKEN`
- `POLAR_WEBHOOK_SECRET`
- `NEXT_PUBLIC_POLAR_PRODUCT_LITE_TEMPLATE`
- `NEXT_PUBLIC_POLAR_PRODUCT_HOSTED_CMS`
- `NEXT_PUBLIC_POLAR_PRODUCT_SELF_HOSTED_CMS`

## CMS-Ready Content Model

The landing page renders ordered blocks from `src/config/landing.ts`.

Each block has:

- `id`
- `type`
- `enabled`
- `content`

Supported landing block types:

- `hero`
- `featureGrid`
- `howItWorks`
- `pricing`
- `faq`
- `cta`

Generic collections live in `src/config/collections.ts` as local fallback content. Hosted CMS content can replace these collections through the CMS adapter without changing the page renderer.

Supported field types:

- `text`
- `richText`
- `image`
- `date`
- `boolean`
- `select`
- `relation`

## Transactional Email with Brevo

The starter includes a server-side Brevo integration for transactional emails with best-effort delivery:

- first-time signup welcome email
- waitlist opt-in confirmation email

Customization points:

- templates and copy in `src/config/email.ts`
- provider sender logic in `src/lib/email/brevo.ts`
- event-specific orchestration in `src/lib/email/transactional.ts`

Required Brevo env keys:

- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`

Optional Brevo env keys:

- `BREVO_REPLY_TO_EMAIL`

Behavior notes:

- email sending is best-effort and does not block auth or waitlist success
- signup welcome email is idempotent per user via `users/{uid}.emailLifecycle.welcomeEmailSentAt`
- Brevo keys stay server-side only

Checkout flow:

1. User signs in with Firebase.
2. Dashboard calls `/api/billing/checkout` with Firebase ID token.
3. API verifies token, creates Polar checkout, and returns `checkoutUrl`.
4. Client redirects to Polar hosted checkout.

Webhook flow:

1. Polar sends event to `/api/webhooks/polar`.
2. Signature is validated using `POLAR_WEBHOOK_SECRET`.
3. Subscription events update `users/{uid}.billing` in Firestore.

## Blog on Firestore

The marketing blog reads from Firestore (`posts` collection) using server-side rendering for SEO.

Required document fields:

- `slug` (string)
- `title` (string)
- `description` (string)
- `content` (string)
- `date` (ISO date string)
- `author` (string)
- `published` (boolean)

Optional fields:

- `image` (string)
- `tags` (string array)
- `draft` (boolean)

Visibility logic:

- post is public only when `published == true` and `draft != true`

Manual seeding workflow (for now):

1. Open Firestore console.
2. Create collection `posts`.
3. Create one document per blog post with the fields above.
4. Set `published` to `true` when ready to go live.

Environment notes:

- Use `GOOGLE_APPLICATION_CREDENTIALS` pointing to your downloaded Firebase service-account JSON.
- Keep the JSON key file outside this repository.
- Keep all service account credentials server-side only.

Quick clipboard helper for `.env` usage:

```bash
jq -c . /absolute/path/service-account.json | pbcopy
```

Paste into `FIREBASE_SERVICE_ACCOUNT_JSON='...'` and restart your dev server.

How to get the JSON key for `GOOGLE_APPLICATION_CREDENTIALS`:

1. Firebase Console → your project → Project Settings.
2. Open `Service accounts`.
3. Click `Generate new private key`.
4. Save the JSON file outside this repo and point `GOOGLE_APPLICATION_CREDENTIALS` to its absolute path.

Seed the starter post:

```bash
GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/service-account.json" node scripts/seed-hello-world-blog.mjs
```

## What To Customize First

1. `src/config/site.ts` for name, URL, support email, SEO keywords.
2. `src/config/landing.ts` for ordered landing blocks.
3. `src/config/pricing.ts` for plan labels and checkout mapping.
4. `src/config/collections.ts` for local fallback collections.
5. `src/config/legal.ts` for privacy policy and terms.
6. `src/config/navigation.ts` for header and footer links.
7. `src/config/blog.ts` for blog defaults.

## First 30 Minutes Setup

1. Copy env and fill app identity keys.
2. Run `pnpm install` then `pnpm dev`.
3. Verify metadata and social preview use your values.
4. Update landing blocks, pricing, collections, and legal config files.
5. If using hosted CMS, set CMS env keys and verify fallback behavior.
6. If using blog, seed first post with `scripts/seed-hello-world-blog.mjs`.
7. If using billing, connect Polar and set product IDs.
8. If using email, set Brevo keys and test waitlist/signup flow.

## Rules For Future Contributors

If you are adapting this starter for a real app:

- do not hard-code provider credentials in source
- do not reintroduce old product assets
- do not paste niche landing-page copy into shared starter files
- update both `README.md` and `AGENTS.md` when the starter architecture changes

If you are using AI tools on this repo, have them read `AGENTS.md` first.

## Verification Checklist

Before publishing this as a template release:

```bash
pnpm build
```

And run repository residue checks for personal emails, machine paths, old product names, and hard-coded placeholder domains.

## How to Update

This template is actively maintained. To pull the latest bug fixes and features into your project:

### Method 1: Manual Git Sync (Recommended)

1. **Add the template as a remote:**
   ```bash
   git remote add template https://github.com/P-Tung/nextjs-saas-starter.git
   ```

2. **Fetch and merge updates:**
   ```bash
   git fetch template
   git merge template/main --allow-unrelated-histories
   ```
   *Note: You may need to resolve conflicts in files you have heavily customized.*

### Method 2: Automated GitHub Action

We provide an example workflow in `.github/workflows/sync-template.yml.example`. 
1. Rename it to `sync-template.yml`.
2. Add a `SYNC_TOKEN` to your repository secrets.
   - **For Private Repos**: Use a Personal Access Token (PAT) with `repo` and `workflow` scopes.
3. The action will automatically create a Pull Request whenever the template is updated.

## Notes

- DaisyUI is intentionally kept.
- The template remains useful without CMS credentials.
- Hosted CMS is the recurring product path.
- Self-hosted CMS source code should be treated as a high-ticket package, not the default plan.
# nextjs-saas-starter
