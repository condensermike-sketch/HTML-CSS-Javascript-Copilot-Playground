# AGENTS.md

Guidance for AI coding agents working in this repository (ChatGPT / OpenAI Codex, GitHub
Copilot, Cursor — anything that reads `AGENTS.md`). Claude Code reads `CLAUDE.md` instead;
the two files describe the same project, so **if you change project facts here, mirror the
change in `CLAUDE.md`** (and vice versa).

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

There is no build step, no bundler, no package manager, and no test suite. Every page uses
plain `<script src>` tags. "Running" the project means serving the static files.

## Directory map (`apps/`)

```
apps/
  index.html          Home page (root of the prototype)
  css/styles.css       Single shared stylesheet for every page
  js/app.js            State/helper module -> window.JolliState
  js/menu-data.js      Static menu data -> window.JOLLIBEE_MENU
  menu/index.html       Menu browse + category scroll-spy
  item/index.html       Item detail / customize entry / add to cart
  customize/index.html  Single customization group picker (+ nested sheet for Fountain Drink)
  cart/index.html       Cart, order summary, place order
  favorites/index.html  Favorited items (grid/list toggle)
  order-again/index.html  Past orders (seeded + session-completed), reorder
  rewards/index.html    Points + reward redemption (static content)
  account/index.html    Account menu (mostly static links)
  README.txt            Human-facing feature notes for the prototype
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

## Layout architecture — read this before touching layout/CSS

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
  Side/Drink/Gravy option lists), `nestedGroups` (Fountain Drink's sub-choices), `items` (the
  orderable products), `upsells`, `seededOrders`.

## Running / previewing locally

**Default: use Docker on port 8080** (user preference as of 2026-08-12). Check
`docker compose ps` — the `web` service is usually already up; start it with
`docker compose up -d` if not. The app is at `http://localhost:8080/` (**not** `/apps/` —
the container's web root *is* `apps/`; see the Docker section below). `./apps` is
bind-mounted, so edits are live without a rebuild or restart.

The rest of this section is the fallback for when Docker isn't available.

Static site, so any static file server works. Serve from the repo root, which puts the app
under `/apps/`:

```bash
python3 -m http.server 8080
```

then open `http://localhost:8080/apps/index.html`. On Windows the command is `python -m
http.server 8080` (`python3` there is a Microsoft Store stub, not the interpreter) — some
teammates are on Windows, so don't assume `python3` when giving instructions.

Don't use `file://` to open pages directly; the relative `../css/styles.css` and
`../js/app.js` references and the multi-page navigation assume an HTTP server.

**Testing state-dependent behavior:** because of the Maze test mode above, use in-app links
to move between pages when cart/favorites contents matter. Typing a URL into the address bar
or hitting refresh counts as a reload and wipes participant state — that's intended
behavior, not a bug to fix.

**Browser cache gotcha:** `apps/css/styles.css` is aggressively disk-cached. After editing
CSS, a plain refresh can keep serving the stale stylesheet. Use a hard reload
(<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>) or cache-bust from
the devtools console before trusting what you see:

```js
document.querySelector('link[href*="styles.css"]').href = './css/styles.css?v=' + Date.now();
```

(mind the relative path — `../css/styles.css` from any page one level under `apps/`,
`./css/styles.css` from `apps/index.html` itself).

There are `Dockerfile`, `.dockerignore`, and `compose.yml` files at the repo root
(`nginx:alpine` serving `apps/` on port 8080). They work, but they are **not** the path this
team uses — don't suggest Docker as the way to run or preview the prototype. Note that the
container serves `apps/` as the web root, so URLs there lack the `/apps/` prefix used above.

## Deployment / tester-facing caching (GitHub Pages)

The URL given to Maze testers is **GitHub Pages**, built from the default branch
(`codespace-fluffy-space-orbit-q9p69rrwv5c4wxq`, root path `/`) — confirmed live at
`https://condensermike-sketch.github.io/HTML-CSS-Javascript-Copilot-Playground/apps/`.
This is a **separate deployment from the local preview setups above** — those are for
local dev only and have no bearing on what testers see.

GitHub Pages serves every file (HTML *and* JS/CSS) with a fixed `Cache-Control:
max-age=600` (10 minutes), at both the browser and the Fastly CDN edge. This can't be
tuned — GitHub Pages has no custom-headers mechanism (no `_headers` file like Netlify,
no nginx access) — but it also means staleness is capped at 10 minutes, unlike an
unconfigured local server, which sends no `Cache-Control` header at all and can fall
back to much more aggressive/unbounded browser heuristic caching. Bumping a `?v=` query
string on a `<script>` tag doesn't help if the *HTML document itself* is served stale —
the browser never re-fetches the page to see the new value.

Practical guidance for pushing a content update meant for testers:
- **Wait ~10 minutes after merging/pushing** before starting new test sessions or
  sending invites, so the CDN edge cache naturally expires and picks up the new deploy.
  A first-time visitor to the URL is always fine regardless (nothing cached yet) — the
  risk window only applies to someone loading the link within 10 minutes of a push.
- **Or skip the wait entirely**: give Maze a URL with a version query string bumped on
  each deploy (e.g. `.../apps/index.html?v=20260814`) — a new query string is a "new"
  resource to every cache layer (browser + CDN), so it forces a fully fresh load with no
  waiting.
- Keep versioning `<script src>` tags for `menu-data.js`/`app.js` with a `?v=` query
  string whenever their content changes (established convention, matches
  `styles.css?v=2`) — this remains useful on top of the above for returning testers
  whose browser might hold something past the stated 10-minute window.

## Git / collaboration setup

- `origin` is `condensermike-sketch/HTML-CSS-Javascript-Copilot-Playground`, owned by a
  member of this team. Other collaborators have **WRITE** access to it; only the owner has
  admin (so repo settings and GitHub App installs are the owner's to do).
- That repo is itself a fork of another upstream repo (the original template author — not an
  active collaborator on this work). Ignore the upstream; PRs stay within `origin`.
- Workflow: branch → push to `origin` → open a PR against the default branch, reviewed by
  another teammate before merge. No fork is needed — everyone can push branches directly.
  This applies to the owner too: don't commit straight to the default branch just because
  permissions allow it.
- The repo's default branch is unusually named:
  `codespace-fluffy-space-orbit-q9p69rrwv5c4wxq` (a leftover Codespaces branch name) — there
  is no `main`/`master`. This is what PRs should target unless told otherwise.
- **Always show the diff and get explicit human confirmation before `git push` or opening a
  PR** — never do these silently.

## Working agreements for agents

- Prefer editing `apps/` files; leave the root Astravia boilerplate alone.
- `apps/css/styles.css` is shared by every page — a change there hits all 10 pages. Check the
  others before assuming a fix is local.
- There are no automated tests. "Verified" means you actually loaded the affected page(s) in
  a browser at a narrow (≈320–430px) width and at desktop width, and exercised the
  interaction — not that the code looks right.
- Keep changes scoped and reviewable; this is a design prototype for a usability study, so
  visual fidelity to the Figma reference matters more than architectural purity.
