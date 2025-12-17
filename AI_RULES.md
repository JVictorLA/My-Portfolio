# AI Rules & Tech Stack Guide

## Tech Stack

- **React 18.2.0** - Main UI framework with functional components and hooks
- **TypeScript** - Type-safe JavaScript development with strict typing
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **shadcn/ui** - High-quality component library built on Radix UI primitives
- **React Router DOM** - Client-side routing for single-page applications
- **GSAP** - Professional-grade animation library for smooth scroll-triggered animations
- **React Three Fiber** - React renderer for Three.js for 3D graphics
- **React Three Rapier** - Physics engine integration for 3D interactions
- **TanStack Query** - Server state management and caching

## Library Usage Rules

### UI Components
- **Always use shadcn/ui components** when available - they provide consistent design and accessibility
- **Import from `@/components/ui/`** - All shadcn/ui components are stored here
- **Customize shadcn/ui components** only when necessary - prefer creating new components instead
- **Use Tailwind CSS classes** for custom styling - leverage the utility classes extensively
- **Follow the existing design tokens** defined in `tailwind.config.ts` - use the CSS custom properties

### Styling
- **Use Tailwind CSS** for all styling - no custom CSS files unless absolutely necessary
- **Leverage the custom components** defined in `index.css` like `.glass-card`, `.btn-glow`, `.glass-input`
- **Use the animation utilities** like `animate-float`, `animate-pulse-glow` for consistent animations
- **Follow the responsive design patterns** - use responsive breakpoints and mobile-first approach

### 3D Graphics
- **Use React Three Fiber** for all 3D rendering and scene management
- **Use React Three Rapier** for physics simulations and interactive 3D elements
- **Import 3D assets** from the `public/assets/` directory
- **Use the `ErrorBoundary` component** to handle 3D loading failures gracefully
- **Implement mobile optimization** for 3D scenes with reduced detail and performance

### Animations
- **Use GSAP** for complex animations and scroll-triggered effects
- **Use CSS animations** for simple, performant animations
- **Register GSAP plugins** like ScrollTrigger in component useEffect hooks
- **Clean up GSAP animations** in useEffect cleanup functions
- **Use the existing animation classes** like `animate-float`, `animate-pulse-glow`

### State Management
- **Use React hooks** (useState, useEffect, useRef) for local component state
- **Use TanStack Query** for server state, caching, and data fetching
- **Avoid global state management** unless absolutely necessary for shared state
- **Use the custom `useToast` hook** for toast notifications

### Routing
- **Use React Router DOM** for all navigation
- **Define routes in `src/App.tsx`** - keep all custom routes above the catch-all "*" route
- **Use the `NavLink` component** for navigation links with active state styling
- **Implement smooth scrolling** for anchor links using `element.scrollIntoView({ behavior: 'smooth' })`

### Forms
- **Use React Hook Form** for form handling and validation
- **Use Zod** for schema validation with `@hookform/resolvers`
- **Use the existing form components** like `.glass-input` for consistent styling
- **Implement proper form validation** with error messages

### Icons
- **Use Lucide React icons** for all interface icons
- **Import icons directly** from `lucide-react`
- **Use consistent icon sizing** and weights (prefer `weight="light"`)

### Performance
- **Use React.memo** for expensive components that don't often re-render
- **Use useCallback/useMemo** for functions and values that are expensive to compute
- **Implement lazy loading** for heavy components using `React.lazy`
- **Optimize 3D scenes** for mobile devices with reduced detail

### File Organization
- **Put pages in `src/pages/`** - Each page should be a separate component
- **Put components in `src/components/`** - Organize by feature or type
- **Put utilities in `src/lib/`** - Reusable functions and helpers
- **Put hooks in `src/hooks/`** - Custom React hooks
- **Use descriptive file names** - kebab-case for folders, PascalCase for components

### Code Quality
- **Use TypeScript** for all new code - no JavaScript files
- **Follow ESLint rules** - no unused variables, proper imports
- **Write semantic HTML** - use proper HTML5 elements
- **Add proper ARIA labels** for accessibility
- **Test components** in different screen sizes and devices