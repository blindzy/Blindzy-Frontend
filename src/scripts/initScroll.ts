import { scrollManager } from '../utils/scrollManager';

// Initialize scroll manager when the script loads
if (typeof window !== 'undefined') {
  // Initialize on page load
  scrollManager.init();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    scrollManager.destroy();
  });
}

export { scrollManager }; 