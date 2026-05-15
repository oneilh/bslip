# Development Workflow

## Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and what the current state of progress is. Always implement against these specs — do not infer or invent behavior from scratch.


<!-- ## Context Files
These files are the source of truth for the project. Keep them in sync with the actual state of the codebase at all times.

| File | Purpose |
|---|---|
| `architecture-context.md` | Stack decisions, system boundaries, data models, API contracts |
| `progress-tracker.md` | What's built, what's in progress, open questions |
| `markets-reference.md` | Supported markets, compatibility matrix for bet builder mode |
| `project-overview.md` | Full product spec — goals, features, scope, success criteria | -->

## Scoping Rules

- Work on one feature unit or subsystem at a time.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated system boundaries in a single implementation step.

## When To Split Work

Split an implementation step if it combines:

- UI changes and Supabase schema changes
- API-Football data fetching and slip generation logic
- Credit deduction logic and slip output rendering
- Multiple unrelated routes or feature units

If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior that is not defined in the context files.
- If a requirement is ambiguous, resolve it in the relevant context file before implementing.
- If a requirement is missing, add it as an open question in `progress-tracker.md` before continuing.

<!-- ## Protected Foundation Components

Do not modify generated third-party foundation components unless explicitly instructed.

This includes:

- `components/ui/*` (shadcn/ui components)
- third-party library internals

These should remain default and reusable.

Project-specific styling, layout changes, and feature logic must be implemented in app-level components instead of modifying foundation components.

Only modify these files when a task explicitly requires it.  -->

## Keeping Docs In Sync

Update the relevant context file whenever implementation changes affect:

- System architecture or boundaries 
- storage model decisions
- Supported markets or compatibility rules 
- Feature scope or success criteria 
- Code conventions or standards

Progress state must reflect the actual state of the codebase, not the intended state.

## Before Moving To The Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture-context.md` was violated.
3. `progress-tracker.md` reflects the completed work.

---

## 🛠️ Agent Skills Registry

Skills are installed in `.agents/skills/`. Read the relevant `SKILL.md` before any task that matches the trigger below.

| Skill | Path | When to Invoke |
|---|---|---|
| `web-design-guidelines` | `.agents/skills/web-design-guidelines/` | UI audit, accessibility review, checking components against Web Interface Guidelines |
| `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/` | Writing or refactoring React/Next.js components, data fetching, bundle optimisation, performance review |
| `vercel-composition-patterns` | `.agents/skills/vercel-composition-patterns/` | Designing or refactoring component APIs, avoiding boolean prop proliferation, compound components |
| `ui-ux-pro-max` | `.agents/skills/ui-ux-pro-max/` | **Any UI task** — creating/editing components, choosing colours/fonts/spacing, reviewing visual quality, accessibility, animation |
| `ui-animation` | `.agents/skills/ui-animation/` | Adding or reviewing motion — transitions, spring physics, dropdown/modal animations, gestures |

### Usage Rules

- `ui-ux-pro-max` and `ui-animation` must be consulted on **every UI component** created or modified.
- `vercel-react-best-practices` must be consulted when writing any new React component or data-fetching logic.
- `web-design-guidelines` must be run as an audit before any UI is considered complete.
- `vercel-composition-patterns` must be consulted when a component receives more than 2 boolean props.

