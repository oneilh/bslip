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

- **Flexbox (`flex`)**:
  - 1D layouts (row/column)
  - Alignment and spacing
  - Content-driven components

- **Grid (`grid`)**:
  - 2D structured layouts
  - Repeated item systems
  - Controlled alignment structures

- Use `gap-*` for spacing

- Use `flex-wrap` for overflow items

- Default flex alignment: `items-center` + `justify-between`

- Avoid unnecessary mixing of grid and flex

- Keep layout nesting shallow

---

## 📐 Responsive Breakpoints

### Mobile `< 640px`

- Padding: `16px`
- Single-column structure

---

### Tablet `640px – 1024px`

- Increased horizontal structure density
- Wider components and grouped content

---

### Desktop `> 1024px`

- Max width: `1440px`
- Multi-zone interface spacing model
- Strong visual hierarchy separation

---

## 📦 Component Library

**shadcn/ui** — Tailwind-based, headless, fully customisable. Zero opinionated styles — you own every pixel.

| Component        | Where it’s used                          |
| ---------------- | ---------------------------------------- |
| `Button`         | Header, Slip Panel, Page                 |
| `Card`           | Used inside BentoCard base               |
| `BentoCard`      | Main workspace building block for layout |
| `ViewSlipMobile` | Root layout mobile floating action bar   |
| `AuthProvider`   | Root layout managing global auth context |
| `AuthModal`      | Root layout backdrop authentication UI   |
| `UserMenu`       | Header dropdown: email display + sign out |

---

## 🎨 Icon Library

- Use **React Icons only**
- Primary: `react-icons/lu` (Lucide via React Icons)
- Secondary: `react-icons/ph` (Phosphor icons)

Rules:

- Do not mix more than 2 icon sets
- Lucide handles general UI actions
- Phosphor used for sport-specific icons
- Maintain consistency across UI

---

### 🚫 Icon Usage Rule (No Emoji Substitution)

- Do NOT use emojis as replacements for icons in the UI.
- Always prefer a proper icon from the approved icon library first (React Icons: Lucide or Phosphor sets).
- If you cannot find a suitable icon, do NOT default to an emoji.
- Instead, ask for confirmation or request guidance on an appropriate icon choice.
- Emojis are only allowed if explicitly approved as the best visual fit for a specific case.

---

### 🎯 Icon Usage

| Use Case         | Icon               |
| ---------------- | ------------------ |
| History Button   | `LuHistory`        |
| Theme Toggle     | `LuSun` / `LuMoon` |
| Account Menu     | `LuUser`           |
| Credits Display  | `LuCoins`          |
| Empty Slip State | `LuInbox`          |
| Auth Email Input | `LuMail`           |
| Success Status   | `LuCircleCheck`    |
| Loading Spinners | `LuLoader`         |
| Sign Out Action  | `LuLogOut`         |

---

## 📐 Layout Patterns

_(Intentionally removed)_

---

## 📦 Design Principles

- Clear visual hierarchy
- Accent color used only for interaction states
- Clean separation of information and actions
- Data should feel structured and readable
- Consistent behavior across themes
- Minimal but information-dense UI

---

## 🧾 Final System Summary

| Decision           | Choice                               |
| ------------------ | ------------------------------------ |
| Theme support      | Light + Dark                         |
| Light background   | `#F8F8F6`                            |
| Dark background    | `#0F1011`                            |
| Accent color       | `#F97316`                            |
| Display font       | Sora                                 |
| Body font          | Inter                                |
| Mono font          | JetBrains Mono                       |
| Icon system        | React Icons (Lucide + Phosphor sets) |
| Base spacing       | 4px system                           |
| Component approach | shadcn/ui + composition              |
