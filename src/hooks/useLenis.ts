import { useEffect } from 'react';
import { scrollManager } from '../utils/scrollManager';

export const useLenis = () => {
  useEffect(() => {
    // Only initialize scroll manager on desktop devices
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      scrollManager.init();
    }
    // Cleanup on unmount (only if this is the last component using it)
    return () => {
      // Note: We don't destroy here as other components might still be using it
      // The scroll manager will handle cleanup when the page is unloaded
    };
  }, []);

  return scrollManager.getLenis();
}; 