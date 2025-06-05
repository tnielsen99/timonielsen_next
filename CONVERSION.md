# HTML to Next.js Conversion

This document outlines the conversion from the original HTML/CSS/JS portfolio to Next.js.

## Converted Pages

### ✅ Completed
- **Home Page** (`/` - `src/app/page.tsx`)
  - Hero section with animated title
  - Person section with images and descriptions
  - Preloader with Lottie animations
  - All data attributes preserved for animations

- **About Page** (`/about` - `src/app/about/page.tsx`)
  - Hero section with intro text
  - Hobby images gallery
  - Skills and expertise section
  - Process workflow section
  - Awards and certifications
  - Clients section
  - Contact section

- **Contact Page** (`/contact` - `src/app/contact/page.tsx`)
  - Contact title and description
  - Professional location info
  - Email and LinkedIn links
  - Contact form area

- **Playground Page** (`/playground` - `src/app/playground/page.tsx`)
  - Technical experiments showcase
  - Project grid with images and descriptions
  - Scroll animations preserved

- **Works Page** (`/works` - `src/app/works/page.tsx`)
  - Project slider interface
  - Multiple time periods (2013-2024)
  - Interactive project cards
  - Drag functionality preserved

- **Work Detail Pages** (`/works/[slug]` - `src/app/works/[slug]/page.tsx`)
  - Dynamic routing for individual projects
  - Project data structure in `/src/data/projects.ts`
  - Hero section, features, implementation details
  - Image gallery and navigation

## Reusable Components

### UI Components
- `SectionTitle` - Standardized section titles with optional dots
- `ProjectCard` - Reusable project display cards
- `AnimatedText` - Text animation wrapper with Splitting.js integration

### Layout Components
- `Header` - Navigation with logo, menu, and burger button
- `Footer` - Simple footer with company info
- `Transition` - Page transition overlay component
- `Loader` - Loading progress indicator
- `MobileMenu` - Mobile navigation menu

## Key Features Preserved

1. **Animation Data Attributes** - All `data-splitting`, `data-scroll`, and custom attributes maintained
2. **CSS Classes** - Original class names preserved for styling compatibility
3. **Image Structure** - Image paths updated to Next.js `public/images/` structure
4. **Navigation** - Menu structure and data attributes maintained
5. **Dynamic Content** - Project data externalized to TypeScript files

## Next.js Features Utilized

- **App Router** - Modern Next.js 13+ routing structure
- **Image Optimization** - Next.js Image component for better performance
- **TypeScript** - Full type safety throughout the application
- **Font Optimization** - Local font loading with Next.js font optimization
- **Client Components** - "use client" directive for interactive components

## Dependencies Required

```json
{
  "gsap": "^3.12.x",
  "locomotive-scroll": "^4.1.x", 
  "splitting": "^1.0.x",
  "lottie-web": "^5.9.x"
}
```

## Animation Libraries Integration

The original animations can be initialized in the `useEffect` hooks of each page component:

- GSAP for general animations
- Locomotive Scroll for smooth scrolling
- Splitting.js for text animations
- Lottie for vector animations

## File Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── playground/page.tsx # Playground page
│   ├── works/
│   │   ├── page.tsx        # Works listing
│   │   └── [slug]/page.tsx # Work detail pages
├── components/
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── data/
│   └── projects.ts         # Project data
├── styles/
│   └── globals.scss        # Global styles (existing SCSS)
└── types/
    └── index.ts            # TypeScript definitions
```

## Notes for Animation Integration

1. Initialize animation libraries in `useEffect` hooks
2. Ensure proper cleanup on component unmount
3. Use Next.js dynamic imports for client-side only libraries
4. Maintain original DOM structure for animation compatibility
5. Consider using a context provider for global animation state

## Image Assets

All images have been copied to the `public/images/` directory and paths updated accordingly. The Next.js Image component provides:
- Automatic optimization
- Lazy loading
- WebP conversion where supported
- Responsive image sizing