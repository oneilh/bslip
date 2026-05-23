# Slip Builder — Design System Spec (v1.0)

## 🎨 Theme

**Default:** Light · **Supported:** Light + Dark

### Light Mode

| Token                | Value     |
| -------------------- | --------- |
| Background           | `#F4F5F2` |
| Background Secondary | `#ECEEE8` |
| Surface              | `#FCFCFA` |
| Surface Elevated     | `#FFFFFF` |
| Surface Hover        | `#F5F5F3` |
| Text Primary         | `#121212` |
| Text Secondary       | `#667085` |
| Border / Divider     | `#E4E7EC` |
| Accent               | `#F97316` |
| Accent Hover         | `#EA6C0A` |
| Accent Light         | `#FFEDD5` |
| Success              | `#16A34A` |
| Warning              | `#D97706` |
| Danger               | `#DC2626` |

---

### Dark Mode

| Token                | Value     |
| -------------------- | --------- |
| Background           | `#0B0D0F` |
| Background Secondary | `#111315` |
| Surface              | `#15181B` |
| Surface Elevated     | `#1B1F24` |
| Surface Hover        | `#22262C` |
| Text Primary         | `#F3F4F6` |
| Text Secondary       | `#98A2B3` |
| Border / Divider     | `#2A2F36` |
| Accent               | `#F97316` |
| Accent Hover         | `#FB923C` |
| Accent Light         | `#FFEDD5` |
| Success              | `#22C55E` |
| Warning              | `#F59E0B` |
| Danger               | `#EF4444` |

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

- Cards: `10px`
- Buttons: `8px`
- Inputs: `6px`
- Badges: `4px`

---

## 🎯 UI Engineering Rules

- Use shadcn/ui as base system
- Extend via composition (do not edit core files)
- Reuse shared components before creating new ones
- Use `cn()` for class merging
- Support light and dark mode
- Avoid hardcoded colors
- Prefer semantic HTML
- Components must be responsive by default
- Prefer Tailwind utilities over custom CSS
- Use `gap-*` instead of margins where possible
- Avoid deep flex nesting

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
- Padding: `16px`, single-column stack layout
- Slip Panel hidden (accessible via floating bar)

### Tablet `640px – 1024px`
- 2-column CSS Grid: `[1fr 320px]`
- Strategy Config + Presets stacked in main column
- Slip Panel visible as narrow sidebar

### Desktop `> 1024px`
- Max width: `360` (`1440px`), 2-column grid layout
- Main column: nested 2/3 + 1/3 grid for Strategy Config + Presets
- Slip Panel: fixed 320px sidebar
- Multi-zone spacing, strong hierarchy

---

## 📦 Component Library

| Component             | Where it's used                          |
| --------------------- | ---------------------------------------- |
| `Button`              | Header, Slip Panel, Page                 |
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
- **Grid**: `grid-cols-1 md:grid-cols-[1fr_320px]`
- Mobile: single column (SlipPanel hidden)
- Tablet+: main content area + 320px sidebar for SlipPanel
- Max width: `max-w-360` centered

### Page Layout (`app/page.tsx`)
- **Nested Grid**: `grid-cols-1 lg:grid-cols-3` inside main area
- Strategy Config: `col-span-1 lg:col-span-2` (larger share)
- Presets: `col-span-1` (smaller share)
- Both wrapped in `bg-card border rounded-[10px]` card containers
- No BentoCard wrappers — reduced nesting

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

### 🚫 Icon Usage Rule
- Do NOT use emojis as replacements for icons
- Always prefer React Icons (Lucide or Phosphor)
- If no suitable icon exists, ask for guidance