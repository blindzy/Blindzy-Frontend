import Lenis from 'lenis';

let lenis: Lenis | null = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return;

  // Only initialize on desktop devices (strictly > 1024px)
  const deviceWidth = window.innerWidth;
  if (deviceWidth <= 1024) return;

  // Create Lenis instance with smoother configuration
  lenis = new Lenis({
    duration: 2.0, // smoother, slower scroll
    easing: (t) => 1 - Math.pow(1 - t, 4), // strong ease-out
    smoothWheel: true,
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