# Template Release Checklist

## 1) Product positioning and copy

- [x] Confirm target buyer profile in `README.md` and landing copy
- [ ] Ensure all landing copy is config-driven in `src/config/landing.ts`
- [ ] Ensure legal content is final in `src/config/legal.ts`
- [x] Position public source code as the lead magnet
- [x] Position hosted CMS as a waitlist-driven premium product

## 2) Configuration and env

- [ ] Verify `.env.example` has placeholders only
- [ ] Verify all runtime keys are parsed in `src/lib/env.ts`
- [ ] Verify no secrets or production IDs are hard-coded in source
- [x] Add `NEXT_PUBLIC_GITHUB_REPO_URL` for public template CTAs

## 3) Integrations (optional but ready)

- [ ] Firebase auth and Firestore work when env keys are provided
- [ ] Polar checkout and webhook routes work with configured product IDs
- [ ] Brevo transactional emails send with server-side keys only

## 4) SEO and metadata

- [ ] Verify metadata is generated via `src/lib/metadata.ts`
- [ ] Verify `src/app/robots.ts` and `src/app/sitemap.ts` use correct URLs
- [ ] Run SEO audit and fix high-priority issues

## 5) Verification and cleanup

- [x] Run `pnpm lint`
- [x] Run `pnpm build`
- [x] Run personal residue checks
- [x] Run old product residue checks

## 6) Publish as template

- [ ] Create a new empty GitHub repository
- [ ] Set `NEXT_PUBLIC_GITHUB_REPO_URL` to the public repository URL
- [ ] Point local repo to new remote and push
- [ ] Enable "Template repository" in GitHub settings
- [ ] Create `v0.1.0-public-template` release tag
