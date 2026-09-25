// Prefixes a site path with the configured base (needed on GitHub Pages,
// where the site lives under /<repo>/).
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
