# Lenis Scroll Smoother Setup

This project now uses [Lenis](https://github.com/studio-freight/lenis) for smooth scrolling instead of GSAP's ScrollSmoother.

## Features

- **Better Performance**: Lenis is more performant than GSAP ScrollSmoother
- **Smaller Bundle Size**: Lenis is lighter than GSAP ScrollSmoother
- **Mobile Optimized**: Automatically disabled on mobile devices (≤768px)
- **GSAP Integration**: Works seamlessly with GSAP ScrollTrigger
- **Global Management**: Single instance managed across the entire application

## Usage

### Basic Usage in Components

```tsx
import { useLenis } from '../../hooks/useLenis';

function MyComponent() {
  const lenis = useLenis();

  useEffect(() => {
    // Lenis is automatically initialized when the hook is used
    // You can access the lenis instance here
  }, []);

  return <div>My Component</div>;
}
```

### With GSAP ScrollTrigger

```tsx
import { useLenis } from '../../hooks/useLenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function MyComponent() {
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);

    // Connect Lenis with GSAP ScrollTrigger
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Your GSAP animations here
    gsap.to('.element', {
      scrollTrigger: {
        trigger: '.element',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
      y: 100,
    });
  }, [lenis]);

  return <div className="element">Animated Element</div>;
}
```

### Programmatic Scrolling

```tsx
import { lenisScrollTo } from '../../utils/lenis';

// Scroll to element
lenisScrollTo('#target-element');

// Scroll to position
lenisScrollTo(1000);

// Scroll with options
lenisScrollTo('#target-element', {
  offset: -100,
  duration: 2,
});
```

## Configuration

The Lenis configuration is set in `src/utils/lenis.ts`:

```tsx
lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

### Available Options

- `duration`: Scroll animation duration (default: 1.2)
- `easing`: Easing function for scroll animation
- `orientation`: Scroll direction ('vertical' | 'horizontal')
- `smoothTouch`: Enable smooth scrolling on touch devices
- `touchMultiplier`: Touch scroll sensitivity multiplier

## Migration from ScrollSmoother

### Before (ScrollSmoother)
```tsx
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollTrigger.normalizeScroll(true);

  const deviceWidth = window.innerWidth;
  if (deviceWidth > 768) {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });
  }
}, []);
```

### After (Lenis)
```tsx
import { useLenis } from '../../hooks/useLenis';

function MyComponent() {
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }
  }, [lenis]);
}
```

## Benefits

1. **Performance**: Lenis is more performant and uses less CPU
2. **Bundle Size**: Smaller footprint compared to GSAP ScrollSmoother
3. **Mobile Friendly**: Automatically disabled on mobile for better UX
4. **GSAP Compatible**: Works seamlessly with existing GSAP animations
5. **Global Instance**: Single instance managed across the app

## Files Structure

```
src/
├── utils/
│   ├── lenis.ts          # Core Lenis configuration
│   └── scrollManager.ts  # Global scroll manager
├── hooks/
│   └── useLenis.ts       # React hook for Lenis
└── scripts/
    └── initScroll.ts     # Global initialization script
```

## Troubleshooting

### Lenis not working
1. Check if you're on mobile (≤768px) - Lenis is disabled on mobile
2. Ensure the component is using the `useLenis` hook
3. Check browser console for any errors

### GSAP animations not working
1. Make sure to connect Lenis with ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`
2. Ensure ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
3. Check that `ScrollTrigger.normalizeScroll(true)` is called 