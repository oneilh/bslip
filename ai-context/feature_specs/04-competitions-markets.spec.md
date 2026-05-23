# 📄 competitions-markets.spec.md

---

## 1. Purpose

The Competitions & Markets module defines:

- Which football competitions are scanned
- Which betting market logic is applied
- How fixtures are filtered before slip generation

This system outputs a **filtered set of eligible fixtures** based on strict deterministic rules.

All data used in this phase is **mock data only**.

---

## 2. Supported Competitions (Phase 1)

### Active Leagues (Fixed Set)

The system MUST only operate on these 3 competitions:

- Premier League (ENG)
- La Liga (ESP)
- Serie A (ITA)

### Rules

- Max selectable competitions: **3**
- Min required: **1**
- If user attempts a 4th selection:
  - Block selection
  - Show message:
    > "Max 3 competitions. Remove one to add another."
  - Do NOT auto-deselect anything

---

## 3. Market System

### Phase 1 Scope (Basic Stats Only)

Only these markets are supported:

- BTTS (Both Teams To Score)
- Over 1.5 Goals
- Over 2.5 Goals
- Under 2.5 Goals

No advanced metrics are included in this phase.

---

## 4. Market Logic Rules

### 4.1 Single Market Mode

- Only ONE market is active at a time
- Each fixture must satisfy that single condition

---

### 4.2 Bet Builder Mode

When multiple markets are selected:

> ALL conditions MUST be true (AND logic)

Example:

BTTS + Over 2.5

A fixture is valid ONLY if:

- BTTS == true  
AND  
- total_goals >= 3

### Hard Constraint

> If Bet Builder contains N markets, ALL N conditions must evaluate to TRUE for fixture inclusion.

---

## 5. Form Filter System

### Allowed Frequency Values (Fixed Presets Only)

- `3_of_last_5`
- `4_of_last_5`
- `4_of_last_6`
- `5_of_last_6`

No custom frequency allowed in Phase 1.

---

### Evaluation Rule

Example: `4_of_last_5`

- Take last 5 chronological fixtures
- Count how many satisfy the market condition
- Must be **>= required threshold**

---

## 6. Form Scope Logic

### Scope Options

- `home`
- `away`
- `both`

---

### Definitions

#### HOME scope

- Home team → home matches only
- Away team → away matches only

#### AWAY scope

- Home team → away matches only
- Away team → home matches only

#### BOTH scope

- All matches for both teams regardless of venue

---

### Critical Rule

> Each team must always be evaluated using correct home/away context.

---

## 7. Preset System (Override Engine)

### Behavior Rule

> Presets override all manual selections.

When a preset is selected:

- All UI controls are locked to preset values
- Manual edits are disabled
- Only clearing the preset restores control

---

### Preset Definitions

| Preset              | Market          | Frequency   | Scope | Bet Builder                 |
| ------------------- | --------------- | ----------- | ----- | --------------------------- |
| Safe Acca           | Over 1.5        | 4_of_last_5 | both  | disabled                    |
| Goals Fest          | Over 2.5        | 4_of_last_6 | both  | disabled                    |
| Value Finder        | BTTS            | 3_of_last_5 | both  | disabled                    |
| Clean Sheet Hunt    | Under 2.5       | 4_of_last_5 | both  | disabled                    |
| Bet Builder Starter | BTTS + Over 2.5 | 4_of_last_5 | both  | enabled (exactly 2 markets) |

---

### Rule

- Presets fully replace current configuration state

---

## 8. Match Filtering Engine

### Input

- Selected competitions (1–3)
- Market logic
- Frequency rule
- Scope rule
- Optional preset configuration

---

### Output

- Filtered list of eligible fixtures

---

### Determinism Rule

> Same input must always produce the same output

No randomness allowed.

---

## 9. Target Picks (Slip Size)

### Configurable Field

A "Target Picks" selector controls the target number of fixtures for the generated slip.

| Property      | Value        |
| ------------- | ------------ |
| Allowed range | 1 to 8       |
| Default       | 4            |
| Hard cap      | 8            |

### Behavior

- The generated slip MUST return **≤ targetPicks** fixtures
- If `qualifiers < targetPicks`:
  - Show a warning: "Only X fixtures qualified (need Y)."
  - Still allow generation (the slip returns all qualifiers, capped at available count)
- The `targetPicks` value is independent of presets (not locked by preset)

---

## 10. Match Count Rules (Critical System Logic)

### Hard Cap Rule

- Never return more than the lesser of: **targetPicks** or **8 matches**
- If more qualify:
  - Sort by confidence score
  - Return top N (where N = targetPicks, max 8)

---

### Confidence Score Definition

Based only on:

- Frequency match ratio

Example:
- 5/5 = 1.0
- 4/5 = 0.8
- 3/5 = 0.6

---

### Match Count States

#### ≥ targetPicks matches
- Return top targetPicks by confidence
- Allow generation

---

#### < targetPicks matches
- Show warning: "Only X fixtures qualified (need Y)."
- Return all qualifiers (capped at available count)
- Allow generation

---

#### 0 matches
- Disable generation
- Show message: "No fixtures qualify with current filters."

---

### Hard Constraint

- Never generate more than 8 matches
- Never create or pad fixtures artificially
- Never modify dataset to increase match count
- Never exceed selected targetPicks

---

## 11. H2H Configuration (Credit-Gated, Phase 1 Mock)

### Purpose

H2H adds a head-to-head history filter as an additional condition on top of the team form filter.

### Rule

> A fixture qualifies ONLY if:
> - Team form passes
>   AND
> - H2H filter passes (if enabled)

### UI Elements

- **H2H Toggle**: Enable/disable the H2H filter
- **H2H Threshold Selector**: Allowed values:
  - `2_of_last_3`
  - `3_of_last_5`
  - `4_of_last_5`

### Mock Data Extension

Each mock fixture must include an `h2h` field containing an array of historical results:

```typescript
h2h: Array<{ homeGoals: number; awayGoals: number }>
```

### Evaluation Rule

Example: `3_of_last_5`
- Take last 5 H2H matches
- Count how many satisfy the active market condition for **both teams combined**
- Must be `>= required threshold`

### Credit Gating

- H2H filter is credit-gated (requires authentication + credits in production)
- In Phase 1 mock: always available (no auth/credit check)

---

## 12. System-Level Constraints

- Deterministic logic only
- No probabilistic inference
- No AI-generated or hallucinated fixtures
- All outputs must come from mock dataset only

---

## 13. Mock Data Requirement

All system logic must operate on predefined mock fixtures.

### Fixture Structure (Updated for H2H)

Each fixture MUST contain:

- id
- competition (EPL | LaLiga | SerieA)
- homeTeam
- awayTeam
- date
- stats:
  - btts (boolean)
  - totalGoals (number)
- form:
  - home (number[])
  - away (number[])
- h2h: Array<{ homeGoals: number; awayGoals: number }>

---

### Rule

- No runtime generation of matches
- No external enrichment
- No inferred teams or competitions

---