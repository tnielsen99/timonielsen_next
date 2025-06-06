'use client';

import React, { useEffect, useState, forwardRef } from 'react';
import { usePreloader } from '@/hooks/usePreloader';
import LottiePlayer from './LottiePlayer';
import GSAPText from './GSAPText';

export interface PreloaderProps {
  className?: string;
  onComplete?: () => void;
  showProgress?: boolean;
  desktopBottomPosition?: string;
  mobileBottomPosition?: string;
  autoStart?: boolean;
  skipOnDevelopment?: boolean;
}

export const Preloader = forwardRef<HTMLDivElement, PreloaderProps>(({
  className = '',
  onComplete,
  showProgress = true,
  desktopBottomPosition = '4rem',
  mobileBottomPosition = '1.6rem',
  autoStart = true,
  skipOnDevelopment = true, // Skip in dev for faster development
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading...');
  
  const {
    startPreloader,
    skipPreloader,
    cleanup,
    timeline,
    isLoaded,
  } = usePreloader({
    onComplete: () => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    },
    desktopBottomPosition,
    mobileBottomPosition,
  });

  // Handle development skip and timeout fallback
  useEffect(() => {
    if (skipOnDevelopment && process.env.NODE_ENV === 'development') {
      // In development, skip immediately
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    if (autoStart) {
      startPreloader();
    }

    // Add timeout fallback to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 8000); // 8 second timeout to allow animations to complete

    return () => {
      clearTimeout(timeoutId);
      cleanup();
    };
  }, [autoStart, skipOnDevelopment, startPreloader, skipPreloader, cleanup, onComplete]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }


  return (
    <div
      ref={ref}
      className={`preloader ${className}`.trim()}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        background: '#ebebeb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        visibility: 'visible',
      }}
    >
      {/* Main content container */}
      <div className="preloader__content">
        {/* Lottie Animations */}
        <div className="preloader__animations">
          {/* Home Loop Animation (visible after preloader) */}
          <LottiePlayer
            id="lottie-home"
            src="/images/Animate/HomeLoop.json"
            className="preloader__home"
            loop={true}
            autoplay={false}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          />

          {/* Loader Animation */}
          <LottiePlayer
            id="lottie-loader"
            src="/images/Animate/HomeLoop.json"
            className="preloader__loader"
            loop={false}
            autoplay={false}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          />

          {/* Drop Animation */}
          <LottiePlayer
            id="lottie-drop"
            src="/images/Animate/HomeDrop.json"
            className="preloader__drop"
            loop={false}
            autoplay={false}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          />
        </div>

        {/* Hello Title - will be handled by usePreloader hook */}
        <div 
          className="hello-title"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(2rem, 8vw, 8rem)',
            fontWeight: 'bold',
            perspective: '300px',
          }}
        >
          <GSAPText
            splitBy="chars"
            animationType="none" // Handled by preloader hook
            className="hello-title__text"
          >
            Timo Nielsen
          </GSAPText>
        </div>

        {/* Hello Subtitle */}
        <div 
          className="hello-sub"
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
            opacity: 0.7,
          }}
        >
          <span>Data Scientist & Engineer</span>
        </div>

        {/* Person Column 2 - placeholder for person image */}
        <div 
          className="person-col2"
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            opacity: 0,
          }}
        >
          {/* Person image would go here */}
        </div>

        {/* Menu Home */}
        <div 
          className="menu-home"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            opacity: 0,
          }}
        >
          {/* Menu items would go here */}
        </div>

        {/* Header */}
        <header 
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            opacity: 0,
          }}
        >
          {/* Header content would go here */}
        </header>
      </div>

      {/* Footer */}
      <div 
        className="footer"
        style={{
          position: 'absolute',
          bottom: desktopBottomPosition,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.9rem',
          opacity: 0,
          whiteSpace: 'nowrap',
        }}
      >
        <span>© 2024 Timo Nielsen</span>
      </div>

      {/* Progress Counter */}
      {showProgress && (
        <div 
          id="progress"
          className="preloader__progress"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.8rem',
            opacity: 0.7,
          }}
        >
          <span>Loading...</span>
        </div>
      )}

      {/* Loader overlay */}
      <div 
        className="loader"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

Preloader.displayName = 'Preloader';

export default Preloader;