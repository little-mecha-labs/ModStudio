import gsap from 'gsap';
import { lenis } from './motion';
import { markReady } from './ready';

// Holds the page behind a loading screen until every image and font on it
// has loaded, then lifts away.
const MIN_TIME = 900; // ms — avoids a flash when everything is cached
const MAX_TIME = 15000; // ms — never keep a slow connection waiting forever

const loader = document.querySelector<HTMLElement>('[data-loader]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

if (!loader) {
  markReady();
} else {
  window.scrollTo(0, 0);
  lenis?.stop();

  const bar = loader.querySelector<HTMLElement>('[data-loader-bar]')!;
  const count = loader.querySelector<HTMLElement>('[data-loader-count]')!;
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('main img'));
  const total = images.length + 1; // + fonts
  let loaded = 0;
  let shown = 0;
  let done = false;
  const start = performance.now();

  const tick = () => (loaded += 1);

  images.forEach((img) => {
    if (img.complete) return tick();
    img.addEventListener('load', tick, { once: true });
    img.addEventListener('error', tick, { once: true });
  });
  document.fonts.ready.then(tick);

  const finish = () => {
    if (done) return;
    done = true;
    count.textContent = '100';
    bar.style.transform = 'scaleX(1)';
    lenis?.start();
    markReady();

    if (reduceMotion) {
      gsap.to(loader, { opacity: 0, duration: 0.4, onComplete: () => loader.remove() });
      return;
    }
    gsap
      .timeline({ onComplete: () => loader.remove() })
      .to(loader.querySelector('[data-loader-inner]'), { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to(loader, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1');
  };

  // Ease the counter towards the real progress so it never jumps.
  const frame = () => {
    if (done) return;
    const target = (loaded / total) * 100;
    shown += (target - shown) * 0.12;
    if (target - shown < 0.5) shown = target;
    count.textContent = String(Math.floor(shown));
    bar.style.transform = `scaleX(${shown / 100})`;

    const elapsed = performance.now() - start;
    if ((shown >= 100 && elapsed >= MIN_TIME) || elapsed >= MAX_TIME) finish();
    else requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
