'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';

// Define Lottie animation configuration types
export interface LottieConfig {
  container: HTMLElement | string;
  renderer: 'svg' | 'canvas' | 'html';
  loop: boolean;
  autoplay: boolean;
  path?: string;
  animationData?: any;
}

export interface LottieAnimationInstance {
  play: () => void;
  pause: () => void;
  stop: () => void;
  destroy: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
  setSpeed: (speed: number) => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  goToAndPlay: (value: number, isFrame?: boolean) => void;
}

export interface UseLottieAnimationOptions {
  enableGsapIntegration?: boolean;
  autoSetVisibility?: boolean;
}

// Since we're using lottie-react, we'll need to adapt the original bodymovin approach
declare global {
  interface Window {
    bodymovin?: {
      loadAnimation: (config: LottieConfig) => LottieAnimationInstance;
    };
  }
}

export const useLottieAnimation = (options: UseLottieAnimationOptions = {}) => {
  const {
    enableGsapIntegration = true,
    autoSetVisibility = true,
  } = options;

  const animationsRef = useRef<Map<string, LottieAnimationInstance>>(new Map());

  // Wait for Lottie library to be loaded
  const waitForLottie = useCallback((): Promise<any> => {
    return new Promise((resolve) => {
      const checkLottie = () => {
        const lottieLib = window.bodymovin || (window as any).lottie;
        if (lottieLib) {
          resolve(lottieLib);
        } else {
          setTimeout(checkLottie, 100);
        }
      };
      checkLottie();
    });
  }, []);

  // Load lottie animation based on original handleLoadLottie.js
  const loadAnimation = useCallback((config: LottieConfig & { id: string }) => {
    const { id, ...lottieConfig } = config;
    
    if (typeof window === 'undefined') {
      return null;
    }
    
    // Check if we have lottie available (either as bodymovin or lottie global)
    const lottieLib = window.bodymovin || (window as any).lottie;
    
    if (!lottieLib) {
      console.warn('Lottie library not found. Available globals:', Object.keys(window));
      return null;
    }
    

    let container: HTMLElement | null = null;
    
    if (typeof lottieConfig.container === 'string') {
      container = document.getElementById(lottieConfig.container);
    } else {
      container = lottieConfig.container as HTMLElement;
    }

    if (!container) {
      console.warn(`Lottie container not found: ${lottieConfig.container}`);
      return null;
    }

    const animation = lottieLib.loadAnimation({
      ...lottieConfig,
      container,
    });

    animationsRef.current.set(id, animation);

    // Apply GSAP integration if enabled
    if (enableGsapIntegration && autoSetVisibility) {
      gsap.set(container, { autoAlpha: 1 });
    }

    return animation;
  }, [enableGsapIntegration, autoSetVisibility]);

  // Load default animations based on original code
  const loadDefaultAnimations = useCallback(() => {
    if (typeof window === 'undefined') return [];
    
    const animations = [];

    // Home animation
    const homeContainer = document.getElementById('lottie-home__clone');
    if (homeContainer) {
      const homeAnimation = loadAnimation({
        id: 'home',
        container: homeContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/Animate/HomeLoop.json',
      });
      animations.push(homeAnimation);
    }

    // Contact animation
    const contactContainer = document.getElementById('lottie-contact');
    if (contactContainer) {
      const contactAnimation = loadAnimation({
        id: 'contact',
        container: contactContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/Animate/2.json',
      });
      animations.push(contactAnimation);
    }

    // About animation
    const aboutContainer = document.getElementById('lottie-about');
    if (aboutContainer) {
      const aboutAnimation = loadAnimation({
        id: 'about',
        container: aboutContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/Animate/1.json',
      });
      animations.push(aboutAnimation);
    }

    // Email black animation
    const emailBlackContainer = document.getElementById('lottie-email__black');
    if (emailBlackContainer) {
      const emailBlackAnimation = loadAnimation({
        id: 'emailBlack',
        container: emailBlackContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/Animate/3.json',
      });
      animations.push(emailBlackAnimation);
    }

    return animations.filter(Boolean);
  }, [loadAnimation]);

  // Load preloader animations (from handlePreloader.js)
  const loadPreloaderAnimations = useCallback(async () => {
    if (typeof window === 'undefined') return [];
    
    // Wait for Lottie library to be loaded
    await waitForLottie();
    
    const animations = [];

    // Home animation
    const homeContainer = document.getElementById('lottie-home');
    if (homeContainer) {
      const homeAnimation = loadAnimation({
        id: 'preloader-home',
        container: homeContainer,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/images/Animate/HomeLoop.json',
      });
      animations.push(homeAnimation);
    }

    // Loader animation
    const loaderContainer = document.getElementById('lottie-loader');
    if (loaderContainer) {
      const loaderAnimation = loadAnimation({
        id: 'preloader-loader',
        container: loaderContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/images/Animate/HomeLoop.json',
      });
      animations.push(loaderAnimation);
    }

    // Drop animation
    const dropContainer = document.getElementById('lottie-drop');
    if (dropContainer) {
      const dropAnimation = loadAnimation({
        id: 'preloader-drop',
        container: dropContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/images/Animate/HomeDrop.json',
      });
      animations.push(dropAnimation);
    }

    // Set initial opacity to 0 for preloader animations
    if (enableGsapIntegration && typeof window !== 'undefined') {
      const targets = ['#lottie-drop', '#lottie-home', '#lottie-loader'];
      targets.forEach(target => {
        const element = document.querySelector(target);
        if (element) {
          gsap.set(element, { opacity: 0 });
        }
      });
    }

    return animations.filter(Boolean);
  }, [loadAnimation, enableGsapIntegration, waitForLottie]);

  // Get animation by ID
  const getAnimation = useCallback((id: string) => {
    return animationsRef.current.get(id) || null;
  }, []);

  // Play animation
  const playAnimation = useCallback((id: string) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.play();
    }
  }, [getAnimation]);

  // Pause animation
  const pauseAnimation = useCallback((id: string) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.pause();
    }
  }, [getAnimation]);

  // Stop animation
  const stopAnimation = useCallback((id: string) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.stop();
    }
  }, [getAnimation]);

  // Set animation speed
  const setAnimationSpeed = useCallback((id: string, speed: number) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.setSpeed(speed);
    }
  }, [getAnimation]);

  // Add event listener to animation
  const addEventListener = useCallback((id: string, event: string, callback: () => void) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.addEventListener(event, callback);
    }
  }, [getAnimation]);

  // Remove event listener from animation
  const removeEventListener = useCallback((id: string, event: string, callback: () => void) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.removeEventListener(event, callback);
    }
  }, [getAnimation]);

  // Destroy specific animation
  const destroyAnimation = useCallback((id: string) => {
    const animation = getAnimation(id);
    if (animation) {
      animation.destroy();
      animationsRef.current.delete(id);
    }
  }, [getAnimation]);

  // Destroy all animations
  const destroyAllAnimations = useCallback(() => {
    animationsRef.current.forEach((animation, id) => {
      animation.destroy();
    });
    animationsRef.current.clear();
  }, []);

  // Helper function to setup the actual animation sequence
  const setupAnimationSequence = useCallback((loaderAnimation: any, dropAnimation: any, homeAnimation: any) => {
    // Setup animation sequence
    loaderAnimation.addEventListener('complete', () => {
      if (enableGsapIntegration) {
        gsap.set('#lottie-loader', { opacity: 0 });
        gsap.set('#lottie-drop', { opacity: 1 });
      }
      dropAnimation.play();
    });

    dropAnimation.addEventListener('complete', () => {
      if (enableGsapIntegration) {
        gsap.set('#lottie-home', { opacity: 1 });
        gsap.to('#lottie-drop', { opacity: 0, duration: 0 });
      }
      homeAnimation.play();
    });
  }, [enableGsapIntegration]);

  // Setup preloader animation sequence based on original code
  const setupPreloaderSequence = useCallback(() => {
    const loaderAnimation = getAnimation('preloader-loader');
    const dropAnimation = getAnimation('preloader-drop');
    const homeAnimation = getAnimation('preloader-home');

    if (!loaderAnimation || !dropAnimation || !homeAnimation) {
      console.warn('Preloader animations not found - retrying in 200ms');
      // Retry after a longer delay
      setTimeout(() => {
        const retryLoader = getAnimation('preloader-loader');
        const retryDrop = getAnimation('preloader-drop');
        const retryHome = getAnimation('preloader-home');
        
        if (!retryLoader || !retryDrop || !retryHome) {
          console.warn('Preloader animations still not found after retry');
          return;
        }
        
        // Setup the animations with retry values
        setupAnimationSequence(retryLoader, retryDrop, retryHome);
      }, 200);
      return;
    }

    setupAnimationSequence(loaderAnimation, dropAnimation, homeAnimation);
  }, [getAnimation, setupAnimationSequence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyAllAnimations();
    };
  }, [destroyAllAnimations]);

  return {
    loadAnimation,
    loadDefaultAnimations,
    loadPreloaderAnimations,
    getAnimation,
    playAnimation,
    pauseAnimation,
    stopAnimation,
    setAnimationSpeed,
    addEventListener,
    removeEventListener,
    destroyAnimation,
    destroyAllAnimations,
    setupPreloaderSequence,
    animations: animationsRef.current,
  };
};