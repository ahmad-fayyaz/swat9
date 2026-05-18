# The Swarthmore #9

A React + Vite web page that displays JotForm submission data.

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Create your `.env` file**

Copy the template and fill in the API key (get it from the team):
```bash
cp .env.example .env
```

**3. Start the dev server**
```bash
npm run dev
```

The site runs at `http://localhost:5173`.

## Environment variables

| Variable | Description |
|---|---|
| `VITE_JOTFORM_API_KEY` | JotForm API key — get this from the project owner |

## Commands

```bash
npm run dev      # dev server with hot reload
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Node version

Use Node 24 (see `.nvmrc`). If you use nvm: `nvm use`
