import { lenis } from './motion';

const box = document.querySelector<HTMLElement>('[data-lightbox]');
const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-full]'));

if (box && triggers.length) {
  const img = box.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const count = box.querySelector<HTMLElement>('[data-lightbox-count]')!;
  let current = 0;
  let lastFocus: HTMLElement | null = null;

  const show = (i: number) => {
    current = (i + triggers.length) % triggers.length;
    const t = triggers[current];
    img.src = t.dataset.full!;
    img.alt = t.dataset.alt || '';
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(triggers.length).padStart(2, '0')}`;
  };

  const open = (i: number) => {
    lastFocus = document.activeElement as HTMLElement;
    show(i);
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('is-open'));
    document.documentElement.classList.add('has-lightbox');
    lenis?.stop();
    box.querySelector<HTMLElement>('[data-lightbox-close]')!.focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    document.documentElement.classList.remove('has-lightbox');
    lenis?.start();
    setTimeout(() => (box.hidden = true), 300);
    lastFocus?.focus();
  };

  triggers.forEach((t, i) => t.addEventListener('click', () => open(i)));
  box.querySelector('[data-lightbox-close]')!.addEventListener('click', close);
  box.querySelector('[data-lightbox-prev]')!.addEventListener('click', () => show(current - 1));
  box.querySelector('[data-lightbox-next]')!.addEventListener('click', () => show(current + 1));
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Swipe on touch screens.
  let startX = 0;
  box.addEventListener('pointerdown', (e) => (startX = e.clientX));
  box.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
}
