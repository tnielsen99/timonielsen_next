'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap, ScrollTrigger, createScrollTrigger } from '@/lib/gsap';

export interface ScrollTriggerSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'parallax' | 'pin' | 'custom';
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  pinSpacing?: boolean;
  snap?: boolean | any;
  toggleActions?: string;
  markers?: boolean;
  once?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  customAnimation?: (element: HTMLElement, timeline: gsap.core.Timeline) => void;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (progress: number) => void;
  parallaxSpeed?: number;
  refreshDeps?: any[];
}

export const ScrollTriggerSection = forwardRef<any, ScrollTriggerSectionProps>(({
  children,
  className = '',
  as: Component = 'div',
  animationType = 'fadeIn',
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  pinSpacing = true,
  snap = false,
  toggleActions = 'play none none none',
  markers = false,
  once = true,
  delay = 0,
  duration = 1,
  ease = 'power1.inOut',
  stagger = 0.1,
  customAnimation,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  onUpdate,
  parallaxSpeed = 0.5,
  refreshDeps = [],
}, ref) => {
  const elementRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Create the animation based on type
  const createAnimation = () => {
    const element = elementRef.current;
    if (!element) return;

    // Kill existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Create timeline
    const timeline = gsap.timeline({ paused: true });

    // Get child elements for stagger animations
    const children = element.children;
    const childArray = Array.from(children);

    // Create animation based on type
    switch (animationType) {
      case 'fadeIn':
        timeline.from(element, {
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'slideUp':
        timeline.from(element, {
          y: 50,
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            y: 30,
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'slideDown':
        timeline.from(element, {
          y: -50,
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            y: -30,
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'slideLeft':
        timeline.from(element, {
          x: 50,
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            x: 30,
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'slideRight':
        timeline.from(element, {
          x: -50,
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            x: -30,
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'scale':
        timeline.from(element, {
          scale: 0.8,
          opacity: 0,
          duration,
          ease,
          delay,
        });
        if (childArray.length > 1) {
          timeline.from(childArray, {
            scale: 0.9,
            opacity: 0,
            duration: duration * 0.8,
            stagger,
            ease,
          }, delay);
        }
        break;

      case 'parallax':
        timeline.to(element, {
          y: `${-100 * parallaxSpeed}%`,
          ease: 'none',
        });
        break;

      case 'pin':
        // Pin animation doesn't need a timeline, just ScrollTrigger
        break;

      case 'custom':
        if (customAnimation) {
          customAnimation(element, timeline);
        }
        break;

      default:
        timeline.from(element, {
          opacity: 0,
          duration,
          ease,
          delay,
        });
    }

    timelineRef.current = timeline;

    // Create ScrollTrigger
    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: element,
      start,
      end,
      scrub,
      pin: animationType === 'pin' ? true : pin,
      pinSpacing,
      snap,
      toggleActions,
      markers,
      once,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      onUpdate: onUpdate ? (self: any) => onUpdate(self.progress) : undefined,
    };

    // Add animation if not pin type
    if (animationType !== 'pin') {
      (scrollTriggerConfig as any).animation = timeline;
    }

    const scrollTriggerInstance = ScrollTrigger.create(scrollTriggerConfig);
    scrollTriggerRef.current = scrollTriggerInstance;

    return { timeline, scrollTrigger: scrollTriggerInstance };
  };

  // Initialize animation
  useEffect(() => {
    const timer = setTimeout(() => {
      createAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [
    animationType,
    start,
    end,
    scrub,
    pin,
    pinSpacing,
    snap,
    toggleActions,
    markers,
    once,
    delay,
    duration,
    ease,
    stagger,
    parallaxSpeed,
    ...refreshDeps,
  ]);

  // Refresh on dependency changes
  useEffect(() => {
    if (scrollTriggerRef.current) {
      ScrollTrigger.refresh();
    }
  }, refreshDeps);

  // Manual trigger methods
  const refresh = () => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.refresh();
    }
  };

  const kill = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }
  };

  const play = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const pause = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  };

  const reverse = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  // Forward ref handling
  const combinedRef = (node: HTMLElement | null) => {
    elementRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  // Expose imperative methods
  React.useImperativeHandle(ref, () => ({
    element: elementRef.current,
    refresh,
    kill,
    play,
    pause,
    reverse,
    timeline: timelineRef.current,
    scrollTrigger: scrollTriggerRef.current,
  }));

  return React.createElement(
    Component,
    {
      ref: combinedRef,
      className: `scroll-trigger-section ${className}`.trim(),
      'data-scroll-trigger': animationType,
    },
    children
  );
});

ScrollTriggerSection.displayName = 'ScrollTriggerSection';

export default ScrollTriggerSection;