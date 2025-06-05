'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, createTimeline, animateTextIn, animateFadeIn, setupScrollTriggerWithLocomotive } from '@/lib/gsap';

export interface UseGSAPAnimationsOptions {
  page?: 'home' | 'about' | 'works' | 'contact' | 'playground';
  delay?: number;
  enableScrollTrigger?: boolean;
  locomotiveScroll?: any;
}

export const useGSAPAnimations = (options: UseGSAPAnimationsOptions = {}) => {
  const {
    page = 'home',
    delay = 0.7,
    enableScrollTrigger = true,
    locomotiveScroll
  } = options;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Home page animations based on handleAnimateHome.js
  const animateHome = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const chars = document.querySelectorAll('.hello-title span.char');
    const lottieHomeClone = document.getElementById('lottie-home__clone');
    
    if (lottieHomeClone) {
      gsap.set(lottieHomeClone, { autoAlpha: 1 });
    }
    gsap.set('.footer-clone', { autoAlpha: 1 });

    const tl = createTimeline({
      delay,
    });

    tl.from(chars, {
      yPercent: 110,
      duration: 1,
      stagger: { amount: 0.38, from: 'center' },
    })
    .from('.hello-sub span', { yPercent: 100 }, '<=80%')
    .from('.person-col2', { opacity: 0 }, '<=10%');

    timelineRef.current = tl;
  }, [delay]);

  // About page animations based on handleAnimateAbout.js
  const animateAbout = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!locomotiveScroll || !enableScrollTrigger) return;

    // Setup ScrollTrigger with Locomotive
    setupScrollTriggerWithLocomotive(locomotiveScroll);

    // Temporarily disable text splitting to fix SSR issues
    // TODO: Re-implement text splitting with a different approach
    console.log('Text splitting disabled for SSR compatibility');

    // Hero timeline
    const heroTimeline = createTimeline({
      delay: 0.85,
    });

    heroTimeline.from(
      '.about-title .is-children',
      {
        yPercent: 100,
        duration: 0.8,
        stagger: { amount: 0.25 },
      },
      'start'
    );

    // Section animations
    const sections = gsap.utils.toArray('.sec-animate');
    sections.forEach((section, i) => {
      const numbers = document.querySelector('.about-footer');
      if (!numbers) return;

      const el1 = numbers.querySelector(`span.about-footer__${i}`);
      const el2 = numbers.querySelector(`span.about-text__${i}`);

      const onAnimateEnter = () => {
        gsap.set('.about-attr', { autoAlpha: 0 });
        gsap.set([el1, el2], { autoAlpha: 1 });
      };

      const trigger = ScrollTrigger.create({
        trigger: section as Element,
        start: 'top 100%',
        end: 'top top',
        scrub: true,
        onEnter: onAnimateEnter,
        onLeaveBack: onAnimateEnter,
      });

      scrollTriggersRef.current.push(trigger);
    });

    // Parallax sections
    gsap.set('.about-full__inner', { yPercent: -80 });

    const parallaxSections = gsap.utils.toArray('.parallax-section');
    const innerSec = gsap.utils.toArray('.about-full__inner');
    
    parallaxSections.forEach((parallaxSection, i) => {
      const parallax = gsap.timeline({ paused: true });
      parallax.to(innerSec[i] as Element, { yPercent: 0, ease: 'none' });

      const trigger = ScrollTrigger.create({
        trigger: parallaxSection as Element,
        start: 'bottom bottom',
        end: '+=100%',
        animation: parallax,
        scrub: true,
      });

      scrollTriggersRef.current.push(trigger);
    });

    // Pin about section
    const pinTrigger = ScrollTrigger.create({
      trigger: '.about',
      start: 'bottom bottom',
      end: '+=100%',
      pin: true,
      pinSpacing: false,
      scrub: 1,
      pinType: 'transform',
    });

    scrollTriggersRef.current.push(pinTrigger);

    // Heading animations
    const triggerHeading = (element: string) => {
      return gsap.from(element, {
        yPercent: 105,
        duration: 0.8,
        stagger: { amount: 0.25 },
        scrollTrigger: {
          trigger: element,
          start: '100% 100%',
        },
      });
    };

    // Process, award, and clients titles
    const processTitle = document.querySelectorAll('.process-title span.is-children');
    const awardTitle = document.querySelectorAll('.award-title h3 span.is-children');
    const clientsTitle = document.querySelectorAll('.clients-title span.is-children');

    if (processTitle.length) triggerHeading('.process-title span.is-children');
    if (awardTitle.length) triggerHeading('.award-title h3 span.is-children');
    if (clientsTitle.length) triggerHeading('.clients-title span.is-children');

    // Client items background animation
    const clientItems = document.querySelectorAll('.clients-item');
    clientItems.forEach((item) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to(item, {
          backgroundPositionX: '0%',
          stagger: 1,
        }),
      });

      scrollTriggersRef.current.push(trigger);
    });

    // Image mask animations
    gsap.set('.about-mask', {
      zIndex: (i, target, targets) => targets.length - i,
    });

    const masks = gsap.utils.toArray('.about-mask');
    const allIMGsNotLast = masks.slice(0, -1);
    const action = gsap
      .timeline({ defaults: { ease: 'none', stagger: 1 } })
      .to(allIMGsNotLast as Element[], { autoAlpha: 0, duration: 0 }, 1);

    const maskTrigger = ScrollTrigger.create({
      trigger: '.about-image',
      start: 'top 100%',
      end: 'bottom 110%',
      animation: action,
      scrub: 0.1,
    });

    scrollTriggersRef.current.push(maskTrigger);

    // Email menu animation
    const emailTrigger = ScrollTrigger.create({
      trigger: '.email',
      start: 'top 10%',
      end: 'top 10%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to('.menu', { autoAlpha: 1 });
      },
      onLeave: () => {
        gsap.set('.menu', { autoAlpha: 1, immediateRender: false });
      },
    });

    scrollTriggersRef.current.push(emailTrigger);

    timelineRef.current = heroTimeline;
  }, [locomotiveScroll, enableScrollTrigger]);

  // Works page animations
  const animateWorks = useCallback(() => {
    if (typeof window === 'undefined') return;
    // Basic works page animations
    const tl = createTimeline({ delay });
    
    // Add works-specific animations here
    const workItems = document.querySelectorAll('.work-item');
    if (workItems.length) {
      tl.from(workItems, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
      });
    }

    timelineRef.current = tl;
  }, [delay]);

  // Contact page animations
  const animateContact = useCallback(() => {
    if (typeof window === 'undefined') return;
    const tl = createTimeline({ delay });
    
    // Add contact-specific animations here
    const contactElements = document.querySelectorAll('.contact-element');
    if (contactElements.length) {
      tl.from(contactElements, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
      });
    }

    timelineRef.current = tl;
  }, [delay]);

  // Playground page animations
  const animatePlayground = useCallback(() => {
    if (typeof window === 'undefined') return;
    const tl = createTimeline({ delay });
    
    // Add playground-specific animations here
    const playgroundItems = document.querySelectorAll('.playground-item');
    if (playgroundItems.length) {
      tl.from(playgroundItems, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      });
    }

    timelineRef.current = tl;
  }, [delay]);

  // Setup hobby hover animations for about page
  const setupHobbyHovers = useCallback(() => {
    if (typeof window === 'undefined') return;
    const hobbyHovers = document.querySelectorAll('.hobby-hover');
    const hobbyImages = document.querySelectorAll('.hobby-image__item');
    const hobbyOuter = document.querySelector('.hobby-image');

    if (!hobbyOuter || !hobbyImages.length) return;

    gsap.set(hobbyImages[0], { x: '0', y: '0', rotation: 0, scale: 1 });

    hobbyHovers.forEach((item, i) => {
      const handleEnter = () => {
        const newItem = (hobbyImages[i] as Element).cloneNode(true) as Element;
        hobbyOuter.append(newItem);
        
        gsap.set(newItem, {
          x: '100%',
          y: '100%',
          rotation: '-35deg',
          scale: 1.1,
        });

        gsap.killTweensOf(newItem);
        gsap.killTweensOf(hobbyImages[i]);

        gsap.to([newItem, hobbyImages[i]], {
          x: '0',
          rotation: 0,
          y: '0',
          duration: 1.2,
          ease: 'power1.inOut',
          onComplete: () => {
            newItem.remove();
            hobbyImages.forEach((el) => {
              if (el !== hobbyImages[i]) {
                gsap.set(el, { clearProps: 'all' });
              }
            });
          },
        });

        gsap.to([newItem, hobbyImages[i]], {
          scale: 1,
          duration: 1.2,
          ease: 'power1.inOut',
          delay: 0.35,
        });

        hobbyHovers.forEach((hobbyHover) => {
          hobbyHover.classList.remove('active');
        });
        hobbyHovers[i].classList.add('active');
      };

      item.addEventListener('mouseenter', handleEnter);
    });
  }, []);

  // Main animation trigger based on page type
  const triggerAnimations = useCallback(() => {
    switch (page) {
      case 'home':
        animateHome();
        break;
      case 'about':
        animateAbout();
        setupHobbyHovers();
        break;
      case 'works':
        animateWorks();
        break;
      case 'contact':
        animateContact();
        break;
      case 'playground':
        animatePlayground();
        break;
      default:
        animateHome();
    }
  }, [page, animateHome, animateAbout, animateWorks, animateContact, animatePlayground, setupHobbyHovers]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];
    
    ScrollTrigger.refresh();
  }, []);

  // Effect to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [triggerAnimations, cleanup]);

  return {
    triggerAnimations,
    cleanup,
    timeline: timelineRef.current,
  };
};