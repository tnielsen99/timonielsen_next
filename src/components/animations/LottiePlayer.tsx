'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import { useLottieAnimation, LottieConfig, LottieAnimationInstance } from '@/hooks/useLottieAnimation';
import { gsap } from '@/lib/gsap';

export interface LottiePlayerProps {
  id: string;
  src: string;
  className?: string;
  renderer?: 'svg' | 'canvas' | 'html';
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  direction?: 1 | -1;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: () => void;
  onSegmentStart?: () => void;
  onDestroy?: () => void;
  onReady?: (instance: LottieAnimationInstance) => void;
  enableGsapIntegration?: boolean;
  autoSetVisibility?: boolean;
  segments?: [number, number][];
  goToFrame?: number;
  style?: React.CSSProperties;
}

export const LottiePlayer = forwardRef<any, LottiePlayerProps>(({
  id,
  src,
  className = '',
  renderer = 'svg',
  loop = true,
  autoplay = true,
  speed = 1,
  direction = 1,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onSegmentStart,
  onDestroy,
  onReady,
  enableGsapIntegration = true,
  autoSetVisibility = true,
  segments,
  goToFrame,
  style,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<LottieAnimationInstance | null>(null);
  
  const {
    loadAnimation,
    getAnimation,
    playAnimation,
    pauseAnimation,
    stopAnimation,
    setAnimationSpeed,
    addEventListener,
    removeEventListener,
    destroyAnimation,
  } = useLottieAnimation({
    enableGsapIntegration,
    autoSetVisibility,
  });

  // Initialize Lottie animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load the animation
    const animation = loadAnimation({
      id,
      container,
      renderer,
      loop,
      autoplay,
      path: src,
    });

    if (!animation) return;

    animationRef.current = animation;

    // Set initial speed and direction
    if (speed !== 1) {
      animation.setSpeed(speed);
    }

    // Setup event listeners
    if (onComplete) {
      animation.addEventListener('complete', onComplete);
    }

    if (onLoopComplete) {
      animation.addEventListener('loopComplete', onLoopComplete);
    }

    if (onEnterFrame) {
      animation.addEventListener('enterFrame', onEnterFrame);
    }

    if (onSegmentStart) {
      animation.addEventListener('segmentStart', onSegmentStart);
    }

    if (onDestroy) {
      animation.addEventListener('destroy', onDestroy);
    }

    // Call onReady callback
    if (onReady) {
      onReady(animation);
    }

    // Handle segments
    if (segments && segments.length > 0) {
      animation.goToAndPlay(segments[0][0], true);
    }

    // Handle goToFrame
    if (typeof goToFrame === 'number') {
      animation.goToAndStop(goToFrame, true);
    }

    // Cleanup function
    return () => {
      if (onComplete) {
        animation.removeEventListener('complete', onComplete);
      }
      if (onLoopComplete) {
        animation.removeEventListener('loopComplete', onLoopComplete);
      }
      if (onEnterFrame) {
        animation.removeEventListener('enterFrame', onEnterFrame);
      }
      if (onSegmentStart) {
        animation.removeEventListener('segmentStart', onSegmentStart);
      }
      if (onDestroy) {
        animation.removeEventListener('destroy', onDestroy);
      }
      
      destroyAnimation(id);
    };
  }, [
    id,
    src,
    renderer,
    loop,
    autoplay,
    speed,
    direction,
    loadAnimation,
    destroyAnimation,
    onReady,
  ]);

  // Update speed when prop changes
  useEffect(() => {
    if (animationRef.current && speed !== 1) {
      animationRef.current.setSpeed(speed);
    }
  }, [speed]);

  // Update segments when prop changes
  useEffect(() => {
    if (animationRef.current && segments && segments.length > 0) {
      animationRef.current.goToAndPlay(segments[0][0], true);
    }
  }, [segments]);

  // Update goToFrame when prop changes
  useEffect(() => {
    if (animationRef.current && typeof goToFrame === 'number') {
      animationRef.current.goToAndStop(goToFrame, true);
    }
  }, [goToFrame]);

  // Imperative methods
  const play = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  const pause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const stop = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  const goTo = (frame: number, isFrame: boolean = true) => {
    if (animationRef.current) {
      animationRef.current.goToAndStop(frame, isFrame);
    }
  };

  const goToAndPlay = (frame: number, isFrame: boolean = true) => {
    if (animationRef.current) {
      animationRef.current.goToAndPlay(frame, isFrame);
    }
  };

  const setSpeed = (newSpeed: number) => {
    if (animationRef.current) {
      animationRef.current.setSpeed(newSpeed);
    }
  };

  const destroy = () => {
    destroyAnimation(id);
  };

  // GSAP integration methods
  const fadeIn = (duration: number = 0.5) => {
    if (enableGsapIntegration && containerRef.current) {
      gsap.to(containerRef.current, { opacity: 1, duration });
    }
  };

  const fadeOut = (duration: number = 0.5) => {
    if (enableGsapIntegration && containerRef.current) {
      gsap.to(containerRef.current, { opacity: 0, duration });
    }
  };

  const scaleIn = (duration: number = 0.5) => {
    if (enableGsapIntegration && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0 },
        { scale: 1, duration, ease: 'back.out(1.7)' }
      );
    }
  };

  const scaleOut = (duration: number = 0.5) => {
    if (enableGsapIntegration && containerRef.current) {
      gsap.to(containerRef.current, { scale: 0, duration, ease: 'back.in(1.7)' });
    }
  };

  // Forward ref handling
  const combinedRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  // Expose imperative methods
  React.useImperativeHandle(ref, () => ({
    element: containerRef.current,
    animation: animationRef.current,
    play,
    pause,
    stop,
    goTo,
    goToAndPlay,
    setSpeed,
    destroy,
    fadeIn,
    fadeOut,
    scaleIn,
    scaleOut,
  }));

  return (
    <div
      ref={combinedRef}
      id={id}
      className={`lottie-player ${className}`.trim()}
      style={style}
      data-lottie-id={id}
    />
  );
});

LottiePlayer.displayName = 'LottiePlayer';

export default LottiePlayer;