import type { ImageMetadata } from 'astro';

// Web-sized copies produced by scripts/optimize-images.py. Astro generates
// the responsive sizes and WebP versions from these at build time.
const files = import.meta.glob<{ default: ImageMetadata }>('/assets/web/*/*.jpg', {
  eager: true,
});

export function image(project: string, name: string): ImageMetadata {
  const mod = files[`/assets/web/${project}/${name}.jpg`];
  if (!mod) throw new Error(`Image not found: assets/web/${project}/${name}.jpg`);
  return mod.default;
}
