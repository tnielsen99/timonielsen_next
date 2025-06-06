'use client';

import { useState, ReactNode } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Header from './Header';
import Footer from './Footer';
import Transition from './Transition';
import Loader from './Loader';
import MobileMenu from './MobileMenu';
import Preloader from '@/components/animations/Preloader';
import VisibilityController from './VisibilityController';

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [showContent, setShowContent] = useState(true); // Changed to true to show content immediately
  const { setIsPreloaderComplete } = useAppContext();

  const handlePreloaderComplete = () => {
    setShowContent(true);
    setIsPreloaderComplete(true);
  };

  return (
    <>
      <VisibilityController />
      <Preloader onComplete={handlePreloaderComplete} />
      <Transition />
      <Loader />
      <div 
        data-scroll-container
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <MobileMenu />
    </>
  );
}