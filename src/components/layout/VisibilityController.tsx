'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function VisibilityController() {
  useEffect(() => {
    // Ensure content is visible by managing classes
    const timer = setTimeout(() => {
      // Remove any loading classes
      document.documentElement.classList.remove('js-loading', 'preloader-active');
      document.body.classList.add('preloader-complete');
      
      // Set GSAP visibility properties
      gsap.set('body, html', { 
        autoAlpha: 1 
      });
      
      console.log('Visibility controller: Content made visible');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}