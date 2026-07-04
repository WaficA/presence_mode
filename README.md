# AetherMind S.I.C LLC — Public Website

This repository contains the static public-facing website for **AetherMind S.I.C LLC**.

AetherMind is building **Fenrir**, a self-hosted, end-to-end encrypted messaging and
voice platform. Infrastructure is owned and operated by AetherMind — no third-party
cloud in the data path for the application itself. This site is where that build is
communicated publicly: what's live, what's designed, and what's next.

- Website: https://aethermind.qa
- Hosting: GitHub Pages (temporary — see note below)
- Type: Static (HTML + CSS + vanilla JS, no build step, no framework)

## Current hosting note

This site is currently served from GitHub Pages, not from AetherMind-owned
infrastructure. That's disclosed on the site itself (`under-construction.html`) rather
than glossed over — it's the same standard the rest of this build holds itself to.
Migrate this note and the interstitial copy once the site moves to self-hosted
infrastructure at the alpha milestone.

## Site structure

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page — company + product overview, current build phase |
| `fenrir.html` | Product page — what Fenrir does, live vs. designed capabilities |
| `security.html` | Cryptographic + infrastructure architecture, written to the same built-vs-designed standard |
| `roadmap.html` | Phase-by-phase build status as an expandable timeline |
| `about.html` | Company page |
| `contact.html` | General inquiries |
| `waitlist.html` | Orphaned — no longer linked from nav or CTAs. Kept in-repo, not deleted. Its form does not hit a real backend (`/api/waitlist` is a placeholder); do not relink it without fixing that first. |
| `under-construction.html` | Interstitial shown for any CTA that would otherwise imply live functionality that doesn't exist yet |

## Content discipline — read before editing copy

Every claim on this site is tagged, implicitly or explicitly, as either **live** (built
and verified) or **designed / upcoming** (architecture-locked, not yet running). This
is deliberate and it is the single most important thing about this repository:

- Never describe a designed-but-unbuilt feature in present tense as if it's running.
- Never state a specific capacity, user-cap, or performance number without a real
  engineering basis behind it — an invented number is worse than no number, because
  it's the first thing a technical reviewer disproves.
- Any standing disclosure (currently: third-party relay sees connection-metadata only,
  never content) stays in copy regardless of build status changes, until the specific
  condition that retires it is actually met.
- If a feature's build status is genuinely unclear, don't guess — leave it in the more
  conservative tier (designed, not live) until confirmed.

This mirrors the same "built vs. designed must never be blurred" rule that governs the
infrastructure documentation and investor materials for this project. The website is not
exempt from it just because it's marketing-facing — if anything it's held to it more
strictly, since it's the thing outside reviewers see first.

## Important — what not to commit

This repository is **only** for public-facing website content.

Do **not** commit:

- Internal infrastructure scripts
- Offline RPM repositories / ISO / QCOW2
- Credentials, secrets, or configuration files
- Avalon / AetherNode orchestration logic

All sovereign technology, build flows and research code must remain in **private
repositories or offline storage**.
