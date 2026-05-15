# bslip — Web App Layout Notes

## Goal

- Build the core app layout first
- Focus on structure, responsiveness, and UX flow
- Ignore advanced logic/features for now
- Create a reusable layout foundation for all pages

---

# Core Layout Direction

- Use a clean 2-column workspace layout on desktop
- Focus the UI around:
  - Strategy building
  - Slip generation
- Avoid sportsbook-style clutter
- Keep the experience modern, minimal, and tool-focused
- Use soft bento layouts for visual grouping
- ensure proper alignment of UI elements
- 

---

# Desktop Layout (`>1024px`)

## Structure

### Sticky Top Header

- Sticky at the top
- No bottom border
- Clean horizontal layout
- Slight surface contrast or blur

---

## Header Layout

### Left

- Logo

### Center

- Navigation

### Right

- Credits display
- History button for the previous slips
- Theme toggle
- Account menu

---

## Account Menu

Use a popup dropdown menu instead of a permanent account section.

### Suggested Items

- Profile
- Credits
- Saved Slips
- History
- Settings
- Theme Toggle
- Logout

### Optional

- Admin shortcut (role-gated)

---

## Main Layout

### Two Columns

#### Main Workspace Column (`~70%`)

Primary area where users:

- Pick competitions
- Configure strategies
- Select markets
- Use presets
- Preview match counts
- View suggestions
- Generate slips

### Workspace Style

- Bento-style grouped cards
- Soft modular layout
- Clean spacing
- Independently scrollable

---

#### Slip Panel Column (`~30%`)

Sticky/fixed style panel.

### Empty State

Show:

- Empty slip illustration/icon
- “Your slip is empty”
- Helper text

### Generated State

Show:

- Slip/ticket UI
- Generated legs
- Confidence labels
- Slip actions

---

## Desktop Behaviour

### Main Area

- Independently scrollable

### Slip Panel

- Always accessible
- Sticky while scrolling

### Layout Feel

- Spacious
- Minimal clutter
- Clear hierarchy

---

# Tablet Layout (`640px — 1024px`)

## Structure

### Sticky Top Header

Same structure as desktop.

---

## Two Columns

### Left (`~65%`)

Main workspace area.

### Right (`~35%`)

Sticky slip panel.

---

## Tablet Behaviour

- Slip panel remains visible
- No full-screen modal workflow
- Some header actions may collapse into overflow menu if space becomes tight

---

# Mobile Layout (`<640px`)

## Structure

### Main Content Area

- Single-column layout
- Full-width workspace
- `16px` horizontal paddingmediums -> remember tailwind styling

---

## Sticky Top Header

### Left

- Logo

### Right

- Credits display
- History button for the previous slips
- Account menu

---

# Mobile Slip Experience

## Default State

- Main content fills screen
- Slip panel hidden

---

## Generated State

Show floating bottom action bar [not a full curved border radius make lg or medium].

### Example

```txt
3 Legs Added • View Slip