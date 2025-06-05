'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, createTimeline } from '@/lib/gsap';
import { useLottieAnimation } from './useLottieAnimation';

export interface UsePreloaderOptions {
  onComplete?: () => void;
  desktopBottomPosition?: string;
  mobileBottomPosition?: string;
}

export const usePreloader = (options: UsePreloaderOptions = {}) => {
  const {
    onComplete,
    desktopBottomPosition = '4rem',
    mobileBottomPosition = '1.6rem',
  } = options;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isLoadedRef = useRef(false);
  
  const {
    setupPreloaderSequence,
    playAnimation,
    destroyAllAnimations,
  } = useLottieAnimation();

  // Desktop preloader animation based on original handlePreloader.js
  const animatePreloaderDesktop = useCallback((position: string) => {
    const chars = document.querySelectorAll('.hello-title span.char');
    const count = document.getElementById('progress');

    if (!chars.length) return;

    // Play loader animation after delay
    setTimeout(() => {
      playAnimation('preloader-loader');
    }, 2800);

    // Hide cursor
    document.documentElement.classList.add('hide-cursor');

    const preloaderTl = createTimeline({
      defaults: { duration: 1.2, ease: 'expo.inOut' },
      onUpdate: () => {
        if (count) {
          count.innerHTML = '<span> Loading... </span>';
        }
      },
      onComplete: () => {
        gsap.to('.loader', { zIndex: 999 });
        if (count) {
          gsap.to(count, { autoAlpha: 0, delay: 0.1 });
        }
        document.documentElement.classList.remove('hide-cursor');
        
        if (onComplete) {
          onComplete();
        }
      },
    });

    preloaderTl
      .set('.loader', { zIndex: 1000 })
      .set('.hello-title', { perspective: 300 })
      .set('.preloader', { autoAlpha: 1 })
      .set('.footer', { left: '50%', bottom: '50%' })
      .from('.footer', { opacity: 0 })
      .to('.footer', { width: '100%' }, '+=1.05')
      .to('#lottie-loader', { opacity: 1 }, '-=1')
      .to('.footer', { bottom: position }, '+=4')
      .to('.footer', { width: 'auto' }, '-=0.25')
      .from(
        chars,
        {
          yPercent: 110,
          duration: 1,
          stagger: { amount: 0.38, from: 'center' },
          ease: 'power1.inOut',
        },
        '-=1.05'
      )
      .from('.hello-sub span', { yPercent: 100 }, '-=1.2')
      .from('.person-col2', { opacity: 0 }, '-=1')
      .from('.menu-home', { yPercent: 100 }, '-=0.8')
      .from('header', { opacity: 0 }, '-=1');

    timelineRef.current = preloaderTl;
  }, [playAnimation, onComplete]);

  // Mobile preloader animation
  const animatePreloaderMobile = useCallback((position: string) => {
    const chars = document.querySelectorAll('.hello-title span.char');

    if (!chars.length) return;

    // Play loader animation after delay
    setTimeout(() => {
      playAnimation('preloader-loader');
    }, 2000);

    const preloaderTl = createTimeline({
      defaults: { duration: 1.2, ease: 'expo.inOut' },
    });

    preloaderTl
      .set('.loader', { zIndex: 1000 })
      .set('.hello-title', { perspective: 300 })
      .set('.preloader', { autoAlpha: 1 })
      .set('.footer', { left: '50%', bottom: '50%' })
      .from('.footer', { opacity: 0 })
      .to('.footer', { bottom: position }, '+=1')
      .to('#lottie-loader', { opacity: 1 }, '-=1')
      .from(
        chars,
        {
          yPercent: 110,
          duration: 1,
          stagger: { amount: 0.38, from: 'center' },
          ease: 'power1.inOut',
        },
        '+=4'
      )
      .from('.hello-sub span', { yPercent: 105 }, '-=1.2')
      .from('.person-col2', { opacity: 0 }, '-=0.8')
      .from('.menu-home', { yPercent: 100 }, '-=0.6')
      .from('header', { opacity: 0 }, '-=1.4');

    timelineRef.current = preloaderTl;
  }, [playAnimation]);

  // Setup responsive preloader
  const setupPreloader = useCallback(() => {
    if (isLoadedRef.current) return;

    // Wait for DOM elements and animations to be available
    const checkAnimationsReady = () => {
      const homeEl = document.getElementById('lottie-home');
      const loaderEl = document.getElementById('lottie-loader');
      const dropEl = document.getElementById('lottie-drop');
      
      if (homeEl && loaderEl && dropEl) {
        // Elements exist, now try to setup the sequence
        setupPreloaderSequence();
      } else {
        // Elements not ready yet, check again
        setTimeout(checkAnimationsReady, 100);
      }
    };
    
    // Start checking for elements
    setTimeout(checkAnimationsReady, 100);

    // Setup responsive animations using ScrollTrigger.matchMedia
    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 769px)': () => {
        animatePreloaderDesktop(desktopBottomPosition);
      },
      // Mobile & tablet
      '(max-width: 768px)': () => {
        animatePreloaderMobile(mobileBottomPosition);
      },
    });

    // Setup final animations to hide preloader
    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 769px)': () => {
        const preloaderEl = document.querySelector('.preloader');
        if (preloaderEl) {
          gsap.to(preloaderEl, { zIndex: -9999, delay: -4.5 });
        }
      },
      // Mobile & tablet
      '(max-width: 768px)': () => {
        const preloaderEl = document.querySelector('.preloader');
        if (preloaderEl) {
          gsap.to(preloaderEl, { zIndex: -9999, delay: -5.5 });
        }
      },
    });

    isLoadedRef.current = true;
  }, [
    setupPreloaderSequence,
    animatePreloaderDesktop,
    animatePreloaderMobile,
    desktopBottomPosition,
    mobileBottomPosition,
  ]);

  // Start preloader sequence
  const startPreloader = useCallback(() => {
    setupPreloader();
  }, [setupPreloader]);

  // Skip preloader (for development)
  const skipPreloader = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    
    const preloaderElement = document.querySelector('.preloader');
    if (preloaderElement) {
      gsap.set(preloaderElement, { autoAlpha: 0, zIndex: -9999 });
    }
    document.documentElement.classList.remove('hide-cursor');
    
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    
    destroyAllAnimations();
    isLoadedRef.current = false;
    
    // Remove hide cursor class
    document.documentElement.classList.remove('hide-cursor');
  }, [destroyAllAnimations]);

  // Auto-start preloader on mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      startPreloader();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [startPreloader, cleanup]);

  return {
    startPreloader,
    skipPreloader,
    cleanup,
    timeline: timelineRef.current,
    isLoaded: isLoadedRef.current,
  };
};