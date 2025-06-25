import { initLenis, destroyLenis, getLenis } from './lenis';

class ScrollManager {
  private static instance: ScrollManager;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  init() {
    if (this.isInitialized) return;
    
    initLenis();
    this.isInitialized = true;
  }

  destroy() {
    if (!this.isInitialized) return;
    
    destroyLenis();
    this.isInitialized = false;
  }

  getLenis() {
    return getLenis();
  }

  isReady() {
    return this.isInitialized;
  }
}

export const scrollManager = ScrollManager.getInstance(); 