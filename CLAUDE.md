# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server with HMR at http://localhost:5173
npm run build     # production build (output: dist/)
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** for bundling and dev server
- **Tailwind CSS v4** integrated via the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed)
- **ESLint** with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

## Architecture

Single-page app with one root component. Entry point is `src/main.jsx` → `src/App.jsx`. Global styles are in `src/index.css` and `src/App.css`. SVG icons are sprite-based via `public/icons.svg` (referenced with `<use href="/icons.svg#icon-name">`).

Tailwind v4 is configured entirely through the Vite plugin — utility classes are available without any config file.
