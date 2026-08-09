# CLAUDE.md

Guidance for Claude Code (or any future agent) working in this repository.

## What this repo actually is

The repo name (`HTML-CSS-Javascript-Copilot-Playground`) and its root-level files are
misleading. There are **two unrelated things** living here:

1. **`apps/` — the real project.** A multi-page HTML/CSS/JS mobile-app simulation of a
   Jollibee ordering flow ("Jollibee Maze Prototype"), built for a Maze usability test.
   This is what almost every task in this repo is actually about.
2. **Root-level `index.html`, `style.css`, `script.js`, and `chatgpt-code/astravia-chatgpt.html`**
   — leftover "Astravia - Space Travel Planning" boilerplate from however this Copilot
   playground repo was originally scaffolded. `script.js` is empty. **Unrelated to Jollibee.**
   Don't touch these unless the user explicitly asks about "Astravia" or the root demo page.

When a request is ambiguous about "the project," assume `apps/`.

## Directory map (`apps/`)

```
apps/
  index.html          Home page (root of the prototype)
  css/styles.css       Single shared stylesheet for every page
  js/app.js            State/helper module -> window.JolliState
  js/menu-data.js      Static menu data -> window.JOLLIBEE_MENU
  menu/index.html       Menu browse + category scroll-spy
  item/index.html       Item detail / customize entry / add to cart
  customize/index.html  Single customization group picker (+ nested sheet for Soda)
  cart/index.html       Cart, order summary, place order
  favorites/index.html  Favorited items (grid/list toggle)
  order-again/index.html  Past orders (seeded + session-completed), reorder
  rewards/index.html    Points + reward redemption (static content)
  account/index.html    Account menu (mostly static links)
files/
  jollibee_test_plan_and_readout.pdf   Maze test plan/readout
  team-3-journey-map.jpg
```

