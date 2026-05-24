# Slip Builder — Design System Spec (v2.0)

## 🎨 Theme

**Default:** Light · **Supported:** Light + Dark

### Light Mode

| Token                | Value          |
| -------------------- | -------------- |
| Background           | `#F1F5F9`      |
| Background Secondary | `#E2E8F0`      |
| Surface              | `#FFFFFF`      |
| Glass Surface        | `bg-card/95 backdrop-blur-xl` |
| Surface Elevated     | `#FFFFFF`      |
| Surface Hover        | `hover:bg-muted/60` |
| Text Primary         | `#0F172A`      |
| Text Secondary       | `#64748B`      |
| Border / Divider     | `#CBD5E1`      |
| Accent               | `#F97316`      |
| Accent Hover         | `#EA6C0A`      |
| Accent Light         | `#FFEDD5`      |
| Success              | `#10B981`      |
| Warning              | `#F59E0B`      |
| Danger               | `#DC2626`      |

---

### Dark Mode

| Token                | Value          |
| -------------------- | -------------- |
| Background           | `#020617`      |
| Background Secondary | `#1E293B`      |
| Surface              | `#0F172A`      |
| Glass Surface        | `bg-card/90 backdrop-blur-xl` |
| Surface Elevated     | `#0F172A`      |
| Surface Hover        | `hover:bg-muted/60` |
| Text Primary         | `#F8FAFC`      |
| Text Secondary       | `#94A3B8`      |
| Border / Divider     | `#334155`      |
| Accent               | `#F97316`      |
| Accent Hover         | `#FB923C`      |
| Accent Light         | `#FFEDD5`      |
| Success              | `#10B981`      |
| Warning              | `#F59E0B`      |
| Danger               | `#EF4444`      |

---

## 🔤 Typography

| Role               | Font             |
| ------------------ | ---------------- |
| Display / Headings | `Sora`           |
| Body / UI text     | `Inter`          |
| Numbers / Stats    | `JetBrains Mono` |

---

## 🎨 Spacing & Radius Scale

