// Project content and image curation. Image names refer to files in
// assets/web/<code>/ (without the .jpg extension).
//
// Each room is a list of rows:
//   single — one image, centred
//   pair   — a large image and a smaller one, offset and moving at different speeds
//   band   — one image across the full width, cropped (focus = vertical crop point)

export type Row =
  | { type: 'single'; image: string }
  | { type: 'pair'; images: [string, string] }
  | { type: 'band'; image: string; focus?: string };

export interface Room {
  name: string;
  rows: Row[];
}

export interface Project {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  scope: string;
  accent: string;
  summary: string;
  hero: string;
  heroFocus: string;
  cover: string;
  coverDetail: string;
  rooms: Room[];
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    code: 'PRO01',
    title: 'Project One', // PLACEHOLDER
    subtitle: 'Private residence', // PLACEHOLDER
    location: 'City, Country', // PLACEHOLDER
    year: '2025', // PLACEHOLDER
    scope: 'Interior design & 3D visualization', // PLACEHOLDER
    accent: '#3f5a78',
    summary:
      'A double-height family home organised around a sculptural ring chandelier, with warm oak joinery, travertine and deep blue textiles that anchor each room.', // PLACEHOLDER
    hero: '07',
    heroFocus: '30%',
    cover: '09',
    coverDetail: '13',
    rooms: [
      {
        name: 'Entrance',
        rows: [
          { type: 'pair', images: ['02', '04'] },
          { type: 'single', image: '05' },
        ],
      },
      {
        name: 'Living',
        rows: [
          { type: 'pair', images: ['10', '13'] },
          { type: 'band', image: '15', focus: '55%' },
          { type: 'pair', images: ['11', '08'] },
        ],
      },
      {
        name: 'Bar',
        rows: [{ type: 'pair', images: ['19', '20'] }],
      },
      {
        name: 'Stair & Lift',
        rows: [
          { type: 'single', image: '23' },
          { type: 'pair', images: ['21', '22'] },
        ],
      },
      {
        name: 'Dining',
        rows: [
          { type: 'pair', images: ['25', '28'] },
          { type: 'band', image: '26', focus: '60%' },
        ],
      },
      {
        name: 'Family Lounge',
        rows: [
          { type: 'pair', images: ['32', '36'] },
          { type: 'single', image: '35' },
        ],
      },
      {
        name: 'Gallery Corridor',
        rows: [{ type: 'pair', images: ['38', '40'] }],
      },
    ],
  },
  {
    slug: 'project-two',
    code: 'PRO02',
    title: 'Project Two', // PLACEHOLDER
    subtitle: 'Private residence', // PLACEHOLDER
    location: 'City, Country', // PLACEHOLDER
    year: '2025', // PLACEHOLDER
    scope: 'Interior design & 3D visualization', // PLACEHOLDER
    accent: '#a5532a',
    summary:
      'A sweeping spiral stair ties together open living and dining spaces, framed by a hand-laid stone wall, lotus artworks and rust-toned upholstery.', // PLACEHOLDER
    hero: '16a',
    heroFocus: '45%',
    cover: '10',
    coverDetail: '07',
    rooms: [
      {
        name: 'Entrance',
        rows: [
          { type: 'pair', images: ['01', '07'] },
          { type: 'single', image: '03' },
        ],
      },
      {
        name: 'Living',
        rows: [
          { type: 'pair', images: ['10', '11'] },
          { type: 'single', image: '14' },
        ],
      },
      {
        name: 'Staircase',
        rows: [
          { type: 'band', image: '13', focus: '50%' },
          { type: 'pair', images: ['12', '16a'] },
        ],
      },
      {
        name: 'Lounge',
        rows: [
          { type: 'pair', images: ['22', '17'] },
          { type: 'single', image: '20' },
        ],
      },
      {
        name: 'Dining & Kitchen',
        rows: [
          { type: 'pair', images: ['24', '26'] },
          { type: 'single', image: '28' },
        ],
      },
    ],
  },
];
