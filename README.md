# ModStudio

Portfolio website — built with [Astro](https://astro.build), with parallax
scrolling by [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
and smooth scrolling by [Lenis](https://lenis.darkroom.engineering/).

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
```

## Content

- `src/data/site.ts` — studio name, tagline, statement, contact links
- `src/data/projects.ts` — project details and which images appear in each room

## Images

Original images go in `assets/<project>/` (e.g. `assets/PRO01/`). The site uses
web-sized copies in `assets/web/`, made with:

```sh
pip install pillow
npm run images
```

Astro then generates responsive sizes and WebP versions at build time.

## Deploy

Every push to `main` builds and deploys to GitHub Pages
(`.github/workflows/deploy.yml`). Pages must be enabled once in the repo
settings: **Settings → Pages → Source: GitHub Actions**.
