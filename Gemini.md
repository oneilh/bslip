<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

Read the following files in order before implementing or making any architectural decision:

1. `ai-context/project-overview.md` — product definition, goals, features, and scope
2. `ai-context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `ai-context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `ai-context/code-standards.md` — implementation rules and conventions
5. `ai-context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `ai-context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `ai-context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the ai-context files, update the relevant file before continuing.

## UI Context Update Rule

## 🔁 UI Context Update Rule

Whenever a component or icon is used or created in the web app, you MUST update the `ai-context/ui-context.md` file.

### Rules:

- Log every **new or used component** in the Components table
- Log every **icon usage** in the Icons table
- Do not duplicate entries — update existing rows instead
- Keep entries consistent with current design system naming
- Only record items that are actually used in the UI, not planned ones

### Goal:

`ui-context.md` should always reflect the **real, current UI implementation state**, not design intent.
