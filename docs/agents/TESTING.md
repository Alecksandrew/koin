# Testing Guidelines

## Before Writing Any Test
Search for updates to Vitest + React Testing Library released in the last month. Use the most current API and syntax — e.g. React 19 passes `ref` as a plain prop, no more `forwardRef`.

## Coverage Required
Every test file must cover **all three**:
- **Happy path** — valid data, normal flow and so on...
- **Sad path** — API failure, validation error, permission denied and so on...
- **Edge cases** — empty string, null, undefined, empty list, 0, boundary values and so on...

## Planning
Before writing any test, list for me all the behaviors you think are necessary to test, and I will approve or deny them. Once I approve, then, and only then, you can write the test.

## File Structure
```ts
describe("<ComponentName />", () => {
  it("unit test one with a semantic name", () => { ... })
  it("unit test two with a semantic name", () => { ... })
})
```

## AAA Pattern (mandatory)
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

## Naming Rule
`it()` must be a human-readable sentence describing behavior — never a method or prop name.
```
❌ it('calls handleClick')
✅ it('calls onDelete with the item id when delete is clicked')

❌ it('renders correctly')
✅ it('renders the product title and price when data is available')

❌ it('loading state')
✅ it('disables the submit button while the request is pending')
```

## Query Priority
Use the highest applicable — go down only when the above doesn't exist:
1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByAltText`
7. `getByTitle`
8. `getByTestId` — last resort, always add a comment explaining why

## Setup / Teardown
```ts
const onAction = vi.fn()
beforeEach(() => vi.clearAllMocks())
afterEach(() => vi.restoreAllMocks())
```

## Rules

**Always test:**
- Visible text rendered on screen
- Callbacks called with correct payload
- Disabled state blocking interaction
- Loading state (spinner visible + button disabled)
- Error state (message visible to user)
- Empty / null / missing data fallbacks

**Never test:**
- CSS classes or Tailwind tokens
- Internal component state
- HTML tags rendered internally
- Snapshots as primary assertion

**Always use `userEvent`, never `fireEvent`:**
```ts
// ❌
fireEvent.change(input, { target: { value: 'text' } })

// ✅
await userEvent.type(input, 'text')
```

**Never use `querySelector`:**
```ts
// ❌
container.querySelector('input[type="email"]')

// ✅
screen.getByRole('textbox', { name: /email/i })
```

**Fix non-determinism:**
```ts
vi.setSystemTime(new Date('2024-01-01')) // dates
vi.fn().mockResolvedValue(mockData)      // async
```

