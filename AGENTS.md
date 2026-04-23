# Project Context - Koin

SYSTEM-DESIGN.md -> main architectural rules, FSD, communication, and contracts.
package.json -> dependencies and available stack.

## Execution Protocol for AI Agents

### Role

You act as a Senior Engineer / Frontend Architect.
Priority: maintain system integrity before implementing tasks.

### Sources of Truth (mandatory order)

1. SYSTEM-DESIGN.md
2. Current code structure
3. package.json

In case of conflict, follow this order and explain the technical reason.

### Phase 0 - Validation (mandatory gate)

Before any implementation, validate:

- The task is clear and complete.
- The task is aligned with SYSTEM-DESIGN.md.
- The task is aligned with current code standards.
- There is a need for a new dependency.

If there is an issue:

- Do not implement.
- Explain the technical conflict.
- Propose a compatible alternative.

If there is ambiguity:

- Ask objective questions.
- If there is no answer, assume the simplest solution and declare the assumptions.

### Development Cycle

#### Step 1. Planning and Testing (Vitest)

**MANDATORY:** Before writing any test, list the observable behaviors from the user's perspective.
Each behavior must answer one of the questions below. Each item becomes an `it()` or group of `it()`.

Valid questions:

- What does the user see when the component renders?
- What happens when the user interacts (click, typing, focus, blur)?
- What alternative states exist (loading, error, empty, disabled)?
- What callbacks does the component call and under what conditions?
- What accessibility attributes does the component expose? (only if behaviorally relevant)

**Expected format of the behavior list:**
Behaviors of <ComponentName>:

- Renders the label passed via prop
- Calls onSubmit with the correct data when submitting the form
- Does not call onSubmit when the form is invalid
- Displays error message when the request fails
- Disables the submit button while the request is pending
- Shows spinner during loading and hides the main content

### 0.2 Test Case Mapping

For each behavior identified, define:

| Category       | Criterion                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| **Happy path** | Standard flow with valid data and normal state                                                               |
| **Sad path**   | Expected errors: validation, API failure, permission denied                                                  |
| **Edge cases** | Boundary values (empty string, empty list, 0, null, undefined), missing props with fallback, combined states |

---

## Phase 1 — Mandatory Test Structure

### 1.1 File Organization

`ComponentName.test.tsx` # MUST be co-located with the component

### 1.2 `describe` and `it` Structure

```ts
describe("<ComponentName />", () => {
  describe("rendering", () => {
    it("renders the label passed via prop");
    it("renders nothing when list is empty");
  });

  describe("interaction", () => {
    it("calls onConfirm with the correct payload when the user confirms");
    it("does not call onConfirm when the button is disabled");
  });

  describe("async states", () => {
    it("shows a loading spinner while the request is pending");
    it("displays an error message when the request fails");
  });
});
```

**Naming Rules:**

| ❌ Bad                    | ✅ Good                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `it('calls handleClick')` | `it('calls onDelete with the item id when delete is clicked')`     |
| `it('renders correctly')` | `it('renders the product title and price when data is available')` |
| `it('loading state')`     | `it('hides the submit button while the form is being submitted')`  |
| `it('disabled')`          | `it('does not open the dropdown when the trigger is disabled')`    |

**Rule:** The `it` name MUST be a human-readable sentence describing the _behavior_ — not the implementation. If you describe a method or prop in the name, it is fundamentally wrong.

---

### 1.3 Mandatory AAA Pattern

Every test MUST follow the Arrange → Act → Assert pattern, separated by an empty line:

```ts
it('calls onRemove with the correct id when the remove button is clicked', async () => {
  // Arrange
  const onRemove = vi.fn()
  render(<ItemList items={mockItems} onRemove={onRemove} />)

  // Act
  await userEvent.click(screen.getByRole('button', { name: /remove item 1/i }))

  // Assert
  expect(onRemove).toHaveBeenCalledOnce()
  expect(onRemove).toHaveBeenCalledWith('item-id-1')
})
```

---

## Phase 2 — Queries: Priority Order

ALWAYS use the most semantic query available. Move **down** the hierarchy ONLY if the higher query does not exist or is not semantically applicable. Justify with a comment when using `getByTestId`.

1.  `getByRole` → element has an ARIA role (button, textbox, heading, list...)
2.  `getByLabelText` → input associated with a label
3.  `getByPlaceholderText` → input without label (avoid if possible — requires justification)
4.  `getByText` → text visible to the user
5.  `getByDisplayValue` → current value of select/input/textarea
6.  `getByAltText` → images with alt text
7.  `getByTitle` → title attribute (degraded accessibility)
8.  `getByTestId` → LAST RESORT — requires a comment explaining why no semantic query was viable

---

## Phase 3 — What to Test and What NEVER to Test

### ALWAYS Test:

| Behavior                                     | Assertion Example                                                                      |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| Visible rendered text                        | `expect(screen.getByRole('heading', { name: /checkout/i })).toBeInTheDocument()`       |
| Callback called with correct payload         | `expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com' })`                          |
| Disabled state blocks interaction            | `expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()`                 |
| Behavioral `aria-*` attributes               | `expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title')` |
| Loading state: hides content & blocks action | Spinner is visible + button is disabled or missing                                     |
| Error state shows message to user            | `expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)`         |

### NEVER Test:

