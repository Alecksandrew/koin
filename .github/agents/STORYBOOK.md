# Storybook Documentation Guidelines

## 1. Golden Rule
→ **Component must be fully understood by reading its story.**
→ No codebase navigation required.
→ If dev needs to read source code = documentation failed.

## 2. File Structure & Organization
→ Name: `Component.stories.tsx`
→ Location: Same folder as component.
→ Required exports:
  * `meta`: Default export, type `Meta<typeof Component>`.
  * `Story`: Type `StoryObj<typeof meta>`.
  * Stories: Named exports for each state/variant.

## 3. Depth & Complexity Criteria

### Simple Components (e.g., Button, Badge)
→ Focus: Visual states and variations.
→ Required stories:
  * `Default`: Base component.
  * Variations: `Secondary`, `Dangerous`, etc.
  * States: `Disabled`, `Loading`, `WithError`, etc.

### Complex Components (e.g., Stack, FormField, layout-aware)
→ Focus: Behavior, API details, composition, real use cases.
→ Required docs (`parameters.docs.description.component`):
  * How it works internally.
  * How props interact (e.g., responsive props).
  * Composition logic.
→ Required `argTypes`:
  * Detailed descriptions.
  * Type summaries and constraints.
  * Default values.
→ Required stories:
  * Real-world examples (e.g., `NestedStacks`, `ResponsiveDirection`).

## 4. Mandatory Details
→ `tags: ["autodocs"]`: Always include.
→ `parameters.layout`: Set appropriately (`centered`, `fullscreen`, etc.).
→ **Props**: All non-obvious props must be documented in `argTypes`.
→ **Composition**: If component takes children, show how to use it with other components.

## 5. Best Practices (Naming & Order)
→ **Naming**: PascalCase for story names (`ResponsiveDirection`, not `responsive_direction`).
→ **Order**: 
  1. `Default`
  2. Variations (e.g., Primary, Secondary)
  3. States (e.g., Loading, Disabled)
  4. Complex/Composition cases (e.g., Nested)
→ **Grouping**: Title format `Layer/Slice/Component` (e.g., `Shared/UI/Stack`).

## 6. Args, ArgTypes & Parameters
→ **Args**: Use sensible defaults in `meta.args` for common props. Override in specific stories.
→ **ArgTypes**: Use `control` types (`text`, `object`, `select`, `boolean`). Provide `table` data (`category`, `type.summary`, `defaultValue`).
→ **Parameters**: Use `parameters.docs` for complex markdown explanations.
→ **Play Functions**: Use for interaction testing and state changes (focus, click) when applicable.

## 7. Accessibility, Responsiveness & Real Use
→ **A11y**: Ensure stories use semantic elements. Use decorators if surface/background context is needed.
→ **Responsiveness**: Show how component behaves across breakpoints. Create specific stories for responsive behavior (e.g., `<Stack direction={{ base: "col", md: "row" }}>`).
→ **Real Use Cases**: Simulate actual implementation. Don't just use dummy text if component implies a specific context (e.g., `FormField` needs an `Input` as children).
