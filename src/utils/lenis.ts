import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return;

  // Only initialize on desktop devices
  const deviceWidth = window.innerWidth;
  if (deviceWidth <= 768) return;

  // Create Lenis instance with minimal configuration
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // RAF loop
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};

export const getLenis = () => lenis;

export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

export const lenisScrollTo = (target: any, options?: any) => {
  if (lenis) {
    return lenis.scrollTo(target, options);
  }
}; 