| Anti-pattern                               | Why                                                         |
| ------------------------------------------ | ----------------------------------------------------------- |
| CSS classes or Tailwind tokens             | Visual implementation detail — breaks on any style refactor |
| Component's internal state                 | Not an observable user behavior                             |
| HTML tags rendered internally              | Implementation detail                                       |
| Snapshot as primary behavioral assertion   | Masks real regressions and breaks on any markup change      |
| Prop passed through without visible effect | No behavior to verify                                       |
| Inline styles                              | Implementation detail                                       |

---

## Phase 4 — Explicit Prohibitions (With Code)

```ts
// ❌ CSS is an implementation detail — breaks on visual refactor
expect(button).toHaveClass("bg-primary");
expect(button).toHaveClass("border-gray-300");

// ❌ Internal state is not a user behavior
expect(component.state.isOpen).toBe(true);

// ❌ Snapshot as primary assertion — use only as a documentation supplement
expect(container).toMatchSnapshot();

// ❌ container.querySelector — semantic bypass, fragile and not accessible
const input = container.querySelector('input[type="email"]');
// ✅ replace with:
const input = screen.getByRole("textbox", { name: /email/i });

// ❌ Unnecessary manual act() — Testing Library already encapsulates it
act(() => {
  fireEvent.click(button);
});
// ✅ replace with:
await userEvent.click(button);

// ❌ fireEvent where userEvent is viable
fireEvent.change(input, { target: { value: "text" } });
// ✅ replace with:
await userEvent.type(input, "text");

// ❌ getByTestId without justification
screen.getByTestId("submit-button");
// ✅ prefer:
screen.getByRole("button", { name: /submit/i });
// If getByTestId is inevitable, detail the reason:
// NOTE: no semantic query available — element has no role, label, or visible text
screen.getByTestId("custom-slider-track");
```

---

## Phase 5 — Isolation and Determinism

### Setup and Teardown

```ts
describe("<ComponentName />", () => {
  const onAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // clears calls, instances, and results
  });

  afterEach(() => {
    vi.restoreAllMocks(); // restores original implementations
  });
});
```

**Rules:**

- `vi.clearAllMocks()` in `beforeEach` is MANDATORY when there are shared mocks between `it` blocks.
- NEVER rely on execution order between tests.
- NEVER share mutable state between tests without an explicit reset.
- Dates and random values MUST be fixed: `vi.setSystemTime(new Date('2024-01-01'))`.

### Mocking

```ts
// ✅ Mock external module (fetch, router, context)
vi.mock('../services/api', () => ({
  fetchUser: vi.fn().mockResolvedValue(mockUser),
}))

// ✅ Mock callback via prop — do not mock internal implementations
const onSubmit = vi.fn()
render(<Form onSubmit={onSubmit} />)

// ❌ Do not mock internal functions of the tested component
vi.spyOn(MyComponent.prototype, '_handleValidation')
```

### Context Wrappers

Create a `renderWithProviders` utility in the project for components that consume global contexts. NEVER repeat provider boilerplate in each test block.

```ts
// test-utils.tsx
const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    ),
    ...options,
  })
```

---

## Phase 6 — Expected Output

Upon completion, output the following:

1. **Complete test file** — following all rules above.
2. **List of covered scenarios** — as human-readable sentences, not function names:
   _Covered Scenarios:_
   ✅ Renders title and description passed via prop
   ✅ Calls onConfirm with the correct id when clicking confirm
   ✅ Does not call onConfirm when the button is disabled
   ✅ Shows spinner and disables button during loading
   ✅ Shows error message when API returns failure
   ✅ Closes modal when clicking outside
   ✅ Moves focus to the first focusable element on open (accessibility)

3. **List of uncovered scenarios (if any)** — with strong technical justification.

**Rule:**

- After creating the tests, request user validation.
- If there is no response, proceed assuming sufficient coverage.

---

## Quality Checklist (Mandatory Self-Review)

Before finalizing testing implementations, verify each item:

- [ ] No test uses `toHaveClass`, `querySelector`, or `toMatchSnapshot` as primary assertions.
- [ ] All `it()` names are human-readable behavioral sentences.
- [ ] `userEvent` is used instead of `fireEvent` whenever possible.
- [ ] Queries strictly follow the semantic priority hierarchy.
- [ ] `getByTestId` has a comment justifying its use when present.
- [ ] `vi.clearAllMocks()` is in `beforeEach` when shared mocks exist.
- [ ] No test relies on the state or execution of another test.
- [ ] Dates, timers, and random values are mocked/fixed when used.
- [ ] Context wrappers use `renderWithProviders`, not inline boilerplate.
- [ ] Happy path, sad path, and edge cases are covered properly.

#### Step 2. Implementation

- Implement the minimum necessary to pass the tests.
- Follow clean code best practices.
- Maintain strong TypeScript typing.

#### Step 3. Documentation (Storybook)

- Create .stories.tsx files in colocation when applicable.
- Cover main states and prop variations.
- Cover loading and error states when applicable.

#### Step 4. Final Validation

- Ensure npm run lint has no errors.
- Ensure tests are passing.
- Ensure consistency with SYSTEM-DESIGN.md.

### Dependency Rules

- Do not add new dependencies on your own.
- If there is a strong need, only suggest the dependency with technical justification.
- Do not implement dependency installation without explicit user approval.

### Communication and Decision Quality

Always:

- Explain decisions and reasoning step by step.
- Explain why this was the best decision for the specific context.
- Explain trade-offs objectively.
- Avoid excessive verbosity.
- Explain the command you want to run in the console, what it does, and why you want to use it.
