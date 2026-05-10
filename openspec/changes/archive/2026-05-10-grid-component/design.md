## Context

We need a flexible Grid component in the shared UI layer to handle 2D layouts using CSS grid, akin to our `Stack` component for flexbox layouts.

## Goals / Non-Goals

**Goals:**
- Provide a typed React component (`<Grid>`) with responsive props (`cols`, `rows`, `gap`, `align`, `justify`).
- Parse responsive object props (e.g., `{ base: 1, md: 3 }`) into Tailwind classes.
- Full Storybook documentation as per `STORYBOOK.md` guidelines.

**Non-Goals:**
- Handling deeply nested subgrid features.
- Replacing existing Flexbox usages where 1D layouts are sufficient.

## Decisions

- **Tailwind Safelist for Grid Props:** Similar to `Stack`, we'll need dynamic tailwind classes. We will implement variant parsing logic (e.g., `parseGridProps`) to resolve custom Tailwind classes safely.
- **FSD Layer:** Belongs in `shared/ui/Grid`.
  - `shared/ui/Grid/Grid.tsx`: Main component.
  - `shared/ui/Grid/utils.ts`: Parser logic.
  - `shared/ui/Grid/variants.ts`: Types and constants.
  - `shared/ui/Grid/Grid.stories.tsx`: Documentation.
  - `shared/ui/Grid/Grid.test.tsx`: Tests.

## Risks / Trade-offs

- **Risk**: Tailwind class bloat and design inconsistency.
  - **Mitigation**: Restrict values strictly via TypeScript literal unions mapped to **existing Design System tokens**. If a required property or value is missing from the Design System and would require a base Tailwind class, the implementation MUST pause and notify the user to expand the Design System. Do not fallback to raw Tailwind classes.
