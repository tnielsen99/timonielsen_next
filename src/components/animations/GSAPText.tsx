'use client';

import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { gsap, animateTextIn } from '@/lib/gsap';
import { loadSplitting } from '@/lib/splitting';

// Import CSS statically to avoid HMR issues
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

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
  const [Splitting, setSplitting] = useState<any>(null);

  // Load Splitting.js dynamically
  useEffect(() => {
    loadSplitting().then(setSplitting).catch(console.error);
  }, []);

  // Create the split text animation
  const createAnimation = async () => {
    const element = elementRef.current;
    if (!element || (once && hasAnimatedRef.current)) return;

    // Apply text splitting
    let targets: Element[] = [element];
    
    if (splitBy !== 'lines' && animationType !== 'none') {
      if (Splitting && typeof Splitting === 'function') {
        // Use Splitting.js if available and is a function
        try {
          const results = Splitting({
            target: element,
            by: splitBy,
          });
          
          if (results && results.length > 0) {
            const result = results[0];
            if (splitBy === 'chars' && result.chars) {
              targets = result.chars;
            } else if (splitBy === 'words' && result.words) {
              targets = result.words;
            }
          }
        } catch (error) {
          console.warn('Splitting.js failed, using fallback animation:', error);
        }
      }
      
      // Fallback: if Splitting isn't available or failed, check for existing splits
      if (targets.length === 1 && targets[0] === element) {
        // Check if text has already been split by looking for splitting classes
        const existingChars = element.querySelectorAll('.char');
        const existingWords = element.querySelectorAll('.word');
        
        if (splitBy === 'chars' && existingChars.length > 0) {
          targets = Array.from(existingChars);
        } else if (splitBy === 'words' && existingWords.length > 0) {
          targets = Array.from(existingWords);
        } else {
          // Use fallback: animate the whole element
          // console.log('Using fallback animation for:', element.textContent?.trim());
        }
      }
    }

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
    }, 500); // Increased delay to allow Splitting to load

    return () => clearTimeout(timer);
  }, [autoPlay, triggerOnVisible, Splitting]);

  // Setup scroll trigger animation
  useEffect(() => {
    if (!triggerOnVisible) return;
    
    const timer = setTimeout(async () => {
      await createAnimation();
    }, 500); // Increased delay to allow Splitting to load

    return () => clearTimeout(timer);
  }, [triggerOnVisible, Splitting]);

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