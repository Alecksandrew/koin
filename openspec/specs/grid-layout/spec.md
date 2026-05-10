## ADDED Requirements

### Requirement: grid-structure
The component MUST allow defining columns and rows using standard CSS grid values or design system tokens.

#### Scenario: Basic columns
- **GIVEN** a Grid component instance
- **WHEN** `cols` prop is set to "3"
- **THEN** it MUST render 3 equal columns in the grid.

### Requirement: responsive-layout
The component MUST support responsive layout definitions for all core grid properties.

#### Scenario: Mobile-first columns
- **GIVEN** a Grid component instance
- **WHEN** `cols` is "1" and `md:cols` is "3"
- **THEN** it MUST render 1 column on mobile and 3 columns on medium screens.

### Requirement: spacing-tokens
The component MUST use design system spacing tokens for gap properties.

#### Scenario: Standard gap
- **GIVEN** a Grid component instance
- **WHEN** `gap` is set to "4"
- **THEN** it MUST apply the corresponding spacing token (e.g., 1rem) between grid items.

### Requirement: semantic-html
The component MUST allow changing the underlying HTML element via an `as` prop while maintaining grid layout.

#### Scenario: Grid list
- **GIVEN** a Grid component instance
- **WHEN** `as` is set to "ul"
- **THEN** it MUST render a `<ul>` element with grid styles.
