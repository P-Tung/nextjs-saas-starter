# Staff Task Agent

Use this folder as the **first stop for AI agents** working on this template.

The founder or developer should be able to prompt an agent without reading the codebase manually. The agent should read this folder, understand the repo shape, then make focused changes.

## Agent Start

1. Read `AGENTS.md`.
2. Read this file.
3. Read `task-map.md`.
4. Read `prompt-library.md` only when the user needs prompt examples.
5. Inspect the exact files listed for the requested task.
6. Make the smallest complete change.
7. Run the relevant verification command.
8. Summarize changed files and what is not included.

## What This Template Is

- **Next.js App Router SaaS starter**
- **React, TypeScript, Tailwind CSS, DaisyUI**
- **Marketing site, blog, legal pages, dashboard shell**
- **Optional Firebase auth and Firestore**
- **Optional Polar billing**
- **Optional Brevo transactional email**
- **Optional hosted CMS adapter with local fallback content**

## Main Rule

- **Marketing copy belongs in `src/config/` or `src/content/`.**
- **Reusable UI belongs in `src/components/`.**
- **Provider logic belongs in `src/lib/` or future `src/platform/`.**
- **Secrets belong in env vars only.**

## How To Answer The Founder

When a founder asks for a change:

1. Restate the task in 1 to 3 bullets.
2. Identify the files you will inspect.
3. Make the change.
4. Run checks.
5. Report:
   - **Changed files**
   - **What works now**
   - **How to verify**
   - **What is not included**

## Default Verification

Use the smallest check that proves the task:

- Docs only: no build required, but check links and paths.
- UI or route changes: `pnpm lint` and `pnpm build`.
- Env or provider changes: `pnpm build` and update `.env.example`.
- Firebase rules or scripts: inspect related docs and run the script only with safe local credentials.

## Common Founder Requests

- "Change the brand" means edit `src/config/site.ts`, `.env.example`, and public assets if needed.
- "Change the landing page" means edit `src/config/landing.ts` first.
- "Change pricing" means edit `src/config/pricing.ts` and related env product IDs.
- "Add auth" means inspect `src/contexts/auth-context.tsx`, `src/lib/firebase/`, and `src/app/(auth)/signin/page.tsx`.
- "Add billing" means inspect `src/config/pricing.ts`, `src/components/billing/`, and `src/app/api/billing/`.
- "Add a page" means use App Router under `src/app/` and reusable components under `src/components/`.

## Do Not Do

- Do not hard-code secrets.
- Do not paste marketing copy inside reusable components.
- Do not add class React components.
- Do not remove DaisyUI unless explicitly asked.
- Do not add a niche product workflow as the default app.
- Do not use the banned lucide sparkle icon.
