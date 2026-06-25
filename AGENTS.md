---
agents:
  - name: frontend-tasks
    description: Frontend implementation for accoladi-landing-B Angular project
    rules:
      - applyTo: src/**
        model: preferred
---

# Frontend Agent

## Mission
Make minimal, safe frontend changes that preserve design system consistency and UI polish while reducing token waste through focused, targeted work.

## Core Principles
1. **Preserve Design System** — Use existing colors, typography, spacing scale, and component patterns
2. **Minimal Changes** — Smallest safe diff that solves the request; no refactors unless required
3. **No Unnecessary Scanning** — Read only the files needed; don't reread project unless critical
4. **Consistency First** — If you change one place, keep style consistent everywhere

## Working Rules
- ✅ Read relevant files; inspect before editing
- ✅ Make targeted changes with minimal diff
- ✅ Preserve existing behavior unless request changes it
- ✅ Reuse existing components, spacing, typography, colors
- ✅ Favor CSS / semantic HTML over heavy JavaScript
- ✅ Keep responsiveness solid (desktop, tablet, mobile)
- ❌ Do not refactor unrelated code
- ❌ Do not run tests unless explicitly asked
- ❌ Do not open live server / browser unless explicitly asked
- ❌ Do not make unrelated changes
- ❌ Do not run destructive commands

## Implementation Approach
1. Inspect relevant files first
2. Identify minimum set of files that need edits
3. Choose simplest, most maintainable solution
4. Prefer CSS / semantic HTML over JavaScript when possible
5. Ensure spacing, alignment, hierarchy feel intentional
6. Keep interactive elements obvious and accessible

## UI / UX Standards
- Clean, modern, intentional, readable
- Match existing visual language
- Subtle gradients, restrained shadows, strong contrast
- Avoid generic template-like layouts
- Semantic HTML, focus states, readable contrast, keyboard-friendly
- No heavy effects unless they fit the project

## Color Palette

**Navy:** `#061422`, `#0b2136`, `#123653`, `#19486e`  
**Blue:** `#00274c`, `#1d86c8`, `#276794`, `#3f7fae`, `#8db5d3`  
**Gold/Yellow:** `#8d6721`, `#ac8130`, `#c69b43`, `#f5e6b6`, `#f7cd46`, `#ffcb05`, `#fffaf0`, `#ffffff`  
**Dark Text:** `#0c2238`, `#0f3153`

## Tailwind CSS Strategy

### Styling Approach
- **Extract to CSS files** — Use `@apply` directives in component `.css` files instead of inline classes for better maintainability and reusability
- **Create utility classes** — Build semantic class names (e.g., `.btn-primary`, `.card-shadow`, `.text-label`) in shared CSS files
- **Compose animations** — Define transitions, keyframes, and animation utilities in `styles.css` or component-scoped CSS
- **Leverage extend config** — If custom utilities are needed, add them to `tailwind.config.js` (e.g., brand spacing, custom durations)

### Example Pattern
```css
/* app.css */
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg 
         font-semibold transition-colors duration-200
         hover:bg-blue-700 active:scale-95;
}

.card-base {
  @apply p-6 bg-white rounded-xl shadow-sm 
         border border-gray-200 transition-shadow hover:shadow-md;
}

@keyframes fadeInUp {
  from {
    @apply opacity-0 translate-y-4;
  }
  to {
    @apply opacity-100 translate-y-0;
  }
}

.animate-fade-in-up {
  @apply animate-[fadeInUp_0.4s_ease-out];
}
```

### Animation & Motion Best Practices
- Prefer subtle, purposeful animations (200–400ms for UI interactions)
- Use `transition-*` utilities for state changes (hover, focus, active)
- Create reusable animation classes for common patterns (fade, slide, scale)
- Match motion to brand tone: restrained and professional, not flashy
- Ensure animations respect `prefers-reduced-motion` by default

### Performance & Maintainability
- ✅ Extract repeated Tailwind patterns to CSS classes
- ✅ Use meaningful names that describe intent, not appearance
- ✅ Keep animations performant: prefer `transform` and `opacity` over layout-shifting properties
- ✅ Group related utilities in logical CSS modules (e.g., `buttons.css`, `cards.css`, `animations.css`)
- ❌ Avoid long inline class strings (hard to read and maintain)
- ❌ Do not use arbitrary values if a semantic utility exists
- ❌ Avoid overly complex animations that distract from content

## Component Architecture

### Reusable Component Strategy
- **Build once, use everywhere** — Create modular, standalone components for common UI patterns
- **Props-driven** — Components accept inputs (`@Input()`) for content, state, and behavior
- **Composable** — Design components to work together (e.g., card, button, badge, alert)
- **Scoped styling** — Each component has its own `.css` file with `@apply`-based utilities
- **Example components to establish early:**
  - `Button` (primary, secondary, ghost, loading states)
  - `Card` (with optional header, footer, sections)
  - `Badge` / `Chip` (for tags, status indicators)
  - `Alert` / `Notification` (success, warning, error, info)
  - `Typography` (heading, body, caption with consistent scales)

### Component File Structure
```
src/app/
  shared/
    components/
      button/
        button.component.ts
        button.component.html
        button.component.css
      card/
        card.component.ts
        card.component.html
        card.component.css
      (other reusable components)
    styles/
      animations.css
      buttons.css
      cards.css
      variables.css
  pages/
    home/
      home.component.ts
      home.component.html
      home.component.css
    (feature pages)
  (other features / services)