- Base unit: `4px`
- Scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`

### Border Radius

- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Inputs: `rounded-lg` (8px)
- Badges: `rounded` / `rounded-full`
- CTA Buttons: `rounded-xl` (12px)

---

## 🎯 UI Engineering Rules

- Use shadcn/ui as base system
- Extend via composition (do not edit core files)
- Reuse shared components before creating new ones
- Use `cn()` for class merging
- Support light and dark mode
- Avoid hardcoded colors — use `bg-primary`, `text-primary`, etc.
- Prefer semantic HTML
- Components must be responsive by default
- Prefer Tailwind utilities over custom CSS
- Use `gap-*` instead of margins where possible
- Avoid deep flex nesting
- **Borders:** Use `border-border/30` (subtle) or no border with bg-tint grouping
- **Shadows:** Avoid `shadow-sm` on cards; use `shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]` only on the main workspace
- **Selection indicators:** Use `ring-1 ring-primary/50 bg-primary/5` — never `shadow-[0_0_0_1px_...]`
- **Press feedback:** `active:scale-[0.97-0.98]` on interactive cards/buttons
- **Transitions:** `transition-[specific-props] duration-150` — never `transition: all`
- **Card contrast:** Strategy sections use `bg-card/95 dark:bg-card/90` with `backdrop-blur-xl` for strong contrast against the main background while preserving a glass aesthetic. Inner subsections use `bg-muted/70 dark:bg-muted/50` (tinted, not white) for clear visibility and separation.
- **Nav bar:** Uses `bg-background/50 dark:bg-background/40` with `backdrop-blur-xl` to match the glass scheme while remaining translucent.
- **Clickable items:** Use `bg-muted/60 hover:bg-muted/80` for interactive cards/buttons. Selected state uses `ring-1 ring-primary/50 bg-primary/5`.

---

## 🧱 Layout Rules (Flexbox + Grid)

- **Flexbox**: 1D layouts, alignment, content-driven components
- **Grid**: 2D structured layouts, repeated items, controlled alignment
- Use `gap-*` for spacing, `flex-wrap` for overflow
- Default flex alignment: `items-center` + `justify-between`
- Keep layout nesting shallow

---

## 📐 Responsive Breakpoints

### Mobile `< 640px`
- Padding: `20px` (`px-5`), single-column stack layout
- Slip Panel hidden (accessible via tab switcher)

### Tablet `640px – 1024px`
- 2-column CSS Grid: `[1fr 340px]`
- Strategy Config + Presets stacked in main column
- Slip Panel visible as narrow sidebar

### Desktop `> 1024px`
- Max width: `1360px`, 2-column grid layout: `lg:grid-cols-[1fr_340px]`
- Main column: unified strategy workspace card
- Slip Panel: fixed 340px sidebar
- Multi-zone spacing, strong hierarchy

---

## 📦 Component Library

| Component             | Where it's used                          |
| --------------------- | ---------------------------------------- |
| `Button`              | Header, Slip Panel, Page, AuthModal      |
| `Card`                | shadcn/ui base card (available but unused directly) |
| `ViewSlipMobile`      | Mobile floating bar (generated slip only) |
| `AuthProvider`        | Global auth context                      |
| `AuthModal`           | Backdrop authentication UI               |
| `UserMenu`            | Header dropdown: email + sign out        |
| `SlipPanel`           | Sidebar: strategy summary + generated slip |
| `SlipBuilderProvider` | Workspace strategy state management      |
| `CompetitionPicker`   | Selecting active competitions            |
| `MarketSelector`      | Choosing market type and selections      |
| `StrategyFilters`     | Frequency, scope, target picks           |
| `H2HFilter`           | H2H toggle + threshold                   |
| `PresetLoader`        | Quick preset templates                   |

---

## 🧱 Layout Architecture

### Root Layout (`app/layout.tsx`)
- Max width: `max-w-[1360px]` centered
- Padding: `px-5 md:px-8`
- Body: `min-h-full flex flex-col`

### Page Layout (`app/page.tsx`)
- **Grid**: `grid-cols-1 lg:grid-cols-[1fr_340px]`
- Mobile: tab switcher (Configure Strategy / Your Slip)
- Desktop: main content area + 340px sidebar for SlipPanel
- Workspace card: `bg-background/50 dark:bg-background/40 backdrop-blur-xl border border-border/30 rounded-xl shadow-sm` with hover effects
- Section dividers: `.section-divider` gradient class

---

## 🎨 Icon Library

- **Primary**: `react-icons/lu` (Lucide)
- **Secondary**: `react-icons/pi` (Phosphor)

### Icon Usage Table

| Use Case         | Icon               |
| ---------------- | ------------------ |
| History          | `LuHistory`        |
| Theme Toggle     | `LuSun` / `LuMoon` |
| Account Menu     | `LuUser`           |
| Credits Display  | `LuCoins`          |
| Empty State      | `LuInbox`          |
| Auth Email       | `LuMail`           |
| Success Status   | `LuCircleCheck`    |
| Loading          | `LuLoader`         |
| Sign Out         | `LuLogOut`         |
| Generate Slip    | `LuZap`            |
| League Sport     | `PiSoccerBall`     |
| Alert            | `LuCircleAlert` / `LuTriangleAlert` |
| Info             | `LuInfo`           |
| Preset Customize | `LuSparkles` / `LuShuffle` |
| H2H Filter       | `LuShield`         |
| Strategy Config  | `LuSwords`, `LuGoal`, `LuTarget` |
| Check (selected) | `LuCheck`          |
| Lock (disabled)  | `LuLock` / `LuLockOpen` |
| Close / Reset    | `LuX`              |
| Chevron (nav)    | `LuChevronRight`   |

### 🚫 Icon Usage Rule
- Do NOT use emojis as replacements for icons
- Always prefer React Icons (Lucide or Phosphor)
- If no suitable icon exists, ask for guidance

---

## 🎨 Design Patterns

### Grouping (replacing visible borders)
- Use `bg-muted/40 dark:bg-muted/20` tint backgrounds instead of `border border-border`
- Reserve borders for the outer workspace card only (`border-border/30`)

### Selection Indicators
- `ring-1 ring-primary/50 bg-primary/5 border-primary/30` on selected cards
- `ring-2 ring-primary/20` behind check badges

### Confidence Badges
- Strong: `bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400`
- Moderate: `bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400`
- Borderline: `bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400`

### Step Number Badges
- `inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary text-[11px] font-bold`

### Section Dividers
- `.section-divider` class — CSS gradient from transparent → border → transparent at 50% opacity