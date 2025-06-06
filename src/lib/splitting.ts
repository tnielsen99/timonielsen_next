'use client';

// Safe dynamic import for Splitting.js to avoid SSR issues
let splittingInstance: any = null;
let splittingPromise: Promise<any> | null = null;

export const loadSplitting = async (): Promise<any> => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (splittingInstance) {
    return splittingInstance;
  }

  if (splittingPromise) {
    return splittingPromise;
  }

  splittingPromise = import('splitting').then((module) => {
    // Splitting.js uses UMD format, try different export patterns
    splittingInstance = module.default || (module as any).Splitting || module;
    
    // If we got a function, use it; otherwise try to find the function
    if (typeof splittingInstance === 'function') {
      return splittingInstance;
    } else if (splittingInstance && typeof splittingInstance.default === 'function') {
      splittingInstance = splittingInstance.default;
      return splittingInstance;
    } else {
      console.warn('Could not find Splitting function in module');
      return null;
    }
  }).catch((error) => {
    console.error('Failed to load Splitting.js:', error);
    return null;
  });

  return splittingPromise;
};

export const getSplitting = () => splittingInstance;