export interface MenuLink {
  id: string;
  href: string;
  label: string;
  number: string;
}

export interface TransitionItem {
  id: string;
  text: string;
  letter: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface ScrollSection {
  id: string;
  trigger?: string;
  start?: string;
  end?: string;
}