import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling. Exported so the lightbox can pause it.
export const lenis = reduceMotion ? null : new Lenis({ lerp: 0.09, anchors: true });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const all = <T extends Element = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector);

if (!reduceMotion) {
  // Hero: image settles in on load, then sinks slower than the page while
  // the title lifts away.
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const media = hero.querySelector('[data-hero-media]');
    const content = hero.querySelector('[data-hero-content]');
    gsap.from(media, { scale: 1.15, duration: 2.4, ease: 'power3.out' });
    gsap.from(content?.children ?? [], { y: 40, opacity: 0, duration: 1.4, ease: 'power3.out', stagger: 0.12, delay: 0.3 });
    gsap.to(hero.querySelector('.hero__img'), {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to(content, {
      yPercent: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '45% top', scrub: true },
    });
  }

  const mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, (ctx) => {
    // Phones get half the movement.
    const strength = ctx.conditions?.desktop ? 1 : 0.5;

    // Layers moving at different speeds. data-depth is the distance travelled
    // relative to the page, as a fraction of the viewport height.
    all('[data-depth]').forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '0') * strength;
      if (!depth) return;
      gsap.fromTo(
        el,
        { y: () => depth * window.innerHeight },
        {
          y: () => -depth * window.innerHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    // Images drift inside their frames.
    all('[data-inner]').forEach((img) => {
      const band = img.closest('.frame--band');
      const range = (band ? 12 : 6) * (ctx.conditions?.desktop ? 1 : 0.7);
      gsap.fromTo(
        img,
        { yPercent: -range },
        {
          yPercent: range,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });

  // Frames unveil upwards the first time they come into view.
  all('[data-reveal]').forEach((frame) => {
    const clip = frame.querySelector('.frame__clip');
    gsap.from(clip, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
    });
  });

  // Text fades up.
  all('[data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Next project: the image opens up to full screen while pinned.
  const next = document.querySelector<HTMLElement>('[data-next]');
  if (next) {
    gsap.fromTo(
      next.querySelector('[data-next-media]'),
      { clipPath: 'inset(22% 24% 22% 24%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top top', end: 'bottom bottom', scrub: true },
      },
    );
  }

  // Positions change once images and fonts load.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
