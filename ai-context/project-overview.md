# Bslip

## Overview

bslip — You set the rules, it finds the games.

A web tool that scans your selected upcoming football fixtures using your personal filter. Builds your accumulator slip quickly. No predictions. No tips. Just your system, executed fast.

How it works: Pick competitions → Set rules → bslip finds qualifiers → Generate slip.

<br>
<br>

## Goals

1. Scan user-selected competitions only

2. Apply form filter (e.g., "hit in X of last N games") to both teams

3. Optional H2H filter as an extra condition (credit-gated — requires authentication and credits)

4. Support bet builder mode (multiple selections per fixture — credit-gated, requires authentication)

5. Allow users to unlock premium filters, markets, and features by spending credits (authentication required)

6. Return only fixtures that pass all rules

7. Show confidence indicators on each leg

8. Share slips via free public links with image previews

9. Track slip history and outcomes

10. Suggest "relax filters" when no fixtures qualify

<br>
<br>

## Core User Flow

1. Sign in — Magic link or Google (free, gets 5 credits)

2. Pick competitions — Select which leagues to scan (e.g., Premier League, UCL)

3. Set your rules — Choose market (e.g., BTTS), threshold (e.g., 4 of last 6 games), and optional H2H

4. Generate slip — bslip scans only your selected fixtures and returns qualifying matches

5. Review slip — See each leg with confidence indicators

6. Take action — Share (free), export, or regenerate

<br>
<br>

## Features

### Authentication

- Sign in via Magic Link or Google OAuth (Supabase Auth)
- Credit balance visible on dashboard after login

---

### Credits Model

- Each slip costs credits to generate
- New users get a free weekly allowance — resets every Monday
- Free allowance is used first, then paid credits
- If generation fails for any reason, credits are fully refunded automatically
- **Free slips per week: 2** — enough to explore without giving away the product
- **Credit pricing:** 1 slip = 1 credit. Credit packs TBD (e.g. 10 credits / 500 naira)

---

### Credits & Generation

- Refund triggers: API error, fixture data unavailable, or zero qualifying matches found — nothing else
- When credits hit zero: Generate button is disabled, user is shown a "Top up credits" prompt inline
- Default slip size: 4 legs

---

### Slip Builder — Step Flow

1. Pick 1–3 competitions (Phase 1 supports 3 active: Premier League, La Liga, Serie A. Attempting a 4th selection is blocked with a warning).
2. Choose slip size (2–8 legs, capped at 8 legs/matches max).
3. Set your strategy filter (market + frequency + scope).
4. **Preview match count before spending** — shows "Found X matches, need Y" (or matching warning alerts: low volume under 4, disable under 2) so users fix before they spend.
5. Choose market mode — single market or bet builder (AND logic, auth-gated).
6. Hit Generate — credits deducted only if generation succeeds.

---

### Strategy Filters

- **Leagues**: Select 1–3 active leagues (EPL, LaLiga, SerieA). Min 1, Max 3.
- **Markets**: BTTS, Over 1.5 Goals, Over 2.5 Goals, Under 2.5 Goals.
- **Frequency**: 3_of_last_5, 4_of_last_5, 4_of_last_6, 5_of_last_6.
- **Form Scope**: home, away, both.
- **Market Logic**: Single Market (one selection active) or Bet Builder (AND logic across multiple selections).
- **H2H history check**: Optional (credit-gated).

---

### Filter Preset Templates

- Pre-built filter packs — one click loads everything.
- Replaces current filters entirely (clean slate, not merged).
- Fully locks all manual controls when loaded. Only clearing the preset unlocks manual editing.
- Unavailable competitions are greyed out with a tooltip.
- **"Load last filters" button** — reloads competition, strategy, and market from your last successful generation.
  - If no previous generation exists, loads **Safe Acca** preset as default.

**Built-in presets:**

- **Safe Acca** — Over 1.5 Goals, Frequency: 4_of_last_5, Scope: both, Bet Builder: disabled.
- **Goals Fest** — Over 2.5 Goals, Frequency: 4_of_last_6, Scope: both, Bet Builder: disabled.
- **Value Finder** — BTTS, Frequency: 3_of_last_5, Scope: both, Bet Builder: disabled.
- **Clean Sheet Hunt** — Under 2.5 Goals, Frequency: 4_of_last_5, Scope: both, Bet Builder: disabled.
- **Bet Builder Starter** — BTTS + Over 2.5 Goals, Frequency: 4_of_last_5, Scope: both, Bet Builder: enabled (exactly 2 markets).


---

### Market Builder

- **Single market mode** — one selection per leg
- **Bet builder mode** — stack 2–5 markets on a single leg
- Compatibility checked via a pre-defined lookup table — no guessing what works together
  - e.g. BTTS + Over 1.5 ✅ / BTTS + Under 1.5 ❌
