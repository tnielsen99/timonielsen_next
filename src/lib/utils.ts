// Utility functions

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
};

export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let lastTime = 0;

  return (...args: Parameters<F>) => {
    const now = Date.now();
    if (now - lastTime >= waitFor) {
      func(...args);
      lastTime = now;
    }
  };
};