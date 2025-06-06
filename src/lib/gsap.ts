'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
  // Remove any loading states after GSAP is ready
  if (typeof document !== 'undefined') {
    requestAnimationFrame(() => {
      // Use class-based approach to avoid hydration issues
      document.documentElement.classList.remove('preloader-active');
      document.body.classList.add('gsap-ready');
      
      console.log('GSAP: Plugins registered and ready');
    });
  }
}

// GSAP configuration constants
export const GSAP_CONFIG = {
  // Easing curves based on original code
  eases: {
    power1InOut: 'power1.inOut',
    expoInOut: 'expo.inOut',
    none: 'none',
  },
  
  // Default durations
  durations: {
    short: 0.8,
    medium: 1.2,
    long: 1.6,
  },
  
  // Default stagger amounts
  staggers: {
    text: 0.38,
    elements: 0.25,
    small: 0.025,
  },
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 100%',
    end: 'bottom top',
    scrub: true,
  },
} as const;

// Utility function to create GSAP timeline with common defaults
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline({
    defaults: { 
      ease: GSAP_CONFIG.eases.power1InOut,
      duration: GSAP_CONFIG.durations.medium,
    },
    ...options,
  });
};

// Utility function for text animations
export const animateTextIn = (
  elements: string | Element | Element[],
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    yPercent?: number;
  }
) => {
  const {
    delay = 0,
    stagger = GSAP_CONFIG.staggers.text,
    duration = GSAP_CONFIG.durations.short,
    yPercent = 110,
  } = options || {};

  return gsap.from(elements, {
    yPercent,
    duration,
    stagger: { amount: stagger, from: 'center' },
    ease: GSAP_CONFIG.eases.power1InOut,
    delay,
  });
};

// Utility function for fade in animations
export const animateFadeIn = (
  elements: string | Element | Element[],
  options?: {
    delay?: number;
    duration?: number;
    opacity?: number;
  }
) => {
  const {
    delay = 0,
    duration = GSAP_CONFIG.durations.medium,
    opacity = 0,
  } = options || {};

  return gsap.from(elements, {
    opacity,
    duration,
    ease: GSAP_CONFIG.eases.power1InOut,
    delay,
  });
};

// Utility function for scale animations
export const animateScale = (
  elements: string | Element | Element[],
  options?: {
    delay?: number;
    duration?: number;
    scale?: number;
    ease?: string;
  }
) => {
  const {
    delay = 0,
    duration = GSAP_CONFIG.durations.medium,
    scale = 0,
    ease = GSAP_CONFIG.eases.power1InOut,
  } = options || {};

  return gsap.from(elements, {
    scale,
    duration,
    ease,
    delay,
  });
};

// ScrollTrigger utility for creating scroll-based animations
export const createScrollTrigger = (
  trigger: string | Element,
  animation: gsap.core.Animation,
  options?: ScrollTrigger.Vars
) => {
  return ScrollTrigger.create({
    trigger,
    animation,
    start: GSAP_CONFIG.scrollTrigger.start,
    end: GSAP_CONFIG.scrollTrigger.end,
    scrub: GSAP_CONFIG.scrollTrigger.scrub,
    ...options,
  });
};

// Cleanup function for ScrollTrigger
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh(true);
};

// Set up ScrollTrigger with LocomotiveScroll
export const setupScrollTriggerWithLocomotive = (scroll: any) => {
  if (typeof window === 'undefined') return;
  
  const scrollContainer = document.querySelector('[data-scroll-container]');
  
  if (!scrollContainer || !scroll) return;

  scroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: (scrollContainer as HTMLElement).style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.defaults({ scroller: scrollContainer });
  ScrollTrigger.addEventListener('refresh', () => scroll.update());
  ScrollTrigger.refresh(true);
};

export { gsap, ScrollTrigger };