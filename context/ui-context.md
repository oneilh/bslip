# Slip Builder — Design System Spec (v1.0)

---

## 🎨 Theme

**Default:** Light · **Supported:** Light + Dark

### Light Mode

| Token | Value |
|---|---|
| Background | `#F8F8F6` (cream) |
| Surface (cards, inputs) | `#FFFFFF` |
| Text primary | `#111110` |
| Text secondary | `#6B7280` |
| Border / divider | `#E5E7EB` |
| Accent | `#F97316` (coral orange) |
| Accent hover | `#EA6C0A` |

### Dark Mode

| Token | Value |
|---|---|
| Background | `#0F1011` |
| Surface | `#1A1B1E` |
| Text primary | `#F5F5F4` |
| Text secondary | `#9CA3AF` |
| Border / divider | `#2C2D30` |
| Accent | `#F97316` (same orange — consistent across themes) |
| Accent hover | `#FB923C` |

> **Light:** Cream background with white cards floating on top. The orange accent hits like a highlight marker — every CTA, selected market, and active state draws the eye immediately. Feels editorial and warm, not cold like most sports tools.
>
> **Dark:** Near-black background, dark slate cards, the orange glows like stadium floodlights at night. Think ESPN dark mode but with more personality.

---

## 🔤 Typography

| Role | Font | Usage |
|---|---|---|
| Display / Headings | `Bricolage Grotesque` | Page titles, slip totals, big pull-quote numbers |
| Body / UI text | `Geist` | All labels, descriptions, navigation, form text |
| Numbers / Odds / Stats | `Geist Mono` | Odds, scores, credit counts — column-aligned |

> **Mental picture:** A slip leg reads — *"Arsenal — Win"* in Geist, and the odds `3.20` sits beside it in Geist Mono, aligned like a trading terminal. The running total at the bottom of the slip displays large in Bricolage Grotesque — feels like a magazine cover pull-quote.

---

## 📦 Component Library

**shadcn/ui** — Tailwind-based, headless, fully customisable. Zero opinionated styles — you own every pixel.

| Component | Where it's used |
|---|---|
| `Card` | Match tiles, slip legs, market blocks |
| `Button` | Primary (accent fill), ghost, destructive |
| `Badge` | Market labels (`1X2`, `BTTS`, `Over 2.5`), status chips (`Live`, `Locked`) |
| `Sheet` | Slip builder panel — slides up on mobile, fixed on desktop |
| `Dialog` | Auth wall modal when user hits "Generate Slip" |
| `Tabs` | Switching between markets per match |
| `Switch` | Theme toggle |
| `Skeleton` | Loading states — never show a blank screen |
| `Tooltip` | Explain market names for new users |
| `DropdownMenu` | Filter, sort, odds format options |

---

## 🔣 Icon Library

**React Icons** — Lucide set (`Lu`) as primary, Phosphor (`Ph`) as fallback for sport-specific icons Lucide doesn't cover.

> **Rule:** Never mix more than 2 icon sets. Lucide handles all UI actions. Phosphor steps in only for sport-specific icons Lucide doesn't have.

| Use case | Icon |
|---|---|
| Remove slip leg | `LuX` / `LuTrash2` |
| Generate / action | `LuZap` |
| Auth wall / locked feature | `LuLock` |
| Copy slip | `LuCopy` |
| Settings | `LuSettings2` |
| Live match indicator | `LuRadio` |
| Credits / wallet | `LuCoins` |
| Football | `PhSoccerBall` |
| Basketball | `PhBasketball` |
| Sport switcher (general) | `PhTrophy` |

---

## 📐 Layout Patterns

### Mobile `< 640px`

- Single column, full-width
- `16px` horizontal padding throughout
- **Bottom nav bar** — 4 tabs: Home · Markets · My Slips · Account
- Slip builder opens as a **bottom sheet** — half-screen by default, expandable to full
- **Sticky CTA bar** — "Build Slip (3)" pinned just above the bottom nav, always visible when legs are added
- Match cards stack vertically, swipe horizontally to browse markets per match

> **Mental picture:** Think Revolut or Cash App. Bottom nav anchored. Matches scroll above it. Tap a market → added to slip, the sticky bar counter bumps up. Tap the bar → bottom sheet rises with your full selection.

---

### Tablet `640px – 1024px`

- **Two-column layout** — left: match list + market browser · right: sticky slip builder panel (`300px`)
- Top header — Logo · Sport filter pills · Theme toggle · Auth button
- Bottom nav replaced by top header navigation
- Slip panel is fixed — never scrolls away
- Match tiles switch from stacked to a slightly wider card, `2-up` grid where space allows

> **Mental picture:** Notion on iPad. You browse matches left, your growing slip lives pinned on the right. Nothing disappears. Feels like a proper tool, not a stretched phone screen.

---

### Desktop `> 1024px`

- **Three-zone layout:**
  1. **Left sidebar** (fixed `220px`) — Logo at top · Nav: Home, Sports, My Slips, History, Account · Theme toggle pinned at bottom
  2. **Main content area** (fluid, scrollable) — Match listings, market cards, sport/league filters
  3. **Right slip panel** (fixed `320px`) — Slip builder, always visible, sticky to viewport

- Max content width: `1440px`, centred
- Match cards displayed in a clean grid — odds shown with **subtle visual weight bars** behind the numbers (implied probability fill — a `1.30` favourite has a near-full bar, a `6.00` longshot has a thin one)
- Generous whitespace — nothing cramped, everything breathes

> **Mental picture:** Betfair's layout logic with Linear's design sensibility. Three clear zones. The visual odds bars are the differentiator — data becomes visual at a glance.

---

## 🌗 Theme Toggle

- **Desktop / Tablet:** `Switch` component in left sidebar (bottom) and top header
- **Mobile:** Inside the Account tab
- Persisted in `localStorage`, respects `prefers-color-scheme` on first visit

---

## 📏 Spacing & Radius Scale

- **Base unit:** `4px` — all spacing is multiples of this
- **Steps:** `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`
- **Border radius:** `10px` cards · `8px` buttons · `6px` inputs · `4px` badges

---

## UI Engineering Rules

- Use shadcn/ui as the base component system
- Install components only when needed
- Never modify generated components/ui/* files directly
- Extend components through wrappers/composition
- Reuse existing shared components before creating new ones
- Use cn() from lib/utils.ts for class merging
- Support both light and dark mode
- Avoid inline hardcoded colors
<!-- - Prefer Tailwind utility classes over custom CSS -->
- Keep components responsive by default
- Use semantic HTML where possible

---

## ✅ Final Decision Summary

| Decision | Choice |
|---|---|
| Default theme | Light |
| Theme support | Light + Dark |
| Light background | `#F8F8F6` (cream) |
| Dark background | `#0F1011` |
| Accent colour | `#F97316` (coral orange) |
| Display font | Bricolage Grotesque |
| Body font | Geist |
| Mono font | Geist Mono |
| Component library | shadcn/ui |
| Icon library | React Icons — Lucide (primary) + Phosphor (fallback) |
| Mobile nav | Bottom nav bar |
| Tablet layout | 2-column (match list + sticky slip panel) |
| Desktop layout | 3-zone (sidebar + content + slip panel) |


