# Teleprompter Online

Teleprompter Online is a pure frontend MVP built with Next.js App Router, TypeScript, and Tailwind CSS. The homepage places the teleprompter editor directly in the hero so visitors can start using the product immediately, while the dedicated reader routes provide a focused prompting experience.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Browser `localStorage` persistence for script and reader settings

## Routes

- `/` English homepage
- `/teleprompter` English reader workspace
- `/es` Spanish homepage
- `/es/teleprompter` Spanish reader workspace

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deployment

This project is ready for standard Next.js deployment targets, including Vercel and any platform that can run `next build` and `next start`.

Recommended environment:

- Node.js 20+
- Build command: `npm run build`
- Start command: `npm run start`

## Product notes

- The script and teleprompter settings are stored locally in the browser under a versioned `localStorage` key.
- No authentication, remote control, or backend dependency is included in this MVP.
- SEO helpers and route structure are organized so future landing pages such as `/teleprompter-for-youtube` and tutorial pages can be added cleanly.
