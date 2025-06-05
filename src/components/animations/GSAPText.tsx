'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { gsap, animateTextIn } from '@/lib/gsap';

export interface GSAPTextProps {
  children: React.ReactNode;
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  animationType?: 'slideUp' | 'slideDown' | 'fadeIn' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  stagger?: number;
  yPercent?: number;
  triggerOnVisible?: boolean;
  scrollTriggerOptions?: any;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
  autoPlay?: boolean;
}

export const GSAPText = forwardRef<any, GSAPTextProps>(({
  children,
  className = '',
  splitBy = 'chars',
  animationType = 'slideUp',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  yPercent = 110,
  triggerOnVisible = false,
  scrollTriggerOptions = {},
  as: Component = 'div',
  once = true,
  autoPlay = true,
}, ref) => {
  const elementRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  // Create the split text animation
  const createAnimation = async () => {
    const element = elementRef.current;
    if (!element || (once && hasAnimatedRef.current)) return;

    // For now, disable splitting and just animate the element as a whole
    // TODO: Re-implement text splitting with a different approach
    let targets: Element[] = [element];

    if (targets.length === 0) return;

    // Create animation based on type
    let animation: gsap.core.Animation | null = null;

    switch (animationType) {
      case 'slideUp':
        animation = gsap.from(targets, {
          yPercent,
          duration,
          stagger: { amount: stagger * targets.length, from: 'start' },
          ease: 'power1.inOut',
          delay,
        });
        break;
      
      case 'slideDown':
        animation = gsap.from(targets, {
          yPercent: -yPercent,
          duration,
          stagger: { amount: stagger * targets.length, from: 'start' },
          ease: 'power1.inOut',
          delay,
        });
        break;
      
      case 'fadeIn':
        animation = gsap.from(targets, {
          opacity: 0,
          duration,
          stagger: { amount: stagger * targets.length, from: 'start' },
          ease: 'power1.inOut',
          delay,
        });
        break;
      
      case 'scale':
        animation = gsap.from(targets, {
          scale: 0,
          duration,
          stagger: { amount: stagger * targets.length, from: 'center' },
          ease: 'back.out(1.7)',
          delay,
        });
        break;
      
      case 'none':
        return;
      
      default:
        animation = animateTextIn(targets, {
          delay,
          stagger: stagger * targets.length,
          duration,
          yPercent,
        });
    }

    // Setup ScrollTrigger if needed
    if (triggerOnVisible && animation) {
      gsap.set(animation, { paused: true });
      
      gsap.registerEffect({
        name: 'scrollTriggerText',
        effect: (targets: Element[], config: any) => {
          return gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none none',
              once: true,
              ...scrollTriggerOptions,
              onEnter: () => {
                if (animation) {
                  animation.play();
                  hasAnimatedRef.current = true;
                }
              },
            },
          });
        },
      });

      gsap.effects.scrollTriggerText(targets, {});
    } else if (autoPlay && animation) {
      animation.play();
      hasAnimatedRef.current = true;
    }

    return animation;
  };

  // Initialize animation
  useEffect(() => {
    if (!autoPlay || triggerOnVisible) return;
    
    const timer = setTimeout(async () => {
      await createAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [autoPlay, triggerOnVisible]);

  // Setup scroll trigger animation
  useEffect(() => {
    if (!triggerOnVisible) return;
    
    const timer = setTimeout(async () => {
      await createAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [triggerOnVisible]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Manual trigger function
  const trigger = async () => {
    if (!hasAnimatedRef.current || !once) {
      await createAnimation();
    }
  };

  // Reset function
  const reset = () => {
    hasAnimatedRef.current = false;
    if (timelineRef.current) {
      timelineRef.current.kill();
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
    trigger,
    reset,
  }));

  return React.createElement(
    Component,
    {
      ref: combinedRef,
      className: `gsap-text ${className}`.trim(),
      'data-splitting': splitBy,
    },
    children
  );
});

GSAPText.displayName = 'GSAPText';

export default GSAPText;