- Strict mode only at launch — same markets applied to every bet builder leg

---

### Slip Output

- Each leg shows: fixture, date, market selection, form stat, confidence level
- Confidence levels: **Strong** / **Moderate** / **Borderline**
  - Strong = market hit in 5 of last 6
  - Moderate = hit in 4 of last 6
  - Borderline = hit in 3 of last 6
- Bet builder legs show all stacked markets
- Footer shows total legs and overall confidence
- Actions per leg: Remove, Swap market, Regenerate
- Slips are preview-only until explicitly saved
- Export as plain text

---

### Slip Sharing

- Every slip gets a public link: `slipbuilder.app/s/abc123`
- Anyone can view it — no login needed
- Shows legs and selections live
- Includes "Build your own slip" CTA linking back to the app

---

### Slip History & Outcome Tracking

- Only saved slips appear in history
- Shows last 10 slips
- Summary bar at top: e.g. **3 won · 2 lost · 5 pending**
- User manually marks each leg won or lost

---

### "Relax Filters" Suggestion

- If no matches qualify, system suggests one concrete fix
- e.g. _"Only 2 matches found — try 3 of 6 instead of 4 of 6. Here's a preview."_
- Works together with the pre-generation preview so users fix before they spend

---

### Feedback System

- Thumbs up / down on slip output screen
- "Send feedback" link in footer on all screens
- Thumbs down triggers a one-question follow-up — "What went wrong?" -->(Filter results / Wrong markets / Confusing UI / Other)
- Post-generation performance prompt removed — replaced by a timed in-app prompt 24–48hrs after generation, triggered once all slip fixtures have passed

---

### Admin Panel

- Role-gated at `/admin`
- **User Management** — search users, view profile, adjust credits, view purchase + slip history, ban/soft-delete
- **Slip Explorer** — browse all slips, filter by competition/market/date, flag for review

**Admin Feedback System**

- View all feedback, filterable by rating and "has comment"
- Tag feedback by category (bug / filter issue / UI confusion)
- Mark as reviewed
- Volume indicator — feedback count per day so you spot spikes
- "View slip" button on each entry — links to the actual slip that triggered the feedback
- Internal note field per entry (admin-only) — e.g. "fixed in v1.2"

<br>
<br>

## Scope

### In Scope

- Web app only (desktop + mobile responsive)
- Magic Link and Google OAuth sign in with route protection
- Pay-per-slip credit model with free weekly allowance (2 slips/week)
- Slip generation using form-based filters (market + frequency)
- Single market mode and bet builder mode (strict compatibility only)
- 8 supported leagues, 1–3 selectable per slip
- Filter preset templates (Safe Acca, Goals Fest, Value Finder)
- Pre-generation match count preview before credits are spent
- Confidence indicators per leg (Strong / Moderate / Borderline)
- Public slip sharing via link — no login required to view
- Plain text slip export
- Manual slip history — last 10 saved slips with won/lost/pending summary
- "Relax filters" suggestion when zero matches qualify
- User feedback (thumbs up/down + follow-up on thumbs down)
- Admin panel — user management, slip explorer, feedback inbox
- H2H filter — available but credit-gated

---

### Out of Scope

- Billing/subscription system — pay-per-slip only, no recurring plans
- Loose mode for bet builder — strict compatibility matrix only at launch
- Real-time odds integration — form data only, no live odds
- Custom or user-defined markets — fixed market list only
- Auto outcome tracking — no automatic won/lost detection, manual only
- Paginated slip history — last 10 slips only, no infinite scroll
- Player markets — deferred until Phase 0 usage is validated
- Twitter/X Open Graph image preview — plain share link only at launch
- Slip image export — plain text export only

<br>
<br>

## Success Criteria

1. A user can sign in via Magic Link or Google and see their credit balance on dashboard.
2. A user can select competitions, set a filter, and get a match count preview before spending credits.
3. A user can generate a slip — credits are only deducted if generation succeeds.
4. A user can generate a slip using single market or bet builder mode with compatibility enforced.
5. A filter preset loads and fully replaces current filters in one click.
6. If no matches qualify, the system suggests a concrete filter adjustment before the user spends credits.
7. Each slip leg displays fixture, market, form stat, and a confidence level with a clear rule behind it.
8. A generated slip can be shared via public link — viewable without login.
9. Credits are automatically refunded on API error, fixture data failure, or zero qualifying matches.
10. When credits hit zero, the Generate button is disabled and a top-up prompt is shown inline.
11. A saved slip appears in history with won/lost/pending status manually updatable by the user.
12. A thumbs down triggers a one-question follow-up and both are stored against the slip.
13. An admin can view, tag, and mark feedback as reviewed from the admin panel.
14. A user on their first generation with no saved filters defaults to the Safe Acca preset.