# Timo Nielsen Portfolio - Next.js Version

A modern, animated portfolio website built with Next.js 15, featuring smooth animations, dynamic routing, and a fully responsive design. This is the Next.js conversion of the original static portfolio website.

## Overview

This portfolio showcases data science and engineering work with an emphasis on visual storytelling through animations and interactive elements. The site features:

- **Modern Stack**: Next.js 15 with App Router, TypeScript, and SCSS
- **Animation System**: GSAP v3 with Locomotive Scroll for smooth scrolling
- **Page Transitions**: Barba.js integration for seamless navigation
- **Dynamic Content**: Project pages with dynamic routing
- **Performance**: Optimized fonts, images, and animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd timonielsen-next
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration if needed.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts and global components
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── playground/        # Playground/experiments page
│   └── works/             # Work portfolio
│       └── [slug]/        # Dynamic work detail pages
├── components/            # Reusable React components
│   ├── animations/        # Animation-specific components
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   └── ui/               # UI components
├── styles/               # SCSS stylesheets
│   ├── base/             # Base styles (fonts, reset, layout)
│   ├── components/       # Component-specific styles
│   ├── pages/            # Page-specific styles
│   └── scss-utils/       # Variables, mixins, helpers
├── hooks/                # Custom React hooks
├── data/                 # Static data and content
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions and configurations
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Check TypeScript types
- `npm run clean` - Clean build artifacts

## Key Features

### Animation System
- **GSAP Integration**: Smooth, performant animations
- **Scroll Triggers**: Elements animate on scroll
- **Page Transitions**: Seamless navigation between pages
- **Locomotive Scroll**: Smooth scrolling with parallax effects

### Dynamic Routing
- **Work Portfolio**: Dynamic routes for project details (`/works/[slug]`)
- **SEO Optimized**: Proper meta tags and structured data
- **Type Safety**: Full TypeScript support

### Performance
- **Next.js 15**: Latest features and optimizations
- **Font Optimization**: Custom fonts with `next/font`
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic optimization

## Development Guidelines

### Adding New Pages
1. Create page in `src/app/[route]/page.tsx`
2. Add corresponding styles in `src/styles/pages/[route]/`
3. Update navigation in header component
4. Add animation handlers if needed

### Adding New Projects
1. Update `src/data/projects.ts` with project data
2. Add project images to `public/images/`
3. Dynamic routes automatically handle new projects

### Styling Guidelines
- Use SCSS modules for component styles
- Follow BEM methodology for class naming
- Use CSS custom properties for dynamic values
- Keep responsive design mobile-first

## Animation Development

### GSAP Animations
```typescript
// Example animation hook
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';

const MyComponent = () => {
  const { animateIn, animateOut } = useGSAPAnimations();
  // Component logic
};
```

### Scroll Triggers
```typescript
// Scroll-triggered animations
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
```

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Required variables for production:
- `NEXT_PUBLIC_SITE_URL` - Your domain URL
- `NODE_ENV=production`

### Recommended Platforms
- **Vercel** (recommended) - Automatic deployments
- **Netlify** - Static hosting with edge functions
- **Railway** - Full-stack hosting

## Troubleshooting

### Common Issues

1. **GSAP Animation Issues**
   - Ensure animations are wrapped in `useEffect`
   - Check for memory leaks in cleanup functions

2. **Font Loading**
   - Verify font files are in `public/fonts/`
   - Check `layout.tsx` font configuration

3. **Build Errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Check for missing dependencies

### Performance Tips
- Use `next/image` for all images
- Implement lazy loading for below-fold content
- Monitor bundle size with `npm run analyze`

## Contributing

1. Follow the existing code style and structure
2. Add TypeScript types for new features
3. Test animations across different devices
4. Update documentation for new features

## License

This project is private and proprietary.
