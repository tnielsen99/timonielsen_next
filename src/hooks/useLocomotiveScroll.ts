'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface UseLocomotiveScrollOptions {
  smooth?: boolean;
  lerp?: number;
  multiplier?: number;
  scrollFromAnywhere?: boolean;
  tablet?: {
    smooth?: boolean;
  };
  smartphone?: {
    smooth?: boolean;
  };
  updateDelay?: number;
}

export const useLocomotiveScroll = (options: UseLocomotiveScrollOptions = {}) => {
  const {
    smooth = true,
    lerp = 0.085,
    multiplier = 0.85,
    scrollFromAnywhere = true,
    tablet = { smooth: false },
    smartphone = { smooth: false },
    updateDelay = 500,
  } = options;

  const scrollRef = useRef<any | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const initScroll = useCallback(async () => {
    if (typeof window === 'undefined') return;
    
    const container = document.querySelector('[data-scroll-container]') as HTMLElement;
    
    if (!container) {
      console.warn('LocomotiveScroll: Container with [data-scroll-container] not found');
      return;
    }

    containerRef.current = container;

    // Dynamically import LocomotiveScroll to avoid SSR issues
    const LocomotiveScroll = (await import('locomotive-scroll')).default;

    // Initialize LocomotiveScroll
    const scroll = new LocomotiveScroll({
      el: container,
      smooth,
      lerp,
      multiplier,
      scrollFromAnywhere,
      tablet,
      smartphone,
    });

    scrollRef.current = scroll;

    // Update scroll after initialization
    setTimeout(() => {
      if (scroll) {
        scroll.update();
      }
    }, updateDelay);

    return scroll;
  }, [smooth, lerp, multiplier, scrollFromAnywhere, tablet, smartphone, updateDelay]);

  const destroyScroll = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.destroy();
      scrollRef.current = null;
    }
  }, []);

  const updateScroll = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.update();
    }
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(target, options);
    }
  }, []);

  const start = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.start();
    }
  }, []);

  const stop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.stop();
    }
  }, []);

  // Event listener helpers
  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    if (scrollRef.current) {
      scrollRef.current.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string, callback: (...args: any[]) => void) => {
    if (scrollRef.current) {
      scrollRef.current.off(event, callback);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const scroll = initScroll();

    return () => {
      destroyScroll();
    };
  }, [initScroll, destroyScroll]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      updateScroll();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScroll]);

  return {
    scroll: scrollRef.current,
    container: containerRef.current,
    initScroll,
    destroyScroll,
    updateScroll,
    scrollTo,
    start,
    stop,
    on,
    off,
  };
};