Every page follows the same DOM shape inside `<div class="app-shell">`:
`header region(s)` → `<main class="app-scroll ...">` (the ONLY scrolling element) →
`footer region` (`.bottom-nav` or `.bottom-action` or `.cart-bottom`) → overlays
(`.toast`, `.search-overlay`, `.upsell-wrap`, `.nested-sheet-wrap`, `.order-confirm-wrap`,
which are all `position:absolute` and don't participate in page flow). No page combines a
bottom-nav AND a sticky action bar simultaneously — each page has at most one footer type.

## Layout architecture (rewritten 2026-08-08 — read this before touching layout/CSS)

`.app-shell` is `display:flex; flex-direction:column; height:100dvh` and represents the
"phone screen." Header elements (`.top-red`, `.white-topbar`, `.menu-tabs`) and footer
elements (`.bottom-nav`, `.bottom-action`, `.cart-bottom`) are flex items sized with
`min-height` (not fixed `height`), so they grow if content wraps. The scrollable content
(`.app-scroll`, `.menu-list`, `.search-results`) is `flex:1 1 auto; min-height:0;
overflow-y:auto` and is the **only** element that scrolls — `html`/`body` are
`height:100dvh; overflow:hidden` and never scroll.

This replaced an older architecture that used `position:absolute` for everything, with the
scrollable middle's top/bottom offsets hardcoded per-page as CSS custom properties
(`--content-top`, `--content-bottom`) that had to be manually kept in sync with each
header/footer's fixed pixel `height`. That broke whenever a header wrapped to two lines
(long pickup-location text, long page titles) — content would clip or overlap. If you ever
see `--content-top`/`--content-bottom` reappear or a `height:` (vs `min-height:`) on a
header/footer rule, that's a regression back to the old fragile pattern.

**Gotcha if you touch `apps/menu/index.html` or its CSS:** the scroll-spy / tab-jump JS in
that page (`list.onscroll`, the tab `onclick` handler) computes positions with
`element.offsetTop`, which is relative to the nearest **positioned** ancestor. `.menu-list`
is deliberately kept `position:relative` (even though it's now a flex item) specifically so
it stays that positioned ancestor. Removing `position:relative` from `.menu-list` will
silently break the scroll math (offsets will include the header/tabs height and jump to the
wrong section) without throwing any error — verify by scrolling and by clicking a tab, not
just by eyeballing a static screenshot.

The `@media (min-width:560px)` block is a "desktop preview" mode that re-frames `.app-shell`
as a centered, rounded-corner card (matching the Figma reference proportions) instead of a
full-bleed mobile screen. It inherits the same flex-column behavior from the base rule.

## State model (`apps/js/app.js` → `window.JolliState`)

- `CONFIG = { testMode: true, clearOnReload: true }` at the top of `app.js`. This is a
  **Maze usability-test mode**, not a bug:
  - Ordinary link-to-link navigation between prototype pages preserves cart, favorites,
    item drafts, saved customizations, and completed orders (uses `sessionStorage`,
    prefixed `jolliMaze.`).
  - A **true browser reload** (`performance.getEntriesByType('navigation')[0].type ===
    'reload'`) wipes all participant state and, if on a nested page, redirects to `/apps/`.
  - Pre-seeded "Order Again" data (`menu.seededOrders`) always remains because it's static
    data in `menu-data.js`, not stored state.
  - To make this behave like a normal persistent app: set `testMode:false` in `app.js` —
    storage switches to `localStorage` and the reload-wipe logic is disabled.
- `window.JOLLIBEE_MENU` (`menu-data.js`) is static data: `categories`, `groups` (Chicken/
  Side/Drink/Gravy option lists), `nestedGroups` (Soda's sub-choices), `items` (the
  orderable products), `upsells`, `seededOrders`.

## Running / previewing locally

This is a static site (plain `<script src>` tags, no bundler, no build step) so any static
file server works. **Do not use the `preview_start` tool's own subprocess launcher in this
environment** — its subprocess sandbox blocks the `getcwd()` syscall entirely (confirmed:
even bare `python3 -c "import os,http.server"` fails inside it with
`PermissionError: [Errno 1] Operation not permitted` on `os.getcwd()`), so any
`.claude/launch.json` config that shells out to `python3 -m http.server` will fail there
no matter how it's invoked (direct, via `/bin/sh -c`, with `--directory`, etc.).

What works: start the server with the plain **Bash tool** instead (not `preview_start`),
then point the Browser pane at `http://localhost:<port>/...` via `navigate`:

```bash
cd "HTML-CSS-Javascript-Copilot-Playground" && python3 -m http.server 8080
```
(run with `run_in_background: true`), then `navigate` to
`http://localhost:8080/apps/index.html`.

**Browser cache gotcha:** the Browser pane aggressively disk-caches `styles.css`. After
editing CSS, a plain `navigate` reload — even with `force:true` — can keep serving the
stale stylesheet (confirmed via `document.styleSheets` inspection). Verify what's actually
loaded before trusting a screenshot; if stale, cache-bust by swapping the `<link>` href via
`javascript_tool`:
```js
document.querySelector('link[href*="styles.css"]').href = './css/styles.css?v=' + Date.now();
```
(mind the relative path — it's `../css/styles.css` from any page one level under `apps/`,
`./css/styles.css` from `apps/index.html` itself).

**Don't use the Browser pane's `navigate` action to move between prototype pages once
participant state matters** (e.g. testing cart contents across pages) — `navigate` can
register as a "reload" navigation type and trigger the Maze test-mode state wipe described
above. Instead, drive in-app navigation from within the page via `javascript_tool`
(`location.href = './menu/'`), which is a normal "navigate" type and preserves session
state, matching how a real user clicking a link behaves.

**Screenshot coordinate gotcha:** after `resize_window` to a narrow viewport, screenshots
can come back at 2x the CSS pixel dimensions (devicePixelRatio scaling — e.g. a 320×650
viewport produces a 640×1300 image). `computer` click coordinates are in viewport space, not
image-pixel space. Don't eyeball click coordinates off a screenshot without accounting for
this, or clicks land on the wrong element. Prefer `find`/`read_page` refs, or drive
interactions via `javascript_tool` (`element.click()`), over pixel-guessed `left_click`.

## Docker

`apps/` can also be served via Docker instead of `python3 -m http.server` — useful
outside this environment's sandboxed preview tooling. Three files at the repo root:

- **`Dockerfile`** — single-stage `nginx:alpine`, `COPY apps/ /usr/share/nginx/html/`,
  `EXPOSE 80`. No build step needed (same reason as above: plain `<script src>` tags,
  no bundler). nginx's default config already serves each directory's `index.html`
  (`/`, `/menu/`, `/cart/`, etc.) with no custom `nginx.conf` required.
- **`.dockerignore`** — allow-list style (`*` then `!apps/` / `!apps/**` then
  `**/.DS_Store` to re-exclude OS cruft), so the build context only ever contains
  `apps/` regardless of what else lands at the repo root later (root Astravia
  boilerplate, `.git`, `.claude`, docs, images, etc. are never in scope).
- **`compose.yml`** — single `web` service, `build: .`, maps host port **8080** to
  the container's port 80, and bind-mounts `./apps:/usr/share/nginx/html` so edits to
  `apps/` show up on browser refresh without a rebuild (a rebuild is still needed only
  if the `Dockerfile` itself changes, e.g. a different base image).

Because the container's web root *is* `apps/`, the app is served at
`http://localhost:8080/` (not `/apps/`) — different from the `python3 -m http.server`
workflow above, which serves from the repo root so the app is under `/apps/`.

Usage:
```bash
docker compose up --build
```
then browse to `http://localhost:8080/`. Stop with `docker compose down`.

Kept intentionally minimal per user request: no multi-stage build, no custom nginx
config, no `.env`/volume mounts.

## Git / collaboration setup

- `origin` is not the user's own repo — the user has collaborator **WRITE** access to it,
  not ownership/admin.
- That repo is itself a fork of another upstream repo (likely just the original template
  author — not an active collaborator on this work).
- **The repo owner is the person the user is actually collaborating with.** Workflow:
  branch → push to `origin` → open a PR from that branch against the owner's default
  branch, for review before merge. No separate fork needed since write access already
  exists on `origin` directly.
- The repo's default branch is unusually named: `codespace-fluffy-space-orbit-q9p69rrwv5c4wxq`
  (a leftover Codespaces branch name) — there is no `main`/`master`. This is what PRs should
  target unless the user says otherwise. It was also the only remote branch as of this
  session (`git ls-remote --heads origin`).
- Per standing safety rules: always show the diff and get explicit confirmation before
  `git push` or `gh pr create` — never do these silently.

## Session history (2026-08-08)

- Full responsive/layout rewrite of `apps/css/styles.css` per user request: eliminate fixed
  pixel heights for header/content/footer regions, use `100dvh`, ensure only the content
  area scrolls, verified from 320px width up and with long real content (see Layout
  architecture section above). Changes are currently **uncommitted** on the default branch
  — not yet pushed or opened as a PR (pending user go-ahead).
- Added Docker support: `Dockerfile`, `.dockerignore` (allow-list style), and
  `compose.yml` at the repo root, serving `apps/` via `nginx:alpine` on host port 8080.
  See Docker section above. Not yet built/verified in this environment (user interrupted
  the `docker compose up --build` verification step) — not yet committed.
