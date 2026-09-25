// Signals that the loading screen has finished and the page is showing.
let ready = false;
const callbacks: Array<() => void> = [];

export function onReady(cb: () => void) {
  if (ready) cb();
  else callbacks.push(cb);
}

export function markReady() {
  if (ready) return;
  ready = true;
  document.documentElement.classList.add('is-ready');
  callbacks.splice(0).forEach((cb) => cb());
}
