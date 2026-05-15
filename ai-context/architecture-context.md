# Architecture Context

> bslip — last updated: project start

---

## Stack

The tools and services powering the app. Each one has a specific job — nothing overlaps.

| Layer | Technology | What it does in plain terms |
|---|---|---|
| Framework | `Next.js 15 + TypeScript` | Builds the app — handles both what the user sees and the logic running behind the scenes |
| UI | `Tailwind CSS v4 + shadcn/ui` | Styles the app and provides ready-made components (buttons, inputs, modals) |
| Auth | `Supabase Auth` | Handles sign in — magic link and Google. Manages who is logged in and who isn't |
| Database | `Supabase Postgres` | Stores everything — users, slips, credits, feedback |
| Access control | `Supabase RLS` | Rules baked into the database so users can only see and touch their own data |
| Football data | `API-Football` | The external API that provides fixtures, team form stats, and H2H history |
| Background jobs | `Next.js API routes` | Handles slip generation, credit changes, and refunds — runs server-side, no queue needed at MVP |
| Hosting | `Vercel` | Deploys and runs the app |

---

## Folder Structure

Each folder has one clear responsibility. Don't mix concerns — if it's UI it goes in `components`, if it's a server action it goes in `app/api`.

| Folder | What lives here |
|---|---|
| `app/api` | Server-side logic — generate slip, preview match count, handle credits. All require a valid session |
| `app/(auth)` | Sign-in and callback pages — nothing here needs a session |
| `app/(protected)` | Every page that needs a login — dashboard, slip builder, history, admin |
| `app/(public)` | Pages anyone can visit — homepage and the shared slip viewer (`/s/[id]`) |
| `lib` | Shared utilities — Supabase client, API-Football client, credit helpers, filter logic |
| `components` | All UI pieces — slip builder, output screen, preset loader, admin views |
| `types` | TypeScript types shared across the app — slip, leg, market, filter, credit transaction |

---

## Database Tables

One database. Everything in Supabase Postgres. No external file storage needed.

| Table | What it stores |
|---|---|
| `profiles` | One row per user — linked to their Supabase account, stores weekly allowance reset date |
| `slips` | Every generated slip — the filters used, legs as JSON, current status (pending/won/lost), share token |
| `legs` | Individual rows for each leg in a slip — fixture, market, form stat, confidence level, outcome |
| `credit_transactions` | A running log of every credit event — deductions, top-ups, refunds. Never deleted or edited |
| `feedback` | Thumbs up/down and follow-up answers — linked to a slip, plus admin tags and notes |

---

## Auth and Access

- Sign in is magic link or Google only — no passwords, ever.
- Sessions are handled server-side via Supabase cookies.
- Middleware checks for a valid session before letting anyone into a protected page.
- The database enforces that users can only read and write their own rows — even if someone bypasses the UI, the DB blocks them.
- The `/admin` route checks a `role` column in `profiles` — this check happens at the server level, not just in the UI.
- The public slip viewer (`/s/[id]`) only exposes the share token and slip data — no user information is readable.

---

## How Slip Generation Works

The order here matters. Credits are never touched until we know the slip can actually be built.

- User hits Generate → `POST /api/slips/generate` is called.
- Before spending any credits, a separate `GET /api/slips/preview` endpoint returns how many fixtures qualify — so the user can adjust filters first.
- Generation order: check session → check credit balance → fetch fixtures from API-Football → run filter → count qualifying matches → deduct credit → write slip to DB → return slip to user.
- If anything fails after the credit is deducted, a refund is logged immediately in the same request — the user never loses credits due to a system error.
- No background queue. Generation runs in a single server function — target under 10 seconds, hard limit 60 seconds.

---

## How Credits Work

- A user's credit balance is calculated by adding up all their rows in `credit_transactions` — there's no single "balance" number that gets edited. This means every change is traceable.
- 2 free slips per week. Resets every Monday at midnight UTC.
- The reset doesn't happen on a schedule — it's checked and applied the next time the user tries to generate. Simpler, same result.
- Free allowance is used first. Paid credits only kick in once it's gone.
- Refunds happen for exactly three reasons: API-Football error, no fixture data returned, zero qualifying matches after filtering. Nothing else triggers a refund.

---

## API-Football Rules

- The API key is only ever used server-side — the client never sees it.
- Calls are made fresh per generation — no caching at MVP. Add it if rate limits become a problem.
- If API-Football returns an error or no fixtures, generation stops and credits are refunded.

---

## Filter Presets

- Presets are hardcoded config objects in `lib/presets.ts` — they don't need a database row.
- Loading a preset wipes the current filters completely and replaces them. No blending.
- `Load last filters` pulls the filter config from the user's most recent saved slip. Falls back to Safe Acca if they haven't generated one yet.

---

## Rules That Cannot Be Broken

These are the non-negotiables. If an implementation step would violate one of these, stop and re-scope it first.

1. Credits are never edited directly. Every balance change is a new row in `credit_transactions`.
2. Credits are only deducted after qualifying matches are confirmed. Any failure after that point triggers an immediate refund in the same request.
3. API-Football is never called from the browser. All data fetching happens in API routes on the server.
4. Session checks happen in middleware AND inside every API route that mutates data. The UI guard alone is not enough.
5. Every database table has RLS policies. No table is open to the public except through tightly scoped server queries.
6. Bet builder market compatibility is enforced from a lookup table in `lib/markets.ts` — never guessed at runtime.
7. Slips are not saved to history until the user explicitly saves them. A generated but unsaved slip is never written to the database.
8. Data fetching and auth checks stay on the server. Client components are only used when the UI actually needs browser interactivity.