// Type definitions for modules without official types

declare module 'splitting' {
  interface SplittingOptions {
    target?: string | Element | NodeList;
    by?: 'chars' | 'words' | 'lines';
    key?: string;
  }

  interface SplittingResult {
    el: Element;
    chars?: Element[];
    words?: Element[];
    lines?: Element[];
  }

  function Splitting(options?: SplittingOptions): SplittingResult[];
  export = Splitting;
}

declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    lerp?: number;
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    scrollFromAnywhere?: boolean;
    inertia?: number;
    tablet?: {
      smooth?: boolean;
      direction?: string;
      gestureDirection?: string;
    };
    smartphone?: {
      smooth?: boolean;
      direction?: string;
    };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    init(): void;
    update(): void;
    start(): void;
    stop(): void;
    scrollTo(target: string | number | HTMLElement, options?: any): void;
    setScroll(x: number, y: number): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    destroy(): void;
  }
}

declare module 'imagesloaded' {
  interface ImagesLoadedOptions {
    background?: boolean | string;
  }

  interface ImagesLoadedResult {
    images: Array<{
      img: HTMLImageElement;
      isLoaded: boolean;
    }>;
  }

  function imagesLoaded(
    elem: Element | NodeList | string,
    options?: ImagesLoadedOptions,
    callback?: (result: ImagesLoadedResult) => void
  ): any;

  export = imagesLoaded;
}

declare module 'lazysizes' {
  const lazySizes: any;
  export = lazySizes;
}

declare module 'masonry-layout' {
  interface MasonryOptions {
    itemSelector?: string;
    columnWidth?: number | string;
    gutter?: number | string;
    percentPosition?: boolean;
    stamp?: string;
    fitWidth?: boolean;
    originLeft?: boolean;
    originTop?: boolean;
    containerStyle?: object;
    transitionDuration?: string;
    resize?: boolean;
    initLayout?: boolean;
  }

  class Masonry {
    constructor(elem: Element | string, options?: MasonryOptions);
    layout(): void;
    layoutItems(items: Element[]): void;
    stamp(elements: Element[]): void;
    unstamp(elements: Element[]): void;
    appended(elements: Element[]): void;
    prepended(elements: Element[]): void;
    addItems(elements: Element[]): void;
    remove(elements: Element[]): void;
    on(eventName: string, listener: Function): void;
    off(eventName: string, listener: Function): void;
    once(eventName: string, listener: Function): void;
    destroy(): void;
  }

  export = Masonry;
}

// Extend React JSX namespace for custom data attributes
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Global type extensions
declare global {
  interface Window {
    lottie?: any;
    barba?: any;
    gsap?: any;
    ScrollTrigger?: any;
    LocomotiveScroll?: any;
  }
}