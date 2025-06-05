# React Animation System Migration

This document outlines the migration from vanilla JavaScript animation modules to modern React hooks and components using TypeScript, GSAP, and Next.js best practices.

## Overview

The original static website used vanilla JavaScript modules with GSAP, Barba.js, and Locomotive Scroll for animations. This has been converted to a modern React-based system with proper TypeScript types, cleanup, and Next.js integration.

## Architecture

### Core Components

#### 1. GSAP Configuration (`src/lib/gsap.ts`)
Central configuration file for GSAP setup with:
- Plugin registration (ScrollTrigger, TextPlugin)
- Common easing curves and duration constants
- Utility functions for common animations
- ScrollTrigger integration with Locomotive Scroll

#### 2. Animation Hooks (`src/hooks/`)

**useGSAPAnimations**
- Converted from `handleAnimateHome.js`, `handleAnimateAbout.js`, etc.
- Page-specific animations with proper cleanup
- Supports home, about, works, contact, and playground pages
- Integrates with Locomotive Scroll for scroll-triggered animations

**useLocomotiveScroll**
- Converted from `locomotive.js`
- Smooth scrolling initialization and management
- Automatic cleanup and resize handling
- Event listener management

**useLottieAnimation**
- Converted from `handleLoadLottie.js`
- Lottie animation loading and management
- GSAP integration for visibility control
- Support for multiple animation instances

**usePreloader**
- Converted from `handlePreloader.js`
- Complex preloader sequence with multiple Lottie animations
- Responsive animations (desktop/mobile)
- Timeline management with proper cleanup

**usePageTransition**
- Converted from `pageTransition.js`
- Next.js router integration instead of Barba.js
- Page transition animations
- Text splitting and timeline management

#### 3. Animation Components (`src/components/animations/`)

**GSAPText**
- Text splitting component using Splitting.js
- Multiple animation types (slideUp, slideDown, fadeIn, scale)
- ScrollTrigger integration
- Imperative API for manual control

**ScrollTriggerSection**
- Wrapper component for scroll-triggered animations
- Multiple animation presets
- Parallax support
- Pin animations

**LottiePlayer**
- React wrapper for Lottie animations
- GSAP integration for enhanced control
- Event handling and imperative API
- Proper cleanup and error handling

**Preloader**
- Complete preloader component
- Integrates with usePreloader hook
- Responsive design
- Development mode skip option

## Usage Examples

### Basic Page Setup

```tsx
"use client";

import { useGSAPAnimations, useLocomotiveScroll } from "@/hooks";
import { GSAPText, LottiePlayer } from "@/components/animations";

export default function HomePage() {
  const { scroll } = useLocomotiveScroll();
  
  const { triggerAnimations } = useGSAPAnimations({
    page: 'home',
    delay: 0.7,
    enableScrollTrigger: true,
    locomotiveScroll: scroll,
  });

  return (
    <div data-scroll-container>
      <GSAPText
        as="h1"
        className="hero-title"
        splitBy="chars"
        animationType="slideUp"
        delay={0.7}
      >
        Your Title Here
      </GSAPText>
      
      <LottiePlayer
        id="hero-animation"
        src="/animations/hero.json"
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
```

### Text Animations

```tsx
<GSAPText
  as="h2"
  splitBy="words"
  animationType="slideUp"
  triggerOnVisible={true}
  scrollTriggerOptions={{
    start: "top 80%",
    end: "bottom 20%"
  }}
>
  Animated text that triggers on scroll
</GSAPText>
```

### Scroll-Triggered Sections

```tsx
<ScrollTriggerSection
  animationType="fadeIn"
  start="top 80%"
  stagger={0.1}
>
  <div>Content that fades in on scroll</div>
</ScrollTriggerSection>
```

### Lottie Animations

```tsx
<LottiePlayer
  id="my-animation"
  src="/animations/example.json"
  loop={false}
  autoplay={true}
  onComplete={() => console.log('Animation complete')}
  enableGsapIntegration={true}
/>
```

## Migration Benefits

### 1. Type Safety
- Full TypeScript support with proper type definitions
- Compile-time error checking
- Better IDE support and autocomplete

### 2. React Integration
- Proper component lifecycle management
- useEffect cleanup functions prevent memory leaks
- Server-side rendering compatibility

### 3. Modern Patterns
- Hooks for reusable logic
- Component composition
- Imperative APIs where needed

### 4. Performance
- Automatic cleanup of GSAP timelines and ScrollTriggers
- Efficient re-rendering with proper dependencies
- Optimized for Next.js and React 19

### 5. Developer Experience
- Clear separation of concerns
- Reusable components and hooks
- Comprehensive documentation and examples

## Setup Requirements

### Dependencies
```json
{
  "gsap": "^3.13.0",
  "@gsap/react": "^2.1.2",
  "locomotive-scroll": "^4.1.4",
  "lottie-react": "^2.4.1",
  "splitting": "^1.1.0"
}
```

### Layout Integration
The layout.tsx has been updated to include:
- Preloader component
- Locomotive scroll container
- Lottie library script
- Proper scroll container structure

### Page Structure
Pages should:
- Use the animation hooks for page-specific animations
- Include proper data attributes for scroll triggers
- Implement proper cleanup in useEffect

## Best Practices

### 1. Always Clean Up
```tsx
useEffect(() => {
  // Setup animations
  return () => {
    // Cleanup function automatically called
  };
}, []);
```

### 2. Use Proper Dependencies
```tsx
const { triggerAnimations } = useGSAPAnimations({
  page: 'home',
  locomotiveScroll: scroll, // Pass scroll instance
});
```

### 3. Handle Loading States
```tsx
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  if (scroll && isLoaded) {
    triggerAnimations();
  }
}, [scroll, isLoaded, triggerAnimations]);
```

### 4. Responsive Animations
```tsx
// Hooks automatically handle responsive breakpoints
// using ScrollTrigger.matchMedia internally
```

## Troubleshooting

### Common Issues

1. **Animations not triggering**: Ensure Locomotive Scroll is initialized
2. **Memory leaks**: Check that cleanup functions are properly implemented
3. **TypeScript errors**: Verify all imports and type definitions
4. **ScrollTrigger issues**: Make sure scroll container is properly set up

### Debug Mode
```tsx
// Enable ScrollTrigger markers for debugging
<ScrollTriggerSection markers={true} />
```

## Future Enhancements

1. **Animation Presets**: Create more animation presets for common patterns
2. **Performance Monitoring**: Add performance metrics for animations
3. **A11y Support**: Enhanced accessibility features for animations
4. **Animation Timeline Editor**: Visual editor for complex animation sequences

This migration provides a solid foundation for a modern, performant, and maintainable animation system while preserving all the original functionality and visual effects.