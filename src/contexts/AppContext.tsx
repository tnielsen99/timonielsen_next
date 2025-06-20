'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (complete: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <div suppressHydrationWarning>
      <AppContext.Provider value={{ 
        isMenuOpen, 
        setIsMenuOpen, 
        isLoading, 
        setIsLoading,
        isPreloaderComplete,
        setIsPreloaderComplete
      }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};