# AGENTS.md — Mizuki v9.0 Blog

## Commands

```bash
pnpm install          # preinstall hook enforces pnpm (10.22.0)
pnpm dev              # predev runs sync-content.js (needs ENABLE_CONTENT_SYNC=false in .env)
pnpm build            # prebuild → update-anime → astro build → pagefind → compress-fonts
pnpm check            # astro check (type validation)
pnpm type-check       # full TypeScript check
pnpm format           # prettier ./src
pnpm lint             # eslint ./src --fix
pnpm new-post         # scaffold a new blog post
pnpm preview          # preview production build locally
```

## Architecture

- **Framework**: Astro 6 + Svelte 5 + Tailwind CSS 4
- **Output**: static, trailing slashes always, base path `/`
- **Config**: `src/config.ts` — all site settings in one file (719 lines)
- **Content**: `src/content/posts/**/*.md` (Zod schema in `src/content.config.ts`)
- **Data files**: `src/data/` (TypeScript: devices, friends, projects, skills, timeline, anime, diary)
- **Static assets**: `public/` served as-is; `src/assets/` processed by bundler
- **Pagefind**: search only works in production (`pnpm build`); unavailable in dev
- **Search in dev**: `Search.svelte` returns mock data when Pagefind is absent

## Gotchas

- **`.env` is required**: even empty, needed by `predev`/`prebuild` hooks. Must contain `ENABLE_CONTENT_SYNC=false` to suppress warnings.
- **Navbar icon WebP auto-detection**: if `navbarTitle.icon` ends with `.png`, the `<picture>` element tries `.webp` first. Both must exist in `public/assets/home/` — or set icon to `.webp` path directly.
- **Icon prefix**: Font Awesome 7 (`fa7-brands`), NOT `fa6-brands` (this is v9.0, not v8.3).
- **Font config**: `cjkFont.localFonts` defaults to `loli.ttf` in `public/assets/font/`.
- **`.nojekyll`**: must exist in `public/` to prevent GitHub Pages Jekyll processing.

## Deployment (GitHub Pages)

- Workflow: `.github/workflows/deploy.yml` — triggers on push to `main`
- Deploys `dist/` to `pages` branch via JamesIves/github-pages-deploy-action
- Pages Settings → Source: `pages` branch, root `/`
- **Do NOT hardcode `version` in pnpm/action-setup** — it reads from `packageManager` field (10.22.0)
- Node version in CI: `22` (not 20, deprecated)
- Custom domain: configured in `src/config.ts` → `siteURL`

## Content separation (optional, not in use)

- Controlled by `ENABLE_CONTENT_SYNC` in `.env` (disabled here)
- Would clone a separate content repo into `/content/` (gitignored)
- `CI.yml` and `lint.yml` target `master` branch — not used with this `main`-branch repo

## Dependencies

- `pnpm@10.22.0` enforced by `preinstall` hook (`only-allow pnpm`)
- `pnpm-lock.yaml` committed; `package-lock.json` / `yarn.lock` gitignored
- Dependabot: monthly npm updates, patch+minor only, no major

## Migration from v8.3 (old project: `D:\blog\Mizuki`)

### Golden rule

**Never** copy old config over new config wholesale. v9.0 has new fields and changed structures. Always use v9.0 as base and port only specific values.

### Safe to copy (same structure)

- `siteConfig`: title, subtitle, siteURL, siteStartDate, lang, themeColor.hue
- `navBarConfig`, `profileConfig`, `announcementConfig`, `pioConfig`
- `banner.src`, `fullscreenWallpaperConfig.src`
- `bilibili.vmid`, `anime.mode`
- `musicPlayerConfig.mode` and `musicPlayerConfig.id` (keep new fields `showFloatingPlayer`, `floatingEntryMode`)

### NEVER copy (structural conflicts — keep new)

- `toc` — v8.3 had `mode: "sidebar"`, v9.0 has three bools (`mobileTop`, `desktopSidebar`, `floating`)
- `sidebarLayoutConfig` — v9.0 adds `music-sidebar` and `card-toc` widget types
- `commentConfig` — v9.0 adds `system` (twikoo/giscus) and `giscus` block
- `data/projects.ts` — v9.0 has real projects (FolkPatch/FolkADB), v8.3 is template data

### Icon prefix trap

v8.3 uses `fa6-brands:*`, v9.0 uses `fa7-brands:*`. Every icon ref in navBarConfig and profileConfig must be updated when copying from old. Search for `fa6` after any migration.

### WebP auto-detection trap

Navbar component auto-generates `<picture>` with `.webp` source when icon ends with `.png`. If only `.png` exists → 404 on webp. Either:
- Provide both files (`.png` + `.webp`)
- Set icon path to `.webp` directly to skip fallback generation

### Static assets

- `public/` files: safe to copy wholesale (banners, favicons, images, pio models)
- `src/assets/` files (e.g. avatar): manual copy needed — `public/` copies don't touch `src/`
- Font config: v9.0 default `loli.ttf` (not `萝莉体 第二版.ttf` from v8.3)

### Content posts

Copy `.md` files only — skip files that already exist in new project. `guide/` subdirectory may contain images that need copying too. Filename encoding can garble Chinese characters in terminal; use PowerShell `-LiteralPath` or robocopy.

### Data files: file-by-file decision

| File | Action |
|------|--------|
| `anime.ts` | Identical between versions |
| `devices.ts` | Copy old (personal data) |
| `friends.ts` | Copy old + fix `http→https` |
| `diary.ts` | Keep new (has sort bug fix) |
| `skills.ts` | Keep new (cleaner) |
| `timeline.ts` | Keep new (type import better) |
| `projects.ts` | Keep new (real projects) |

### Post-migration checklist

- [ ] `fa6-brands` → `fa7-brands` in all icon refs
- [ ] All image paths resolve (banner, avatar, favicon)
- [ ] `.env` has `ENABLE_CONTENT_SYNC=false`
- [ ] CI deploy workflow: no hardcoded pnpm version, Node 22+
- [ ] `public/.nojekyll` exists
- [ ] Font config uses `loli.ttf` (new default)
