'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, createTimeline } from '@/lib/gsap';
import { useLocomotiveScroll } from './useLocomotiveScroll';
import { useGSAPAnimations } from './useGSAPAnimations';
import { usePreloader } from './usePreloader';

export interface UsePageTransitionOptions {
  enableBarbaIntegration?: boolean;
  transitionDuration?: number;
  delay?: number;
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
  const {
    enableBarbaIntegration = false, // Since we're using Next.js router
    transitionDuration = 1100,
    delay = 100,
  } = options;

  const router = useRouter();
  const { scroll, destroyScroll, initScroll } = useLocomotiveScroll();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef(false);

  // Enter animation based on original pageTransition.js
  const enterAnimation = useCallback(() => {
    if (typeof window === 'undefined') return Promise.resolve();
    
    const transitionItem = document.querySelector('.transition-item.active');
    const transitionItemChars = transitionItem?.querySelectorAll('span.char');
    const mainTransition = document.querySelector('.transition');
    const count = document.getElementById('progress');
    const ctaWorkDetail = document.querySelectorAll('.project-cta');

    if (!transitionItem || !transitionItemChars || !mainTransition) {
      console.warn('Transition elements not found');
      return Promise.resolve();
    }

    // Disable interactions during transition
    document.documentElement.classList.add('hide-cursor');
    ctaWorkDetail.forEach((cta) => {
      cta.classList.add('disable-hover');
    });

    const tlEnterAnimation = createTimeline({
      defaults: { duration: 1.2, ease: 'expo.inOut' },
      onUpdate: () => {
        if (count) {
          const countNumber = Math.round(tlEnterAnimation.progress() * 100);
          count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${countNumber}% </span>`;
        }
      },
      onComplete: () => {
        if (count) {
          count.innerHTML = `<span> Loading </span> - <span class="font-sec"> 100% </span>`;
          gsap.to(count, { autoAlpha: 0, delay: 0.1 });
        }
        gsap.to('.loader', { zIndex: 999 });
        document.documentElement.classList.remove('hide-cursor');
      },
    });

    gsap.set(mainTransition, { height: '100vh' });

    tlEnterAnimation
      .to(transitionItemChars, { y: '0%', duration: 0 })
      .to(mainTransition, { zIndex: 1000, duration: 0 })
      .from(mainTransition, {
        height: '16.203703703703702vh',
      })
      .to(
        transitionItemChars,
        { color: '#FFFFFF', stagger: { each: 0.04 } },
        '-=1'
      )
      .to(
        transitionItemChars,
        { color: '#282828', stagger: { each: -0.03 } },
        'label-=0.5'
      )
      .to(transitionItemChars, { opacity: 0 }, '<=20%')
      .to('.transition-item', { y: '-100%', ease: 'power1.inOut' }, 'label')
      .to(
        mainTransition,
        {
          top: '-60%',
        },
        'label'
      )
      .set(
        [
          mainTransition,
          transitionItem,
          '.transition-item',
          transitionItemChars,
        ],
        {
          clearProps: 'all',
        }
      );

    timelineRef.current = tlEnterAnimation;

    return new Promise<void>((resolve) => {
      setTimeout(resolve, transitionDuration);
    });
  }, [transitionDuration]);

  // Text splitting function based on original Splitting.js
  const initTextSplitting = useCallback(() => {
    // Temporarily disable text splitting to fix SSR issues
    // TODO: Re-implement text splitting with a different approach
    console.log('Text splitting disabled for SSR compatibility');
  }, []);

  // Initialize JS modules for the page
  const initJsModules = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Clear any existing menu animations
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach((item) => item.classList.remove('is-animating'));

    // Initialize text splitting
    initTextSplitting();

    // Refresh ScrollTrigger
    ScrollTrigger.refresh(true);
  }, [initTextSplitting]);

  // Handle page navigation with transitions
  const navigateWithTransition = useCallback(async (
    href: string,
    options?: { replace?: boolean }
  ) => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    try {
      // Start exit animation
      await enterAnimation();

      // Destroy locomotive scroll before navigation
      destroyScroll();

      // Navigate to new page
      if (options?.replace) {
        router.replace(href);
      } else {
        router.push(href);
      }

      // Wait for navigation to complete
      await new Promise(resolve => setTimeout(resolve, delay));

      // Reinitialize locomotive scroll
      initScroll();

      // Initialize new page modules
      initJsModules();

    } catch (error) {
      console.error('Page transition error:', error);
    } finally {
      isTransitioningRef.current = false;
    }
  }, [enterAnimation, destroyScroll, initScroll, initJsModules, router, delay]);

  // Setup page-specific animations based on route
  const setupPageAnimations = useCallback((pathname: string) => {
    const page = pathname.split('/')[1] || 'home';
    
    switch (page) {
      case 'home':
      case '':
        // Home page is handled by preloader
        break;
      case 'about':
        // About page animations will be handled by useGSAPAnimations
        break;
      case 'works':
        // Works page animations
        break;
      case 'contact':
        // Contact page animations
        break;
      case 'playground':
        // Playground page animations
        break;
      default:
        break;
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleRouteChange = (url: string) => {
      setupPageAnimations(url);
    };

    // Setup initial page
    setupPageAnimations(window.location.pathname);

    // Note: In Next.js 13+ with app router, we need to handle this differently
    // This is a placeholder for route change detection
    return () => {
      // Cleanup
    };
  }, [setupPageAnimations]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    
    isTransitioningRef.current = false;
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('hide-cursor');
    }
  }, []);

  // Page-specific transition handlers
  const transitionToHome = useCallback(async () => {
    await navigateWithTransition('/');
  }, [navigateWithTransition]);

  const transitionToAbout = useCallback(async () => {
    await navigateWithTransition('/about');
  }, [navigateWithTransition]);

  const transitionToWorks = useCallback(async () => {
    await navigateWithTransition('/works');
  }, [navigateWithTransition]);

  const transitionToContact = useCallback(async () => {
    await navigateWithTransition('/contact');
  }, [navigateWithTransition]);

  const transitionToPlayground = useCallback(async () => {
    await navigateWithTransition('/playground');
  }, [navigateWithTransition]);

  const transitionToWork = useCallback(async (slug: string) => {
    await navigateWithTransition(`/works/${slug}`);
  }, [navigateWithTransition]);

  // Enhanced navigation function with transition data
  const navigate = useCallback((
    destination: string | {
      path: string;
      namespace?: string;
      data?: any;
    },
    options?: { replace?: boolean }
  ) => {
    const href = typeof destination === 'string' ? destination : destination.path;
    return navigateWithTransition(href, options);
  }, [navigateWithTransition]);

  // Check if currently transitioning
  const isTransitioning = isTransitioningRef.current;

  return {
    navigate,
    navigateWithTransition,
    transitionToHome,
    transitionToAbout,
    transitionToWorks,
    transitionToContact,
    transitionToPlayground,
    transitionToWork,
    enterAnimation,
    initJsModules,
    cleanup,
    isTransitioning,
    timeline: timelineRef.current,
  };
};