```

## Modern Angular 2026 Folder Structure

### For Prototype / Redesign Projects (Start Here)
Keep it simple. Add complexity only when you actually need it.

```
src/
  app/
    features/                      # Page-level feature areas
      home/
        page/
          home.component.ts
          home.component.html
          home.component.css
        sections/
          hero.component.ts
          hero.component.html
          hero.component.css
      about/
        page/
        sections/
      pricing/
        page/
        sections/
    shared/
      ui/                          # Reusable UI components only
        button/
          button.component.ts
          button.component.html
          button.component.css
        card/
        badge/
        modal/
    layout/                        # App shell components
      header.component.ts
      header.component.html
      header.component.css
      footer.component.ts
      footer.component.html
      footer.component.css
    app.routes.ts                  # Route definitions
    app.config.ts                  # App configuration
    app.ts                         # Root component
  styles.css                       # Global styles, Tailwind directives
  main.ts                          # Bootstrap
```

### Key Principles for Prototypes
- **Feature-first** — Organize by page/feature, not technical type
- **No premature folders** — Don't add `core/`, `services/`, `utils/` until you need them
- **Standalone components** — Use `standalone: true` for all components
- **Flat routing** — Define routes in `app.routes.ts`
- **ui/ over components/** — Be specific: `button/`, `card/`, `badge/` scale better than a generic `components/` dump folder
- **Grow by feature** — Add directories only when necessary (interceptors, guards, pipes, directives)

### When to Add `core/`
Only add `core/` when you actually have:

- **Interceptors** — HTTP request/response handling
- **Auth service** — Global authentication state
- **Route guards** — Protecting certain routes
- **Singleton services** — Global app state or configuration

Until then, keep it out of the way.

---

### For Production / Large-Scale Angular Apps
If the project grows beyond a prototype or redesign, expand to:

```
src/
  app/
    core/                          # Singleton services, interceptors, guards
      interceptors/
      services/
      guards/
    shared/                        # Reusable across features
      ui/                          # UI components
      directives/                  # Custom directives
      pipes/                       # Custom pipes
      utils/                       # Helper functions
      styles/                      # Shared CSS (@apply utilities, animations)
    features/                      # Feature modules
      home/
        page/
        sections/
        services/
      about/
        page/
        sections/
    layout/                        # App layout shells
      header/
      footer/
    app.routes.ts
    app.config.ts
    app.ts
  styles.css
  main.ts
```

### Migration Path
1. **Start:** Use the Prototype structure (features + shared/ui + layout)
2. **Grow:** Add `core/` when you have auth, interceptors, or guards
3. **Scale:** Add `shared/directives/`, `shared/pipes/`, `shared/utils/` only as needed
4. **Refine:** Restructure by feature if certain features become complex

---

### Design Philosophy
- **Start simple, grow by feature** — No folder ceremony until justified
- **Avoid dumping grounds** — Don't let `shared/` or `core/` become catch-alls
- **Colocation** — Keep feature-specific components, services, and styles together
- **Naming convention** — Descriptive, singular nouns (e.g., `button.component.ts`, not `btns`)

## Response Style
- Keep final response short and practical
- Mention files edited if helpful
- If something unclear, make reasonable assumption and continue (unless risky)
- State exactly why if something cannot be completed
- No destructive commands

## Project Context
- **Framework:** Angular 19+ (standalone components, modern routing)
- **Styling:** Tailwind CSS with `@apply` directives in component CSS files, not inline
- **Architecture:** Feature-based folder structure with shared components and core services
- **Purpose:** Frontend prototyping and design
- **Scope:** Don't assume file structure beyond what's observed; follow the modern folder structure guide above
- **Status:** Prototype phase — design-first approach, reusable component-driven

## Quick Reference: Don't Waste Tokens On
- ❌ Explaining the entire project structure
- ❌ Long preambles about what you're about to do
- ❌ Listing all files you read (mention only if relevant)
- ❌ Repeating guidelines back to user
- ❌ Verbose commit messages or documentation
- ✅ Direct, action-oriented responses
- ✅ Only necessary context in explanations
