# Mattioli Lab website

The website for the **Mattioli Lab** at the University of Colorado Denver —
decoding alternative RNA isoforms in cancer.

It's built with [**Hugo**](https://gohugo.io) + [**HugoBlox**](https://hugoblox.com)
(an academic site framework) and styled with a custom Joan Miró–inspired design
(flat primary inks — red / gold / blue — drawn with a near-black outline on a warm
cream ground). Almost everything you'll want to change is **plain text**: Markdown
files for content and a few YAML/TOML files for settings.

---

## Table of contents

- [How publishing works](#how-publishing-works)
- [Editing content (the common stuff)](#editing-content)
  - [Home page](#home-page)
  - [People & headshots](#people--headshots)
  - [Publications](#publications)
  - [News](#news)
  - [Research](#research)
  - [Join Us / Contact](#join-us--contact)
  - [Navigation & footer](#navigation--footer)
- [Adding images the right way](#adding-images-the-right-way) ← **important**
- [Colors, fonts & design](#colors-fonts--design)
- [Previewing locally (optional)](#previewing-locally-optional)
- [Project structure](#project-structure)
- [Quick reference: conventions & gotchas](#quick-reference-conventions--gotchas)

---

## How publishing works

The live site is hosted on **GitHub Pages** and deploys **automatically**:

> **Edit a file → commit → push to the `main` branch → the site rebuilds and
> publishes in ~1–2 minutes.**

A GitHub Action (`.github/workflows/publish.yaml`) builds the site and deploys it
every time `main` changes. You don't run anything by hand. You can watch a deploy
under the repo's **Actions** tab.

You can edit files three ways, whichever you prefer:
- **On github.com** — open a file, click the ✏️ pencil, edit, and "Commit changes"
  (commit straight to `main`, or open a pull request).
- **On your computer** — edit in any text editor, then `git commit` and `git push`.
- **A mix** — edit locally, [preview](#previewing-locally-optional), then push.

---

## Editing content

All page content lives under **`content/`**. Each section below says which file to
open and what the fields do.

### Home page

**File:** `content/_index.md`

The home page is a stack of "blocks" listed under `sections:`. Each block has a
`block:` type and a `content:` section. Current order:

| Block | What it is | Key fields |
|---|---|---|
| `hero` | The big splice-art banner + lockup | `title`, `text` (the lede) |
| `feature` | "What we study" (with the Fig.1 diagram) | `title`, `subtitle` (kicker), `text`, `figure_label`, `caption`, `cta` |
| `feature` | "Where we're located" (campus photo) | `title`, `subtitle`, `image.filename`, `caption`, `text`, `design.flip` |
| `collection` | "Latest news" (pulls newest posts) | `count`, `archive.text` |
| `collection` | "Selected publications" (featured papers) | `count`, `filters.featured_only` |
| `cta` | The dark "We are recruiting!" call-to-action | `title`, `subtitle`, `text`, `cta`, `cta_alt` |

- **Kickers** are the small uppercase labels (the `subtitle:` field). Keep them
  short — e.g. `Welcome`, `Location`.
- Use `_italic_` and `**bold**` in any `text:` field. In the dark CTA, bold/italic
  automatically render in light colors so they stay legible.

### People & headshots

People are driven by "author" pages under `content/authors/`. The PI is
**`content/authors/admin/_index.md`**.

**To change a headshot:** drop an image named `avatar.jpg` (or `.png` / `.webp`)
into that person's folder, e.g. `content/authors/admin/avatar.webp`. It's matched by
the word *avatar* and auto-cropped to a square — no other change needed.

**Useful fields in an author file:**
- `title` — the displayed name (e.g. `Kaia Mattioli`).
- `degree` — appended after the name on the People page (e.g. `Ph.D.` →
  "Kaia Mattioli, Ph.D.").
- `linktitle` — how the name appears **in publication author lists** (e.g.
  `Mattioli K`, which renders **bold**).
- `role`, `organizations`, `social`, `email`.

**To add a lab member:**
1. Create `content/authors/<firstname-lastname>/_index.md` (copy `admin`'s file as
   a starting point).
2. Set `user_groups:` to `- Lab Members` (the People page already shows that group).
3. Add their `avatar.*` image in the same folder.

The People page itself (`content/people/index.md`) controls the page heading, the
intro line, the group order, and the closing CTA. When the "Lab Members" group is
empty it shows a friendly "This could be you!" placeholder.

### Publications

**Folder:** `content/publication/` — one sub-folder per paper, each with an
`index.md`.

**To add a paper,** create `content/publication/<short-slug>/index.md`:

```yaml
---
title: "Your paper title"
authors:
  - admin            # <- use "admin" for Kaia; it renders bold as "Mattioli K"
  - Smith J
  - Doe A
date: "2025-06-01T00:00:00Z"
publication_types: ["article-journal"]
publication: "*Journal Name*"     # wrap in *...* so the journal is italicized
featured: true                    # true = also show on the home page
url_source: "https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/"   # the "Read →" / title link
---
```

- Papers are sorted **newest first** by `date`.
- `featured: true` surfaces a paper in the home "Selected publications" list.
- On the Publications page, the **title and the "Read →" link** both point to
  `url_source` (PubMed or DOI). If you omit `url_source`, there's simply no link.
- Listing Kaia as `admin` (not `Mattioli K`) is what makes her name bold and linked.

> Tip: you can also bulk-import from a `.bib` file with the
> [Academic File Converter](https://github.com/GetRD/academic-file-converter)
> (`academic import --bibtex file.bib`), then tweak the generated files.

### News

**Folder:** `content/post/` — one sub-folder per item, each with an `index.md`.
The newest **4** appear on the home page; all of them appear on the News page.

**To add a news item,** create `content/post/<date-slug>/index.md`:

```yaml
---
title: The Mattioli Lab welcomes its first grad student
display_title: The Mattioli Lab welcomes its first grad student   # optional, see below
date: 2026-03-01
tags:
  - Lab        # Lab = red chip · Paper = blue chip · Talk = gold chip
summary: A one-line summary.
---

The full text of the news item goes here.
```

- The first `tag` sets the colored chip on the News page (`Lab`, `Paper`, or `Talk`).
- **Italicizing journal names:** add a `display_title` with markdown, e.g.
  `display_title: Invited review out in *Trends in Genetics*`. The headline renders
  the italics while the plain `title` (used for page titles/SEO) stays clean.
- News rows are intentionally **not clickable** (they're announcements, not links).

### Research

**File:** `content/research/index.md`

- The opening `feature` block holds the page intro (`subtitle:` kicker uses a colon,
  e.g. `Research: Splicing · Gene regulation · Cancer`).
- The `themes` block lists the three research themes. Each item has:
  `number`, `accent` (`red` / `gold` / `blue`), `fig` (`grn` / `drug` / `tech` —
  the little SVG illustration), `title`, `text`, and `techniques` (rendered as
  "Techniques: …").

### Join Us / Contact

**File:** `content/contact/index.md`

- `openings` block — the "Get in touch" intro plus the **Current openings** card.
  Set `hiring: true/false` to toggle the "Now hiring" badge, and edit the
  `opening:` text for the current position.
- "Who we're recruiting" — three accent-colored cards (raw HTML in a `markdown`
  block). Edit the text inside each `<div class="ml-role …">`.
- "Where to find us" — the campus photo, the embedded map, and the address.
  - **Map:** it's a Google Maps embed. Change the location by editing the `q=` part
    of the `<iframe src="…">`, and the zoom with `z=` (lower = more zoomed out).
  - **Address:** edit the text inside `<address class="ml-find__addr">`.

### Navigation & footer

- **Top nav links:** `config/_default/menus.yaml` (order set by `weight`). The
  "Join us" button is added automatically.
- **Footer:** `layouts/partials/site_footer.html` (columns, links, the Miró credit).
- **Site title / description / SEO:** `config/_default/hugo.yaml` and
  `config/_default/params.yaml`.

---

## Adding images the right way

The site is served from a **sub-path** (`…github.io/mattioli-lab-website/`), so a
hard-coded path like `/img/photo.jpg` will **break** (it points above the site).
Use one of these two safe patterns:

1. **Best for block images & headshots — put it in `assets/media/`** and reference
   it by filename. Hugo rewrites the URL correctly. Examples:
   - Home photo: `image: { filename: denver-campus.jpg }` in a `feature` block.
   - Headshot: `content/authors/<name>/avatar.webp`.

2. **For images you reference in Markdown HTML — put it in `static/img/`** and link
   it **relatively** as `../img/your-file.jpg` (note the `../`, not `/img/…`).
   This is how the campus photo and the divider graphics work.

If a new image shows up locally but is missing on the live site, it's almost always
a `/img/…` path that should be `../img/…` (in Markdown) or moved into
`assets/media/` (for blocks).

---

## Colors, fonts & design

- **Colors:** `data/themes/mattioli.toml` (the HugoBlox color scheme) and the CSS
  variables at the top of `assets/scss/template.scss` (`--ml-red`, `--ml-gold`,
  `--ml-blue`, `--ml-cream`, etc.).
- **Fonts:** `data/fonts/mattioli.toml` — Archivo (display/UI) + IBM Plex Mono
  (the uppercase "lab caption" labels).
- **All custom styling** lives in `assets/scss/template.scss`. The Miró flourishes
  (splice strands, scattered marks, protein blobs, the animated hero) are in
  `layouts/partials/` and `static/js/hero-miro.js`.

You usually won't need to touch these for routine content updates.

---

## Previewing locally (optional)

You only need this if you want to see changes before pushing. Requires
**Hugo (extended)** and **Go** (Go is needed because the theme is a Hugo Module).

```bash
# one-time install (macOS, with Homebrew)
brew install hugo go

# from the project folder, start a live-reloading preview
hugo server
```

Then open <http://localhost:1313>. The preview rebuilds automatically as you save.
Press `Ctrl+C` to stop. (You do **not** need to run `hugo` to publish — pushing to
`main` does that for you.)

---

## Project structure

```
content/                     ← ALL page content (Markdown)
  _index.md                  ← home page (page-builder blocks)
  authors/admin/             ← Kaia's bio + avatar (the PI)
  publication/<slug>/        ← one folder per paper
  post/<slug>/               ← one folder per news item
  research/ people/ contact/ ← the interior pages
config/_default/             ← site settings (title, menus, params, theme/font pick)
data/themes/mattioli.toml    ← color scheme
data/fonts/mattioli.toml     ← fonts
assets/
  scss/template.scss         ← all custom styling + design tokens
  media/                     ← images referenced by blocks (Hugo resources)
static/img/                  ← images referenced from Markdown via ../img/…
layouts/partials/            ← custom blocks, views, figures, navbar, footer
static/js/hero-miro.js       ← the animated hero artwork
.github/workflows/           ← the auto-deploy action
```

---

## Quick reference: conventions & gotchas

- **Publish** = push to `main`. That's it.
- **Bold lab author** in citations = list Kaia as `admin` in the paper's `authors`.
- **Featured paper on home** = `featured: true`.
- **"Read →" / clickable title** on a paper = set `url_source`.
- **News chip color** = the first `tag` (`Lab`/`Paper`/`Talk`).
- **Italic journal in a news headline** = use `display_title` with `*…*`.
- **New headshot** = drop `avatar.*` in the author's folder.
- **Images:** never `/img/…`. Use `assets/media/` (blocks) or `../img/…` (Markdown).
- **Kickers** (small caps labels) come from the `subtitle:` field.

---

*Built with [HugoBlox](https://hugoblox.com) · design inspired by
[Joan Miró](https://en.wikipedia.org/wiki/Joan_Mir%C3%B3).*
