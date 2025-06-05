# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run start        # Start production server
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues automatically
npm run type-check   # Run TypeScript type checking
```

### Utilities
```bash
npm run clean        # Remove .next, out, and dist directories
npm run analyze      # Analyze bundle size (requires production build)
```

## Architecture Overview

This is a Next.js 15 portfolio website with App Router, featuring a sophisticated animation system migrated from vanilla JavaScript to React.

### Key Technical Decisions

1. **Animation Stack**: The site uses GSAP as the primary animation engine, integrated with:
   - Locomotive Scroll for smooth scrolling
   - Lottie for complex vector animations
   - Splitting.js for text animations
   - Custom React hooks wrapping all animation logic

2. **Page Transitions**: Originally used Barba.js, now implemented using Next.js router with custom transition components.

3. **Styling**: SCSS modules with a structured approach:
   - Base styles in `src/styles/base/`
   - Component styles in `src/styles/components/`
   - Page-specific styles in `src/styles/pages/`
   - Utility files in `src/styles/scss-utils/`

### Animation System Architecture

The animation system is centralized in custom hooks under `src/hooks/`:
- `usePreloader.ts` - Handles the initial site loading animation
- `useGSAPAnimations.ts` - Page-specific GSAP animations
- `useLocomotiveScroll.ts` - Smooth scroll implementation
- `useLottieAnimation.ts` - Lottie player integration
- `usePageTransition.ts` - Page transition effects
- `useScrollDirection.ts` - Header hide/show on scroll

Each page component integrates these hooks to maintain the original site's rich animations while benefiting from React's component lifecycle.

### Data Flow

- Project data is stored in `src/data/projects.ts`
- Global state managed through `AppContext` (loading states, transitions)
- Dynamic routes use the `[slug]` pattern for project detail pages

### Important Patterns

1. **Animation Cleanup**: All animation hooks return cleanup functions to prevent memory leaks
2. **Lazy Loading**: Images use LazySizes for performance
3. **Font Loading**: Custom fonts are preloaded in the layout
4. **Responsive Design**: Mobile-first approach with SCSS breakpoint mixins