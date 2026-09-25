// The nav sits light over the hero image and turns solid once past it.
const nav = document.querySelector<HTMLElement>('[data-nav]');
const hero = document.querySelector<HTMLElement>('[data-hero]');

if (nav) {
  const update = () => {
    const threshold = hero ? hero.offsetHeight - nav.offsetHeight : 0;
    nav.classList.toggle('is-solid', window.scrollY > threshold);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
