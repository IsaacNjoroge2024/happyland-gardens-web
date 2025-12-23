# Happyland Gardens Design System

## Colors

### Primary (Green - Nature theme)

- primary-500: #22c55e (Main brand color)
- Use for: Primary buttons, links, active states

### Secondary (Earthy brown)

- secondary-500: #bfa094
- Use for: Secondary buttons, accents

### Accent (Warm yellow)

- accent-500: #f59e0b
- Use for: Call-to-action elements, highlights

## Typography

### Headings

- H1: 36px (mobile) / 48px (desktop) - Page titles
- H2: 30px (mobile) / 36px (desktop) - Section titles
- H3: 24px (mobile) / 30px (desktop) - Subsection titles
- H4: 20px - Card titles

### Body

- Body Text: 16px - Main content
- Caption: 14px - Secondary information

## Components

### Button

**Variants:**

- primary: Solid primary color
- secondary: Solid secondary color
- outline: Border with transparent background
- ghost: Transparent, minimal style

**Sizes:**

- sm: Small (mobile actions)
- md: Medium (default)
- lg: Large (hero CTAs)

**Usage:**

```tsx
<Button variant="primary" size="lg">Book Now</Button>
<Button variant="outline">Learn More</Button>
<Button isLoading>Submitting...</Button>
```

### Container

**Sizes:**

- sm: 896px max width
- md: 1024px max width
- lg: 1280px max width
- full: 100% width

### Section

**Backgrounds:**

- white: Default white background
- gray: Light gray (alternating sections)
- primary: Light green tint
- transparent: No background

### Card

Rounded corners, shadow, hover effects

## Spacing Scale

- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)

## Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
