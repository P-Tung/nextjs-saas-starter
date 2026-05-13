# Prompt Library

These prompts are written for founders who want an AI agent to work on the template without reading the codebase manually.

## First Prompt For Any Agent

```text
Read AGENTS.md and staff-task-agent/README.md first.
Then inspect staff-task-agent/task-map.md.
After that, help me with this task:

[PASTE TASK HERE]

Keep changes config-driven where possible.
Do not hard-code secrets.
Run the smallest relevant verification command.
Summarize changed files, how to verify, and what is not included.
```

## Rebrand The Template

```text
Read staff-task-agent/README.md and staff-task-agent/task-map.md.
Rebrand this template for my SaaS:

App name:
Domain:
Support email:
One-line description:
Target customer:
Main CTA:

Update config-driven brand, metadata, landing copy, and docs where needed.
Do not hard-code secrets.
```

## Customize Landing Page

```text
Read staff-task-agent/README.md and staff-task-agent/task-map.md.
Update the landing page for this offer:

Product:
Audience:
Pain point:
Promise:
Features:
Pricing:
FAQ:

Put marketing copy in src/config/landing.ts.
Keep components reusable.
Run lint and build.
```

## Add A New Page

```text
Read staff-task-agent/README.md and staff-task-agent/task-map.md.
Add a new page:

Route:
Purpose:
Sections:
CTA:

Use the existing App Router, layout, Section, Container, and UI patterns.
Add metadata.
Keep copy config-driven if it is marketing copy.
```

## Set Up Billing

```text
Read staff-task-agent/README.md and staff-task-agent/task-map.md.
Help me configure Polar billing.

Plans:
Product IDs:
Success behavior:

Update pricing config and env docs.
Do not hard-code live secrets.
Explain exactly which env vars I need in Vercel.
```

## Set Up Firebase Auth

```text
Read staff-task-agent/README.md and staff-task-agent/task-map.md.
Help me configure Firebase auth.

Provider:
Project ID:
Required auth methods:

Update docs and env examples only if needed.
Do not commit credentials.
Explain Firebase console steps clearly.
```

## Prepare For Public GitHub Release

```text
Read AGENTS.md and staff-task-agent/README.md.
Prepare this repo for a public GitHub template release.

Check:
- README clarity
- .env.example placeholders
- no secrets
- no personal paths
- no old product residue
- lint
- build

Fix issues you find.
Summarize final publish steps.
```
